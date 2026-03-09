---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: [requirements.md, _bmad-output/planning-artifacts/ux-design-specification.md]
workflowType: 'architecture'
project_name: 'kd-ramadhan-challenge-2026'
user_name: 'Muhaiminjuhari'
date: '2026-03-09'
---

# Architecture Decision Document

_KD Ramadhan Challenge 2026 — Full-Stack Web Application_

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
12 FRs covering three domains:

- **Map & Discovery (FR-001 to FR-005):** Interactive Leaflet map with dark tiles, neon green markers, pin click → detail view
- **Content Display (FR-003, FR-004, FR-006, FR-007):** Team directory grid, footer with social links, sponsor logo section
- **Admin CRUD (FR-008 to FR-012):** Auth-gated login, submission form with image upload, auto-pin on map after create

**Non-Functional Requirements:**
9 NFRs with measurable targets:

- Performance: < 3s page load, < 2s pin rendering for 200 pins
- Concurrency: 100 simultaneous visitors
- Image: Max 5 MB upload
- Security: bcrypt password hashing, HTTP-only session
- Responsive: 375px–2560px
- Accessibility: WCAG 2.1 AA (Lighthouse ≥ 85)
- Deployment: Zero-downtime Railway Nixpacks

**Scale & Complexity:**

- Primary domain: Full-stack web application
- Complexity level: **Low-Medium** — CRUD-centric with map integration
- Estimated architectural components: ~8 (Map, Cards, Detail View, Footer, Auth, Admin Form, API Layer, Database)

### Technical Constraints & Dependencies

- **Railway deployment** — No Docker, Nixpacks auto-detect only
- **PostgreSQL** — Railway-managed, migrations via Prisma
- **Leaflet** — Free map solution, no API key needed
- **Shadcn UI** — Tailwind-based component library
- **Image storage** — Must persist across deploys (cannot use ephemeral filesystem)

### Cross-Cutting Concerns

- Authentication spans admin routes and API endpoints
- Image handling affects form UI, API upload, storage, and public display
- KD theme (neon green, dark mode) applies to every component including map

---

## Starter Template Evaluation

### Primary Technology Domain

Full-stack web application — single deployable unit (frontend + API + database)

### Starter Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Next.js (create-next-app)** | SSR for SEO, API routes, single deploy, Railway-native | Slightly heavier for simple CRUD |
| T3 Stack | Type-safe, tRPC, Prisma included | Over-engineered for this scope |
| Vite + Express | Lightweight, fast dev | Two separate deploys on Railway |

### Selected Starter: Next.js 14+ (App Router)

**Rationale:**

- Single deployable unit: frontend + API routes in one project → simplest Railway deploy
- App Router provides server components for fast initial load (map page SEO)
- Built-in API routes eliminate need for separate backend
- Shadcn UI natively supports Next.js
- Prisma integrates seamlessly for database access

**Initialization Command:**

