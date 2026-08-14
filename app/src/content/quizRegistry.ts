import type { Quiz } from './quizTypes'
import { module1Quizzes } from './subjects/basic-engineering/quizzes/module1-quiz'

const allQuizzes: Quiz[] = [...module1Quizzes]

export const quizRegistry: Record<string, Quiz> = Object.fromEntries(allQuizzes.map((q) => [q.id, q]))
