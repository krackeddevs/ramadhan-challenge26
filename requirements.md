---
project: kd-ramadhan-challenge-2026
classification: internal
version: "1.1"
date: 2026-03-09
author: Muhaiminjuhari
inputDocuments: []
---

# KD Ramadhan Challenge 2026 — Product Requirements Document

## Executive Summary

The **Krackeddev (KD) Ramadhan Challenge 2026** website showcases community-built applications for mosques and suraus across Malaysia. It provides an interactive, map-based discovery experience where visitors explore submissions pinned to mosque locations, view team details, and browse all participating teams. An admin dashboard enables KD staff to curate submissions; each entry is immediately reflected on the public map.

**Differentiator:** A geo-visual community showcase with a bold cyber/hacker aesthetic—neon green, gridlines, pixelated accents on a dark canvas—built entirely on the Kracked Devs brand identity.

**Target Users:**

- **Public visitors** — KD community members, sponsors, general public exploring submissions
- **Admins** — KD staff managing submission data

## Success Criteria

| ID | Metric | Target | Measurement |
|----|--------|--------|-------------|
| SC-1 | Admin submission-to-map latency | New pin visible on map within 5 seconds of form submission | Manual QA test |
| SC-2 | Map page initial load | Under 3 seconds on 4G connection | Lighthouse/WebPageTest |
| SC-3 | All submissions discoverable | 100% of database entries visible on map and in list view | Automated count comparison |
| SC-4 | Mobile usability | Fully usable on 375px viewport, no horizontal scroll | Manual device testing |
| SC-5 | Admin auth security | Zero unauthorized access to admin routes | Penetration test / route guard verification |

## User Journeys

### UJ-1: Public User — Discover Submissions via Map

1. User lands on homepage and sees the interactive Malaysia map with mosque pins.
2. User pans/zooms and clicks a pin.
3. A detail modal or page opens showing the app name, team, description, featured image, tech stack, and mosque info.
4. User closes the detail view and continues exploring other pins.

### UJ-2: Public User — Browse Participant Directory

1. User navigates to the participants/teams section.
2. User scrolls through a grid/list of all teams with their app names and mosque names.
3. User clicks on a team card to view full submission details.

### UJ-3: Admin — Create New Submission

1. Admin navigates to admin login page.
2. Admin enters email and password, is authenticated.
3. Admin sees the submission management dashboard.
4. Admin fills out the submission form: App Name, Team Name, Team Members, Description, Feature Image, Tech Stack, Mosque Name, Mosque Coordinates.
5. Admin submits; data is saved to PostgreSQL.
6. The new pin appears on the public map immediately.

## Product Scope

### MVP (Current Phase)

- Interactive Malaysia map with mosque submission pins
- Submission detail view (modal or page)
- Participant/team directory page
- Admin authentication (email/password)
- Admin submission form with all required fields
- "Supported By" sponsor section
- Footer with social media links
- Deploy on Railway with PostgreSQL

### Growth Phase (Future — Out of Scope)

- Public self-submission portal with moderation
- Voting/rating system
- Submission categories and filtering
- Analytics dashboard for admins

## Functional Requirements

| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR-001 | Users can view all submitted mosque pins on an interactive map of Malaysia | Map renders with one pin per submission at the correct lat/lng coordinates |
| FR-002 | Users can click a map pin to open a detail view of the submission | Clicking a pin displays: App Name, Team Name, Team Members, Description, Featured Image, Tech Stack, Mosque Name |
| FR-003 | Users can browse a list/grid of all participating teams and their apps | Participants page/section shows all submissions with team name, app name, and mosque name |
| FR-004 | Users can click a team card to navigate to the full submission detail | Card click opens the same detail view as the map pin interaction |
| FR-005 | The map uses a dark-themed tile layer with neon green markers matching the KD brand | Visual inspection confirms dark base map tiles, neon green (#39FF14) pin markers |
| FR-006 | The footer displays the KD website link and all 5 social media links | Footer contains clickable links to Threads, X, Facebook, LinkedIn, Instagram |
| FR-007 | A "Supported By" section displays logos for Lovable, Google Cloud Platform, and Kracked Devs | Three logos render from the `/logos/` directory assets |
| FR-008 | Admin can log in with email and password | Valid credentials grant access to admin dashboard; invalid credentials show error |
| FR-009 | Admin can submit a new entry via a form with all required fields | Form includes: App Name, Team Name, Team Members (multi, optional), Description, Feature Image, Tech Stack, Mosque Name, Lat, Lng |
| FR-010 | After admin submission, the new pin appears on the public map without manual intervention | Database insert triggers map data refresh; pin is visible on next page load or via real-time update |
| FR-011 | Unauthenticated users cannot access admin routes | Direct URL access to admin pages redirects to login |
| FR-012 | Feature images can be uploaded or provided as URLs | Admin form supports at least one method for associating an image with a submission |

## Non-Functional Requirements

| ID | Requirement | Target | Measurement |
|----|-------------|--------|-------------|
| NFR-001 | Page load time (map page) | < 3 seconds on 4G | Lighthouse performance audit |
| NFR-002 | Map pin rendering | < 2 seconds for up to 200 pins | Manual timing with 200 test records |
| NFR-003 | Concurrent public users | Support 100 simultaneous visitors | Load testing (k6 or similar) |
| NFR-004 | Image upload size limit | Max 5 MB per image | Server-side validation |
| NFR-005 | Authentication security | Passwords hashed with bcrypt, sessions via HTTP-only cookies or JWT | Code review |
| NFR-006 | Database reliability | Automated daily backups via Railway | Railway backup configuration |
| NFR-007 | Responsive design | Functional on viewports from 375px to 2560px | Manual testing on mobile, tablet, desktop |
| NFR-008 | Accessibility | WCAG 2.1 AA for navigation and content | Lighthouse accessibility audit ≥ 85 |
| NFR-009 | Deployment | Zero-downtime deploys via Railway Nixpacks (no Docker) | Deploy verification |

## Technical Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | **Next.js 14+** (App Router) | SSR for SEO, API routes for backend, single deployable unit on Railway |
| UI Components | **Shadcn UI** | Customizable, accessible, composable components |
| Styling | **Tailwind CSS** | Utility-first, easy KD theme configuration |
| Database | **PostgreSQL** (Railway-managed) | Reliable relational store; Railway provides managed Postgres |
| ORM | **Prisma** | Type-safe queries, easy migrations via `npx prisma migrate deploy` |
| Map | **Leaflet** with dark tile layer (CartoDB Dark Matter or Stadia Dark) | Free, no API key required, customizable markers |
| Image Storage | **Railway volume** or **Cloudinary** (free tier) | Persistent file storage for feature images |
| Auth | **NextAuth.js** (Credentials provider) | Simple email/password auth for single admin |
| Deployment | **Railway** (Nixpacks auto-detect) | `npm run build` → auto-deploy, no Docker |

## UI/UX Design Guidelines

- **Aesthetic:** Minimalist, clean, cyber/hacker
- **Primary Color:** Neon Green `#39FF14`
- **Background:** Deep black `#050505`, dark charcoal `#111111`
- **Accent Colors:** Electric blue `#00D4FF` for secondary highlights, muted gray `#1A1A2E` for card surfaces
- **Gridlines:** Subtle glowing green grid pattern on backgrounds
- **Typography:** Pixelated/monospace font (e.g., Press Start 2P or Space Mono) for headings; Inter or system font for body
- **Components:** Shadcn UI with sharp corners (`radius: 0`), neon green borders on focus/active states
- **Map:** Dark tile provider with custom neon green SVG markers and themed tooltips

## Out of Scope (MVP)

- Public self-submission (admin-only data entry)
- Voting or rating systems
- Docker-based deployment
- Multi-language support
- Email notifications
