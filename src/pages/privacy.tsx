import type { ReactNode } from 'react'
import { Container } from '@/components/layout/container'
import { PageMeta } from '@/components/seo/page-meta'
import { contact } from '@/lib/site'

/** Change this whenever the policy's wording changes. */
const UPDATED = '9 November 2026'

const Email = () => (
  <a href={`mailto:${contact.email}`} className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
    {contact.email}
  </a>
)

/** Kept short and general on purpose. Keep it in step with api/contact.ts. */
const SECTIONS: { title: string; body: ReactNode }[] = [
  {
    title: 'What we collect',
    body: <p>The details you send us through the contact form: your name, email address and message.</p>,
  },
  {
    title: 'How we use it',
    body: (
      <p>
        Only to reply to you and follow up on your enquiry. We keep it secure, we do not sell it, and we do not share it
        for marketing.
      </p>
    ),
  },
  {
    title: 'Your rights',
    body: (
      <p>
        Under Ghana’s Data Protection Act, 2012 (Act 843), you can ask to see, correct or delete the information we hold
        about you. Email <Email /> to do so.
      </p>
    ),
  },
]

export function PrivacyPage() {
  return (
    <main className="pt-[72px]">
        <PageMeta
          title="Privacy policy"
          description="How Hive Agency Ltd handles the personal information you share through this website."
        />
        <Container className="py-20 lg:py-28">
          <div className="max-w-2xl">
            <h1 className="text-[2.5rem] leading-[1.05] font-bold tracking-[-0.045em] text-ink sm:text-6xl">
              Privacy policy<span className="text-brand">.</span>
            </h1>
            <p className="mt-5 text-[15px] text-ink-soft">Last updated {UPDATED}</p>
            <p className="mt-10 font-display text-[22px] leading-snug font-semibold tracking-[-0.02em] text-ink">
              Hive Agency Ltd respects your privacy. We only collect what you choose to send us.
            </p>

            <div className="mt-16 space-y-12">
              {SECTIONS.map((s) => (
                <section key={s.title} className="border-t border-line pt-8">
                  <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink">{s.title}</h2>
                  <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-ink-muted">{s.body}</div>
                </section>
              ))}
            </div>
          </div>
        </Container>
    </main>
  )
}
