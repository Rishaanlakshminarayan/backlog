export type Accent = 'purple' | 'sage' | 'terracotta' | 'blue' | 'gold'

export type TopicStatus = 'ready' | 'coming-soon'
export type SubjectStatus = 'ready' | 'materials-only' | 'planned'

export interface QuizRef {
  quizId: string
}

export interface Topic {
  id: string
  title: string
  summary: string
  status: TopicStatus
  estMinutes?: number
  quiz?: QuizRef
}

export interface ModuleInfo {
  id: string
  title: string
  hours?: number
  syllabus?: string
  topics: Topic[]
}

export interface SubjectMeta {
  id: string
  code?: string
  title: string
  ltpc?: string
  accent: Accent
  tagline: string
  description?: string
  objectives?: string[]
  outcomes?: string[]
  modules?: ModuleInfo[]
  materials?: string[]
  status: SubjectStatus
}

export interface Semester {
  id: number
  label: string
  note?: string
  subjects: SubjectMeta[]
}
