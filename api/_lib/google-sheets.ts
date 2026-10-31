
import { google } from "googleapis";

export function getGoogleSheets() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  // Check that all environment variables exist
  if (!email || !privateKey || !spreadsheetId) {
    throw new Error(
      "Missing Google Sheets environment variables."
    );
  }

  // Authenticate using the service account
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: email,
      private_key: privateKey.replace(/\\n/g, "\n"),
    },
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

  // Initialize Google Sheets API
  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  return {
    sheets,
    spreadsheetId,
  };
}
