import { useEffect, useState } from 'react'
import { usePlannerStore, type PlannerTask } from '../../state/plannerStore'
import { curriculum } from '../../content/curriculum'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { TaskItem } from './TaskItem'

const COLUMNS: { status: PlannerTask['status']; label: string }[] = [
  { status: 'todo', label: 'To do' },
  { status: 'doing', label: 'Doing' },
  { status: 'done', label: 'Done' },
]

const subjectOptions = curriculum.flatMap((s) => s.subjects.map((sub) => ({ id: sub.id, title: sub.title })))

export function TaskBoard() {
  const { tasks, loading, error, fetchTasks, addTask } = usePlannerStore()
  const [title, setTitle] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [priority, setPriority] = useState<PlannerTask['priority']>('medium')
  const [dueDate, setDueDate] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    await addTask({ title: title.trim(), subjectId: subjectId || null, priority, dueDate: dueDate || null })
    setTitle('')
    setDueDate('')
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-ink-faint">Task</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Finish Mesh Analysis quiz"
              className="w-full rounded-lg border border-line bg-cream-soft px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-purple/30 mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-ink-faint">Subject</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="rounded-lg border border-line bg-cream-soft px-2.5 py-2 text-sm outline-none mt-1"
            >
              <option value="">None</option>
              {subjectOptions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-ink-faint">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as PlannerTask['priority'])}
              className="rounded-lg border border-line bg-cream-soft px-2.5 py-2 text-sm outline-none mt-1"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-ink-faint">Due</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded-lg border border-line bg-cream-soft px-2.5 py-2 text-sm outline-none mt-1"
            />
          </div>
          <Button type="submit">Add task</Button>
        </form>
      </Card>

      {error && <p className="text-sm text-terracotta">{error}</p>}
      {loading && tasks.length === 0 && <p className="text-sm text-ink-faint">Loading tasks…</p>}

      <div className="grid md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => (
          <div key={col.status}>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint mb-3">
              {col.label} · {tasks.filter((t) => t.status === col.status).length}
            </p>
            <div className="flex flex-col gap-2">
              {tasks
                .filter((t) => t.status === col.status)
                .map((t) => (
                  <TaskItem key={t.id} task={t} />
                ))}
              {tasks.filter((t) => t.status === col.status).length === 0 && (
                <p className="text-xs text-ink-faint italic px-1">Nothing here</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
