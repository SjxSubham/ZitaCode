<h1 align="center">ZitaCode</h1>
<p align="center">
  A fast, multi-language coding playground with AI tools, snippets, and quizzes.
</p>

<p align="center">
  <a href="https://dub.sh/ZitaCode">Live demo</a> ·
  <a href="#features">Features</a> ·
  <a href="#how-it-works">How it works</a> ·
  <a href="#tech-stack">Tech Stack</a> ·
  <a href="#getting-started">Getting Started</a>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/422ce720-fb8f-4439-9e24-1a7f5d9d4e64" alt="ZITACODE" width="1000" />
</p>

> **Status:** Work in Progress

---

## What is ZitaCode?

ZitaCode is a developer-focused playground where you can write code in multiple languages, get AI feedback, and save/share snippets. It’s designed to be fast and clean, with a modern stack and a simple flow from typing to results.

---

## Features

- **Monaco-powered editor** with language presets and themes.
- **AI code review** via **Gemini**.
- **AI quiz generation** via **Mistral**.
- **Snippet sharing** with public URLs.
- **Buckets** to organize saved snippets.
- **Authentication** with **Clerk**.
- **Convex** backend for data + server functions.
- **PWA-ready** offline caching (`next-pwa`).

---

## How it works

### System architecture
```mermaid
flowchart LR
  subgraph Client
    UI[Next.js UI]
    Editor[Monaco Editor]
    SW[PWA Service Worker]
    Cache[(Offline Cache)]
  end

  subgraph App[Next.js App Router]
    API[API Routes]
    Auth[Clerk Auth]
  end

  subgraph Data[Convex Backend]
    Fn[Convex Functions]
    DB[(Convex DB)]
  end

  Gemini[Gemini API]
  Mistral[Mistral API]

  UI --> Editor
  UI --> API
  UI --> Auth
  UI --> Fn

  API --> Gemini
  API --> Mistral

  Fn --> DB

  SW --> Cache
  UI --> Cache
```

### AI code review flow (Gemini)
```mermaid
sequenceDiagram
  participant U as User
  participant UI as Editor UI
  participant API as /api/gemini/review
  participant G as Gemini

  U->>UI: Request review
  UI->>API: POST code + language
  API->>G: Generate review
  G-->>API: Review text
  API-->>UI: Response
  UI-->>U: Render feedback
```

### Quiz generation flow (Mistral)
```mermaid
sequenceDiagram
  participant U as User
  participant UI as Quiz UI
  participant API as /api/quiz/generate
  participant M as Mistral

  U->>UI: Pick category + difficulty
  UI->>API: POST quiz request
  API->>M: Generate MCQs
  M-->>API: JSON questions
  API-->>UI: Parsed quiz
  UI-->>U: Render quiz
```

---

## Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,nodejs" alt="Core tech icons" />
</p>

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Monaco Editor**
- **Convex**
- **Clerk Auth**
- **Gemini AI** + **Mistral AI**
- **PWA** (`next-pwa` + Workbox)

---

## Supported Languages

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="42" height="42" alt="JavaScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="42" height="42" alt="TypeScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" width="42" height="42" alt="Python" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" width="42" height="42" alt="Java" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" width="42" height="42" alt="Go" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" width="42" height="42" alt="Rust" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" width="42" height="42" alt="C++" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" width="42" height="42" alt="C#" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" width="42" height="42" alt="Ruby" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" width="42" height="42" alt="Swift" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" width="42" height="42" alt="C" />
</p>

> Language metadata includes **Piston runtime** versions for each language.

---

## Getting Started

### Prerequisites
- Node.js (LTS recommended)
- npm

### Install
```/dev/null/commands.sh#L1-2
npm install
npm run dev
```

### Environment Variables
Create a `.env.local` file with the following keys:
```/dev/null/.env.local#L1-5
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_WEBHOOK_SECRET=
GEMINI_API_KEY=
MISTRAL_API_KEY=
```

### Scripts
```/dev/null/commands.sh#L1-4
npm run dev
npm run build
npm run start
npm run lint
```

---

## Security Notes

- Never commit real API keys to Git. `.env*` is ignored by default.
- If a key is exposed, rotate it immediately and rewrite history if needed.

---

## Inspiration

- Reference: https://youtu.be/fGkRQgf6Scw?si=sJ1ttB7TAOrcUx3u
