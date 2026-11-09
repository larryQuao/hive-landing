/**
 * The Hive mark (four slanted bars), redrawn as a vector from the logo icon so
 * it stays sharp at any size. Takes the text colour.
 */
export function HiveMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="1 0 28 62" fill="currentColor" className={className} role="img" aria-label="Hive">
      <path d="M1 9.4 7 5.8V57.4L1 61Z" />
      <path d="M8 4.2 15 0V51.8L8 56Z" />
      <path d="M16 21.2 22 17.6V48.4L16 52Z" />
      <path d="M23 17 29 13.4V44.4L23 48Z" />
    </svg>
  )
}
