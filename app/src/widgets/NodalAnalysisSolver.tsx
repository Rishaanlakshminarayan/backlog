import { useState } from 'react'
import { CircuitDefs, CurrentSource, GroundSymbol, Node, Resistor, Wire } from './circuitSvg'
import { StepThrough } from './StepThrough'

const N1 = { x: 90, y: 100 }
const N2 = { x: 230, y: 100 }
const GY = 190

function NodalCircuitDiagram() {
  return (
    <svg viewBox="0 0 300 220" className="w-full max-w-md mx-auto">
      <CircuitDefs />
      {/* top 5A branch, node2 -> node1 */}
      <Wire x1={N2.x} y1={N2.y} x2={N2.x} y2={50} />
      <Wire x1={N1.x} y1={N1.y} x2={N1.x} y2={50} />
      <CurrentSource x1={N2.x} y1={50} x2={N1.x} y2={50} label="5 A" />

      <Resistor x1={N1.x} y1={N1.y} x2={N2.x} y2={N2.y} label="4 Ω" />
      <Resistor x1={N1.x} y1={N1.y} x2={N1.x} y2={GY} label="2 Ω" />
      <Resistor x1={N2.x} y1={N2.y} x2={200} y2={GY} label="6 Ω" />

      <Wire x1={N2.x} y1={N2.y} x2={260} y2={N2.y} />
      <CurrentSource x1={GY} y1={GY} x2={260} y2={N2.y} label="10 A" reverse />

      <Wire x1={90} y1={GY} x2={260} y2={GY} />
      <GroundSymbol x={175} y={GY} />

      {[N1, N2, { x: 200, y: GY }, { x: 260, y: GY }].map((n, i) => (
        <Node key={i} x={n.x} y={n.y} />
      ))}

      <text x={N1.x - 6} y={N1.y - 10} className="fill-ink-soft text-[11px] font-semibold">
        1
      </text>
      <text x={N2.x + 4} y={N2.y - 10} className="fill-ink-soft text-[11px] font-semibold">
        2
      </text>
    </svg>
  )
}

export function NodalAnalysisSolver() {
  const [guess, setGuess] = useState('')
  const [checked, setChecked] = useState(false)
  const v1Answer = 13.33
  const isCorrect = checked && Math.abs(Number(guess) - v1Answer) <= 0.1

  const steps = [
    {
      title: 'Pick the reference node & label unknowns',
      content: (
        <div className="flex flex-col gap-3">
          <NodalCircuitDiagram />
          <p>
            The bottom rail is the reference node (0 V). Node 1 and node 2 have unknown voltages v₁ and v₂. The 5 A
            source pushes current directly from node 2 into node 1; the 10 A source pushes current from ground into
            node 2.
          </p>
        </div>
      ),
    },
    {
      title: 'Apply KCL at each node',
      content: (
        <div className="flex flex-col gap-2">
          <p>Assume all branch currents leave the node; current from a source is fixed and known.</p>
          <pre className="rounded-lg bg-cream px-3 py-2 text-xs leading-relaxed overflow-x-auto">
{`Node 1:  5 = (v1 − v2)/4 + v1/2          → 3v1 − v2 = 20
Node 2:  (v1 − v2)/4 + 10 = 5 + v2/6     → −3v1 + 5v2 = 60`}
          </pre>
          <p className="text-xs text-ink-faint">Multiplying through clears the fractions (×4 for node 1, ×12 for node 2).</p>
        </div>
      ),
    },
    {
      title: "Solve with Cramer's rule",
      content: (
        <div className="flex flex-col gap-2">
          <pre className="rounded-lg bg-cream px-3 py-2 text-xs leading-relaxed overflow-x-auto">
{`[ 3  −1 ] [v1]   [20]
[−3   5 ] [v2] = [60]

Δ = (3)(5) − (−1)(−3) = 12
v1 = |20 −1; 60 5| / Δ = (100+60)/12 = 13.33 V
v2 = |3 20; −3 60| / Δ = (180+60)/12 = 20 V`}
          </pre>
        </div>
      ),
    },
    {
      title: 'Read off branch currents',
      content: (
        <div className="flex flex-col gap-3">
          <p>With both node voltages known, every branch current follows directly from Ohm's law:</p>
          <pre className="rounded-lg bg-cream px-3 py-2 text-xs">{`i(4Ω) = (v1 − v2)/4 = −1.667 A   (negative → actual flow is node2 → node1)
i(2Ω) = v1/2 = 6.667 A
i(6Ω) = v2/6 = 3.333 A`}</pre>

          <div className="rounded-xl border border-line bg-cream-soft p-4">
            <p className="text-sm font-medium mb-2">What's v₁, in volts?</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="any"
                value={guess}
                disabled={checked}
                onChange={(e) => setGuess(e.target.value)}
                className={`w-28 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple/30 ${
                  checked ? (isCorrect ? 'border-sage bg-sage-soft' : 'border-terracotta bg-terracotta-soft') : 'border-line'
                }`}
              />
              <span className="text-sm text-ink-faint">V</span>
              {!checked && (
                <button
                  onClick={() => setChecked(true)}
                  disabled={guess === ''}
                  className="rounded-full bg-ink text-cream-soft text-sm px-4 py-2 disabled:opacity-40"
                >
                  Check
                </button>
              )}
              {checked && (
                <span className={`text-sm font-medium ${isCorrect ? 'text-sage' : 'text-terracotta'}`}>
                  {isCorrect ? 'Correct — 13.33 V' : 'Answer: 13.33 V'}
                </span>
              )}
            </div>
          </div>
        </div>
      ),
    },
  ]

  return <StepThrough steps={steps} />
}
