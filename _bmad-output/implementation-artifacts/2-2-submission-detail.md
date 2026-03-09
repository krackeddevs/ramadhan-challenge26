# Story 2.2: Submission Detail View from Map Pin Click

Status: ready-for-dev

## Story

As a public visitor,
I want to click a map pin and see the full details of the submission,
so that I can learn about the app, the team, and the mosque being served.

## Acceptance Criteria

1. **Given** the map is displayed with mosque pins  
   **When** a user clicks on a mosque marker  
   **Then** on desktop (≥ 640px), a Shadcn Dialog opens with dark background and backdrop blur

2. **Given** the map is displayed on mobile (< 640px)  
   **When** a user clicks on a mosque marker  
   **Then** the user is navigated to `/submission/[id]` detail page with a back button

3. **Given** the detail view is open  
   **When** content renders  
   **Then** it displays:
   - Featured image (full-width hero with gradient overlay from transparent to `#050505`)
   - App Name (H1 in Press Start 2P font)
   - Description (Inter, `#C0C0C0`)
   - Tech Stack as pill badges with neon green outlines
   - Team Name (H2)
   - Team Members list
   - Mosque Name
   - Coordinates in monospace font

4. **Given** the submission has no featured image  
   **When** the detail view renders  
   **Then** a dark placeholder with a mosque/pin icon is shown instead

5. **Given** the desktop modal is open  
   **When** the user clicks X button or presses Escape  
   **Then** the modal closes and the map is visible again

6. **Given** any viewport  
   **When** the detail view renders  
   **Then** text is readable and layout is responsive (NFR-007)

## Tasks / Subtasks

- [ ] Task 1: Create submission detail component (AC: #3, #4)
  - [ ] Create `src/components/submissions/submission-detail.tsx`
  - [ ] Hero image with gradient overlay
  - [ ] Fallback placeholder for missing images
  - [ ] App Name, Description, Tech Stack badges, Team info, Mosque info
  - [ ] Responsive layout
- [ ] Task 2: Create detail page for mobile (AC: #2)
  - [ ] Create `src/app/submission/[id]/page.tsx`
  - [ ] Server Component that fetches submission by ID via Prisma
  - [ ] Render `submission-detail` component
  - [ ] Back button linking to homepage `/#map`
- [ ] Task 3: Integrate click handler in map markers (AC: #1, #2)
  - [ ] On desktop: clicking marker opens Shadcn Dialog with submission detail
  - [ ] On mobile: clicking marker navigates to `/submission/[id]`
  - [ ] Use `useMediaQuery` or `window.innerWidth` check for responsive behavior
- [ ] Task 4: Style the dialog modal (AC: #1, #5)
  - [ ] Dark background overlay with backdrop blur
  - [ ] Modal max-width 680px, max-height 85vh, scrollable
  - [ ] X close button and Escape key support (Shadcn Dialog built-in)

## Dev Notes

- **Shadcn Dialog** already handles Escape key and overlay click to close
- **Tech stack badges** should use Shadcn `Badge` with `variant="outline"` + neon green border
- **Image gradient overlay:** Use CSS `background: linear-gradient(to bottom, transparent, #050505)` positioned over the image
- **The submission detail component is shared** between the dialog (desktop) and the `/submission/[id]` page (mobile)
- **Responsive detection** for map click behavior: check `window.innerWidth < 640` in click handler
- The `[id]` page uses `params.id` to fetch from Prisma — this is a Server Component

### References

- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#3.2 Submission Detail]
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture]
- [Source: _bmad-output/planning-artifacts/epics.md#Story 2.2]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
