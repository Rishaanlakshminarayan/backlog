export interface McqQuestionData {
  id: string
  type: 'mcq'
  prompt: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export interface NumericQuestionData {
  id: string
  type: 'numeric'
  prompt: string
  answer: number
  tolerance?: number
  unit?: string
  explanation?: string
}

export type QuizQuestion = McqQuestionData | NumericQuestionData

export interface Quiz {
  id: string
  title: string
  questions: QuizQuestion[]
}
