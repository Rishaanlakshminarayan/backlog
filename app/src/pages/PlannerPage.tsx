import { TaskBoard } from '../components/planner/TaskBoard'
import { NotionSyncPanel } from '../components/planner/NotionSyncPanel'
import { Card } from '../components/ui/Card'

const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname)

export function PlannerPage() {
  return (
    <div className="max-w-6xl">
      <p className="text-xs text-ink-faint uppercase tracking-wide">Planner</p>
      <h1 className="font-serif text-3xl font-semibold mt-1">Study planner</h1>
      <p className="text-ink-soft mt-1.5">Track what needs doing across every subject — synced to a local file, ready to link to Notion.</p>

      {!isLocalHost && (
        <Card className="mt-5 bg-gold-soft border-gold/25">
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-gold">This is the public GitHub Pages build:</span> the planner needs its
            small API server, which only runs on your own machine — so tasks below won't load or save here. Clone the
            repo and run <code className="text-xs bg-cream rounded px-1 py-0.5">npm start</code> in <code className="text-xs bg-cream rounded px-1 py-0.5">server/</code> (see the README) to use it for real.
          </p>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 mt-6">
        <TaskBoard />
        <NotionSyncPanel />
      </div>
    </div>
  )
}
