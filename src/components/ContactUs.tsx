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
    // {
    //   icon: MapPin,
    //   label: 'Visit us',
    //   value: 'Accra, Ghana',
    //   href: '#',
    // },
]

export function ContactUs() {
  return (
    <section id="contact" className="bg-white px-4 pb-24">
      <div className="mx-auto max-w-6xl">
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
          <p data-reveal data-reveal-delay="0.2" className="mt-5 leading-relaxed text-black-60">
            Questions about listings, financing, or partnerships? Send us a message and our team
            will get back to you within 24 hours.
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
                  <detail.icon className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-black-40">
                    {detail.label}
                  </span>
                  <span className="mt-0.5 block font-semibold text-black-90">{detail.value}</span>
                </span>
              </a>
            ))}
          </div>

          {/* Message form */}
          <form
            data-reveal="right"
            onSubmit={(e) => e.preventDefault()}
            className="rounded-3xl bg-gradient-to-b from-black-5 to-primary-10/60 p-8 ring-1 ring-black/5 sm:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-black-70">Full name</span>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="John Doe"
                  className="mt-2 w-full rounded-xl border border-black-20 bg-white px-4 py-3 text-sm text-black-90 outline-none transition placeholder:text-black-40 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-black-70">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="yourname@email.com"
                  className="mt-2 w-full rounded-xl border border-black-20 bg-white px-4 py-3 text-sm text-black-90 outline-none transition placeholder:text-black-40 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20"
                />
              </label>
            </div>
            <label className="mt-5 block">
              <span className="text-sm font-medium text-black-70">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell us how we can help..."
                className="mt-2 w-full resize-none rounded-xl border border-black-20 bg-white px-4 py-3 text-sm text-black-90 outline-none transition placeholder:text-black-40 focus:border-primary-100 focus:ring-2 focus:ring-primary-100/20"
              />
            </label>
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-primary-75 to-primary-100 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-primary-100/40 transition-transform hover:scale-105"
            >
              Send message
              <Send className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
