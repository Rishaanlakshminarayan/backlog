import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')

async function readJson(file, fallback) {
  try {
    const raw = await readFile(path.join(DATA_DIR, file), 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    if (err.code === 'ENOENT') return fallback
    throw err
  }
}

async function writeJson(file, value) {
  await writeFile(path.join(DATA_DIR, file), JSON.stringify(value, null, 2) + '\n', 'utf-8')
}

export const readTasks = () => readJson('planner.json', [])
export const writeTasks = (tasks) => writeJson('planner.json', tasks)

export const readUsers = () => readJson('users.json', [])
export const writeUsers = (users) => writeJson('users.json', users)

export const readProgress = () => readJson('progress.json', {})
export const writeProgress = (progress) => writeJson('progress.json', progress)
