# Tejas Shete Portfolio

A React portfolio built with Vite, Motion, and Lucide. The contact form uses a
Vercel serverless function to forward submissions to a Google Apps Script web
app, which writes each message to a Google Sheet.

## Development

```sh
npm install
npm run dev
```

The Vite development server serves the portfolio UI. The `/api/contact`
endpoint is a Vercel function and requires Vercel or a compatible function
runtime to test end-to-end.

## Enable contact form submissions

### 1. Create a Google Sheet

Create a Google spreadsheet and a sheet tab named `ContactMessages`. Add these
column headers in the first row:

| SubmittedAt | Name | Email | Subject | Message |
|---|---|---|---|---|

Copy the spreadsheet ID from its URL. It is the value between `/d/` and `/edit`.

### 2. Create the Apps Script web app

In the spreadsheet, choose **Extensions → Apps Script**. Replace the editor
contents with [`apps-script/Code.gs`](./apps-script/Code.gs). In **Project
Settings → Script Properties**, add:

- `SPREADSHEET_ID`: the spreadsheet ID copied above
- `SHEET_NAME`: `ContactMessages`
- `SUBMISSION_SECRET`: a long, random secret string

Then choose **Deploy → New deployment → Web app**, set **Execute as** to
yourself and set access to **Anyone**. Deploy and authorize access when
prompted. Copy the web app URL ending in `/exec`.

### 3. Configure Vercel and verify

In the Vercel project settings, add an environment variable named
`GOOGLE_SHEETS_WEB_APP_URL` with the Apps Script `/exec` URL and
`GOOGLE_SHEETS_SECRET` with the same secret used for the `SUBMISSION_SECRET`
script property. Then redeploy. Add them to the Production environment (and
Preview if needed). Keep both values private: do not add them to frontend code
or commit them to the repository. The `/api/contact` function reads them
server-side.

Submit a test message through the deployed contact form and confirm it appears
as a new row in the sheet. Submissions are only reported as successful after
Apps Script confirms it saved the row. The form validates required fields and
email format; the function also enforces field length limits and same-origin
requests.

## Checks

```sh
npm run lint
npm run build
```
