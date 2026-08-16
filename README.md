# Learning Studio — VIT Vellore CSE

An interactive learning app for organizing VIT Vellore B.Tech CSE coursework semester-by-semester: tutorials with
built-in interactive widgets, practice quizzes, progress tracking, and a study planner with an (optional) Notion
sync. Supports light/dark theme + adjustable text size, and optional Google/GitHub sign-in to sync progress across
devices.

## Structure

```
app/       React + TypeScript + Vite + Tailwind v4 frontend
server/    Small Express API — JSON-file planner storage + dormant Notion sync
```

Study notes/PDFs are kept locally (not committed) — see `.gitignore`.

## Running locally

Requires Node.js 18+.

```bash
# terminal 1 — planner API
cd server
npm install
npm start          # http://localhost:4001

# terminal 2 — app
cd app
npm install
npm run dev         # http://localhost:5173 (proxies /api to the server above)
```

## Adding a new subject or topic

1. Add a `SubjectMeta` entry under `app/src/content/subjects/<subject-id>/meta.ts` (see
   `basic-engineering/meta.ts` for a fully-built example, or `calculus/meta.ts` for a lighter
   "materials only" placeholder).
2. Register it in `app/src/content/curriculum.ts` under the right semester.
3. For a fully interactive topic: add a content file under
   `app/src/content/subjects/<subject-id>/topics/<topic-id>.tsx` exporting a `TopicContentDef`
   (intro copy, key formulas, an optional widget), then register it in that subject's
   `topics/index.ts` and add it to `app/src/content/topicRegistry.ts`.
4. Add a matching quiz in `.../quizzes/*.ts` and register it in `app/src/content/quizRegistry.ts`.

Topics without a content file automatically render as "coming soon" placeholders, so it's safe to
list a subject's full module/topic outline before every topic has interactive content.

## Notion sync (planner)

The planner works fully offline against `server/data/planner.json`. To link it to Notion:

1. Create an integration at [notion.so/my-integrations](https://www.notion.so/my-integrations) and
   copy its internal integration token.
2. Create (or reuse) a Notion database with properties: `Name` (title), `Status`
   (select: todo/doing/done), `Priority` (select: low/medium/high), `Due date` (date).
3. Share that database with your integration (`•••` menu → Connections).
4. Copy `server/.env.example` to `server/.env` and fill in `NOTION_TOKEN` and `NOTION_DATABASE_ID`.
5. Restart the server — the Planner page's Notion panel will show "Connected" and expose Push/Pull
   buttons.

## Sign-in (progress sync)

Signing in is optional — everything works anonymously (progress in the browser's local storage, a
shared local planner board). Signing in with Google or GitHub instead stores your progress and
planner tasks on the server keyed to your account, so they follow you across devices. **This only
works when you run the app locally** — GitHub Pages is static hosting and can't run the
server-side OAuth exchange, so sign-in is disabled on the public deployed link.

To enable it:

1. **Google**: create an OAuth client at
   [console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
   (type "Web application"), with authorized redirect URI
   `http://localhost:4001/api/auth/google/callback`.
2. **GitHub**: create an OAuth App at
   [github.com/settings/developers](https://github.com/settings/developers), with callback URL
   `http://localhost:4001/api/auth/github/callback`.
3. Copy `server/.env.example` to `server/.env` and fill in whichever provider's client ID/secret
   you set up (both are optional — you can configure just one).
4. Restart the server. The sidebar's "Sync your progress" panel will show working sign-in buttons.

User records (`server/data/users.json`) and per-user progress (`server/data/progress.json`) are
gitignored — they hold real names/emails and never belong in the repo.

## Status

- **Semester 1**: Basic Engineering (BAEEE101) Module 1 is fully interactive — circuit elements,
  Ohm's/Kirchhoff's laws, mesh analysis, and nodal analysis, each with a widget and a quiz. Modules
  2–6 and the other Sem 1 subjects (Calculus, Applied Chemistry) are outlined but not yet built out.
- **Semesters 2–8**: a best-effort CSE curriculum skeleton (subject names only), meant to be filled
  in the same way as real course materials arrive each semester.
