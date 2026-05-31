# MisrTV

A modern Egyptian movie and TV database platform for discovering, rating, reviewing, and exploring films, series, actors, and entertainment content from Egypt and beyond.

**Repository:** [github.com/MisrFuture/MisrTV](https://github.com/MisrFuture/MisrTV)

Bilingual **English + Arabic** web app with financial analysis, age ratings, user profiles, and AI features.

## Features

- **Bilingual UI** — Switch between English and العربية (RTL layout)
- **Movie catalog** — Trending, Arab cinema spotlight, search & filters
- **Financial analysis** — Budget, box office, profit/loss, ROI per film
- **Ratings** — MisrTV, IMDB-style scores, Tomatoes, audience; age ratings (G, PG, PG-13, R, 18+); quality verdicts (must watch → skip)
- **Upcoming movies** — Release dates and anticipation scores
- **Profile** — Liked movies & watchlist (saved in browser localStorage)
- **AI Assistant** — Smart recommendations & insights; optional OpenAI via `OPENAI_API_KEY`

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/) icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Optional: real OpenAI responses

Create `.env.local`:

```
OPENAI_API_KEY=sk-your-key-here
```

The AI page uses local intelligence by default; with a key, `/api/ai` can call GPT-4o-mini.

## Project structure

```
src/
  app/          # Pages: home, movies, detail, upcoming, ai, profile
  components/   # UI: cards, financial panel, AI chat, header
  data/         # Mock movie database
  lib/          # i18n, AI, storage, utils
  context/      # Locale provider
  types/        # TypeScript models
```

## License

MIT
