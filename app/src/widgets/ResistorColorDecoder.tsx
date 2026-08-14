import { useMemo, useState } from 'react'

const DIGIT_COLORS = [
  { name: 'Black', hex: '#2b2825', digit: 0 },
  { name: 'Brown', hex: '#7b4a2d', digit: 1 },
  { name: 'Red', hex: '#c0392b', digit: 2 },
  { name: 'Orange', hex: '#e07b28', digit: 3 },
  { name: 'Yellow', hex: '#e8c11d', digit: 4 },
  { name: 'Green', hex: '#3f8f4f', digit: 5 },
  { name: 'Blue', hex: '#2f5fa8', digit: 6 },
  { name: 'Violet', hex: '#7c4fa8', digit: 7 },
  { name: 'Grey', hex: '#8a8a86', digit: 8 },
  { name: 'White', hex: '#f2efe6', digit: 9 },
]

const MULTIPLIER_COLORS = [
  ...DIGIT_COLORS.map((c) => ({ ...c, mult: Math.pow(10, c.digit) })),
  { name: 'Gold', hex: '#c9a227', digit: -1, mult: 0.1 },
  { name: 'Silver', hex: '#b9b9b9', digit: -2, mult: 0.01 },
]

const TOLERANCE_COLORS = [
  { name: 'Brown', hex: '#7b4a2d', tol: 1 },
  { name: 'Red', hex: '#c0392b', tol: 2 },
  { name: 'Gold', hex: '#c9a227', tol: 5 },
  { name: 'Silver', hex: '#b9b9b9', tol: 10 },
]

function formatOhms(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 2)} MΩ`
  if (value >= 1_000) return `${(value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 2)} kΩ`
  return `${value.toFixed(value % 1 === 0 ? 0 : 2)} Ω`
}

function ColorPicker({
  label,
  colors,
  selectedIndex,
  onSelect,
}: {
  label: string
  colors: { name: string; hex: string }[]
  selectedIndex: number
  onSelect: (i: number) => void
}) {
  return (
    <div>
      <p className="text-xs font-medium text-ink-soft mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {colors.map((c, i) => (
          <button
            key={c.name}
            title={c.name}
            onClick={() => onSelect(i)}
            className={`h-7 w-7 rounded-full border-2 transition-transform ${
              selectedIndex === i ? 'border-ink scale-110' : 'border-line/60'
            }`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  )
}

export function ResistorColorDecoder() {
  const [b1, setB1] = useState(4) // yellow
  const [b2, setB2] = useState(7) // violet
  const [mult, setMult] = useState(2) // red -> x100
  const [tol, setTol] = useState(2) // gold -> 5%

  const value = useMemo(() => {
    const digits = DIGIT_COLORS[b1].digit * 10 + DIGIT_COLORS[b2].digit
    return digits * MULTIPLIER_COLORS[mult].mult
  }, [b1, b2, mult])

  const bandColors = [DIGIT_COLORS[b1].hex, DIGIT_COLORS[b2].hex, MULTIPLIER_COLORS[mult].hex, TOLERANCE_COLORS[tol].hex]

  return (
    <div className="flex flex-col gap-5">
      <svg viewBox="0 0 320 90" className="w-full max-w-sm mx-auto">
        <line x1="0" y1="45" x2="320" y2="45" stroke="#c9c2ab" strokeWidth="3" />
        <rect x="70" y="20" width="180" height="50" rx="14" fill="#e8c896" stroke="#c9a96b" strokeWidth="1.5" />
        {bandColors.map((color, i) => (
          <rect key={i} x={100 + i * 32} y="20" width="10" height="50" fill={color} />
        ))}
      </svg>

      <div className="grid grid-cols-2 gap-4">
        <ColorPicker label="Band 1 (1st digit)" colors={DIGIT_COLORS} selectedIndex={b1} onSelect={setB1} />
        <ColorPicker label="Band 2 (2nd digit)" colors={DIGIT_COLORS} selectedIndex={b2} onSelect={setB2} />
        <ColorPicker label="Band 3 (multiplier)" colors={MULTIPLIER_COLORS} selectedIndex={mult} onSelect={setMult} />
        <ColorPicker label="Band 4 (tolerance)" colors={TOLERANCE_COLORS} selectedIndex={tol} onSelect={setTol} />
      </div>

      <div className="rounded-xl bg-purple-soft px-4 py-3 text-center">
        <p className="text-xs text-ink-soft mb-1">
          {DIGIT_COLORS[b1].digit}{DIGIT_COLORS[b2].digit} × 10^{Math.log10(MULTIPLIER_COLORS[mult].mult).toFixed(0)} Ω
        </p>
        <p className="font-serif text-2xl font-semibold text-purple">
          {formatOhms(value)} ± {TOLERANCE_COLORS[tol].tol}%
        </p>
      </div>
    </div>
  )
}
