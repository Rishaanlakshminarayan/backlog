import { useUiPreferencesStore, type TextScale, type ThemePreference } from '../../state/uiPreferencesStore'

const THEME_OPTIONS: { value: ThemePreference; icon: string; label: string }[] = [
  { value: 'light', icon: '☀️', label: 'Light theme' },
  { value: 'dark', icon: '🌙', label: 'Dark theme' },
  { value: 'system', icon: '🖥️', label: 'Match system theme' },
]

const TEXT_OPTIONS: { value: TextScale; size: string; label: string }[] = [
  { value: 'sm', size: 'text-xs', label: 'Small text' },
  { value: 'base', size: 'text-sm', label: 'Default text size' },
  { value: 'lg', size: 'text-base', label: 'Large text' },
  { value: 'xl', size: 'text-lg', label: 'Extra large text' },
]

export function DisplaySettings() {
  const theme = useUiPreferencesStore((s) => s.theme)
  const setTheme = useUiPreferencesStore((s) => s.setTheme)
  const textScale = useUiPreferencesStore((s) => s.textScale)
  const setTextScale = useUiPreferencesStore((s) => s.setTextScale)

  return (
    <div className="border-t border-line px-3 py-3 flex flex-col gap-2.5">
      <div>
        <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Theme</p>
        <div className="flex items-center gap-1 px-1" role="group" aria-label="Theme">
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              aria-label={opt.label}
              aria-pressed={theme === opt.value}
              title={opt.label}
              onClick={() => setTheme(opt.value)}
              className={`flex-1 rounded-lg py-1.5 text-sm transition-colors ${
                theme === opt.value ? 'bg-ink text-cream-soft' : 'text-ink-soft hover:bg-line/40'
              }`}
            >
              {opt.icon}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">Text size</p>
        <div className="flex items-center gap-1 px-1" role="group" aria-label="Text size">
          {TEXT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              aria-label={opt.label}
              aria-pressed={textScale === opt.value}
              title={opt.label}
              onClick={() => setTextScale(opt.value)}
              className={`flex-1 rounded-lg py-1.5 font-medium transition-colors ${opt.size} ${
                textScale === opt.value ? 'bg-ink text-cream-soft' : 'text-ink-soft hover:bg-line/40'
              }`}
            >
              A
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
