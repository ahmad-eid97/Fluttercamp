# FlutterCamp 🎯

**FlutterCamp** is a modern, full-featured learning platform for the **Flutter framework** — project-based courses that take learners from their first widget to a published, cross-platform app.

> Redesigned, modernized, and engineered by **Hassan Ali**.

---

## ✨ Highlights

- **Modern, professional UI** — a complete redesign with a cohesive design system, on-brand palette (FlutterCamp blue `#1671b2` + orange `#ff7300`), fluid typography, layered shadows, and tasteful motion.
- **Fully self-contained** — ships with an advanced **in-app mock backend**. No real API is contacted; all data is generated as a realistic, internally-consistent, Flutter-themed dataset (courses, instructors, tracks, blogs, reviews, dashboards).
- **Bilingual & RTL** — full Arabic (RTL) and English (LTR) support.
- **Preset demo accounts** — sign in instantly:
  - **Student** — `student@fluttercamp.dev` / `password`
  - **Instructor** — `instructor@fluttercamp.dev` / `password`

## 🛠️ Tech Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript 5**
- **MUI 9** · **Tailwind CSS 3** · **Sass** (CSS Modules)
- **Redux Toolkit** · **Swiper** · **ApexCharts / Chart.js** · **Iconify**
- **@faker-js/faker** + a custom axios mock adapter for the demo backend

## 🚀 Getting Started

```bash
npm install --legacy-peer-deps
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve production build on :4025
```

The app runs entirely on mock data (`NEXT_PUBLIC_USE_MOCKS=true`). The mock layer lives in [`src/mocks/`](src/mocks/) — an axios adapter (`adapter.ts`) routes every request (`router.ts`) to domain handlers (`handlers/`) backed by a seeded, internally-consistent dataset (`seed/`).

## 📂 Project Structure

- `src/app/[locale]/` — App Router pages (public site + dashboard panel), Arabic/English locales
- `src/components/` — UI components (`ui/` design-system primitives, `Common/` chrome, feature areas, `Panel/` dashboard)
- `src/mocks/` — the in-app mock backend
- `src/styles/` — design tokens (`variables.scss`, `globals.css`) + Tailwind config
- `src/api/` — typed API client modules (intercepted by the mock adapter)

---

## 👤 Author

**Hassan Ali** — design & engineering.
