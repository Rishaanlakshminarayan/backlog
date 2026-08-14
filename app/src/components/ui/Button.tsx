import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-cream-soft hover:bg-ink/85',
  secondary: 'bg-cream border border-line text-ink hover:bg-line/40',
  ghost: 'text-ink-soft hover:bg-line/40',
  danger: 'bg-terracotta-soft text-terracotta hover:bg-terracotta/20',
}

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
