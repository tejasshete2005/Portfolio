const MAX_LENGTHS = {
  name: 100,
  email: 254,
  subject: 160,
  message: 5000
}

const isString = (value) => typeof value === 'string'

const cleanValue = (value) => value.trim()

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  const origin = request.headers.origin
  const host = request.headers.host
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return response.status(403).json({ error: 'Cross-origin submissions are not allowed.' })
      }
    } catch {
      return response.status(403).json({ error: 'Invalid request origin.' })
    }
  }

  const body = request.body
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return response.status(400).json({ error: 'Please submit a valid contact form.' })
  }

  const { name, email, subject, message, website } = body

  if (isString(website) && website.trim()) {
    return response.status(200).json({ ok: true })
  }

  if (![name, email, subject, message].every(isString)) {
    return response.status(400).json({ error: 'Please complete every field.' })
  }

  const submission = {
    name: cleanValue(name),
    email: cleanValue(email),
    subject: cleanValue(subject),
    message: cleanValue(message)
  }

  if (Object.entries(submission).some(([field, value]) => (
    !value || value.length > MAX_LENGTHS[field]
  ))) {
    return response.status(400).json({ error: 'A field is empty or exceeds its character limit.' })
  }

  if (!isValidEmail(submission.email)) {
    return response.status(400).json({ error: 'Enter a valid email address.' })
  }

  const sheetsUrl = globalThis.process?.env?.GOOGLE_SHEETS_WEB_APP_URL
  const sheetsSecret = globalThis.process?.env?.GOOGLE_SHEETS_SECRET
  if (!sheetsUrl || !sheetsSecret) {
    console.error('Contact form is unavailable: Google Sheets integration environment variables are not configured.')
    return response.status(503).json({ error: 'The contact form is not configured yet. Please try again later.' })
  }

  try {
    const sheetsResponse = await fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...submission,
        submittedAt: new Date().toISOString(),
        secret: sheetsSecret
      }),
      signal: AbortSignal.timeout(10000)
    })

    if (!sheetsResponse.ok) {
      console.error(`Google Apps Script rejected a contact submission with status ${sheetsResponse.status}.`)
      return response.status(502).json({ error: 'Your message could not be saved. Please try again later.' })
    }

    const result = await sheetsResponse.json()
    if (result?.ok !== true) {
      console.error('Google Apps Script did not confirm saving a contact submission.')
      return response.status(502).json({ error: 'Your message could not be saved. Please try again later.' })
    }

    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact form could not reach Google Apps Script.', error)
    return response.status(502).json({ error: 'Your message could not be saved. Please try again later.' })
  }
}
