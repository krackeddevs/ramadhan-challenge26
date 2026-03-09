# Story 3.1: Submissions Directory Grid with Card Links

Status: ready-for-dev

## Story

As a public visitor,
I want to see a grid of all participating teams and their apps,
so that I can browse submissions without using the map.

## Acceptance Criteria

1. **Given** the homepage is loaded  
   **When** the user scrolls to the "Submissions" section  
   **Then** a responsive grid displays all submissions as cards (3 columns desktop, 2 tablet, 1 mobile)

2. **Given** a submission card  
   **When** rendered  
   **Then** it shows: featured image thumbnail (16:9 aspect ratio), App Name (bold, white), Team Name (muted gray), Mosque Name (neon green `#39FF14`), Tech Stack pill badges

3. **Given** a submission card  
   **When** hovered  
   **Then** it gains a neon green border (`1px solid #39FF14`) and subtle lift animation (`translateY(-2px)`, `transition: 0.2s ease`)

4. **Given** a submission card  
   **When** clicked  
   **Then** it opens the same detail view as clicking a map pin (desktop: dialog, mobile: navigate to `/submission/[id]`)

5. **Given** the submissions section  
   **When** rendered  
   **Then** it has a visible heading "Submissions" in Press Start 2P font with `id="submissions"`

## Tasks / Subtasks

- [ ] Task 1: Create submission card component (AC: #2, #3)
  - [ ] Create `src/components/submissions/submission-card.tsx`
  - [ ] Dark card background (`#111111`) with rounded-none (KD sharp corners)
  - [ ] Featured image with 16:9 aspect ratio, fallback for missing image
  - [ ] App Name, Team Name, Mosque Name, Tech Stack badges
  - [ ] Hover effects: neon border + translateY
- [ ] Task 2: Create submission grid component (AC: #1, #5)
  - [ ] Create `src/components/submissions/submission-grid.tsx`
  - [ ] CSS grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
  - [ ] Section heading "Submissions" with `id="submissions"`
  - [ ] Accepts submissions array as prop
- [ ] Task 3: Integrate click to detail (AC: #4)
  - [ ] Clicking card opens the same detail view from Story 2.2
  - [ ] Desktop: trigger Shadcn Dialog
  - [ ] Mobile: navigate to `/submission/[id]`
- [ ] Task 4: Integrate into homepage (AC: #1)
  - [ ] Replace submissions placeholder in `src/app/page.tsx`
  - [ ] Fetch submissions server-side via Prisma (Server Component)
  - [ ] Pass submissions to grid component

## Dev Notes

- **Server Component rendering:** The grid can fetch data server-side since it doesn't need interactivity until click
- **Share dialog state with map:** Consider lifting dialog state to homepage level so both map and grid can trigger the same detail view dialog
- **Image aspect ratio:** Use Tailwind `aspect-video` class for 16:9 ratio
- **Tech stack badges:** Reuse the same badge styling from submission-detail component
- Use Shadcn `Card` component as base, customize with KD theme tokens

### References

- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Homepage Sections]
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
