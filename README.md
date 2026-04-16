# Aarhus Dashboard - Weather and News

Simple internal dashboard for:

- current weather in Aarhus
- latest news from Denmark

Built with Next.js, React, TypeScript, Tailwind CSS, Shadcn UI, and Zod.

## Setup and Run

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Environment variables

Create `.env` in project root:

```bash
NEWS_API_URL=<your news API endpoint>
WEATHER_API_URL=<your weather API endpoint>
```

Use `.env.example` as reference.

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

### Build and run production

```bash
npm run build
npm start
```

## Architecture (Short)

- `app/page.tsx`: server-rendered page. Fetches weather and news in parallel.
- `lib/api.ts`: API calls, timeouts, and Zod validation.
- `lib/env.ts`: validates required env vars at startup.
- `app/loading.tsx`: route loading skeleton UI.
- `app/error.tsx`: route error boundary with retry action.
- `components/dashboard/*`: presentational UI components.

## Loading, Error, and Edge-Case Behavior

- Loading: `app/loading.tsx` renders skeletons while route data resolves.
- Uncaught route errors: `app/error.tsx` renders fallback UI and supports retry.
- Weather API failure: weather card is replaced by "Weather data unavailable".
- News API failure: returns empty list; UI shows "No news articles available".
- Slow APIs: requests time out after 10 seconds via `AbortController`.

## Validation and Data Contracts

- Environment variables are validated using Zod in `lib/env.ts`.
- News and weather API payloads are validated in `lib/api.ts`.
- News data allows nullable fields where needed (for example `categories` and `sentiment`).

## Assumptions and Trade-offs

- Data is fetched on the server. ISR is not implemented.
- Search is client-side filtering on already-fetched articles.
- API URLs are provided via env vars (including tokens), which is simple but not ideal for production key management.
- Validation currently focuses on fields used by the UI, while allowing extra fields.

## Troubleshooting

- Build fails with env error:
  - verify `NEWS_API_URL` and `WEATHER_API_URL` are present and valid URLs.
- Console shows "Failed to fetch ...":
  - confirm API key/token is valid.
  - confirm endpoint still returns the expected JSON shape.
- Weather missing on page:
  - weather fetch failed: check server logs for timeout/HTTP/validation errors.
- Empty news list:
  - news fetch failed or API returned no posts: check server logs.

## Time Spent

About 4 hours total.

## What I Would Improve With More Time

- Add automated tests for API parsing, utilities, and core UI states.
- Add ISR or background revalidation for fresher data.
- Improve accessibility (focus, labels, keyboard flow).
- Add pagination or query-based API search.
- Improve caching strategy
