---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: [requirements.md, _bmad-output/planning-artifacts/architecture.md, _bmad-output/planning-artifacts/ux-design-specification.md]
---

# KD Ramadhan Challenge 2026 — Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for the KD Ramadhan Challenge 2026 website, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

- FR-001: Users can view all submitted mosque pins on an interactive map of Malaysia
- FR-002: Users can click a map pin to open a detail view of the submission
- FR-003: Users can browse a list/grid of all participating teams and their apps
- FR-004: Users can click a team card to navigate to the full submission detail
- FR-005: The map uses a dark-themed tile layer with neon green markers matching the KD brand
- FR-006: The footer displays the KD website link and all 5 social media links
- FR-007: A "Supported By" section displays logos for Lovable, Google Cloud Platform, and Kracked Devs
- FR-008: Admin can log in with email and password
- FR-009: Admin can submit a new entry via a form with all required fields
- FR-010: After admin submission, the new pin appears on the public map without manual intervention
- FR-011: Unauthenticated users cannot access admin routes
- FR-012: Feature images can be uploaded or provided as URLs

### Non-Functional Requirements

- NFR-001: Page load time (map page) < 3 seconds on 4G
- NFR-002: Map pin rendering < 2 seconds for up to 200 pins
- NFR-003: Support 100 simultaneous visitors
- NFR-004: Image upload size limit max 5 MB
- NFR-005: Passwords hashed with bcrypt, sessions via HTTP-only cookies or JWT
- NFR-006: Automated daily database backups via Railway
- NFR-007: Responsive design from 375px to 2560px
- NFR-008: WCAG 2.1 AA for navigation and content (Lighthouse ≥ 85)
- NFR-009: Zero-downtime deploys via Railway Nixpacks (no Docker)

### Additional Requirements

- Architecture specifies Next.js 14+ (App Router) with `create-next-app` as starter template
- Prisma ORM with PostgreSQL for database
- NextAuth.js v5 Credentials provider for authentication
- React Leaflet with CartoDB Dark Matter tiles for map
- Cloudinary free tier for image uploads
- Railway deployment with Nixpacks auto-detect
- Shadcn UI with custom KD theme tokens (neon green `#39FF14`, dark backgrounds)
- Press Start 2P font for headings, Inter for body text
- Admin user seeded via Prisma seed script

### FR Coverage Map

| FR | Epic | Story |
|----|------|-------|
| FR-001 | Epic 2 | Story 2.1 |
| FR-002 | Epic 2 | Story 2.2 |
| FR-003 | Epic 3 | Story 3.1 |
| FR-004 | Epic 3 | Story 3.1 |
| FR-005 | Epic 2 | Story 2.1 |
| FR-006 | Epic 3 | Story 3.2 |
| FR-007 | Epic 3 | Story 3.3 |
| FR-008 | Epic 4 | Story 4.1 |
| FR-009 | Epic 4 | Story 4.2 |
| FR-010 | Epic 4 | Story 4.2 |
| FR-011 | Epic 4 | Story 4.1 |
| FR-012 | Epic 4 | Story 4.2 |

## Epic List

### Epic 1: Project Foundation & Layout

Set up the Next.js project with KD branding, theme, and shared layout so the app is functional and deployable from the start.
**FRs covered:** None directly (infrastructure epic enabling all subsequent epics)

### Epic 2: Interactive Map & Submission Discovery

Users can explore an interactive Malaysia map and click mosque pins to view submission details.
**FRs covered:** FR-001, FR-002, FR-005

### Epic 3: Public Content & Branding

Users can browse all submissions in a directory, see sponsor logos, and navigate via footer links.
**FRs covered:** FR-003, FR-004, FR-006, FR-007

### Epic 4: Admin Dashboard & Submission Management

Admin can securely log in and create new submissions that appear on the public map immediately.
**FRs covered:** FR-008, FR-009, FR-010, FR-011, FR-012

---

## Epic 1: Project Foundation & Layout

Set up the Next.js 14+ project with Prisma, Shadcn UI, KD theme, and deploy to Railway. This creates the shared app shell that all subsequent epics build upon.

### Story 1.1: Initialize Next.js Project with Core Dependencies

As a developer,
I want the project scaffolded with Next.js, TypeScript, Tailwind, Prisma, and Shadcn UI,
So that I have a working foundation to build features on.

**Acceptance Criteria:**

**Given** an empty project directory
**When** the initialization commands are run
**Then** a Next.js 14+ App Router project exists with TypeScript, Tailwind CSS, ESLint, and `src/` directory
**And** Prisma is initialized with a PostgreSQL datasource and the `Admin` + `Submission` models defined in `schema.prisma`
**And** Shadcn UI is initialized with the KD theme tokens (`--primary: #39FF14`, `--background: #050505`, `--card: #111111`, `--radius: 0px`)
**And** `globals.css` includes the grid background pattern with neon green lines
**And** Google Fonts (Press Start 2P + Inter) are configured in the root layout
**And** `.env.example` exists with all required environment variable placeholders
**And** `railway.json` is created with Nixpacks builder and start command `npx prisma migrate deploy && npm start`
**And** `npm run dev` starts successfully on localhost

