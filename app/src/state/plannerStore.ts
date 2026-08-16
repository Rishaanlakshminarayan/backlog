import { create } from 'zustand'

export interface PlannerTask {
  id: string
  title: string
  subjectId: string | null
  dueDate: string | null
  priority: 'low' | 'medium' | 'high'
  status: 'todo' | 'doing' | 'done'
  createdAt: string
  notionPageId?: string
}

interface PlannerState {
  tasks: PlannerTask[]
  loading: boolean
  error: string | null
  notionConfigured: boolean | null
  fetchTasks: () => Promise<void>
  addTask: (input: { title: string; subjectId?: string | null; dueDate?: string | null; priority?: PlannerTask['priority'] }) => Promise<void>
  updateTask: (id: string, patch: Partial<PlannerTask>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  checkNotionStatus: () => Promise<void>
  syncNotion: (direction: 'push' | 'pull') => Promise<{ ok: boolean; message: string }>
}

async function json<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `Request failed (${res.status})`)
  }
  return res.status === 204 ? (undefined as T) : res.json()
}

export const usePlannerStore = create<PlannerState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  notionConfigured: null,

  fetchTasks: async () => {
    set({ loading: true, error: null })
    try {
      const tasks = await json<PlannerTask[]>(await fetch('/api/planner/tasks', { credentials: 'include' }))
      set({ tasks, loading: false })
    } catch (err) {
      set({ loading: false, error: (err as Error).message })
    }
  },

  addTask: async (input) => {
    const task = await json<PlannerTask>(
      await fetch('/api/planner/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      }),
    )
    set({ tasks: [...get().tasks, task] })
  },

  updateTask: async (id, patch) => {
    const updated = await json<PlannerTask>(
      await fetch(`/api/planner/tasks/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      }),
    )
    set({ tasks: get().tasks.map((t) => (t.id === id ? updated : t)) })
  },

  deleteTask: async (id) => {
    await fetch(`/api/planner/tasks/${id}`, { method: 'DELETE', credentials: 'include' })
    set({ tasks: get().tasks.filter((t) => t.id !== id) })
  },

  checkNotionStatus: async () => {
    try {
      const { configured } = await json<{ configured: boolean }>(await fetch('/api/notion/status'))
      set({ notionConfigured: configured })
    } catch {
      set({ notionConfigured: false })
    }
  },

  syncNotion: async (direction) => {
    try {
      const res = await fetch(`/api/notion/${direction}`, { method: 'POST' })
      const body = await res.json()
      if (!res.ok) return { ok: false, message: body.error ?? 'Sync failed' }
      await get().fetchTasks()
      return { ok: true, message: direction === 'push' ? `Synced ${body.synced} task(s) to Notion.` : `Pulled ${body.pulled} page(s) from Notion.` }
    } catch (err) {
      return { ok: false, message: (err as Error).message }
    }
  },
}))
