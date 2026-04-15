# Aarhus Dashboard — Weather & News

A dashboard displaying current weather for Aarhus and the latest news from Denmark. Built with Next.js, React, TypeScript, Tailwind CSS, and Shadcn UI.

## Setup and Run

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root with the following variables:

```
NEWS_API_URL=<your news API endpoint>
WEATHER_API_URL=<your weather API endpoint>
```

See .env.example

### Run the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Assumptions and Trade-offs

- Weather and news are fetched at build/request time in a React Server Component. There is no client-side polling or revalidation. The page shows a snapshot of the data at render time. This keeps the client bundle small and avoids exposing API keys to the browser.
- The API URLs (including tokens) are read directly from environment variables. A production setup would benefit from a backend proxy or edge function to avoid embedding keys in the URL.
- Article filtering happens in-browser over the already-fetched dataset rather than querying the API with search params. This is fine for the current payload size but wouldn't scale to thousands of articles.
- If the weather API fails, a simple "unavailable" message is shown. News failure returns an empty array. There are no retry mechanisms or detailed error messages for the user.
- The layout adapts from mobile to desktop, but no special consideration was given to tablet-specific layouts or very large screens.

## Time Spent

About 2–3 hours total.

## What I Would Improve With More Time

- Add ISR or client-side polling for keeping the dashboard up-to-date without having to do a full page reload
- Add skeleton placeholders while data is being fetched
- Add tests for utility functions and the data-fetching layer
- Add accessibility (aria attributes, focus states etc.)
- Pagination or infinite scroll (with a different layout). The free tier of the news api limits amount of articles from the response.
- Error boundaries, retry actions
- Caching to reduce API calls and improve load times
