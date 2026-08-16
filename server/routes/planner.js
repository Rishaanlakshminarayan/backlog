import { Router } from 'express'
import { randomUUID } from 'node:crypto'
import { readTasks, writeTasks } from '../store.js'

export const plannerRouter = Router()

// Signed-in users get their own board; signed-out visitors share one
// anonymous pool (the original single-board behaviour, preserved so nothing
// breaks for anyone who never logs in).
const ownerOf = (req) => req.user?.id ?? null
const taskOwner = (task) => task.ownerId ?? null

plannerRouter.get('/tasks', async (req, res) => {
  const tasks = await readTasks()
  const owner = ownerOf(req)
  res.json(tasks.filter((t) => taskOwner(t) === owner))
})

plannerRouter.post('/tasks', async (req, res) => {
  const { title, subjectId = null, dueDate = null, priority = 'medium' } = req.body ?? {}
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'title is required' })
  }
  const tasks = await readTasks()
  const task = {
    id: randomUUID(),
    ownerId: ownerOf(req),
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
  if (idx === -1 || taskOwner(tasks[idx]) !== ownerOf(req)) return res.status(404).json({ error: 'not found' })
  tasks[idx] = { ...tasks[idx], ...req.body, id: tasks[idx].id, ownerId: tasks[idx].ownerId }
  await writeTasks(tasks)
  res.json(tasks[idx])
})

plannerRouter.delete('/tasks/:id', async (req, res) => {
  const tasks = await readTasks()
  const target = tasks.find((t) => t.id === req.params.id)
  if (!target || taskOwner(target) !== ownerOf(req)) return res.status(404).json({ error: 'not found' })
  await writeTasks(tasks.filter((t) => t.id !== req.params.id))
  res.status(204).end()
})