### Story 1.2: Create App Shell Layout with Header and Placeholder Pages

As a visitor,
I want to see a branded header and navigate between pages,
So that the site feels cohesive and I can find what I'm looking for.

**Acceptance Criteria:**

**Given** the project has been initialized (Story 1.1)
**When** a user visits the homepage
**Then** the root layout renders with the KD logo, "Ramadhan Challenge 2026" title in Press Start 2P font, and the dark theme background
**And** a hero section is displayed with the tagline "Community-built apps for mosques across Malaysia" and a "Explore the Map ↓" CTA button
**And** the CTA button smooth-scrolls to the map section anchor
**And** placeholder sections exist for Map, Submissions, Supported By, and Footer
**And** the layout is responsive from 375px to 2560px (NFR-007)
**And** admin routes (`/admin/*`) are defined with placeholder pages

---

## Epic 2: Interactive Map & Submission Discovery

Users can explore mosque submissions via the interactive Malaysia map with dark theme and neon green markers. Clicking a pin reveals full submission details.

### Story 2.1: Implement Interactive Malaysia Map with Mosque Pins

As a public visitor,
I want to see a dark-themed interactive map of Malaysia with neon green pins for each mosque submission,
So that I can visually discover where the community's apps are located.

**Acceptance Criteria:**

**Given** the homepage is loaded
**When** the map section renders
**Then** a Leaflet map is displayed using CartoDB Dark Matter tiles
**And** the map is centered on Malaysia (approximately lat 4.2, lng 108.0, zoom 6)
**And** each submission from the database is represented by a custom neon green SVG marker at its latitude/longitude
**And** hovering over a marker shows a tooltip with the App Name and Mosque Name
**And** the map is full-width with min-height 70vh on desktop and 50vh on mobile
**And** default Leaflet controls are replaced with theme-styled zoom buttons (neon green border)
**And** the map renders up to 200 pins within 2 seconds (NFR-002)
**And** the map component uses `"use client"` directive
**And** submissions are fetched via `/api/submissions` GET endpoint which queries the database

### Story 2.2: Submission Detail View from Map Pin Click

As a public visitor,
I want to click a map pin and see the full details of the submission,
So that I can learn about the app, the team, and the mosque being served.

**Acceptance Criteria:**

**Given** the map is displayed with mosque pins (Story 2.1)
**When** a user clicks on a mosque marker
**Then** on desktop, a modal dialog opens with a dark background and backdrop blur
**And** on mobile (< 640px), the user is navigated to `/submission/[id]` detail page with a back button
**And** the detail view displays: featured image (full-width hero with gradient overlay), App Name (H1 in pixelated font), Description, Tech Stack as pill badges with neon green outlines, Team Name (H2), Team Members list, Mosque Name, and coordinates in monospace font
**And** if the submission has no featured image, a placeholder is shown
**And** the modal can be closed by clicking the X button or pressing Escape
**And** all text is readable and the layout is responsive (NFR-007)

---

## Epic 3: Public Content & Branding

Users can browse all submissions in a card grid, view sponsor logos, and find all KD social links in the footer.

### Story 3.1: Submissions Directory Grid with Card Links

As a public visitor,
I want to see a grid of all participating teams and their apps,
So that I can browse submissions without using the map.

**Acceptance Criteria:**

**Given** the homepage is loaded
**When** the user scrolls to the "Submissions" section
**Then** a responsive grid displays all submissions as cards (3 columns desktop, 2 tablet, 1 mobile)
**And** each card shows: featured image thumbnail (16:9), App Name (bold, white), Team Name (muted gray), Mosque Name (neon green), Tech Stack pill badges
**And** cards have dark surface background (`#111111`) with neon green border on hover and subtle lift animation (translateY -2px)
**And** clicking a card opens the same detail view as clicking a map pin (FR-004)
**And** the section has a visible heading "Submissions"

### Story 3.2: Footer with Social Media Links

As a public visitor,
I want to see the KD website and social media links in the footer,
So that I can connect with the Kracked Devs community.

**Acceptance Criteria:**

**Given** any page is loaded
**When** the user scrolls to the footer
**Then** the footer has a dark background (`#050505`)
**And** the left side shows the KD logo and "© 2026 Kracked Devs"
**And** the right side shows icon links to: Threads (`https://www.threads.com/@krackeddev`), X (`https://x.com/KrackedDevs`), Facebook (`https://www.facebook.com/profile.php?id=61587943460342`), LinkedIn (`https://www.linkedin.com/company/krackeddevs/`), Instagram (`https://www.instagram.com/krackeddev/`)
**And** a link to `https://krackeddevs.com` is present
**And** social icons are muted gray by default and neon green on hover
**And** footer is two-column on desktop and stacked on mobile

