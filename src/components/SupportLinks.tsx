const left = ['Browse Listings', 'Schedule a Tour', 'Apply for Rent Financing']
const right = ['Get Approved Quickly', 'Secure Your Property', 'Move In Hassle-Free']

export function SupportLinks() {
  return (
    <section className="bg-white px-4 pb-24">
      <div className="mx-auto max-w-4xl">
        <p data-reveal className="text-lg text-gray-600">
          Get the support you need to rent your next home—simple, fast, and transparent.
        </p>
        <div data-stagger className="mt-10 grid gap-x-16 gap-y-5 sm:grid-cols-2">
          {left.map((link, i) => (
            <div key={link} className="contents">
              <a
                data-stagger-item
                href="#"
                className="group flex items-center gap-4 text-lg font-medium text-gray-900"
              >
                <span className="text-violet-600 transition-transform group-hover:translate-x-1">
                  →
                </span>
                {link}
              </a>
              <a
                data-stagger-item
                href="#"
                className="group flex items-center gap-4 text-lg font-medium text-gray-900"
              >
                <span className="text-violet-600 transition-transform group-hover:translate-x-1">
                  →
                </span>
                {right[i]}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
