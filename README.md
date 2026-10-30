# Chandan Kumar — Rust Backend Developer

Personal portfolio built with Next.js 16, React 19, Tailwind CSS v4 and Motion.
It presents my work on Rust backends: REST APIs, matching engines, exchange
connectors and real-time trading infrastructure.

## Editing the content

All site copy lives in plain TypeScript files under `data/`, so nothing needs
to change in JSX:

| File                       | What it controls                                               |
| -------------------------- | -------------------------------------------------------------- |
| `data/profile.ts`          | Name, role, email, intro, hero tags, focus areas, stats        |
| `data/projects.ts`         | Project cards, highlights, architecture flow, metrics          |
| `data/work-experiences.ts` | Experience entries                                             |
| `data/education.ts`        | Education                                                      |
| `data/skills.ts`           | Skill groups on the About page                                 |
| `data/socials.tsx`         | GitHub / LinkedIn / LeetCode / email links                     |
| `posts/*.md`               | Blog posts (front matter + Markdown, Rust code is highlighted) |

Logos come from `components/tech-icons.tsx`; add a technology there once and
every list that mentions it picks up the icon. The AI chatbot builds its system
prompt from the same data files (`lib/chat-context.ts`), so it stays in sync.

### Assets to swap

- `public/logo.jpg` — profile photo (currently a placeholder)
- `public/chandan-kumar-resume.pdf` — the file behind the **Download CV** button

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create a `.env` file in the project root. It is git-ignored, so keep real
values out of commits.

```bash
# chatbot open questions and blog AI summaries
OPENROUTER_API_KEY=
# contact form: Gmail address that sends and receives messages
EMAIL_USER=
# Gmail app password for EMAIL_USER
EMAIL_PASS=
```

Without them the site still runs: canned chatbot answers work, open-ended chat
falls back to a short canned reply, the AI summary box stays hidden, and the
contact form reports an error.

Optional: set `NEXT_PUBLIC_SITE_URL` (for example `https://your-domain.com`)
when hosting somewhere other than Vercel, so link previews, the sitemap and
`robots.txt` use your real domain.

### Assets to regenerate

`app/opengraph-image.png` is the link-preview card shown when the site is shared
(LinkedIn, Slack, WhatsApp). Replace it if you change your name or tagline.

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start the dev server       |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
| `npm run lint`  | Lint with ESLint           |
