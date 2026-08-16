import { useEffect, useRef } from 'react'
import { useAuthStore } from '../../state/authStore'
import { useProgressStore } from '../../state/progressStore'

interface ServerProgress {
  completedTopics: Record<string, boolean>
  quizAttempts: Record<string, unknown>
  notes: Record<string, string>
}

function isEmpty(p: ServerProgress) {
  return Object.keys(p.completedTopics).length === 0 && Object.keys(p.quizAttempts).length === 0 && Object.keys(p.notes).length === 0
}

// While signed in, keeps the local progress store (completed topics, quiz
// scores, notes) mirrored to the server so it follows you across devices.
// Signed out, this is a no-op — everything stays purely local, same as before.
export function ProgressSyncEffect() {
  const userId = useAuthStore((s) => s.user?.id ?? null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!userId) return

    let cancelled = false

    async function hydrate() {
      const res = await fetch('/api/progress', { credentials: 'include' })
      if (!res.ok || cancelled) return
      const server: ServerProgress = await res.json()

      if (isEmpty(server)) {
        // first sync on this account — seed the server from whatever's local
        const local = useProgressStore.getState()
        await fetch('/api/progress', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completedTopics: local.completedTopics, quizAttempts: local.quizAttempts, notes: local.notes }),
        })
      } else {
        useProgressStore.setState({
          completedTopics: server.completedTopics,
          quizAttempts: server.quizAttempts as never,
          notes: server.notes,
        })
      }
    }
    hydrate()

    const unsubscribe = useProgressStore.subscribe((state) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        fetch('/api/progress', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completedTopics: state.completedTopics, quizAttempts: state.quizAttempts, notes: state.notes }),
        })
      }, 800)
    })

    return () => {
      cancelled = true
      unsubscribe()
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [userId])

  return null
}
