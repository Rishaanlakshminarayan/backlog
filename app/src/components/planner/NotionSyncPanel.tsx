import { useEffect, useState } from 'react'
import { usePlannerStore } from '../../state/plannerStore'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

export function NotionSyncPanel() {
  const { notionConfigured, checkNotionStatus, syncNotion } = usePlannerStore()
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState<'push' | 'pull' | null>(null)

  useEffect(() => {
    checkNotionStatus()
  }, [checkNotionStatus])

  async function handleSync(direction: 'push' | 'pull') {
    setBusy(direction)
    const result = await syncNotion(direction)
    setMessage({ ok: result.ok, text: result.message })
    setBusy(null)
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Notion sync</p>
        <span
          className={`text-[11px] rounded-full px-2 py-0.5 ${
            notionConfigured ? 'bg-sage-soft text-sage' : 'bg-terracotta-soft text-terracotta'
          }`}
        >
          {notionConfigured === null ? 'Checking…' : notionConfigured ? 'Connected' : 'Not configured'}
        </span>
      </div>

      {notionConfigured ? (
        <div className="flex items-center gap-2 mt-3">
          <Button variant="secondary" onClick={() => handleSync('push')} disabled={busy !== null}>
            {busy === 'push' ? 'Pushing…' : 'Push to Notion'}
          </Button>
          <Button variant="secondary" onClick={() => handleSync('pull')} disabled={busy !== null}>
            {busy === 'pull' ? 'Pulling…' : 'Pull from Notion'}
          </Button>
        </div>
      ) : (
        <div className="mt-3 text-sm text-ink-soft">
          <p>
            Not linked to Notion yet. Once you've authorized Notion (see <code className="text-xs bg-cream rounded px-1 py-0.5">claude mcp</code> or your
            claude.ai connector settings), add credentials to <code className="text-xs bg-cream rounded px-1 py-0.5">server/.env</code>:
          </p>
          <pre className="rounded-lg bg-cream px-3 py-2 text-xs mt-2 overflow-x-auto">{`NOTION_TOKEN=secret_...
NOTION_DATABASE_ID=...`}</pre>
          <p className="text-xs text-ink-faint mt-2">
            See <code className="bg-cream rounded px-1 py-0.5">server/.env.example</code> for the full setup steps, then restart the server and refresh this page.
          </p>
        </div>
      )}

      {message && (
        <p className={`text-xs mt-3 ${message.ok ? 'text-sage' : 'text-terracotta'}`}>{message.text}</p>
      )}
    </Card>
  )
}
