import { Router } from 'express'
import { Client } from '@notionhq/client'
import { readTasks, writeTasks } from '../store.js'

export const notionRouter = Router()

function getClient() {
  const token = process.env.NOTION_TOKEN
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!token || !databaseId) return null
  return { client: new Client({ auth: token }), databaseId }
}

notionRouter.get('/status', (_req, res) => {
  const configured = Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID)
  res.json({ configured })
})

// Pushes local planner tasks into the Notion database as pages.
// Expects a database with: "Name" (title), "Status" (select: todo/doing/done),
// "Priority" (select: low/medium/high), "Due date" (date).
notionRouter.post('/push', async (_req, res) => {
  const ctx = getClient()
  if (!ctx) {
    return res.status(501).json({
      error: 'Notion not configured. Add NOTION_TOKEN and NOTION_DATABASE_ID to server/.env — see server/.env.example.',
    })
  }
  const { client, databaseId } = ctx
  const tasks = await readTasks()
  const results = []
  for (const task of tasks) {
    if (task.notionPageId) {
      await client.pages.update({
        page_id: task.notionPageId,
        properties: buildProperties(task),
      })
      results.push({ id: task.id, action: 'updated' })
    } else {
      const page = await client.pages.create({
        parent: { database_id: databaseId },
        properties: buildProperties(task),
      })
      task.notionPageId = page.id
      results.push({ id: task.id, action: 'created' })
    }
  }
  await writeTasks(tasks)
  res.json({ synced: results.length, results })
})

// Pulls pages from the Notion database and merges them into local tasks.
notionRouter.post('/pull', async (_req, res) => {
  const ctx = getClient()
  if (!ctx) {
    return res.status(501).json({
      error: 'Notion not configured. Add NOTION_TOKEN and NOTION_DATABASE_ID to server/.env — see server/.env.example.',
    })
  }
  const { client, databaseId } = ctx
  const response = await client.databases.query({ database_id: databaseId })
  const tasks = await readTasks()

  for (const page of response.results) {
    const title = page.properties?.Name?.title?.[0]?.plain_text ?? 'Untitled'
    const status = page.properties?.Status?.select?.name ?? 'todo'
    const priority = page.properties?.Priority?.select?.name ?? 'medium'
    const dueDate = page.properties?.['Due date']?.date?.start ?? null

    const existing = tasks.find((t) => t.notionPageId === page.id)
    if (existing) {
      Object.assign(existing, { title, status, priority, dueDate })
    } else {
      tasks.push({
        id: page.id,
        notionPageId: page.id,
        title,
        status,
        priority,
        dueDate,
        subjectId: null,
        createdAt: new Date().toISOString(),
      })
    }
  }

  await writeTasks(tasks)
  res.json({ pulled: response.results.length })
})

function buildProperties(task) {
  return {
    Name: { title: [{ text: { content: task.title } }] },
    Status: { select: { name: task.status } },
    Priority: { select: { name: task.priority } },
    ...(task.dueDate ? { 'Due date': { date: { start: task.dueDate } } } : {}),
  }
}
