import { TaskBoard } from '../components/planner/TaskBoard'
import { NotionSyncPanel } from '../components/planner/NotionSyncPanel'

export function PlannerPage() {
  return (
    <div className="max-w-6xl">
      <p className="text-xs text-ink-faint uppercase tracking-wide">Planner</p>
      <h1 className="font-serif text-3xl font-semibold mt-1">Study planner</h1>
      <p className="text-ink-soft mt-1.5">Track what needs doing across every subject — synced to a local file, ready to link to Notion.</p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mt-6">
        <TaskBoard />
        <NotionSyncPanel />
      </div>
    </div>
  )
}
