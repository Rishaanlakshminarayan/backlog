import { useMemo, useState } from 'react'

type SolveFor = 'V' | 'I' | 'R'

export function OhmsLawCalculator() {
  const [solveFor, setSolveFor] = useState<SolveFor>('R')
  const [v, setV] = useState('12')
  const [i, setI] = useState('2')
  const [r, setR] = useState('6')

  const result = useMemo(() => {
    const V = parseFloat(v)
    const I = parseFloat(i)
    const R = parseFloat(r)
    if (solveFor === 'R') return Number.isFinite(V) && Number.isFinite(I) && I !== 0 ? V / I : NaN
    if (solveFor === 'I') return Number.isFinite(V) && Number.isFinite(R) && R !== 0 ? V / R : NaN
    return Number.isFinite(I) && Number.isFinite(R) ? I * R : NaN
  }, [v, i, r, solveFor])

  const fields: { key: SolveFor; label: string; unit: string; value: string; setValue: (v: string) => void }[] = [
    { key: 'V', label: 'Voltage', unit: 'V', value: v, setValue: setV },
    { key: 'I', label: 'Current', unit: 'A', value: i, setValue: setI },
    { key: 'R', label: 'Resistance', unit: 'Ω', value: r, setValue: setR },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl bg-blue-soft px-4 py-3 text-center font-serif text-lg text-blue">
        V = I × R
      </div>

      <div className="grid grid-cols-3 gap-3">
        {fields.map((f) => {
          const isSolved = f.key === solveFor
          return (
            <div key={f.key} className={`rounded-xl border p-3 ${isSolved ? 'border-purple bg-purple-soft' : 'border-line bg-cream-soft'}`}>
              <button
                onClick={() => setSolveFor(f.key)}
                className={`text-xs font-semibold uppercase tracking-wide mb-1.5 ${isSolved ? 'text-purple' : 'text-ink-faint hover:text-ink-soft'}`}
              >
                {isSolved ? 'Solving for' : `Solve for ${f.key}`}
              </button>
              {isSolved ? (
                <p className="font-serif text-2xl font-semibold text-purple">
                  {Number.isFinite(result) ? result.toFixed(3).replace(/\.?0+$/, '') : '—'} {f.unit}
                </p>
              ) : (
                <input
                  type="number"
                  value={f.value}
                  onChange={(e) => f.setValue(e.target.value)}
                  className="w-full rounded-lg border border-line bg-paper px-2.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-purple/30"
                />
              )}
              <p className="text-[11px] text-ink-faint mt-1">{f.label}</p>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-ink-faint">Click a card's label to choose which quantity to solve for — the other two become editable inputs.</p>
    </div>
  )
}
