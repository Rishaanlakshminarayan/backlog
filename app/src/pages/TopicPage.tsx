import { Link, Navigate, useParams } from 'react-router-dom'
import { findTopic } from '../content/curriculum'
import { findTopicContent } from '../content/topicRegistry'
import { quizRegistry } from '../content/quizRegistry'
import { useProgressStore } from '../state/progressStore'
import { Card } from '../components/ui/Card'
import { Tag } from '../components/ui/Tag'
import { Button } from '../components/ui/Button'
import { TipBox } from '../components/ui/TipBox'
import { QuizRunner } from '../components/quiz/QuizRunner'
import { accentClasses } from '../lib/accent'

export function TopicPage() {
  const { subjectId, topicId } = useParams()
  const found = subjectId && topicId ? findTopic(subjectId, topicId) : undefined
  const content = subjectId && topicId ? findTopicContent(subjectId, topicId) : undefined

  const isComplete = useProgressStore((s) => (subjectId && topicId ? s.isTopicComplete(subjectId, topicId) : false))
  const markComplete = useProgressStore((s) => s.markTopicComplete)
  const note = useProgressStore((s) => (subjectId && topicId ? s.getNote(subjectId, topicId) : ''))
  const setNote = useProgressStore((s) => s.setNote)

  if (!found || !subjectId || !topicId) return <Navigate to="/" replace />

  const { topic, subject, semester } = found
  const c = accentClasses(subject.accent)

  if (topic.status === 'coming-soon' || !content) {
    return (
      <div className="max-w-3xl">
        <Breadcrumb semester={semester.label} subject={subject} topicTitle={topic.title} />
        <h1 className="font-serif text-3xl font-semibold mt-3">{topic.title}</h1>
        <p className="text-ink-soft mt-2">{topic.summary}</p>
        <Card className="mt-6 text-center py-10">
          <p className="text-3xl mb-2">🚧</p>
          <p className="font-medium">Interactive tutorial coming soon</p>
          <p className="text-sm text-ink-faint mt-1">This topic will be built out once its source material gets a deep dive.</p>
        </Card>
      </div>
    )
  }

  const quiz = topic.quiz ? quizRegistry[topic.quiz.quizId] : undefined

  return (
    <div className="max-w-6xl">
      <Breadcrumb semester={semester.label} subject={subject} topicTitle={topic.title} />

      <div className="flex items-start justify-between gap-4 mt-3">
        <div>
          <div className="flex items-center gap-2">
            <Tag accent={subject.accent}>{subject.code ?? subject.title}</Tag>
            {topic.estMinutes && <span className="text-xs text-ink-faint">~{topic.estMinutes} min</span>}
          </div>
          <h1 className="font-serif text-3xl font-semibold mt-2">{topic.title}</h1>
          <p className="text-ink-soft mt-1.5 max-w-2xl">{topic.summary}</p>
        </div>
        <Button
          variant={isComplete ? 'secondary' : 'primary'}
          onClick={() => markComplete(subjectId, topicId, !isComplete)}
          className="shrink-0"
        >
          {isComplete ? '✓ Completed' : 'Mark complete'}
        </Button>
      </div>

      {content.tip && (
        <div className="mt-5">
          <TipBox>{content.tip}</TipBox>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6">
        <div className="flex flex-col gap-6">
          <Card>
            <div className="flex flex-col gap-3 text-[15px] leading-relaxed text-ink-soft [&_strong]:text-ink [&_strong]:font-semibold [&_em]:text-ink">
              {content.intro}
            </div>
          </Card>

          <Card>
            <p className={`text-xs font-semibold uppercase tracking-wide mb-4 ${c.text}`}>
              {content.widgetTitle ?? 'Interactive'}
            </p>
            <content.Widget />
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          {content.formulas && (
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-3">Key formulas</p>
              <div className="flex flex-col gap-2.5">
                {content.formulas.map((f) => (
                  <div key={f.label}>
                    <p className="text-[11px] text-ink-faint">{f.label}</p>
                    <p className="font-mono text-sm bg-cream rounded-lg px-2.5 py-1.5 mt-0.5">{f.expr}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-3">Your notes</p>
            <textarea
              value={note}
              onChange={(e) => setNote(subjectId, topicId, e.target.value)}
              placeholder="Jot down anything worth remembering before your CAT…"
              rows={6}
              className="w-full resize-none rounded-lg border border-line bg-cream-soft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple/30"
            />
            <p className="text-[11px] text-ink-faint mt-1.5">Saved automatically on this device.</p>
          </Card>
        </div>
      </div>

      {quiz && (
        <div className="mt-6">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-4">Practice quiz</p>
            <QuizRunner quiz={quiz} />
          </Card>
        </div>
      )}
    </div>
  )
}

function Breadcrumb({ semester, subject, topicTitle }: { semester: string; subject: { id: string; title: string }; topicTitle: string }) {
  return (
    <p className="text-xs text-ink-faint flex items-center gap-1.5 flex-wrap">
      <span>{semester}</span>
      <span>/</span>
      <Link to={`/subjects/${subject.id}`} className="hover:text-ink-soft">
        {subject.title}
      </Link>
      <span>/</span>
      <span className="text-ink-soft">{topicTitle}</span>
    </p>
  )
}
