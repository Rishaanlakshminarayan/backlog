import { Button } from '../ui/Button'

export function ResultSummary({ score, total, onRetry }: { score: number; total: number; onRetry: () => void }) {
  const pct = Math.round((score / total) * 100)
  const message = pct === 100 ? 'Perfect score! 🎉' : pct >= 70 ? 'Nice work — solid grasp.' : 'Worth another pass before your CAT.'

  return (
    <div className="rounded-xl border border-line bg-cream-soft p-5 flex items-center justify-between">
      <div>
        <p className="font-serif text-lg font-semibold">
          {score}/{total} correct ({pct}%)
        </p>
        <p className="text-sm text-ink-soft">{message}</p>
      </div>
      <Button variant="secondary" onClick={onRetry}>
        Retry quiz
      </Button>
    </div>
  )
}
