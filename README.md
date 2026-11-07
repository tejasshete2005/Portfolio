# Tejas Shete Portfolio

A React portfolio built with Vite, Motion, and Lucide. The contact form uses a
Vercel serverless function to forward submissions to a Microsoft Power Automate
flow; the flow writes each message to an Excel table.

## Development

```sh
npm install
npm run dev
```

The Vite development server serves the portfolio UI. The `/api/contact`
endpoint is a Vercel function and requires Vercel or a compatible function
runtime to test end-to-end.

## Enable contact form submissions

### 1. Create the Excel workbook and table

Create an `.xlsx` workbook in OneDrive or SharePoint. Add a worksheet with an
Excel table named `ContactMessages` and these column headers:

| SubmittedAt | Name | Email | Subject | Message |
|---|---|---|---|---|

Use Excel's **Format as Table** option so Power Automate can add rows.

### 2. Create the Power Automate flow

Create an automated cloud flow with the **When an HTTP request is received**
trigger. Set its request JSON schema to:

```json
{
  "type": "object",
  "properties": {
    "submittedAt": { "type": "string" },
    "name": { "type": "string" },
    "email": { "type": "string" },
    "subject": { "type": "string" },
    "message": { "type": "string" }
  },
  "required": ["submittedAt", "name", "email", "subject", "message"]
}
```

Add **Excel Online (Business) → Add a row into a table**, select the workbook
and `ContactMessages` table, then map each column to the matching trigger
value. Add a **Response** action after the Excel action with status `200` and
body:

```json
{ "ok": true }
```

Save and turn on the flow. Copy its generated HTTP POST URL.

### 3. Configure Vercel

In the Vercel project settings, add an environment variable named
`POWER_AUTOMATE_URL` with the flow URL as its value, then redeploy. Keep the
flow URL private: do not add it to frontend code or commit it to the
repository. The `/api/contact` function reads it server-side.

Submissions are only reported as successful after Power Automate accepts
them. The form validates required fields and email format; the function also
enforces field length limits and same-origin requests.

## Checks

```sh
npm run lint
npm run build
```
