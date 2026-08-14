import type { PlannerTask } from '../../state/plannerStore'
import { usePlannerStore } from '../../state/plannerStore'
import { findSubject } from '../../content/curriculum'
import { accentClasses } from '../../lib/accent'

const PRIORITY_COLOR: Record<PlannerTask['priority'], string> = {
  low: 'text-ink-faint',
  medium: 'text-gold',
  high: 'text-terracotta',
}

export function TaskItem({ task }: { task: PlannerTask }) {
  const updateTask = usePlannerStore((s) => s.updateTask)
  const deleteTask = usePlannerStore((s) => s.deleteTask)
  const subject = task.subjectId ? findSubject(task.subjectId)?.subject : undefined
  const done = task.status === 'done'

  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-cream-soft px-3.5 py-2.5">
      <button
        onClick={() => updateTask(task.id, { status: done ? 'todo' : 'done' })}
        className={`h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center text-[10px] transition-colors ${
          done ? 'bg-sage border-sage text-cream-soft' : 'border-line'
        }`}
      >
        {done && '✓'}
      </button>
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${done ? 'line-through text-ink-faint' : 'text-ink'}`}>{task.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {subject && (
            <span className={`text-[11px] rounded-full px-2 py-0.5 ${accentClasses(subject.accent).bgSoft} ${accentClasses(subject.accent).text}`}>
              {subject.title}
            </span>
          )}
          {task.dueDate && <span className="text-[11px] text-ink-faint">Due {new Date(task.dueDate).toLocaleDateString()}</span>}
          <span className={`text-[11px] font-medium ${PRIORITY_COLOR[task.priority]}`}>{task.priority}</span>
        </div>
      </div>
      <button onClick={() => deleteTask(task.id)} className="text-ink-faint hover:text-terracotta text-sm px-1">
        ✕
      </button>
    </div>
  )
}
