export function Resistor({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label?: string }) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  const px = -uy
  const py = ux
  const legFrac = 0.28
  const zigStart = legFrac
  const zigEnd = 1 - legFrac
  const zigZags = 6
  const amp = 6

  const point = (t: number, offset = 0) => ({
    x: x1 + ux * len * t + px * offset,
    y: y1 + uy * len * t + py * offset,
  })

  const pts = [point(zigStart)]
  for (let i = 1; i < zigZags; i++) {
    const t = zigStart + ((zigEnd - zigStart) * i) / zigZags
    pts.push(point(t, i % 2 === 1 ? amp : -amp))
  }
  pts.push(point(zigEnd))

  const path = `M ${x1} ${y1} L ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ') + ` L ${x2} ${y2}`
  const mid = point(0.5, py < 0 ? -14 : 14)
  const midAdj = { x: mid.x + (Math.abs(px) > 0.5 ? 0 : 14), y: mid.y }

  return (
    <g>
      <path d={path} fill="none" stroke="var(--color-ink)" strokeWidth="1.75" strokeLinejoin="round" />
      {label && (
        <text x={midAdj.x} y={midAdj.y} textAnchor="middle" className="fill-terracotta text-[11px] font-medium">
          {label}
        </text>
      )}
    </g>
  )
}

export function Battery({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label?: string }) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  const px = -uy
  const py = ux
  const mid = 0.5
  const gap = 5
  const p1 = { x: x1 + ux * len * (mid - gap / len), y: y1 + uy * len * (mid - gap / len) }
  const p2 = { x: x1 + ux * len * (mid + gap / len), y: y1 + uy * len * (mid + gap / len) }

  const longLine = (c: { x: number; y: number }, size: number) => (
    <line x1={c.x - px * size} y1={c.y - py * size} x2={c.x + px * size} y2={c.y + py * size} stroke="var(--color-ink)" strokeWidth="2" />
  )

  const labelPos = { x: (x1 + x2) / 2 + px * 16, y: (y1 + y2) / 2 + py * 16 }

  return (
    <g>
      <line x1={x1} y1={y1} x2={p1.x} y2={p1.y} stroke="var(--color-ink)" strokeWidth="1.75" />
      {longLine(p1, 8)}
      {longLine(p2, 4)}
      <line x1={p2.x} y1={p2.y} x2={x2} y2={y2} stroke="var(--color-ink)" strokeWidth="1.75" />
      {label && (
        <text x={labelPos.x} y={labelPos.y} textAnchor="middle" className="fill-blue text-[11px] font-medium">
          {label}
        </text>
      )}
    </g>
  )
}

export function CurrentSource({
  x1,
  y1,
  x2,
  y2,
  label,
  reverse = false,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  label?: string
  reverse?: boolean
}) {
  const cx = (x1 + x2) / 2
  const cy = (y1 + y2) / 2
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy)
  const ux = (reverse ? -1 : 1) * (dx / len)
  const uy = (reverse ? -1 : 1) * (dy / len)
  const radius = 12
  const tipX = cx + ux * radius * 0.7
  const tipY = cy + uy * radius * 0.7
  const labelPos = { x: cx + (-uy) * 18, y: cy + ux * 18 }

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-ink)" strokeWidth="1.75" />
      <circle cx={cx} cy={cy} r={radius} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.75" />
      <line x1={cx - ux * radius * 0.7} y1={cy - uy * radius * 0.7} x2={tipX} y2={tipY} stroke="var(--color-purple)" strokeWidth="1.75" markerEnd="url(#loopArrowHead)" />
      {label && (
        <text x={labelPos.x} y={labelPos.y} textAnchor="middle" className="fill-purple text-[11px] font-medium">
          {label}
        </text>
      )}
    </g>
  )
}

export function Wire({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-ink)" strokeWidth="1.75" />
}

export function LoopArrow({ cx, cy, r = 22, label }: { cx: number; cy: number; r?: number; label: string }) {
  const start = -40
  const end = 250
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const sx = cx + r * Math.cos(toRad(start))
  const sy = cy + r * Math.sin(toRad(start))
  const ex = cx + r * Math.cos(toRad(end))
  const ey = cy + r * Math.sin(toRad(end))
  return (
    <g>
      <path d={`M ${sx} ${sy} A ${r} ${r} 0 1 1 ${ex} ${ey}`} fill="none" stroke="var(--color-purple)" strokeWidth="1.75" markerEnd="url(#loopArrowHead)" />
      <text x={cx} y={cy + 4} textAnchor="middle" className="fill-purple text-[12px] font-semibold">
        {label}
      </text>
    </g>
  )
}

export function CircuitDefs() {
  return (
    <defs>
      <marker id="loopArrowHead" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
        <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--color-purple)" />
      </marker>
    </defs>
  )
}

export function Node({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r="2.5" fill="var(--color-ink)" />
}

export function GroundSymbol({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="var(--color-ink)" strokeWidth="1.75">
      <line x1={x - 10} y1={y} x2={x + 10} y2={y} />
      <line x1={x - 6} y1={y + 4} x2={x + 6} y2={y + 4} />
      <line x1={x - 2.5} y1={y + 8} x2={x + 2.5} y2={y + 8} />
    </g>
  )
}
