import { useState, type FormEvent } from 'react'
import { Container } from '@/components/layout/container'
import { contact } from '@/lib/site'

type Feedback = { type: 'success' | 'error'; message: string } | null

/** Single-line fields: just a rule underneath, which darkens to black on focus. */
const FIELD =
  'mt-1 block w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-[17px] text-ink transition-colors hover:border-ink/60 focus:border-ink focus:outline-none'

const LABEL = 'block text-sm text-ink-muted'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<Feedback>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    setFeedback(null)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      // api/contact.ts appends the message to the team's Google Sheet.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          website: data.get('website'),
        }),
      })

      // The API replies with JSON; guard against anything else (e.g. the
      // endpoint being unavailable).
      const raw = await response.text()
      let result: { message?: string } = {}
      try {
        result = raw ? JSON.parse(raw) : {}
      } catch {
        throw new Error('We couldn’t send your message. Please try again.')
      }
      if (!response.ok) throw new Error(result.message || 'We couldn’t send your message.')

      setFeedback({ type: 'success', message: 'Thanks, we’ve got your message. We’ll reply within a day.' })
      form.reset()
    } catch (error) {
      console.error('Contact form error:', error)
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 lg:py-36">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-5">
          <h2 className="text-[2.25rem] leading-[1.08] font-bold tracking-[-0.04em] text-ink sm:text-5xl lg:text-[3.5rem]">
            Get in touch
          </h2>
          <p className="mt-5 max-w-xs text-[17px] leading-relaxed text-ink-muted">
            For partnerships, investment, press or anything else. We reply within a day.
          </p>

          <div className="mt-14 space-y-2 font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
            <a href={`mailto:${contact.email}`} className="block w-fit text-ink transition-colors hover:text-brand">
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="block w-fit text-ink transition-colors hover:text-brand">
              {contact.phone}
            </a>
          </div>
          <p className="mt-6 text-[15px] text-ink-muted">{contact.location}</p>
        </div>

        <form data-reveal data-reveal-delay="0.1" onSubmit={handleSubmit} className="relative lg:col-span-6 lg:col-start-7 lg:pt-3">
          <div className="grid gap-10 sm:grid-cols-2">
            <label className={LABEL}>
              Your name
              <input type="text" name="name" required maxLength={150} autoComplete="name" className={FIELD} />
            </label>
            <label className={LABEL}>
              Email
              <input type="email" name="email" required maxLength={254} autoComplete="email" className={FIELD} />
            </label>
          </div>
          <label className={`${LABEL} mt-10`}>
            Message
            <textarea name="message" required maxLength={5000} rows={3} className={`${FIELD} resize-none`} />
          </label>

          {/* Honeypot: hidden from people, filled in by bots. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {feedback && (
            <p
              role={feedback.type === 'error' ? 'alert' : 'status'}
              className={`mt-6 text-sm ${feedback.type === 'success' ? 'text-brand' : 'text-red-600'}`}
            >
              {feedback.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-10 inline-flex h-12 items-center rounded-full bg-brand px-7 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </Container>
    </section>
  )
}
