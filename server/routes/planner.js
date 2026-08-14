import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { readTasks, writeTasks } from '../store.js'

export const plannerRouter = Router()

plannerRouter.get('/tasks', async (_req, res) => {
  const tasks = await readTasks()
  res.json(tasks)
})

plannerRouter.post('/tasks', async (req, res) => {
  const { title, subjectId = null, dueDate = null, priority = 'medium' } = req.body ?? {}
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required' })
  }
  const tasks = await readTasks()
  const task = {
    id: randomUUID(),
    title,
    subjectId,
    dueDate,
    priority,
    status: 'todo',
    createdAt: new Date().toISOString(),
  }
  tasks.push(task)
  await writeTasks(tasks)
  res.status(201).json(task)
})

plannerRouter.patch('/tasks/:id', async (req, res) => {
  const tasks = await readTasks()
  const idx = tasks.findIndex((t) => t.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: 'not found' })
  tasks[idx] = { ...tasks[idx], ...req.body, id: tasks[idx].id }
  await writeTasks(tasks)
  res.json(tasks[idx])
})

plannerRouter.delete('/tasks/:id', async (req, res) => {
  const tasks = await readTasks()
  const next = tasks.filter((t) => t.id !== req.params.id)
  if (next.length === tasks.length) return res.status(404).json({ error: 'not found' })
  await writeTasks(next)
  res.status(204).end()
})
