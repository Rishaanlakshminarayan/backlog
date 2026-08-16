import { Router } from 'express'
import { randomUUID, randomBytes } from 'node:crypto'
import { readUsers, writeUsers } from '../store.js'
import { signSession, setSessionCookie, clearSessionCookie } from '../middleware/auth.js'

export const authRouter = Router()

const STATE_COOKIE = 'vit_oauth_state'

function appUrl() {
  return process.env.APP_URL || 'http://localhost:5173'
}

function serverUrl() {
  return process.env.SERVER_URL || 'http://localhost:4001'
}

function providerConfig(name) {
  if (name === 'google') {
    return {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenUrl: 'https://oauth2.googleapis.com/token',
      scope: 'openid email profile',
      extraAuthParams: { access_type: 'online', prompt: 'select_account' },
    }
  }
  if (name === 'github') {
    return {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      scope: 'read:user user:email',
      extraAuthParams: {},
    }
  }
  return null
}

function isConfigured(name) {
  const cfg = providerConfig(name)
  return Boolean(cfg?.clientId && cfg?.clientSecret)
}

authRouter.get('/providers', (_req, res) => {
  res.json({ google: isConfigured('google'), github: isConfigured('github') })
})

authRouter.get('/me', async (req, res) => {
  if (!req.user) return res.json({ user: null })
  const users = await readUsers()
  const user = users.find((u) => u.id === req.user.id)
  res.json({ user: user ?? null })
})

authRouter.post('/logout', (_req, res) => {
  clearSessionCookie(res)
  res.status(204).end()
})

authRouter.get('/:provider', (req, res) => {
  const cfg = providerConfig(req.params.provider)
  if (!cfg || !isConfigured(req.params.provider)) {
    return res.status(501).send(`${req.params.provider} login isn't configured yet. Add its client ID/secret to server/.env — see server/.env.example.`)
  }
  const state = randomBytes(16).toString('hex')
  res.cookie(STATE_COOKIE, state, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 10 * 60 * 1000, path: '/' })

  const params = new URLSearchParams({
    client_id: cfg.clientId,
    redirect_uri: `${serverUrl()}/api/auth/${req.params.provider}/callback`,
    scope: cfg.scope,
    state,
    response_type: 'code',
    ...cfg.extraAuthParams,
  })
  res.redirect(`${cfg.authUrl}?${params.toString()}`)
})

authRouter.get('/:provider/callback', async (req, res) => {
  const provider = req.params.provider
  const cfg = providerConfig(provider)
  if (!cfg || !isConfigured(provider)) return res.status(501).send(`${provider} login isn't configured.`)

  const { code, state } = req.query
  const expectedState = req.cookies?.[STATE_COOKIE]
  res.clearCookie(STATE_COOKIE, { path: '/' })
  if (!code || !state || state !== expectedState) {
    return res.status(400).send('OAuth state mismatch — please try signing in again.')
  }

  try {
    const tokenRes = await fetch(cfg.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: cfg.clientId,
        client_secret: cfg.clientSecret,
        code,
        redirect_uri: `${serverUrl()}/api/auth/${provider}/callback`,
        grant_type: 'authorization_code',
      }),
    })
    const tokenBody = await tokenRes.json()
    if (!tokenBody.access_token) throw new Error(tokenBody.error_description || 'No access token returned')

    const profile = provider === 'google' ? await fetchGoogleProfile(tokenBody.access_token) : await fetchGithubProfile(tokenBody.access_token)

    const users = await readUsers()
    let user = users.find((u) => u.provider === provider && u.providerId === profile.providerId)
    if (user) {
      Object.assign(user, profile, { updatedAt: new Date().toISOString() })
    } else {
      user = { id: randomUUID(), provider, ...profile, createdAt: new Date().toISOString() }
      users.push(user)
    }
    await writeUsers(users)

    setSessionCookie(res, signSession(user))
    res.redirect(appUrl())
  } catch (err) {
    res.status(500).send(`Login failed: ${err.message}`)
  }
})

async function fetchGoogleProfile(accessToken) {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  const data = await res.json()
  return { providerId: data.sub, name: data.name, email: data.email, avatarUrl: data.picture }
}

async function fetchGithubProfile(accessToken) {
  const headers = { Authorization: `Bearer ${accessToken}`, 'User-Agent': 'vit-learning-studio' }
  const res = await fetch('https://api.github.com/user', { headers })
  const data = await res.json()
  let email = data.email
  if (!email) {
    const emailsRes = await fetch('https://api.github.com/user/emails', { headers })
    const emails = await emailsRes.json()
    email = Array.isArray(emails) ? emails.find((e) => e.primary)?.email ?? emails[0]?.email : null
  }
  return { providerId: String(data.id), name: data.name || data.login, email, avatarUrl: data.avatar_url }
}
