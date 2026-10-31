
import { useState } from 'react'
import { Mail, Phone, Send } from 'lucide-react'

const details = [
  {
    icon: Mail,
    label: 'Email us',
    value: 'hiveghagency@gmail.com',
    href: 'mailto:hiveghagency@gmail.com',
  },
  {
    icon: Phone,
    label: 'Call us / WhatsApp Us',
    value: '+233 24 130 2496',
    href: 'tel:+233241302496',
  },
]

export function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)
    setFeedback(null)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Send form information to the backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
          website: formData.get('website'),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.message || 'Unable to submit your message.'
        )
      }

      // Display success message
      setFeedback({
        type: 'success',
        message: 'Your message has been submitted successfully! Our team will get back to you within 24 hours.',
      })

      // Clear the form
      form.reset()

    } catch (error) {
      console.error('Contact form error:', error)

      setFeedback({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.',
      })

    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-white px-4 pb-24">
      <div className="mx-auto max-w-6xl">

        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span
            data-reveal
            className="inline-flex items-center rounded-full bg-primary-10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-100"
          >
            Contact Us
          </span>

          <h2
            data-reveal
            data-reveal-delay="0.1"
            className="mt-6 text-4xl font-extrabold tracking-tight text-black-90 sm:text-5xl"
          >
            We&rsquo;d love to hear from you
          </h2>

          <p
            data-reveal
            data-reveal-delay="0.2"
            className="mt-5 leading-relaxed text-black-60"
          >
            Questions about listings, financing, or partnerships?
            Send us a message and our team will get back to you
            within 24 hours.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">

          {/* Contact details */}
          <div data-stagger className="space-y-4">
            {details.map((detail) => (
              <a
                key={detail.label}
                data-stagger-item
                href={detail.href}
                className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5 transition-transform hover:-translate-y-1"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-75 to-primary-100 text-white shadow-md shadow-primary-100/30">
                  <detail.icon
                    className="h-5 w-5"
                    strokeWidth={2.25}
                  />
                </span>

                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-black-40">
                    {detail.label}
                  </span>

                  <span className="mt-0.5 block font-semibold text-black-90">
                    {detail.value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* Message form */}
          <form
            data-reveal="right"
            onSubmit={handleSubmit}
            className="rounded-3xl bg-gradient-to-b from-black-5 to-primary-10/60 p-8 ring-1 ring-black/5 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">

              {/* Full name */}
              <label className="block">
                <span className="text-sm font-medium text-black-70">
                  Full name
                </span>

                <input
                  type="text"
                  name="name"
                  required
                  maxLength={150}
                  autoComplete="name"
                  placeholder="John Doe"
                  className="mt-2 w-full rounded-xl border border-black-20 bg-white px-4 py-3 text-sm text-black-90 outline-none transition placeholder:text-black-40 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20"
                />
              </label>

              {/* Email */}
              <label className="block">
                <span className="text-sm font-medium text-black-70">
                  Email
                </span>

                <input
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="yourname@email.com"
                  className="mt-2 w-full rounded-xl border border-black-20 bg-white px-4 py-3 text-sm text-black-90 outline-none transition placeholder:text-black-40 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20"
                />
              </label>

            </div>

            {/* Message */}
            <label className="mt-5 block">
              <span className="text-sm font-medium text-black-70">
                Message
              </span>

              <textarea
                name="message"
                required
                maxLength={5000}
                rows={5}
                placeholder="Tell us how we can help..."
                className="mt-2 w-full resize-none rounded-xl border border-black-20 bg-white px-4 py-3 text-sm text-black-90 outline-none transition placeholder:text-black-40 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20"
              />
            </label>

            {/* Hidden spam protection field */}
            <div
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
            >
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            {/* Submission feedback */}
            {feedback && (
              <div
                role={feedback.type === 'error' ? 'alert' : 'status'}
                className={`mt-5 rounded-xl p-4 text-sm font-medium ${
                  feedback.type === 'success'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary-75 to-primary-100 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-100/40 transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Send message'}

              <Send
                className="h-4 w-4"
                strokeWidth={2.25}
              />
            </button>

          </form>
        </div>
      </div>
    </section>
  )
}
