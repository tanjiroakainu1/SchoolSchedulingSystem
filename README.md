# School Scheduling System

A role-based academic scheduling platform built with React, TypeScript, Vite, and Tailwind CSS.

**Developer:** Raminder Jangao

## Features

- Public landing page with system flow overview
- Login & registration with demo quick-access for all roles
- Role dashboards: Super Admin, Registrar, Faculty, Student
- Sidebar navigation with responsive hamburger menu
- Scheduly AI floating chatbot with live system knowledge
- Conflict detection, notifications, reports, and timetable tools

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

This project is configured for Vercel via [`vercel.json`](./vercel.json).

### Option 1 — Vercel Dashboard

1. Push the repo to GitHub, GitLab, or Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects **Vite** — no extra settings needed.
4. Deploy.

### Option 2 — Vercel CLI

```bash
npm i -g vercel
vercel
```

For production:

```bash
vercel --prod
```

### SPA routing

Client-side routes (`/login`, `/super-admin`, `/registrar`, `/faculty`, `/student`, etc.) are handled by Vercel rewrites to `index.html`.

### Demo login

All demo accounts use password: `password123`

| Role | Email |
|------|-------|
| Super Admin | admin@school.edu |
| Registrar | registrar@school.edu |
| Faculty | jreyes@school.edu |
| Student | acruz@student.edu |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Oxlint |
| `npm run test:chatbot` | Run Scheduly AI chatbot tests |
