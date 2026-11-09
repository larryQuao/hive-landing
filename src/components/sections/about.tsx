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
        </div>
      </Container>
    </section>
  )
}
