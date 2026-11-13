import type { ReactNode } from 'react'

/** Same page width and gutters as hive-core's Container. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-360 px-6 lg:px-12 ${className}`}>{children}</div>
}
