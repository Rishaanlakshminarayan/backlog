import { create } from 'zustand'

export interface AuthUser {
  id: string
  provider: 'google' | 'github'
  name: string
  email: string | null
  avatarUrl: string | null
}

interface AuthState {
  user: AuthUser | null
  status: 'loading' | 'ready'
  providers: { google: boolean; github: boolean } | null
  fetchMe: () => Promise<void>
  fetchProviders: () => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'loading',
  providers: null,

  fetchMe: async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' })
      const body = await res.json()
      set({ user: body.user, status: 'ready' })
    } catch {
      set({ user: null, status: 'ready' })
    }
  },

  fetchProviders: async () => {
    try {
      const res = await fetch('/api/auth/providers', { credentials: 'include' })
      set({ providers: await res.json() })
    } catch {
      set({ providers: { google: false, github: false } })
    }
  },

  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    set({ user: null })
  },
}))

export function signIn(provider: 'google' | 'github') {
  window.location.href = `/api/auth/${provider}`
}
