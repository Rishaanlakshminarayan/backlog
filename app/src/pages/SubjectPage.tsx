import { Link, Navigate, useParams } from 'react-router-dom'
import { findSubject } from '../content/curriculum'
import { useProgressStore } from '../state/progressStore'
import { Card } from '../components/ui/Card'
import { Tag } from '../components/ui/Tag'
import { ProgressRing } from '../components/ui/ProgressRing'
import { accentClasses } from '../lib/accent'

export function SubjectPage() {
  const { subjectId } = useParams()
  const found = subjectId ? findSubject(subjectId) : undefined
  const completedTopics = useProgressStore((s) => s.completedTopics)

  if (!found || !subjectId) return <Navigate to="/" replace />
  const { subject, semester } = found
  const c = accentClasses(subject.accent)

  const allTopics = subject.modules?.flatMap((m) => m.topics) ?? []
  const readyTopics = allTopics.filter((t) => t.status === 'ready')
  const doneCount = readyTopics.filter((t) => completedTopics[`${subjectId}:${t.id}`]).length
  const pct = readyTopics.length ? Math.round((doneCount / readyTopics.length) * 100) : 0

  return (
    <div className="max-w-5xl">
      <p className="text-xs text-ink-faint">{semester.label}</p>

      <div className="flex items-start justify-between gap-6 mt-2">
        <div>
          <div className="flex items-center gap-2">
            {subject.code && <Tag accent={subject.accent}>{subject.code}</Tag>}
            {subject.ltpc && <span className="text-xs text-ink-faint">L-T-P-C {subject.ltpc}</span>}
          </div>
          <h1 className="font-serif text-3xl font-semibold mt-2">{subject.title}</h1>
          <p className="text-ink-soft mt-1.5 max-w-2xl">{subject.tagline}</p>
        </div>
        {readyTopics.length > 0 && (
          <div className="flex items-center gap-3 shrink-0">
            <ProgressRing value={pct} colorClass={c.text} />
            <div className="text-sm">
              <p className="font-medium">{pct}% done</p>
              <p className="text-ink-faint text-xs">
                {doneCount}/{readyTopics.length} topics
              </p>
            </div>
          </div>
        )}
      </div>

      {subject.description && <p className="text-sm text-ink-soft mt-5 max-w-3xl">{subject.description}</p>}

      {subject.status === 'materials-only' && subject.materials && (
        <Card className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-3">Materials in your notes</p>
          <ul className="flex flex-col gap-1.5 text-sm text-ink-soft list-disc list-inside">
            {subject.materials.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </Card>
      )}

      {subject.status === 'planned' && (
        <Card className="mt-6 text-center py-10">
          <p className="text-3xl mb-2">🗓️</p>
          <p className="font-medium">Nothing here yet</p>
          <p className="text-sm text-ink-faint mt-1 max-w-md mx-auto">{subject.description}</p>
        </Card>
      )}

      {subject.outcomes && (
        <Card className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-3">Course outcomes</p>
          <ol className="flex flex-col gap-1.5 text-sm text-ink-soft list-decimal list-inside">
            {subject.outcomes.map((o, i) => (
              <li key={i}>{o}</li>
            ))}
          </ol>
        </Card>
      )}

      {subject.modules && subject.modules.length > 0 && (
        <div className="flex flex-col gap-4 mt-6">
          {subject.modules.map((mod, i) => (
            <Card key={mod.id}>
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-serif text-lg font-semibold">
                  Module {i + 1} · {mod.title}
                </p>
                {mod.hours && <span className="text-xs text-ink-faint shrink-0">{mod.hours} hrs</span>}
              </div>
              {mod.syllabus && <p className="text-sm text-ink-soft mt-2">{mod.syllabus}</p>}

              {mod.topics.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-2.5 mt-4">
                  {mod.topics.map((topic) => {
                    const done = completedTopics[`${subjectId}:${topic.id}`]
                    const isReady = topic.status === 'ready'
                    const body = (
                      <div
                        className={`rounded-xl border px-3.5 py-3 h-full transition-colors ${
                          isReady ? `border-line hover:${c.border} bg-cream-soft` : 'border-dashed border-line/70 bg-cream/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-sm font-medium ${isReady ? 'text-ink' : 'text-ink-faint'}`}>{topic.title}</p>
                          {isReady && done && <span className="text-sage text-xs shrink-0">✓</span>}
                          {!isReady && <span className="text-[10px] text-ink-faint shrink-0 uppercase">Soon</span>}
                        </div>
                        <p className="text-xs text-ink-faint mt-1">{topic.summary}</p>
                      </div>
                    )
                    return isReady ? (
                      <Link key={topic.id} to={`/subjects/${subjectId}/${topic.id}`}>
                        {body}
                      </Link>
                    ) : (
                      <div key={topic.id}>{body}</div>
                    )
                  })}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
