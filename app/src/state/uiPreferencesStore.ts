import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemePreference = 'light' | 'dark' | 'system'
export type TextScale = 'sm' | 'base' | 'lg' | 'xl'

export const TEXT_SCALE_PERCENT: Record<TextScale, number> = {
  sm: 93.75,
  base: 100,
  lg: 112.5,
  xl: 125,
}

interface UiPreferencesState {
  theme: ThemePreference
  textScale: TextScale
  setTheme: (theme: ThemePreference) => void
  setTextScale: (textScale: TextScale) => void
}

export const useUiPreferencesStore = create<UiPreferencesState>()(
  persist(
    (set) => ({
      theme: 'system',
      textScale: 'base',
      setTheme: (theme) => set({ theme }),
      setTextScale: (textScale) => set({ textScale }),
    }),
    { name: 'vit-ui-prefs' },
  ),
)
