import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SECRET_PATH = path.join(__dirname, '.auth-secret')

// A stable signing secret for session JWTs, generated once and reused across
// restarts (otherwise every server restart would sign everyone out).
export function getAuthSecret() {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET
  if (existsSync(SECRET_PATH)) return readFileSync(SECRET_PATH, 'utf-8').trim()
  const secret = randomBytes(48).toString('hex')
  writeFileSync(SECRET_PATH, secret, 'utf-8')
  return secret
}
