import { Router } from 'express'
import { readProgress, writeProgress } from '../store.js'
import { requireAuth } from '../middleware/auth.js'

export const progressRouter = Router()

const emptyProgress = () => ({ completedTopics: {}, quizAttempts: {}, notes: {} })

progressRouter.get('/', requireAuth, async (req, res) => {
  const all = await readProgress()
  res.json(all[req.user.id] ?? emptyProgress())
})

progressRouter.put('/', requireAuth, async (req, res) => {
  const all = await readProgress()
  all[req.user.id] = {
    completedTopics: req.body?.completedTopics ?? {},
    quizAttempts: req.body?.quizAttempts ?? {},
    notes: req.body?.notes ?? {},
  }
  await writeProgress(all)
  res.json(all[req.user.id])
})