```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**Architectural Decisions Provided by Starter:**

- **Language & Runtime:** TypeScript 5.x, Node.js
- **Styling Solution:** Tailwind CSS 3.x (configured)
- **Build Tooling:** Next.js bundler (Turbopack dev, Webpack prod)
- **Code Organization:** App Router (`src/app/`) with file-based routing
- **Development Experience:** Hot reload, TypeScript strict mode, ESLint

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**

- Database ORM: Prisma
- Auth: NextAuth.js Credentials provider
- Map: Leaflet + React Leaflet
- Image storage: Cloudinary (free tier)

**Important Decisions (Shape Architecture):**

- API pattern: Next.js Server Actions + API Routes
- State management: React Server Components + minimal client state
- Form handling: React Hook Form + Zod validation

**Deferred Decisions (Post-MVP):**

- CDN/caching layer
- CI/CD pipeline
- E2E testing framework

### Data Architecture

| Decision | Choice | Version | Rationale |
|----------|--------|---------|-----------|
| Database | PostgreSQL | 16.x | Railway-managed, reliable relational store |
| ORM | Prisma | 6.x | Type-safe, migration tooling, Railway-friendly |
| Migration Strategy | Prisma Migrate | — | `npx prisma migrate deploy` on Railway |
| Seeding | Prisma seed script | — | Admin user seeded on first deploy |

**Prisma Schema:**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}

model Submission {
  id           String   @id @default(cuid())
  appName      String
  teamName     String
  teamMembers  String[] @default([])
  description  String
  featureImage String
  techStack    String[]
  mosqueName   String
  latitude     Float
  longitude    Float
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### Authentication & Security

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Auth Library | NextAuth.js v5 (Auth.js) | Simple Credentials provider, session management built-in |
| Auth Strategy | Credentials (email + password) | Single admin, no OAuth needed |
| Password Hashing | bcrypt (12 rounds) | Industry standard, specified in NFR-005 |
| Session Storage | JWT (HTTP-only cookie) | Stateless, no session DB table needed |
| Route Protection | Next.js Middleware | Intercept `/admin/*` routes, redirect to login |
| CSRF | Built-in NextAuth protection | Automatic with form submissions |

### API & Communication

| Decision | Choice | Rationale |
|----------|--------|-----------|
| API Pattern | Next.js API Routes (`/api/*`) | Co-located, single deploy |
| Data Fetching (Public) | React Server Components | Direct Prisma queries, no API roundtrip |
| Data Mutation (Admin) | Server Actions | Type-safe form handling, progressive enhancement |
| API Response Format | `{ data, error }` wrapper | Consistent client-side handling |
| Image Upload | Cloudinary Upload API | Free tier (25 GB), persistent, CDN-backed |
| Error Format | `{ error: { message, code } }` | Machine-parseable, user-displayable |

### Frontend Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Component Library | Shadcn UI | Customizable, accessible, copy-paste model |
| State Management | React Server Components (no global store) | Simple CRUD, no complex client state |
| Map Library | React Leaflet 5.x + Leaflet 1.9.x | Free, dark tiles, custom markers |
| Form Handling | React Hook Form + Zod | Validation, type-safety, good UX |
| Tile Provider | CartoDB Dark Matter | Free, dark theme, no API key |
| Font (Heading) | Press Start 2P (Google Fonts) | Pixelated KD brand aesthetic |
| Font (Body) | Inter (Google Fonts) | Clean, modern readability |
| Icons | Lucide React | Included with Shadcn UI |

### Infrastructure & Deployment

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Platform | Railway | User requirement, Nixpacks auto-detect |
| Build | `npm run build` | Standard Next.js build, Railway detects automatically |
| Database Hosting | Railway PostgreSQL | Same-platform, internal networking |
| Image CDN | Cloudinary | Offload image storage from Railway volume |
| Environment Variables | Railway dashboard + `.env.local` (dev) | Standard Next.js env pattern |
| Start Command | `npm start` | Next.js production server |
| Health Check | `/api/health` endpoint | Railway health monitoring |

**Railway Configuration (railway.json or env vars):**

```json
{
  "build": { "builder": "NIXPACKS" },
  "deploy": {
    "startCommand": "npx prisma migrate deploy && npm start",
    "healthcheckPath": "/api/health"
  }
}
```

**Required Environment Variables:**

| Variable | Source |
|----------|--------|
| `DATABASE_URL` | Railway PostgreSQL plugin (auto-injected) |
| `NEXTAUTH_SECRET` | Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Railway public domain URL |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary dashboard |
| `ADMIN_EMAIL` | Initial admin email (for seed script) |
| `ADMIN_PASSWORD` | Initial admin password (for seed script) |

---

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Database Naming (Prisma):**

- Models: PascalCase singular — `Submission`, `Admin`
- Fields: camelCase — `teamName`, `featureImage`, `createdAt`
- Relations: camelCase — `submission.admin`

**API Naming:**

- Routes: kebab-case — `/api/submissions`, `/api/auth/login`
- Query params: camelCase — `?mosqueId=xxx`

**Code Naming:**

- Components: PascalCase — `MapView.tsx`, `SubmissionCard.tsx`
- Files: kebab-case for routes, PascalCase for components — `submission-card.tsx`
- Functions: camelCase — `getSubmissions()`, `createSubmission()`
- Variables: camelCase — `teamMembers`, `mapCenter`
- Types/Interfaces: PascalCase with `I` prefix only for interfaces — `Submission`, `CreateSubmissionInput`

### Structure Patterns

- **Components:** By feature, not by type
- **Tests:** Co-located `__tests__/` directories (when added)
- **Utils:** Shared in `src/lib/`
- **Config:** Root-level config files (`.env`, `next.config.ts`, `tailwind.config.ts`)

### Format Patterns

**API Responses:**

```typescript
// Success
{ data: Submission }

// Error
{ error: { message: string, code: string } }

// List
{ data: Submission[] }
```

**Date Handling:** ISO 8601 strings in JSON, `Date` objects in server code

### Process Patterns

**Error Handling:**

- Server Actions: Return `{ error: { message, code } }` — never throw to client
- API Routes: Return appropriate HTTP status codes with error JSON
- Client: Display toast via Shadcn `Toast` component

**Loading States:**

- Server Components: Suspense boundaries with skeleton loaders
- Client forms: Button disabled with spinner during submission
- Map: Skeleton placeholder until tiles and data load

**Image Upload Flow:**

1. Admin selects file in form
2. Client-side validation (type, size ≤ 5 MB)
3. Upload to Cloudinary via server action
4. Store returned Cloudinary URL in `featureImage` field
5. Display via `<Image>` component with Cloudinary URL

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```
ramadhan-challenge26/
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── components.json              # Shadcn UI config
├── .env.local                   # Local dev env vars
├── .env.example                 # Template for env vars
├── .gitignore
├── railway.json                 # Railway deployment config
├── logos/                       # Sponsor logos (static assets)
│   ├── google.png
│   ├── kdlogo.png
│   └── lovable.png
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── seed.ts                  # Admin seeder script
│   └── migrations/              # Auto-generated migrations
├── public/
│   └── fonts/                   # Self-hosted fonts (if needed)
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind + KD theme CSS
│   │   ├── layout.tsx           # Root layout (fonts, metadata)
│   │   ├── page.tsx             # Homepage (map + teams + sponsors + footer)
│   │   ├── submission/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Submission detail page (mobile fallback)
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.tsx     # Admin login page
│   │   │   ├── page.tsx         # Admin dashboard (submissions table)
│   │   │   └── submissions/
│   │   │       └── new/
│   │   │           └── page.tsx # Add submission form
│   │   └── api/
│   │       ├── health/
│   │       │   └── route.ts     # Health check endpoint
│   │       ├── submissions/
│   │       │   └── route.ts     # GET submissions (public API for map)
│   │       ├── upload/
│   │       │   └── route.ts     # Image upload to Cloudinary
│   │       └── auth/
│   │           └── [...nextauth]/
│   │               └── route.ts # NextAuth handler
│   ├── components/
│   │   ├── ui/                  # Shadcn UI base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── table.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   └── tooltip.tsx
│   │   ├── map/
│   │   │   ├── map-view.tsx         # Main Leaflet map (client component)
│   │   │   ├── mosque-marker.tsx    # Custom neon green marker
│   │   │   └── map-tooltip.tsx      # Styled tooltip for pin hover
│   │   ├── submissions/
│   │   │   ├── submission-card.tsx   # Team/app card for grid
│   │   │   ├── submission-detail.tsx # Detail modal/page content
│   │   │   └── submission-grid.tsx  # Responsive grid layout
│   │   ├── layout/
│   │   │   ├── header.tsx           # Site header with nav
│   │   │   ├── footer.tsx           # Footer with social links
│   │   │   ├── hero.tsx             # Hero section with CTA
│   │   │   └── supported-by.tsx     # Sponsor logos section
│   │   └── admin/
│   │       ├── login-form.tsx       # Auth form
│   │       ├── submission-form.tsx  # Add submission form
│   │       ├── submissions-table.tsx # Admin table view
│   │       └── team-members-input.tsx # Multi-input for members
│   ├── lib/
│   │   ├── db.ts                # Prisma client singleton
│   │   ├── auth.ts              # NextAuth configuration
│   │   ├── cloudinary.ts        # Cloudinary upload helper
│   │   ├── utils.ts             # Shadcn cn() + general utils
│   │   └── validations.ts      # Zod schemas for forms
│   ├── actions/
│   │   ├── submissions.ts       # Server actions: create, delete
│   │   └── auth.ts              # Server actions: login
│   ├── types/
│   │   └── index.ts             # Shared TypeScript types
│   └── middleware.ts            # Auth route protection
```

### Architectural Boundaries

**API Boundaries:**

- Public data: Server Components query Prisma directly (no API route needed)
- Map client component: Fetches from `/api/submissions` (client-side Leaflet needs browser)
- Admin mutations: Server Actions → Prisma → PostgreSQL
- Image upload: `/api/upload` → Cloudinary API

**Component Boundaries:**

- Map components are `"use client"` (Leaflet requires browser DOM)
- Form components are `"use client"` (React Hook Form needs interactivity)
- Layout components (header, footer, hero) are Server Components
- Submission cards/grid are Server Components; detail modal is Client Component

**Data Flow:**

```
[Browser] → Server Component → Prisma → PostgreSQL
[Browser] → Client Component → /api/submissions → Prisma → PostgreSQL
[Admin Form] → Server Action → Prisma → PostgreSQL + Cloudinary
```

### Requirements to Structure Mapping

| FR | Component(s) |
|----|-------------|
| FR-001 Map with pins | `components/map/map-view.tsx`, `/api/submissions/route.ts` |
| FR-002 Pin click detail | `components/submissions/submission-detail.tsx`, `components/ui/dialog.tsx` |
| FR-003 Team directory | `components/submissions/submission-grid.tsx`, `components/submissions/submission-card.tsx` |
| FR-005 Dark map theme | `components/map/map-view.tsx` (CartoDB Dark Matter tiles) |
| FR-006 Footer links | `components/layout/footer.tsx` |
| FR-007 Sponsor logos | `components/layout/supported-by.tsx`, `logos/` |
| FR-008 Admin login | `app/admin/login/page.tsx`, `components/admin/login-form.tsx`, `lib/auth.ts` |
| FR-009 Submission form | `app/admin/submissions/new/page.tsx`, `components/admin/submission-form.tsx` |
| FR-010 Auto-pin | `actions/submissions.ts`, `/api/submissions/route.ts` |
| FR-011 Route guard | `middleware.ts` |
| FR-012 Image upload | `/api/upload/route.ts`, `lib/cloudinary.ts` |

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices are fully compatible: Next.js 14+ App Router with Prisma for data, NextAuth for auth, React Leaflet for maps, Shadcn UI for components, Cloudinary for images, and Railway for deployment. No version conflicts.

**Pattern Consistency:**
Naming patterns (camelCase for code, PascalCase for components) align with Next.js and React conventions. API response format is consistent across all endpoints.

**Structure Alignment:**
Project structure follows Next.js App Router conventions. Feature-based component organization maps cleanly to the 12 functional requirements.

### Requirements Coverage ✅

| Requirement | Covered By |
|-------------|-----------|
| FR-001–FR-012 | All mapped to specific components and routes (see table above) |
| NFR-001 (< 3s load) | Server Components + Leaflet lazy loading |
| NFR-002 (200 pins < 2s) | Leaflet marker clustering |
| NFR-003 (100 concurrent) | Railway auto-scaling + Next.js SSR |
| NFR-004 (5 MB upload) | Zod validation + API route size check |
| NFR-005 (bcrypt + HTTP-only) | NextAuth Credentials + JWT session |
| NFR-006 (daily backups) | Railway PostgreSQL backup config |
| NFR-007 (375px–2560px) | Tailwind responsive classes + UX breakpoints |
| NFR-008 (WCAG 2.1 AA) | Shadcn accessible components + Lighthouse audit |
| NFR-009 (Nixpacks deploy) | `railway.json` with Nixpacks builder |

### Implementation Readiness ✅

**Overall Status:** READY FOR IMPLEMENTATION

**Confidence Level:** High

**Key Strengths:**

- Single deployable unit simplifies Railway deployment
- Prisma migrations provide safe database schema evolution
- Server Components reduce client JavaScript for better performance
- Cloudinary offloads image storage complexity

**Areas for Future Enhancement:**

- Add CI/CD pipeline (GitHub Actions)
- Implement E2E tests (Playwright)
- Add rate limiting for admin routes
- Consider Redis caching for map data if scale grows

### Architecture Completeness Checklist

**✅ Requirements Analysis**

- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (Low-Medium)
- [x] Technical constraints identified (Railway, no Docker)
- [x] Cross-cutting concerns mapped (auth, images, theme)

**✅ Architectural Decisions**

- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined (Server Components, Server Actions, API Routes)
- [x] Performance considerations addressed

**✅ Implementation Patterns**

- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented (error handling, loading, image flow)

**✅ Project Structure**

- [x] Complete directory structure defined
- [x] Component boundaries established (server vs client)
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Implementation Handoff

**AI Agent Guidelines:**

- Follow all architectural decisions exactly as documented
- Use implementation patterns consistently across all components
- Respect project structure and component boundaries (server vs client)
- Use `"use client"` directive only for Map and Form components
- All images go through Cloudinary — never store files locally
- Run `npx prisma migrate deploy` before `npm start` on Railway

**First Implementation Priority:**

```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Then install core dependencies:

```bash
npm install prisma @prisma/client next-auth@beta react-leaflet leaflet @types/leaflet react-hook-form @hookform/resolvers zod bcryptjs @types/bcryptjs cloudinary
npx shadcn@latest init
```
