import { Container } from '@/components/layout/container'

/** Company overview. Wording follows the Hive blueprint's vision and mission. */
export function About() {
  return (
    <section id="about" className="border-b border-line py-24 lg:py-36">
      <Container className="grid gap-12 lg:grid-cols-12">
        <h2 data-reveal className="text-[2.25rem] leading-[1.08] font-bold tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem] text-ink lg:col-span-4">
          About Hive
        </h2>

        <div className="lg:col-span-8">
          <p
            data-reveal
            className="font-display text-[1.625rem] leading-[1.25] font-semibold tracking-[-0.03em] text-ink sm:text-[2rem] lg:pt-2 lg:text-[2.25rem]"
          >
            Property in Ghana should be simple to find, safe to pay for and straightforward to invest in.
            That is the standard we hold ourselves to.
          </p>

          <div data-reveal className="mt-14 grid gap-8 text-[17px] leading-relaxed text-ink-muted sm:grid-cols-2">
            <p>
              Home seekers face uncertainty, scams and poor information. Agents work with manual tools
              and little credibility. Owners struggle to keep their properties let, and investors and
              lenders have no clear way in.
            </p>
            <p>
              Hive brings all of them together through verified people, clear information and payments
              held in escrow, so every side can act with confidence.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
