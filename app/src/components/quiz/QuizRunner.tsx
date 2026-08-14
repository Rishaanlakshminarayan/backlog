import { useState } from 'react'
import type { Quiz } from '../../content/quizTypes'
import { useProgressStore } from '../../state/progressStore'
import { Button } from '../ui/Button'
import { McqQuestion } from './McqQuestion'
import { NumericQuestion } from './NumericQuestion'
import { ResultSummary } from './ResultSummary'

export function QuizRunner({ quiz }: { quiz: Quiz }) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [submitted, setSubmitted] = useState(false)
  const recordQuizAttempt = useProgressStore((s) => s.recordQuizAttempt)
  const best = useProgressStore((s) => s.quizAttempts[quiz.id])

  function setAnswer(id: string, value: string | number) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [id]: value }))
  }

  function isCorrect(q: Quiz['questions'][number]): boolean {
    const a = answers[q.id]
    if (a === undefined) return false
    if (q.type === 'mcq') return Number(a) === q.correctIndex
    const num = Number(a)
    const tol = q.tolerance ?? 0.01
    return !Number.isNaN(num) && Math.abs(num - q.answer) <= tol
  }

  const score = quiz.questions.filter(isCorrect).length

  function handleSubmit() {
    setSubmitted(true)
    recordQuizAttempt(quiz.id, score, quiz.questions.length)
  }

  function handleRetry() {
    setAnswers({})
    setSubmitted(false)
  }

  const allAnswered = quiz.questions.every((q) => answers[q.id] !== undefined && answers[q.id] !== '')

  return (
    <div className="flex flex-col gap-5">
      {best && !submitted && (
        <p className="text-xs text-ink-faint">
          Best score so far: {best.bestScore}/{best.total} · {best.attempts} attempt{best.attempts !== 1 ? 's' : ''}
        </p>
      )}

      {quiz.questions.map((q, i) =>
        q.type === 'mcq' ? (
          <McqQuestion
            key={q.id}
            index={i + 1}
            question={q}
            selected={answers[q.id] as number | undefined}
            submitted={submitted}
            onSelect={(idx) => setAnswer(q.id, idx)}
          />
        ) : (
          <NumericQuestion
            key={q.id}
            index={i + 1}
            question={q}
            value={answers[q.id] as string | undefined}
            submitted={submitted}
            onChange={(v) => setAnswer(q.id, v)}
          />
        ),
      )}

      {!submitted ? (
        <Button onClick={handleSubmit} disabled={!allAnswered} className="self-start">
          Submit quiz
        </Button>
      ) : (
        <ResultSummary score={score} total={quiz.questions.length} onRetry={handleRetry} />
      )}
    </div>
  )
}
