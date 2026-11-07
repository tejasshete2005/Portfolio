import { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, FileText, Send } from 'lucide-react'

const Contact = () => {
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    const form = event.currentTarget
    const formData = new FormData(form)
    const submission = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      })
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error('The contact endpoint is unavailable. Deploy with Vercel or run its development server.')
      }

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Your message could not be sent.')
      }

      form.reset()
      setStatus({ type: 'success', message: 'Thanks! Your message has been sent.' })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Your message could not be sent. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section
      className="content-section contact-section"
      id="contact"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65 }}
    >
      <div className="section-inner contact-layout">
        <div className="contact-intro">
          <span className="card-icon"><FileText size={21} /></span>
          <p className="section-eyebrow">GET IN TOUCH</p>
          <h2 className="section-heading">Let’s build something <span className="gradient-text">useful.</span></h2>
          <p className="section-description">
            I’m interested in software development opportunities, collaborations,
            and conversations about full-stack development and data analytics.
          </p>
          <a className="text-link contact-resume-link" href="/Updated_resume.pdf" target="_blank" rel="noreferrer">
            View my resume <ArrowUpRight size={16} />
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <label className="contact-field">
              <span>Your name</span>
              <input name="name" type="text" autoComplete="name" maxLength={100} required />
            </label>
            <label className="contact-field">
              <span>Email address</span>
              <input name="email" type="email" autoComplete="email" maxLength={254} required />
            </label>
          </div>
          <label className="contact-field">
            <span>Subject</span>
            <input name="subject" type="text" maxLength={160} required />
          </label>
          <label className="contact-field">
            <span>Message</span>
            <textarea name="message" rows={5} maxLength={5000} required />
          </label>
          <label className="contact-honeypot" aria-hidden="true">
            Leave this field empty
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>
          <div className="contact-submit-row">
            <p className={`contact-status ${status.type}`} role="status" aria-live="polite">
              {status.message}
            </p>
            <button className="primary-btn contact-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send message'}
              <Send size={16} />
            </button>
          </div>
          <p className="contact-privacy-note">Your message will be saved to the portfolio owner’s contact spreadsheet.</p>
        </form>
      </div>
    </motion.section>
  )
}

export default Contact