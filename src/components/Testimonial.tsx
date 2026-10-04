const avatars = [
  { emoji: '👨🏽', bg: 'from-primary-10 to-primary-30' },
  { emoji: '👩🏾', bg: 'from-primary-50 to-primary-75' },
  { emoji: '🧑🏽', bg: 'from-primary-30 to-primary-50' },
  { emoji: '🧕🏽', bg: 'from-black-10 to-black-20' },
  { emoji: '👩🏼', bg: 'from-primary-75 to-primary-100' },
]

export function Testimonial() {
  return (
    <section className="bg-white px-4 py-24">
      <div data-reveal className="mx-auto max-w-3xl">
        <div className="flex justify-end">
          <div className="flex -space-x-3">
            {avatars.map((a, i) => (
              <span
                key={i}
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${a.bg} text-xl ring-4 ring-white ${
                  i === 1 ? '-rotate-6 scale-110 shadow-lg shadow-primary-75/50' : 'grayscale-[30%]'
                }`}
              >
                {a.emoji}
              </span>
            ))}
          </div>
        </div>
        <blockquote className="mt-6 text-2xl font-medium leading-relaxed text-black-90">
          &ldquo;Before Hive, managing listings, leads, and client inquiries meant jumping between different tools. Now, everything is in one place. We can track deals, filter for the
          right Opportunities, and respond to serious prospect faster.&rdquo;
        </blockquote>
        <p className="mt-5 text-sm text-black-50">Dennis, Founder, El City Estate</p>
      </div>
    </section>
  )
}
