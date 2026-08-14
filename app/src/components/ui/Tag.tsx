import type { Accent } from '../../content/types'
import { accentClasses } from '../../lib/accent'

export function Tag({ children, accent = 'purple' }: { children: React.ReactNode; accent?: Accent }) {
  const c = accentClasses(accent)
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${c.bgSoft} ${c.text}`}
    >
      {children}
    </span>
  )
}
