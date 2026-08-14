import { OhmsLawCalculator } from './OhmsLawCalculator'
import { KclKvlPractice } from './KclKvlPractice'

export function OhmsLawAndKclWidget() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-3">Ohm's law calculator</p>
        <OhmsLawCalculator />
      </div>
      <div className="border-t border-line pt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-3">KCL practice — solve for Iₓ</p>
        <KclKvlPractice />
      </div>
    </div>
  )
}
