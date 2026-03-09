# Story 1.1: Initialize Next.js Project with Core Dependencies

Status: ready-for-dev

## Story

As a developer,
I want the project scaffolded with Next.js, TypeScript, Tailwind, Prisma, and Shadcn UI,
so that I have a working foundation to build features on.

## Acceptance Criteria

1. **Given** an empty project directory  
   **When** the initialization commands are run  
   **Then** a Next.js 14+ App Router project exists with TypeScript, Tailwind CSS, ESLint, and `src/` directory

2. **Given** the project is initialized  
   **When** Prisma is set up  
   **Then** `prisma/schema.prisma` contains the `Admin` and `Submission` models with PostgreSQL datasource  
   **And** `src/lib/db.ts` exports a singleton Prisma client

3. **Given** the project is initialized  
   **When** Shadcn UI is configured  
   **Then** `components.json` uses the KD theme tokens: `--primary: #39FF14`, `--background: #050505`, `--card: #111111`, `--radius: 0px`  
   **And** base Shadcn components are installed: Button, Card, Dialog, Input, Badge, Table, Toast, Tooltip

4. **Given** the project is initialized  
   **When** `globals.css` is configured  
   **Then** it includes Tailwind directives, KD theme CSS variables, and a subtle grid background pattern with neon green lines on `#050505`

5. **Given** the project is initialized  
   **When** fonts are configured  
   **Then** Google Fonts Press Start 2P (headings) and Inter (body) are loaded in the root layout via `next/font/google`

6. **Given** the project is initialized  
   **When** deployment config is created  
   **Then** `.env.example` lists: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`  
   **And** `railway.json` specifies Nixpacks builder with start command `npx prisma migrate deploy && npm start`

7. **Given** all configuration is complete  
   **When** `npm run dev` is executed  
   **Then** the development server starts successfully on localhost without errors

## Tasks / Subtasks

- [ ] Task 1: Scaffold Next.js project (AC: #1)
  - [ ] Run `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
  - [ ] Verify project structure created correctly
- [ ] Task 2: Install and configure Prisma (AC: #2)
  - [ ] `npm install prisma @prisma/client`
  - [ ] `npx prisma init` with PostgreSQL provider
  - [ ] Define `Admin` model: id (cuid), email (unique), password, createdAt
  - [ ] Define `Submission` model: id (cuid), appName, teamName, teamMembers (String[]), description, featureImage, techStack (String[]), mosqueName, latitude (Float), longitude (Float), createdAt, updatedAt
  - [ ] Create `src/lib/db.ts` with singleton pattern for Prisma client
- [ ] Task 3: Install and configure Shadcn UI (AC: #3)
  - [ ] `npx shadcn@latest init` with custom theme
  - [ ] Configure `components.json` with KD theme tokens
  - [ ] Install base components: `npx shadcn@latest add button card dialog input badge table toast tooltip`
- [ ] Task 4: Configure globals.css with KD theme (AC: #4)
  - [ ] Set CSS variables: `--background: #050505`, `--foreground: #E0E0E0`, `--card: #111111`, `--primary: #39FF14`, `--primary-foreground: #050505`, `--secondary: #1A1A2E`, `--accent: #00D4FF`, `--muted: #333333`, `--border: #222222`, `--ring: #39FF14`, `--radius: 0px`
  - [ ] Add grid background pattern: repeating linear-gradient with thin neon green lines
- [ ] Task 5: Configure fonts (AC: #5)
  - [ ] Import Press Start 2P and Inter from `next/font/google` in root layout
  - [ ] Apply Inter as body font, Press Start 2P as heading font via CSS variables
- [ ] Task 6: Create deployment configuration (AC: #6)
  - [ ] Create `.env.example` with all required variables
  - [ ] Create `railway.json` with Nixpacks config and start command
  - [ ] Create `prisma/seed.ts` that creates admin from env vars (bcrypt hash password)
  - [ ] Add seed script to `package.json`: `"prisma": { "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts" }`
- [ ] Task 7: Install remaining dependencies (AC: #7)
  - [ ] `npm install next-auth@beta react-leaflet leaflet @types/leaflet react-hook-form @hookform/resolvers zod bcryptjs @types/bcryptjs cloudinary lucide-react`
  - [ ] Verify `npm run dev` starts without errors

## Dev Notes

- **Prisma singleton pattern** for Next.js: use global variable to prevent multiple instances in development hot reload
- **Shadcn UI** uses `cn()` utility from `src/lib/utils.ts` — this is auto-created during init
- **Grid background pattern CSS:**

  ```css
  .grid-bg {
    background-image:
      linear-gradient(rgba(57, 255, 20, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(57, 255, 20, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  ```

- **Railway start command** runs migrations before server start to handle schema changes on deploy
- **Do NOT use Docker** — Railway Nixpacks auto-detects Node.js projects

### Project Structure Notes

All paths follow the architecture document exactly:

- `src/app/` — App Router pages
- `src/components/ui/` — Shadcn base components
- `src/lib/` — Utilities (db.ts, utils.ts)
- `prisma/` — Schema and migrations

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Starter Template Evaluation]
- [Source: _bmad-output/planning-artifacts/architecture.md#Data Architecture]
- [Source: _bmad-output/planning-artifacts/architecture.md#Infrastructure & Deployment]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Component Patterns]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
