import { useState } from 'react'
import { Button } from '../components/ui/Button'

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateProblem() {
  const i1 = randInt(3, 9)
  const i2 = randInt(2, 8)
  const i3 = randInt(1, 7)
  const ix = i1 + i2 - i3 // KCL: sum entering = sum leaving -> ix = i1 + i2 - i3
  return { i1, i2, i3, ix }
}

export function KclKvlPractice() {
  const [problem, setProblem] = useState(generateProblem)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)

  const isCorrect = checked && Math.abs(Number(answer) - problem.ix) <= 0.05

  function newProblem() {
    setProblem(generateProblem())
    setAnswer('')
    setChecked(false)
  }

  return (
    <div className="flex flex-col gap-5">
      <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto">
        <circle cx="150" cy="100" r="7" fill="var(--color-ink)" />
        <text x="150" y="130" textAnchor="middle" className="fill-ink-faint text-[10px]">
          node
        </text>

        {/* I1 entering from top-left */}
        <line x1="40" y1="30" x2="140" y2="92" stroke="#5f8fae" strokeWidth="2.5" markerEnd="url(#arrowIn)" />
        <text x="30" y="22" className="fill-blue text-[12px] font-medium">
          I₁ = {problem.i1} A
        </text>

        {/* I2 entering from top-right */}
        <line x1="260" y1="30" x2="160" y2="92" stroke="#5f8fae" strokeWidth="2.5" markerEnd="url(#arrowIn)" />
        <text x="215" y="22" className="fill-blue text-[12px] font-medium">
          I₂ = {problem.i2} A
        </text>

        {/* I3 leaving bottom-left */}
        <line x1="150" y1="105" x2="55" y2="175" stroke="#d97b4f" strokeWidth="2.5" markerEnd="url(#arrowOut)" />
        <text x="20" y="192" className="fill-terracotta text-[12px] font-medium">
          I₃ = {problem.i3} A
        </text>

        {/* Ix leaving bottom-right (unknown) */}
        <line x1="155" y1="105" x2="245" y2="175" stroke="#8b7cc8" strokeWidth="2.5" markerEnd="url(#arrowOutPurple)" />
        <text x="220" y="192" className="fill-purple text-[12px] font-medium">
          Iₓ = ?
        </text>

        <defs>
          <marker id="arrowIn" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#5f8fae" />
          </marker>
          <marker id="arrowOut" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#d97b4f" />
          </marker>
          <marker id="arrowOutPurple" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#8b7cc8" />
          </marker>
        </defs>
      </svg>

      <p className="text-sm text-ink-soft text-center">
        Apply KCL at the node: currents entering = currents leaving. Find I<sub>x</sub>.
      </p>

      <div className="flex items-center justify-center gap-2">
        <input
          type="number"
          value={answer}
          disabled={checked}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Iₓ ="
          className={`w-28 rounded-lg border px-3 py-2 text-sm text-center outline-none focus:ring-2 focus:ring-purple/30 ${
            checked ? (isCorrect ? 'border-sage bg-sage-soft' : 'border-terracotta bg-terracotta-soft') : 'border-line'
          }`}
        />
        <span className="text-sm text-ink-faint">A</span>
        {!checked ? (
          <Button onClick={() => setChecked(true)} disabled={answer === ''}>
            Check
          </Button>
        ) : (
          <Button variant="secondary" onClick={newProblem}>
            New problem
          </Button>
        )}
      </div>

      {checked && (
        <p className={`text-center text-sm font-medium ${isCorrect ? 'text-sage' : 'text-terracotta'}`}>
          {isCorrect ? 'Correct!' : `Not quite — Iₓ = I₁ + I₂ − I₃ = ${problem.i1} + ${problem.i2} − ${problem.i3} = ${problem.ix} A`}
          {problem.ix < 0 && isCorrect && ' (negative — current actually flows into the node here, opposite to the drawn arrow.)'}
        </p>
      )}
    </div>
  )
}
