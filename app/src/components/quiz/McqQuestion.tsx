import type { McqQuestionData } from '../../content/quizTypes'

export function McqQuestion({
  index,
  question,
  selected,
  submitted,
  onSelect,
}: {
  index: number
  question: McqQuestionData
  selected: number | undefined
  submitted: boolean
  onSelect: (idx: number) => void
}) {
  return (
    <div className="rounded-xl border border-line bg-cream-soft p-4">
      <p className="text-sm font-medium mb-3">
        <span className="text-ink-faint mr-1.5">Q{index}.</span>
        {question.prompt}
      </p>
      <div className="flex flex-col gap-2">
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx
          const isCorrectOpt = idx === question.correctIndex
          let stateClasses = 'border-line hover:bg-line/30'
          if (submitted) {
            if (isCorrectOpt) stateClasses = 'border-sage bg-sage-soft'
            else if (isSelected && !isCorrectOpt) stateClasses = 'border-terracotta bg-terracotta-soft'
          } else if (isSelected) {
            stateClasses = 'border-purple bg-purple-soft'
          }
          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => onSelect(idx)}
              className={`text-left rounded-lg border px-3 py-2 text-sm transition-colors ${stateClasses} disabled:cursor-default`}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {submitted && question.explanation && (
        <p className="mt-3 text-xs text-ink-soft bg-cream rounded-lg px-3 py-2">{question.explanation}</p>
      )}
    </div>
  )
}
