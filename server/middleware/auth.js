import jwt from 'jsonwebtoken'
import { getAuthSecret } from '../authSecret.js'

const COOKIE_NAME = 'vit_session'

export function signSession(user) {
  return jwt.sign({ sub: user.id, name: user.name, avatarUrl: user.avatarUrl, provider: user.provider }, getAuthSecret(), {
    expiresIn: '30d',
  })
}

export function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false, // local http dev; set true behind HTTPS in production
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/',
  })
}

export function clearSessionCookie(res) {
  res.clearCookie(COOKIE_NAME, { path: '/' })
}

// Decodes the session cookie if present, attaching req.user — never blocks the request.
export function attachUser(req, _res, next) {
  const token = req.cookies?.[COOKIE_NAME]
  if (token) {
    try {
      const payload = jwt.verify(token, getAuthSecret())
      req.user = { id: payload.sub, name: payload.name, avatarUrl: payload.avatarUrl, provider: payload.provider }
    } catch {
      // expired/invalid token — treat as logged out
    }
  }
  next()
}

export function requireAuth(req, res, next) {
  if (!req.user) return res.status(401).json({ error: 'Not signed in' })
  next()
}
