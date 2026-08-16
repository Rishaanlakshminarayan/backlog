import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { curriculum, findSubject } from '../../content/curriculum'
import { accentClasses } from '../../lib/accent'
import { DisplaySettings } from './DisplaySettings'

const CURRENT_SEMESTER = 1

export function Sidebar() {
  const { subjectId } = useParams()
  const [expanded, setExpanded] = useState<Set<number>>(new Set([CURRENT_SEMESTER]))

  useEffect(() => {
    if (!subjectId) return
    const found = findSubject(subjectId)
    if (found) {
      setExpanded((prev) => new Set(prev).add(found.semester.id))
    }
  }, [subjectId])

  function toggle(semId: number) {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(semId) ? next.delete(semId) : next.add(semId)
      return next
    })
  }

  return (
    <aside className="w-72 shrink-0 border-r border-line bg-cream-soft h-screen sticky top-0 flex flex-col">
      <div className="px-5 pt-6 pb-4 border-b border-line">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-soft text-purple text-lg">
            📚
          </span>
          <div>
            <h1 className="font-serif text-lg font-semibold leading-tight">Learning Studio</h1>
            <p className="text-xs text-ink-faint">VIT Vellore · CSE</p>
          </div>
        </div>
      </div>

      <nav className="px-3 py-3 border-b border-line flex flex-col gap-1">
        <SidebarLink to="/" label="Dashboard" icon="🏠" end />
        <SidebarLink to="/planner" label="Planner" icon="🗓️" />
      </nav>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-faint">Curriculum</p>
        <div className="flex flex-col gap-1">
          {curriculum.map((sem) => {
            const isOpen = expanded.has(sem.id)
            const isCurrent = sem.id === CURRENT_SEMESTER
            return (
              <div key={sem.id}>
                <button
                  onClick={() => toggle(sem.id)}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-line/40 text-sm font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    {sem.label}
                    {isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-sage" title="Current semester" />}
                  </span>
                  <span className={`text-ink-faint transition-transform ${isOpen ? 'rotate-90' : ''}`}>›</span>
                </button>
                {isOpen && (
                  <div className="ml-2 mt-0.5 flex flex-col gap-0.5 border-l border-line pl-3">
                    {sem.subjects.map((subject) => {
                      const c = accentClasses(subject.accent)
                      return (
                        <NavLink
                          key={subject.id}
                          to={`/subjects/${subject.id}`}
                          className={({ isActive }) =>
                            `flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                              isActive ? `${c.bgSoft} ${c.text} font-medium` : 'text-ink-soft hover:bg-line/40'
                            }`
                          }
                        >
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${c.dot}`} />
                          <span className="truncate">{subject.title}</span>
                        </NavLink>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <DisplaySettings />
    </aside>
  )
}

function SidebarLink({ to, label, icon, end }: { to: string; label: string; icon: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
          isActive ? 'bg-ink text-cream-soft' : 'text-ink-soft hover:bg-line/40'
        }`
      }
    >
      <span>{icon}</span>
      {label}
    </NavLink>
  )
}
