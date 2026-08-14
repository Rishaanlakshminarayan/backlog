import { useState, type ReactNode } from 'react'
import { Button } from '../components/ui/Button'

export interface Step {
  title: string
  content: ReactNode
}

export function StepThrough({ steps }: { steps: Step[] }) {
  const [revealed, setRevealed] = useState(1)

  return (
    <div className="flex flex-col gap-3">
      {steps.slice(0, revealed).map((step, i) => (
        <div key={i} className="rounded-xl border border-line bg-cream-soft p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-purple mb-2">
            Step {i + 1} · {step.title}
          </p>
          <div className="text-sm text-ink leading-relaxed">{step.content}</div>
        </div>
      ))}
      {revealed < steps.length ? (
        <Button variant="secondary" className="self-start" onClick={() => setRevealed((r) => r + 1)}>
          Reveal step {revealed + 1} of {steps.length} →
        </Button>
      ) : (
        <Button variant="ghost" className="self-start" onClick={() => setRevealed(1)}>
          ↺ Restart walkthrough
        </Button>
      )}
    </div>
  )
}
