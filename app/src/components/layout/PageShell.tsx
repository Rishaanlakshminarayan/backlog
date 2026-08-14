import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar />
      <main className="flex-1 min-w-0 px-8 py-8 max-w-[1400px]">{children}</main>
    </div>
  )
}
