import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { plannerRouter } from './routes/planner.js'
import { notionRouter } from './routes/notion.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Minimal .env loader — avoids adding the dotenv dependency for two variables.
async function loadEnv() {
  try {
    const raw = await readFile(path.join(__dirname, '.env'), 'utf-8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      const value = trimmed.slice(eq + 1).trim()
      if (!(key in process.env)) process.env[key] = value
    }
  } catch {
    // no .env yet — fine, Notion routes stay dormant
  }
}

await loadEnv()

const app = express()
app.use(express.json())

app.use('/api/planner', plannerRouter)
app.use('/api/notion', notionRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 4001
app.listen(PORT, () => {
  console.log(`Planner API listening on http://localhost:${PORT}`)
})
