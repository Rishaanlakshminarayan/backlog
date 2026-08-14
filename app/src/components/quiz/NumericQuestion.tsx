import type { NumericQuestionData } from '../../content/quizTypes'

export function NumericQuestion({
  index,
  question,
  value,
  submitted,
  onChange,
}: {
  index: number
  question: NumericQuestionData
  value: string | undefined
  submitted: boolean
  onChange: (v: string) => void
}) {
  const num = Number(value)
  const tol = question.tolerance ?? 0.01
  const correct = value !== undefined && !Number.isNaN(num) && Math.abs(num - question.answer) <= tol

  return (
    <div className="rounded-xl border border-line bg-cream-soft p-4">
      <p className="text-sm font-medium mb-3">
        <span className="text-ink-faint mr-1.5">Q{index}.</span>
        {question.prompt}
      </p>
      <div className="flex items-center gap-2">
        <input
          type="number"
          step="any"
          disabled={submitted}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your answer"
          className={`w-40 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 ${
            submitted ? (correct ? 'border-sage bg-sage-soft' : 'border-terracotta bg-terracotta-soft') : 'border-line focus:ring-purple/30'
          }`}
        />
        {question.unit && <span className="text-sm text-ink-faint">{question.unit}</span>}
        {submitted && (
          <span className={`text-xs font-medium ${correct ? 'text-sage' : 'text-terracotta'}`}>
            {correct ? 'Correct' : `Answer: ${question.answer}${question.unit ?? ''}`}
          </span>
        )}
      </div>
      {submitted && question.explanation && (
        <p className="mt-3 text-xs text-ink-soft bg-cream rounded-lg px-3 py-2">{question.explanation}</p>
      )}
    </div>
  )
}
