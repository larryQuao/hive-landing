
import { google } from "googleapis";

// Values pasted into environment variable settings often keep their
// surrounding quotes or trailing whitespace; normalize before use.
function normalize(value: string | undefined): string {
  return (value ?? "").trim().replace(/^"(.*)"$/s, "$1").trim();
}

export function getGoogleSheets() {
  const email = normalize(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  const privateKey = normalize(process.env.GOOGLE_PRIVATE_KEY).replace(
    /\\n/g,
    "\n"
  );
  const spreadsheetId = normalize(process.env.GOOGLE_SHEET_ID);

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
      private_key: privateKey,
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
