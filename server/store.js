import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_PATH = path.join(__dirname, 'data', 'planner.json')

export async function readTasks() {
  try {
    const raw = await readFile(DATA_PATH, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    if (err.code === 'ENOENT') return []
    throw err
  }
}

export async function writeTasks(tasks) {
  await writeFile(DATA_PATH, JSON.stringify(tasks, null, 2) + '\n', 'utf-8')
}
