# Habit Tracker PWA

A mobile-first Habit Tracker built with Next.js (App Router), TypeScript, and Tailwind CSS, using localStorage for persistence and supporting Progressive Web App (PWA) capabilities.

This project implements all requirements defined in the Stage 3 Technical Requirements Document (TRD).

**TRD:**
https://docs.google.com/document/d/1Gp2_0pZWWnQbLc6zLS1U4wI6kO8DCC07Ea5JFjOYXlI/edit?tab=t.0#heading=h.ng83bkry08h9

**Live Demo:**
https://habit-tracker-pwa-app.vercel.app/

**Repository:**
https://github.com/LaDonaAmor/habit-tracker

---

## Project Overview

This application allows users to:

- Sign up and log in
- Create, edit, and delete habits
- Mark habits as completed daily
- Track streaks based on consecutive completions
- Persist all data locally using browser storage
- Use the app offline via PWA support

The app is designed to be:

- Mobile-first
- Fully client-side
- Offline-capable
- Deterministically testable

---

## Setup Instructions

Clone the repository:

```bash
git clone https://github.com/LaDonaAmor/habit-tracker.git
cd habit-tracker
```

Install dependencies:

```bash
npm install
```

---

## Run Instructions

### Development mode

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

### Production mode (required for PWA + E2E tests)

```bash
npm run build
npm run start
```

---

## Test Instructions

### Run unit tests

```bash
npm run test:unit
```

### Run integration tests

```bash
npm run test:integration
```

### Run end-to-end tests (Playwright)

```bash
npm run test:e2e
```

### Run all tests

```bash
npm test
```

### Run coverage report

```bash
npx vitest run --coverage
```

Minimum requirement:

- 80% line coverage for `src/lib` (TRD §17)

---

## Local Persistence Structure (TRD §5)

The app uses **localStorage** with three keys:

| Key                     | Structure                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `habit-tracker-users`   | `User[]` → `{ id, email, password, createdAt }`                                    |
| `habit-tracker-session` | `Session \| null` → `{ userId, email }`                                            |
| `habit-tracker-habits`  | `Habit[]` → `{ id, userId, name, description, frequency, createdAt, completions }` |

### Notes:

- `completions` is an array of unique `YYYY-MM-DD` strings
- Data is scoped per user using `userId`
- Dashboard filters habits by active session

---

## PWA Implementation (TRD §13)

The app supports offline usage via a basic service worker.

### Components:

- `public/manifest.json`
  - Defines app name, icons (192px, 512px)
  - Uses `display: standalone`
  - Sets theme and background colors

- `public/sw.js`
  - Caches app shell during install
  - Uses **cache-first strategy**
  - Falls back to cached `/` when offline

- `PWARegister.tsx`
  - Registers the service worker on the client only

### Behavior:

- App loads even when offline (after first visit)
- Cached shell prevents crashes without network

---

## Trade-offs and Limitations

- ❌ Passwords are stored in plaintext (acceptable for local-only spec)
- ❌ No backend or remote sync
- ❌ Clearing browser storage deletes all data
- ❌ Service worker cache requires manual version bump to update
- ❌ Offline mode is basic (no background sync)

These decisions prioritize:

- Simplicity
- Deterministic testing
- TRD compliance

---

## Test File → Behavior Mapping (TRD §19)

| File                                    | Behavior Verified                                              |
| --------------------------------------- | -------------------------------------------------------------- |
| `tests/unit/slug.test.ts`               | Slug generation (lowercase, trim, sanitize, hyphenate)         |
| `tests/unit/validators.test.ts`         | Habit name validation rules and exact error messages           |
| `tests/unit/streaks.test.ts`            | Streak calculation logic (edge cases, gaps, duplicates)        |
| `tests/unit/habits.test.ts`             | Toggle completion logic (add/remove, immutability, uniqueness) |
| `tests/unit/storage.test.ts`            | LocalStorage read/write, fallback behavior, session clearing   |
| `tests/integration/auth-flow.test.tsx`  | Signup/login flows and error handling                          |
| `tests/integration/habit-form.test.tsx` | Habit creation, editing, deletion, validation, streak updates  |
| `tests/e2e/app.spec.ts`                 | Full user flows, routing, persistence, offline support         |

---

## TRD Requirement Mapping

| TRD §  | Requirement        | Implementation                              |
| ------ | ------------------ | ------------------------------------------- |
| §3     | Stack              | Next.js, TypeScript, Tailwind               |
| §4     | Routing            | `/`, `/login`, `/signup`, `/dashboard`      |
| §5     | Storage            | `src/lib/storage.ts`                        |
| §8     | Types              | `src/types/*`                               |
| §9     | Utilities          | `src/lib/*`                                 |
| §10    | Test IDs           | Present across all components               |
| §11    | Auth behavior      | `src/lib/auth.ts`                           |
| §12    | Habit logic        | Dashboard + components                      |
| §13    | PWA                | `manifest.json`, `sw.js`, `PWARegister.tsx` |
| §14–15 | UI & accessibility | Semantic HTML + Tailwind                    |
| §16    | Tests              | Unit, integration, E2E                      |
| §17    | Coverage           | Vitest config (≥80%)                        |
| §18    | Scripts            | `package.json`                              |
| §19    | README             | This document                               |

---

## Deployment

Recommended: **Vercel**

```bash
npm run build
```

Then deploy via Vercel dashboard connected to GitHub.

---

## Notes

- All features are implemented according to TRD specifications
- Tests are deterministic and aligned with required behaviors
- App is fully functional offline after initial load

---

## License

Built for the HNGi14 internship Task.

## Author

Racheal I. Ogunmodede (TechNurse)

---

```

```
