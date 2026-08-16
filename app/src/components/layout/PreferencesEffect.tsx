import { useEffect } from 'react'
import { TEXT_SCALE_PERCENT, useUiPreferencesStore } from '../../state/uiPreferencesStore'

function resolveTheme(pref: string): 'light' | 'dark' {
  if (pref === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return pref === 'dark' ? 'dark' : 'light'
}

// Keeps <html data-theme> and root font-size in sync with stored preferences.
// The matching inline script in index.html applies the same logic before first
// paint, so this effect never causes a visible flash — it just keeps things
// live (e.g. reacting to OS theme changes while "system" is selected).
export function PreferencesEffect() {
  const theme = useUiPreferencesStore((s) => s.theme)
  const textScale = useUiPreferencesStore((s) => s.textScale)

  useEffect(() => {
    const apply = () => {
      document.documentElement.dataset.theme = resolveTheme(theme)
    }
    apply()
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.style.fontSize = `${TEXT_SCALE_PERCENT[textScale]}%`
  }, [textScale])

  return null
}
