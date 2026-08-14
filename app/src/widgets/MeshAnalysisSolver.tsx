import { useState } from 'react'
import { Battery, CircuitDefs, LoopArrow, Node, Resistor, Wire } from './circuitSvg'
import { StepThrough } from './StepThrough'

const TL = { x: 50, y: 30 }
const TR = { x: 270, y: 30 }
const P = { x: 50, y: 110 }
const Q = { x: 160, y: 110 }
const R = { x: 270, y: 110 }
const BL = { x: 50, y: 190 }
const M = { x: 160, y: 190 }
const BR = { x: 270, y: 190 }

function MeshCircuitDiagram() {
  return (
    <svg viewBox="0 0 320 220" className="w-full max-w-md mx-auto">
      <CircuitDefs />
      <Resistor x1={TL.x} y1={TL.y} x2={TR.x} y2={TR.y} label="10 Ω" />
      <Wire x1={TL.x} y1={TL.y} x2={P.x} y2={P.y} />
      <Wire x1={TR.x} y1={TR.y} x2={R.x} y2={R.y} />
      <Resistor x1={P.x} y1={P.y} x2={110} y2={110} label="2 Ω" />
      <Battery x1={110} y1={110} x2={Q.x} y2={Q.y} label="6 V" />
      <Wire x1={Q.x} y1={Q.y} x2={R.x} y2={R.y} />
      <Resistor x1={P.x} y1={P.y} x2={BL.x} y2={BL.y} label="4 Ω" />
      <Resistor x1={R.x} y1={R.y} x2={BR.x} y2={BR.y} label="5 Ω" />
      <Wire x1={BL.x} y1={BL.y} x2={M.x} y2={M.y} />
      <Wire x1={M.x} y1={M.y} x2={BR.x} y2={BR.y} />
      <Resistor x1={Q.x} y1={Q.y} x2={160} y2={150} label="1 Ω" />
      <Battery x1={160} y1={150} x2={M.x} y2={M.y} label="8 V" />

      {[TL, TR, P, Q, R, BL, M, BR].map((n, i) => (
        <Node key={i} x={n.x} y={n.y} />
      ))}

      <line x1="172" y1="140" x2="172" y2="122" stroke="#5f8fae" strokeWidth="1.75" markerEnd="url(#iArrow)" />
      <text x="182" y="134" className="fill-blue text-[11px] font-medium">
        i
      </text>
      <defs>
        <marker id="iArrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 Z" fill="#5f8fae" />
        </marker>
      </defs>

      <LoopArrow cx={160} cy={68} r={22} label="i₁" />
      <LoopArrow cx={100} cy={150} r={20} label="i₂" />
      <LoopArrow cx={220} cy={150} r={20} label="i₃" />
    </svg>
  )
}

export function MeshAnalysisSolver() {
  const [guess, setGuess] = useState('')
  const [checked, setChecked] = useState(false)
  const correctAnswer = 1.188
  const isCorrect = checked && Math.abs(Number(guess) - correctAnswer) <= 0.03

  const steps = [
    {
      title: 'Set up loop currents',
      content: (
        <div className="flex flex-col gap-3">
          <MeshCircuitDiagram />
          <p>
            Assume three clockwise mesh currents i₁, i₂, i₃. We want the branch current <em>i</em> flowing up through
            the 1 Ω resistor (shared between mesh 2 and mesh 3).
          </p>
        </div>
      ),
    },
    {
      title: 'Write the mesh equations',
      content: (
        <div className="flex flex-col gap-2">
          <p>
            Self-resistance of a loop = sum of all resistors in it. Mutual terms = resistance shared with the
            neighbouring loop (negative sign, opposite current direction). RHS = net source voltage around that loop.
          </p>
          <pre className="rounded-lg bg-cream px-3 py-2 text-xs leading-relaxed overflow-x-auto">
{`12 i₁ − 2 i₂ + 0 i₃ =  6      (loop 1: 10+2=12 self; shares 2Ω with loop2; nothing with loop3)
−2 i₁ + 7 i₂ − 1 i₃ = −8      (loop 2: 4+2+1=7 self; shares 2Ω with loop1, 1Ω with loop3)
 0 i₁ − 1 i₂ + 6 i₃ =  2      (loop 3: 5+1=6 self; shares 1Ω with loop2)`}
          </pre>
        </div>
      ),
    },
    {
      title: 'Solve the system',
      content: (
        <div className="flex flex-col gap-2">
          <p>Solving these three simultaneous equations (Cramer's rule, or elimination):</p>
          <pre className="rounded-lg bg-cream px-3 py-2 text-xs">{`i₁ = 0.329 A
i₂ = −1.026 A
i₃ = 0.162 A`}</pre>
          <p className="text-xs text-ink-faint">
            i₂ came out negative — its true direction is opposite to the assumed clockwise direction.
          </p>
        </div>
      ),
    },
    {
      title: 'Extract the branch current',
      content: (
        <div className="flex flex-col gap-3">
          <p>
            The 1 Ω resistor is shared by mesh 2 and mesh 3, with opposing assumed directions, so the actual upward
            branch current is:
          </p>
          <pre className="rounded-lg bg-cream px-3 py-2 text-xs">{`i = i₃ − i₂ = 0.162 − (−1.026) = 1.188 A`}</pre>

          <div className="rounded-xl border border-line bg-cream-soft p-4">
            <p className="text-sm font-medium mb-2">Before we said it — did you track it? Enter i (in A):</p>
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
              <span className="text-sm text-ink-faint">A</span>
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
                  {isCorrect ? 'Correct — 1.188 A' : `Answer: 1.188 A`}
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
