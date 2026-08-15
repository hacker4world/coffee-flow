# Project Architecture & Engineering Overview

## 1. Project Summary
- **Purpose:** "CoffeeFlow" is a mobile-styled coffee shop landing/menu UI built with React. It displays a hero section and a list of coffee product categories (Espresso, Cold Brews, Teas, Pastries) with a header and bottom navigation bar. It is a static, frontend-only showcase with no backend or business logic.
- **Architecture:** Single-page frontend application (Vite + React SPA). No routing library, no state management library, no backend. Data is hardcoded in a local data module.

## 2. Core Tech Stack
- **Languages:** TypeScript (~6.0.2), HTML, CSS
- **Frontend:** React 19.2, Vite 8.2, Tailwind CSS 4.3 (via `@tailwindcss/vite` plugin)
- **Backend:** N/A
- **Database & ORM:** N/A
- **Infrastructure:** Vite build tooling; ESLint 10 for linting. No Docker, CI/CD, or deployment config found.

## 3. Directory Map & File Inventory (Where things live)
- `/` (Root): Vite + React project config and metadata.
  - Files: `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `index.html`, `.gitignore`, `README.md`
- `/public`: Static assets served as-is.
  - Files: `favicon.svg`, `icons.svg`
- `/src`: All application source code.
  - Files: `main.tsx` (entry point), `App.tsx` (root component), `index.css`, `App.css`
- `/src/components`: Reusable UI components (PascalCase `.tsx` files).
  - Files: `Header.tsx`, `HeroSection.tsx`, `CategoryList.tsx`, `CategoryCard.tsx`, `BottomNav.tsx`
- `/src/data`: Hardcoded static data module.
  - Files: `coffeeData.ts` (exports `categories` array with `id`, `name`, `description`, `totalProducts`, `image`)
- `/src/assets`: Static image assets.
  - Files: `hero.png`, `react.svg`, `vite.svg`

## 4. Architecture & Data Flow
- **Routing/Wiring:** No router. `main.tsx` mounts `<App />` into `#root` inside React `StrictMode`. `App.tsx` composes the layout: `<Header />`, `<HeroSection />`, `<CategoryList />`, and `<BottomNav />` inside a `max-w-md` mobile-width container.
- **State/Data Management:** No state management library. Component state is not used; data flows one-way from the static `src/data/coffeeData.ts` module into `CategoryList`/`CategoryCard` components. No persistence or API calls.
- **Auth Strategy:** N/A (no authentication).

## 5. Execution Commands (DO NOT GUESS THESE)
- **Install Dependencies:** `npm install`
- **Run Dev Server:** `npm run dev`
- **Run Linter/Formatter:** `npm run lint` (ESLint; no formatter configured)
- **Run Tests:** Not Found (no test framework or test script in `package.json`)
- **Build:** `npm run build` (runs `tsc -b && vite build`)
- **Preview:** `npm run preview`

## 6. Coding Conventions & QA
- **Patterns:** Simple functional React components with default exports. Data is separated into a static module (`src/data`) rather than fetched. Tailwind utility classes used inline for styling (mobile-first `max-w-md` layout).
- **Naming Conventions:** Component files use PascalCase (`Header.tsx`, `CategoryCard.tsx`); data/config files use camelCase (`coffeeData.ts`). Path alias `@` maps to `src/` (configured in `vite.config.ts`).
- **Testing Setup:** Not Found. No test runner, no test files, and no test script configured.

**Note:** This is a small, static frontend project. There is no backend, database, routing, state management, or test infrastructure — the main agent should expect to add these if features require them.
