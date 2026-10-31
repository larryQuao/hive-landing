
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getGoogleSheets } from "./_lib/google-sheets";

// Clean and validate incoming text values
function clean(value: unknown, maxLength: number): string {
    if (typeof value !== "string") {
        return "";
    }

    return value.trim().slice(0, maxLength);
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Only accept POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method not allowed.",
        });
    }

    try {
        // Get form data
        const body = req.body ?? {};

        // Basic honeypot spam protection
        if (body.website) {
            return res.status(200).json({
                success: true,
                message: "Submission received.",
            });
        }

        // Extract and sanitize form fields
        const fullName = clean(body.fullName, 150);
        const email = clean(body.email, 254).toLowerCase();
        const phone = clean(body.phone, 30);
        const userType = clean(body.userType, 100);
        const subject = clean(body.subject, 200);
        const message = clean(body.message, 5000);

        // Validate required fields
        if (!fullName || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please complete all required fields.",
            });
        }

        // Validate email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address.",
            });
        }

        // Connect to Google Sheets
        const { sheets, spreadsheetId } = getGoogleSheets();

        // Append submission as a new spreadsheet row
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "'Leads'!A:F",
            valueInputOption: "RAW",
            insertDataOption: "INSERT_ROWS",

            requestBody: {
                values: [[
                    crypto.randomUUID(),
                    new Date().toISOString(),
                    fullName,
                    email,
                    message,
                    "New",
                ]],
            },
        });

        // Return successful response
        return res.status(200).json({
            success: true,
            message: "Your message has been submitted successfully!",
        });

    } catch (error) {
        console.error("Contact form submission error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to submit your message. Please try again.",
        });
    }
}
