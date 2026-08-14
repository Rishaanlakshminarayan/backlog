import { Link } from 'react-router-dom'
import { curriculum } from '../content/curriculum'
import { useProgressStore } from '../state/progressStore'
import { Card } from '../components/ui/Card'
import { Tag } from '../components/ui/Tag'
import { accentClasses } from '../lib/accent'

const CURRENT_SEMESTER = 1

export function Home() {
  const completedTopics = useProgressStore((s) => s.completedTopics)
  const quizAttempts = useProgressStore((s) => s.quizAttempts)

  const totalReadyTopics = curriculum
    .flatMap((s) => s.subjects)
    .flatMap((sub) => sub.modules?.flatMap((m) => m.topics) ?? [])
    .filter((t) => t.status === 'ready').length

  const doneCount = Object.values(completedTopics).filter(Boolean).length
  const quizzesTaken = Object.keys(quizAttempts).length
  const avgScore = quizzesTaken
    ? Math.round(
        (Object.values(quizAttempts).reduce((sum, a) => sum + a.bestScore / a.total, 0) / quizzesTaken) * 100,
      )
    : null

  const currentSem = curriculum.find((s) => s.id === CURRENT_SEMESTER)!

  return (
    <div className="max-w-6xl">
      <p className="text-xs text-ink-faint uppercase tracking-wide">Dashboard</p>
      <h1 className="font-serif text-3xl font-semibold mt-1">Welcome back 👋</h1>
      <p className="text-ink-soft mt-1.5">Here's where your VIT CSE journey stands.</p>

      <div className="grid grid-cols-3 gap-4 mt-6 max-w-xl">
        <StatCard label="Topics completed" value={`${doneCount}/${totalReadyTopics}`} />
        <StatCard label="Quizzes taken" value={String(quizzesTaken)} />
        <StatCard label="Avg. quiz score" value={avgScore !== null ? `${avgScore}%` : '—'} />
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="font-serif text-xl font-semibold">{currentSem.label} — right now</h2>
          <span className="h-1.5 w-1.5 rounded-full bg-sage" />
        </div>
        {currentSem.note && <p className="text-sm text-ink-faint mb-4 max-w-2xl">{currentSem.note}</p>}
        <div className="grid sm:grid-cols-2 gap-4">
          {currentSem.subjects.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-xl font-semibold mb-4">All semesters</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {curriculum.map((sem) => (
            <Card key={sem.id} className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <p className="font-serif font-semibold">{sem.label}</p>
                {sem.id === CURRENT_SEMESTER && <Tag accent="sage">Current</Tag>}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sem.subjects.map((sub) => {
                  const c = accentClasses(sub.accent)
                  return (
                    <Link
                      key={sub.id}
                      to={`/subjects/${sub.id}`}
                      className={`text-xs rounded-full px-2 py-1 ${c.bgSoft} ${c.text} hover:opacity-80`}
                    >
                      {sub.title}
                    </Link>
                  )
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card padded className="text-center">
      <p className="font-serif text-2xl font-semibold">{value}</p>
      <p className="text-xs text-ink-faint mt-1">{label}</p>
    </Card>
  )
}

function SubjectCard({ subject }: { subject: (typeof curriculum)[number]['subjects'][number] }) {
  const c = accentClasses(subject.accent)
  const statusLabel =
    subject.status === 'ready' ? 'Interactive' : subject.status === 'materials-only' ? 'Materials only' : 'Planned'
  return (
    <Link to={`/subjects/${subject.id}`}>
      <Card className="h-full hover:shadow-[var(--shadow-card-hover)] transition-shadow">
        <div className="flex items-center justify-between gap-2">
          <p className="font-serif text-lg font-semibold">{subject.title}</p>
          <span className={`h-2 w-2 rounded-full shrink-0 ${c.dot}`} />
        </div>
        <p className="text-sm text-ink-soft mt-1.5">{subject.tagline}</p>
        <div className="mt-3">
          <Tag accent={subject.accent}>{statusLabel}</Tag>
        </div>
      </Card>
    </Link>
  )
}
