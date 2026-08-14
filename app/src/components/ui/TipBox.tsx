import type { ReactNode } from 'react'

export function TipBox({ children, label = 'Tip' }: { children: ReactNode; label?: string }) {
  return (
    <div className="rounded-xl bg-gold-soft border border-gold/25 px-4 py-3 text-sm text-ink-soft">
      <span className="font-semibold text-gold mr-1.5">{label}:</span>
      {children}
    </div>
  )
}
