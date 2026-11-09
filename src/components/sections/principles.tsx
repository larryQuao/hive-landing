import { Container } from '@/components/layout/container'

/** The three words of Hive's tagline, each given its meaning. */
const PRINCIPLES = [
  {
    word: 'Simpler',
    body: 'One place to find, pay for, finance and look after property, instead of a dozen phone calls.',
  },
  {
    word: 'Transparent',
    body: 'Verified people, every fee shown upfront, and payments held in escrow until the job is done.',
  },
  {
    word: 'Smarter',
    body: 'Listings ranked by how reliably agents deliver, and matching that pairs people who suit each other.',
  },
]

export function Principles() {
  return (
    <section className="border-b border-line py-24 lg:py-32">
      <Container>
        <div data-stagger className="grid gap-14 md:grid-cols-3 md:gap-10 lg:gap-16">
          {PRINCIPLES.map((p) => (
            <div key={p.word} data-stagger-item>
              <h3 className="text-[2.5rem] leading-none font-bold tracking-[-0.045em] text-ink lg:text-[3.25rem]">
                {p.word}
                <span className="text-brand">.</span>
              </h3>
              <p className="mt-6 max-w-xs text-[17px] leading-relaxed text-ink-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
