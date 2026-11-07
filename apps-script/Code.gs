const MAX_LENGTHS = {
  name: 100,
  email: 254,
  subject: 160,
  message: 5000
}

function doPost(event) {
  try {
    if (!event || !event.postData || typeof event.postData.contents !== 'string') {
      return jsonResponse({ ok: false, code: 'invalid_request' })
    }

    const submission = JSON.parse(event.postData.contents)
    if (!submission || typeof submission !== 'object' || Array.isArray(submission)) {
      return jsonResponse({ ok: false, code: 'invalid_payload' })
    }

    const properties = PropertiesService.getScriptProperties()
    const expectedSecret = properties.getProperty('SUBMISSION_SECRET')
    if (!expectedSecret || submission.secret !== expectedSecret) {
      return jsonResponse({ ok: false, code: 'secret_mismatch' })
    }

    const fields = ['name', 'email', 'subject', 'message']

    const cleanSubmission = {}
    for (const field of fields) {
      const value = submission[field]
      if (typeof value !== 'string') return jsonResponse({ ok: false, code: 'invalid_submission' })

      cleanSubmission[field] = value.trim()
      if (!cleanSubmission[field] || cleanSubmission[field].length > MAX_LENGTHS[field]) {
        return jsonResponse({ ok: false, code: 'invalid_submission' })
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanSubmission.email)) {
      return jsonResponse({ ok: false, code: 'invalid_submission' })
    }

    const spreadsheetId = properties.getProperty('SPREADSHEET_ID')
    const sheetName = properties.getProperty('SHEET_NAME') || 'ContactMessages'
    if (!spreadsheetId) return jsonResponse({ ok: false, code: 'spreadsheet_id_missing' })

    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName)
    if (!sheet) return jsonResponse({ ok: false, code: 'sheet_not_found' })

    const lock = LockService.getScriptLock()
    lock.waitLock(10000)
    try {
      sheet.appendRow([
        submission.submittedAt || new Date().toISOString(),
        cleanForSheet(cleanSubmission.name),
        cleanForSheet(cleanSubmission.email),
        cleanForSheet(cleanSubmission.subject),
        cleanForSheet(cleanSubmission.message)
      ])
    } finally {
      lock.releaseLock()
    }

    return jsonResponse({ ok: true })
  } catch (error) {
    console.error('Could not save contact submission.', error)
    return jsonResponse({ ok: false, code: 'script_error' })
  }
}

function cleanForSheet(value) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON)
}
