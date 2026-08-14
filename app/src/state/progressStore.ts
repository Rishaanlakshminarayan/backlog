import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface QuizAttempt {
  score: number
  total: number
  bestScore: number
  attempts: number
  lastAttemptAt: string
}

interface ProgressState {
  completedTopics: Record<string, boolean> // key: `${subjectId}:${topicId}`
  quizAttempts: Record<string, QuizAttempt> // key: quizId
  notes: Record<string, string> // key: `${subjectId}:${topicId}`
  markTopicComplete: (subjectId: string, topicId: string, complete?: boolean) => void
  isTopicComplete: (subjectId: string, topicId: string) => boolean
  recordQuizAttempt: (quizId: string, score: number, total: number) => void
  setNote: (subjectId: string, topicId: string, note: string) => void
  getNote: (subjectId: string, topicId: string) => string
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedTopics: {},
      quizAttempts: {},
      notes: {},

      markTopicComplete: (subjectId, topicId, complete = true) =>
        set((state) => ({
          completedTopics: { ...state.completedTopics, [`${subjectId}:${topicId}`]: complete },
        })),

      isTopicComplete: (subjectId, topicId) => !!get().completedTopics[`${subjectId}:${topicId}`],

      recordQuizAttempt: (quizId, score, total) =>
        set((state) => {
          const prev = state.quizAttempts[quizId]
          return {
            quizAttempts: {
              ...state.quizAttempts,
              [quizId]: {
                score,
                total,
                bestScore: prev ? Math.max(prev.bestScore, score) : score,
                attempts: (prev?.attempts ?? 0) + 1,
                lastAttemptAt: new Date().toISOString(),
              },
            },
          }
        }),

      setNote: (subjectId, topicId, note) =>
        set((state) => ({ notes: { ...state.notes, [`${subjectId}:${topicId}`]: note } })),

      getNote: (subjectId, topicId) => get().notes[`${subjectId}:${topicId}`] ?? '',
    }),
    { name: 'vit-learning-progress' },
  ),
)
