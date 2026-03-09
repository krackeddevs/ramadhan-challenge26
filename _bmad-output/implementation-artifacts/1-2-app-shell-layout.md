# Story 1.2: Create App Shell Layout with Header and Placeholder Pages

Status: ready-for-dev

## Story

As a visitor,
I want to see a branded header and navigate between pages,
so that the site feels cohesive and I can find what I'm looking for.

## Acceptance Criteria

1. **Given** the project is initialized (Story 1.1)  
   **When** a user visits the homepage  
   **Then** the root layout renders with the KD logo, "Ramadhan Challenge 2026" title in Press Start 2P font, and dark theme background

2. **Given** the homepage loads  
   **When** the hero section renders  
   **Then** it displays the tagline "Community-built apps for mosques across Malaysia" and a "Explore the Map ↓" CTA button

3. **Given** the CTA button is visible  
   **When** clicked  
   **Then** the page smooth-scrolls to the map section anchor (`#map`)

4. **Given** the homepage  
   **When** all sections render  
   **Then** placeholder sections exist for Map (`id="map"`), Submissions (`id="submissions"`), Supported By (`id="supported-by"`), and Footer

5. **Given** the app  
   **When** rendered at various viewports  
   **Then** the layout is responsive from 375px to 2560px (NFR-007)

6. **Given** the app  
   **When** admin routes are accessed  
   **Then** `/admin/login`, `/admin`, and `/admin/submissions/new` return placeholder pages

## Tasks / Subtasks

- [ ] Task 1: Create root layout with fonts and metadata (AC: #1)
  - [ ] Configure `src/app/layout.tsx` with Press Start 2P + Inter fonts
  - [ ] Set metadata: title "KD Ramadhan Challenge 2026", description
  - [ ] Apply dark theme body class with grid background
  - [ ] Add Toaster component for notifications
- [ ] Task 2: Create hero section component (AC: #2, #3)
  - [ ] Create `src/components/layout/hero.tsx`
  - [ ] Title in Press Start 2P, subtitle in Inter
  - [ ] Animated grid background CSS
  - [ ] CTA button with smooth scroll to `#map`
- [ ] Task 3: Create homepage with placeholder sections (AC: #4)
  - [ ] Update `src/app/page.tsx` with section anchors
  - [ ] Hero section component
  - [ ] Map placeholder with `id="map"`
  - [ ] Submissions placeholder with `id="submissions"`
  - [ ] Supported By placeholder with `id="supported-by"`
  - [ ] Footer placeholder
- [ ] Task 4: Create header component (AC: #1)
  - [ ] Create `src/components/layout/header.tsx`
  - [ ] KD logo (use `logos/kdlogo.png` — copy to `public/logos/`)
  - [ ] Site title text
  - [ ] Minimal, dark themed
- [ ] Task 5: Create admin route placeholders (AC: #6)
  - [ ] `src/app/admin/login/page.tsx` — "Admin Login" placeholder
  - [ ] `src/app/admin/page.tsx` — "Dashboard" placeholder
  - [ ] `src/app/admin/submissions/new/page.tsx` — "New Submission" placeholder
- [ ] Task 6: Ensure responsive layout (AC: #5)
  - [ ] Test hero section at 375px, 768px, 1280px
  - [ ] Verify no horizontal scroll at any breakpoint

## Dev Notes

- Copy `logos/` directory content to `public/logos/` so images are served statically
- Use Next.js `<Image>` component for logo rendering
- Hero CTA smooth scroll: `document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })`
- All placeholder sections should have a visible heading and border so structure is obvious during development
- Header is part of the root layout, visible on all public pages

### Project Structure Notes

- `src/components/layout/hero.tsx` — Hero section
- `src/components/layout/header.tsx` — Site header
- `src/app/page.tsx` — Homepage assembly
- `src/app/admin/` — Admin route placeholders

### References

- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#3.1 Homepage]
- [Source: _bmad-output/planning-artifacts/architecture.md#Project Structure & Boundaries]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
