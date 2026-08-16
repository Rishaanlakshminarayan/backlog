import { useEffect } from 'react'
import { signIn, useAuthStore } from '../../state/authStore'

const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname)

export function AccountPanel() {
  const { user, status, providers, fetchMe, fetchProviders, logout } = useAuthStore()

  useEffect(() => {
    fetchMe()
    fetchProviders()
  }, [fetchMe, fetchProviders])

  if (!isLocalHost) {
    return (
      <div className="border-t border-line px-3 py-3">
        <p className="text-[11px] text-ink-faint px-2 leading-relaxed">
          Sign-in syncs progress across devices, but only works when you run this app locally (needs its API server) —
          not on this public GitHub Pages build.
        </p>
      </div>
    )
  }

  if (status === 'loading') {
    return <div className="border-t border-line px-3 py-3 h-[52px]" />
  }

  if (user) {
    return (
      <div className="border-t border-line px-3 py-3 flex items-center gap-2.5">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt="" className="h-8 w-8 rounded-full shrink-0" referrerPolicy="no-referrer" />
        ) : (
          <span className="h-8 w-8 rounded-full bg-purple-soft text-purple flex items-center justify-center text-sm font-semibold shrink-0">
            {user.name?.[0]?.toUpperCase() ?? '?'}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-[11px] text-sage">Synced</p>
        </div>
        <button onClick={() => logout()} className="text-xs text-ink-faint hover:text-terracotta shrink-0">
          Sign out
        </button>
      </div>
    )
  }

  const noProvidersConfigured = providers && !providers.google && !providers.github

  return (
    <div className="border-t border-line px-3 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint px-2 mb-2">Sync your progress</p>
      {noProvidersConfigured ? (
        <p className="text-[11px] text-ink-faint px-2 leading-relaxed">
          Not set up yet — add Google or GitHub OAuth credentials to <code className="bg-cream rounded px-1 py-0.5">server/.env</code> (see{' '}
          <code className="bg-cream rounded px-1 py-0.5">server/.env.example</code>) to enable sign-in.
        </p>
      ) : (
        <div className="flex flex-col gap-1.5 px-1">
          {providers?.google && (
            <button
              onClick={() => signIn('google')}
              className="flex items-center justify-center gap-2 rounded-lg border border-line bg-paper py-1.5 text-sm font-medium hover:bg-cream-soft transition-colors"
            >
              <span aria-hidden>🔵</span> Sign in with Google
            </button>
          )}
          {providers?.github && (
            <button
              onClick={() => signIn('github')}
              className="flex items-center justify-center gap-2 rounded-lg border border-line bg-paper py-1.5 text-sm font-medium hover:bg-cream-soft transition-colors"
            >
              <span aria-hidden>⬛</span> Sign in with GitHub
            </button>
          )}
        </div>
      )}
    </div>
  )
}
