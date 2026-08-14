export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: T; label: string }[]
  active: T
  onChange: (id: T) => void
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-cream border border-line p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
            active === tab.id ? 'bg-ink text-cream-soft' : 'text-ink-soft hover:bg-line/50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
