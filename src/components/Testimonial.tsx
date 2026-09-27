const avatars = [
  { emoji: '👨🏽', bg: 'from-sky-200 to-sky-300' },
  { emoji: '👩🏾', bg: 'from-violet-400 to-violet-500' },
  { emoji: '🧑🏽', bg: 'from-amber-200 to-amber-300' },
  { emoji: '🧕🏽', bg: 'from-gray-200 to-gray-300' },
  { emoji: '👩🏼', bg: 'from-pink-200 to-pink-300' },
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
                  i === 1 ? '-rotate-6 scale-110 shadow-lg shadow-violet-400/50' : 'grayscale-[30%]'
                }`}
              >
                {a.emoji}
              </span>
            ))}
          </div>
        </div>
        <blockquote className="mt-6 text-2xl font-medium leading-relaxed text-gray-900">
          &ldquo;Before Draftr, we juggled five different tools to manage clients, tasks, and
          reports. Now it&apos;s all in one place. We launched 3 campaigns faster this quarter than
          ever before.&rdquo;
        </blockquote>
        <p className="mt-5 text-sm text-gray-500">Sofia Delgado, Product Manager, NovaTech</p>
      </div>
    </section>
  )
}
