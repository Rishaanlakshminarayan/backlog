import type { Accent } from '../content/types'

interface AccentClasses {
  text: string
  bg: string
  bgSoft: string
  border: string
  ring: string
  dot: string
}

const map: Record<Accent, AccentClasses> = {
  purple: {
    text: 'text-purple',
    bg: 'bg-purple',
    bgSoft: 'bg-purple-soft',
    border: 'border-purple/30',
    ring: 'ring-purple/40',
    dot: 'bg-purple',
  },
  sage: {
    text: 'text-sage',
    bg: 'bg-sage',
    bgSoft: 'bg-sage-soft',
    border: 'border-sage/30',
    ring: 'ring-sage/40',
    dot: 'bg-sage',
  },
  terracotta: {
    text: 'text-terracotta',
    bg: 'bg-terracotta',
    bgSoft: 'bg-terracotta-soft',
    border: 'border-terracotta/30',
    ring: 'ring-terracotta/40',
    dot: 'bg-terracotta',
  },
  blue: {
    text: 'text-blue',
    bg: 'bg-blue',
    bgSoft: 'bg-blue-soft',
    border: 'border-blue/30',
    ring: 'ring-blue/40',
    dot: 'bg-blue',
  },
  gold: {
    text: 'text-gold',
    bg: 'bg-gold',
    bgSoft: 'bg-gold-soft',
    border: 'border-gold/30',
    ring: 'ring-gold/40',
    dot: 'bg-gold',
  },
}

export function accentClasses(accent: Accent): AccentClasses {
  return map[accent]
}
