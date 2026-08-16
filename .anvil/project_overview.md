# Project Architecture & Engineering Overview

## 1. Project Summary
- **Purpose:** "CoffeeFlow" is a full-featured coffee shop management system with both customer-facing and admin interfaces. It supports multi-language (French/Arabic), product variants, cart management, order processing, and admin operations for tables, categories, products, and orders.
- **Architecture:** Single-page React application (Vite + React SPA) with client-side routing (React Router v7), context-based state management, and localized UI. Features include customer ordering flow, admin dashboard, and multi-language support.

## 2. Core Tech Stack
- **Languages:** TypeScript (~6.0.2), HTML, CSS
- **Frontend:** React 19.2, Vite 8.2, Tailwind CSS 4.3 (via `@tailwindcss/vite` plugin), React Router v7
- **State Management:** React Context API (CartContext, CategoryContext, OrderContext, ProductContext, TableContext, LanguageContext)
- **Internationalization:** Custom i18n system with French and Arabic support
- **Backend:** N/A (frontend-only with local data storage)
- **Infrastructure:** Vite build tooling; ESLint 10 for linting. No Docker, CI/CD, or deployment config found.

## 3. Directory Map & File Inventory (Where things live)
- `/` (Root): Vite + React project config and metadata.
  - Files: `package.json`, `package-lock.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `index.html`, `.gitignore`, `README.md`
- `/public`: Static assets served as-is.
  - Files: `favicon.svg`, `icons.svg`
- `/src`: All application source code.
  - Files: `main.tsx` (entry point), `App.tsx` (root component with routing), `index.css`, `App.css`
- `/src/components`: Reusable UI components (PascalCase `.tsx` files).
  - Customer components: `Header.tsx`, `HeroSection.tsx`, `CategoryList.tsx`, `CategoryCard.tsx`, `ProductCard.tsx`, `BottomNav.tsx`, `MultiItemModal.tsx`, `TableList.tsx`
  - Admin components: `AdminBottomNav.tsx`, `AdminCategoryList.tsx`, `AdminOrderList.tsx`, `AdminProductList.tsx`
- `/src/context`: React Context providers for state management.
  - `CartContext.tsx` (cart items, variants, quantities, notes)
  - `CategoryContext.tsx` (categories CRUD)
  - `OrderContext.tsx` (orders CRUD)
  - `ProductContext.tsx` (products CRUD with variants)
  - `TableContext.tsx` (tables CRUD)
  - `LanguageContext.tsx` (French/Arabic toggle with translation helper)
- `/src/data`: Local data modules (seed data).
  - `coffeeData.ts` (category data)
  - `products.ts` (product data with variants)
  - `orders.ts` (order data)
  - `tables.ts` (table data)
- `/src/i18n`: Internationalization support.
  - `LanguageContext.tsx` (language state and toggle)
  - `translations.ts` (French and Arabic UI strings)
- `/src/pages`: Page components organized by feature.
  - Customer pages: `HomePage.tsx`, `LoginPage.tsx`, `MenuPage.tsx`, `ProductDetailPage.tsx`, `OrderPage.tsx`, `OrderConfirmedPage.tsx`, `NotificationsPage.tsx`
  - Admin pages: `AdminPage.tsx`, `AddCategoryPage.tsx`, `EditCategoryPage.tsx`, `AddProductPage.tsx`, `EditProductPage.tsx`, `AddTablePage.tsx`, `EditTablePage.tsx`, `OrderDetailPage.tsx`
- `/src/assets`: Static image assets.
  - Files: `hero.png`, `react.svg`, `vite.svg`

## 4. Architecture & Data Flow
- **Routing/Wiring:** React Router v7 with declarative routes in `App.tsx`. Routes include customer paths (`/`, `/login`, `/menu`, `/menu/:categoryId`, `/product/:productId`, `/cart`, `/order-confirmed`, `/notifications`) and admin paths (`/admin`, `/admin/tables`, `/admin/categories`, `/admin/products`, `/admin/orders`). Navigation uses `<Link>` or `useNavigate()`.
- **State/Data Management:** React Context API provides centralized state:
  - `CartContext`: Manages cart items with variants, quantities (1-10), notes, and total price calculation
  - `CategoryContext`: CRUD operations for categories
  - `OrderContext`: CRUD operations for orders
  - `ProductContext`: CRUD operations for products with variant groups (size, milk, etc.)
  - `TableContext`: CRUD operations for tables
  - `LanguageContext`: Active language state (fr/ar) with `t()` translation helper
- **Internationalization:** Custom i18n system with nested translation keys. Components use `useLanguage()` hook to access language state and `t()` helper for translations. Supports `{placeholder}` token substitution.
- **Auth Strategy:** Login page exists (`/login`) but no backend authentication implemented; appears to be a UI placeholder.

## 5. Execution Commands (DO NOT GUESS THESE)
- **Install Dependencies:** `npm install`
- **Run Dev Server:** `npm run dev`
- **Run Linter/Formatter:** `npm run lint` (ESLint; no formatter configured)
- **Run Tests:** Not Found (no test framework or test script in `package.json`)
- **Build:** `npm run build` (runs `tsc -b && vite build`)
- **Preview:** `npm run preview`

## 6. Coding Conventions & QA
- **Patterns:** Functional React components with default exports. Context providers wrap the app in `main.tsx`. Data flows from Context providers to components. Tailwind utility classes used inline for styling (mobile-first `max-w-md` layout).
- **Naming Conventions:** Component files use PascalCase (`Header.tsx`, `CategoryCard.tsx`); data/config files use camelCase (`coffeeData.ts`). Path alias `@` maps to `src/` (configured in `vite.config.ts`).
- **Type Safety:** Full TypeScript coverage with interfaces for all contexts, data structures, and props.
- **Testing Setup:** Not Found. No test runner, no test files, and no test script configured.

**Note:** This is a feature-rich frontend application with routing, state management, i18n, and admin functionality. There is no backend, database, or authentication — the main agent should expect to add these if features require them.