### Story 3.3: Supported By Sponsor Section

As a public visitor,
I want to see which organizations support the challenge,
So that I know who is behind the initiative.

**Acceptance Criteria:**

**Given** the homepage is loaded
**When** the user scrolls to the "Supported By" section
**Then** a heading "Supported By" is displayed
**And** three logos are shown in a centered row: Lovable (`/logos/lovable.png`), Google Cloud Platform (`/logos/google.png`), Kracked Devs (`/logos/kdlogo.png`)
**And** logos are grayscale by default and transition to full color on hover (0.3s ease)
**And** the section has generous padding and a separator line above it

---

## Epic 4: Admin Dashboard & Submission Management

Admin can securely log in, view existing submissions, and add new ones. New submissions are immediately visible on the public map and directory.

### Story 4.1: Admin Authentication & Route Protection

As an admin,
I want to log in with my email and password so that I can manage submissions,
So that only authorized KD staff can add or modify challenge entries.

**Acceptance Criteria:**

**Given** the admin navigates to `/admin/login`
**When** they enter valid email and password and click "Sign In"
**Then** they are authenticated via NextAuth.js Credentials provider and redirected to `/admin`
**And** the password is verified against a bcrypt hash stored in the `Admin` table (NFR-005)
**And** a JWT session is created with an HTTP-only cookie
**And** the login page has a centered card on a dark background with grid pattern
**And** the email and password inputs have dark background with neon green focus borders
**And** the "Sign In" button is solid neon green with black text

**Given** the admin enters invalid credentials
**When** they click "Sign In"
**Then** an error message is displayed ("Invalid email or password") via a red toast

**Given** an unauthenticated user
**When** they try to access any `/admin` route (except `/admin/login`)
**Then** they are redirected to `/admin/login` via Next.js middleware (FR-011)

**And** a Prisma seed script (`prisma/seed.ts`) exists to create the initial admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables

### Story 4.2: Admin Submission Form with Image Upload

As an admin,
I want to fill out a form to add a new challenge submission,
So that the entry appears on the public map and directory immediately.

**Acceptance Criteria:**

**Given** the admin is logged in and navigates to `/admin/submissions/new`
**When** they see the submission form
**Then** it displays a single-column centered form (max-width 680px) with these fields:

| Field | Type | Required |
|-------|------|----------|
| App Name | Text input | Yes |
| Team Name | Text input | Yes |
| Team Members | Multi-input tags (add/remove names) | No |
| Description | Textarea | Yes |
| Feature Image | File upload (with preview after selection) | Yes |
| Tech Stack | Multi-select tags with common options + custom entry | Yes |
| Mosque Name | Text input | Yes |
| Latitude | Number input (decimal degrees) | Yes |
| Longitude | Number input (decimal degrees) | Yes |

**And** a small map preview below the coordinate fields shows a pin at the entered lat/lng (updates live as coordinates change)
**And** the form validates with Zod: all required fields present, image ≤ 5 MB (NFR-004), lat between -90 and 90, lng between -180 and 180
**And** the "Add Submission" button is neon green, full width

**Given** the admin fills out the form completely and clicks "Add Submission"
**When** the form is submitted
**Then** the feature image is uploaded to Cloudinary via the `/api/upload` route
**And** the submission data (including the Cloudinary image URL) is saved to PostgreSQL via a Server Action
**And** a success toast is shown and the admin is redirected to `/admin`
**And** the new submission is immediately visible on the public map and submissions grid (FR-010)

**Given** the admin submits invalid data
**When** the form validation fails
**Then** field-level error messages are displayed next to the invalid fields

### Story 4.3: Admin Dashboard — Submissions List

As an admin,
I want to see all existing submissions in a table view,
So that I can review what has been submitted and manage entries.

**Acceptance Criteria:**

**Given** the admin is logged in and on the `/admin` dashboard
**When** the page loads
**Then** a top navigation bar shows "Dashboard" and a "Logout" button
**And** an "Add Submission" button (neon green) links to `/admin/submissions/new`
**And** a table displays all submissions with columns: App Name, Team Name, Mosque, Date Added
**And** the table has dark rows with alternating shading and subtle borders
**And** clicking "Logout" signs out and redirects to `/admin/login`

---

## Validation Checklist

- [x] All 12 FRs mapped to at least one story
- [x] All 9 NFRs addressed in acceptance criteria
- [x] Architecture starter template → Story 1.1
- [x] Database tables created only when needed (Prisma migrate in Story 1.1)
- [x] No forward dependencies within epics
- [x] Each epic delivers standalone user value
- [x] Stories sized for single dev agent completion
- [x] Acceptance criteria use Given/When/Then format
- [x] Cloudinary image flow covered in Story 4.2
- [x] Railway deployment covered in Story 1.1
