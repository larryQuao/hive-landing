
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID, sign } from "node:crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SHEETS_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const SHEET_RANGE = "'Leads'!A:F";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

// Clean and validate incoming text values
function clean(value: unknown, maxLength: number): string {
    if (typeof value !== "string") {
        return "";
    }

    return value.trim().slice(0, maxLength);
}

// Values pasted into environment variable settings often keep their
// surrounding quotes or trailing whitespace; normalize before use.
function normalize(value: string | undefined): string {
    return (value ?? "").trim().replace(/^"(.*)"$/s, "$1").trim();
}

type GoogleConfig = {
    email: string;
    privateKey: string;
    spreadsheetId: string;
};

function getGoogleConfig(): GoogleConfig {
    const email = normalize(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    const privateKey = normalize(process.env.GOOGLE_PRIVATE_KEY).replace(
        /\\n/g,
        "\n"
    );
    const spreadsheetId = normalize(process.env.GOOGLE_SHEET_ID);

    // Check that all environment variables exist
    if (!email || !privateKey || !spreadsheetId) {
        throw new Error("Missing Google Sheets environment variables.");
    }

    return { email, privateKey, spreadsheetId };
}

function base64Url(value: string): string {
    return Buffer.from(value).toString("base64url");
}

// Service-account JWT flow, signed locally so the function stays small.
// The full `googleapis` SDK aggregates every Google API (hundreds of MB),
// which is too large to bundle into a serverless function.
async function getAccessToken({
    email,
    privateKey,
}: GoogleConfig): Promise<string> {
    const issuedAt = Math.floor(Date.now() / 1000);
    const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
    const claims = base64Url(
        JSON.stringify({
            iss: email,
            scope: SCOPE,
            aud: TOKEN_URL,
            iat: issuedAt,
            exp: issuedAt + 3600,
        })
    );

    const signature = sign(
        "RSA-SHA256",
        Buffer.from(`${header}.${claims}`),
        privateKey
    ).toString("base64url");

    const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: `${header}.${claims}.${signature}`,
        }),
    });

    const data = (await response.json()) as {
        access_token?: string;
        error?: string;
        error_description?: string;
    };

    if (!response.ok || !data.access_token) {
        throw new Error(
            `Google token request failed (${response.status}): ${
                data.error_description ?? data.error ?? "unknown error"
            }`
        );
    }

    return data.access_token;
}

// Cache the token between warm invocations of the same function instance
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getCachedToken(config: GoogleConfig): Promise<string> {
    if (cachedToken && cachedToken.expiresAt > Date.now()) {
        return cachedToken.token;
    }

    const token = await getAccessToken(config);

    cachedToken = {
        token,
        expiresAt: Date.now() + 55 * 60_000,
    };

    return token;
}

// Append a single lead row to the 'Leads' sheet
async function appendLead(values: string[]): Promise<void> {
    const config = getGoogleConfig();
    const token = await getCachedToken(config);

    const range = encodeURIComponent(SHEET_RANGE);
    const url =
        `${SHEETS_URL}/${config.spreadsheetId}/values/${range}:append` +
        "?valueInputOption=RAW&insertDataOption=INSERT_ROWS";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: [values] }),
    });

    if (!response.ok) {
        const detail = await response.text();

        throw new Error(
            `Google Sheets append failed (${response.status}): ${detail.slice(0, 500)}`
        );
    }
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

        // Append submission as a new spreadsheet row
        await appendLead([
            randomUUID(),
            new Date().toISOString(),
            fullName,
            email,
            message,
            "New",
        ]);

        // Return successful response
        return res.status(200).json({
            success: true,
            message: "Your message has been submitted successfully!",
        });

    } catch (error) {
        console.error("Contact form submission error:", error);

        // Missing credentials are a deployment problem, not a user error
        const isConfigError =
            error instanceof Error &&
            error.message === "Missing Google Sheets environment variables.";

        return res.status(isConfigError ? 503 : 500).json({
            success: false,
            message: isConfigError
                ? "The contact form is not configured yet. Please email us directly instead."
                : "Unable to submit your message. Please try again.",
        });
    }
}
