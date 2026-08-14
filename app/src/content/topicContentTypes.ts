import type { ComponentType, ReactNode } from 'react'

export interface FormulaRef {
  label: string
  expr: string
}

export interface TopicContentDef {
  intro: ReactNode
  formulas?: FormulaRef[]
  tip?: ReactNode
  Widget: ComponentType
  widgetTitle?: string
}
