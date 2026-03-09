# Story 3.2: Footer with Social Media Links

Status: ready-for-dev

## Story

As a public visitor,
I want to see the KD website and social media links in the footer,
so that I can connect with the Kracked Devs community.

## Acceptance Criteria

1. **Given** any page is loaded  
   **When** the user scrolls to the footer  
   **Then** the footer has a dark background (`#050505`) with a subtle top border (`#222222`)

2. **Given** the footer renders  
   **When** viewed on desktop  
   **Then** the left side shows the KD logo and "© 2026 Kracked Devs"  
   **And** the right side shows social media icon links

3. **Given** the footer  
   **When** social icons are rendered  
   **Then** links exist for:
   - Threads: `https://www.threads.com/@krackeddev`
   - X (Twitter): `https://x.com/KrackedDevs`
   - Facebook: `https://www.facebook.com/profile.php?id=61587943460342`
   - LinkedIn: `https://www.linkedin.com/company/krackeddevs/`
   - Instagram: `https://www.instagram.com/krackeddev/`
   - Website: `https://krackeddevs.com`

4. **Given** social icons  
   **When** in default state  
   **Then** icons are muted gray (`#666666`)  
   **And** on hover they transition to neon green (`#39FF14`, `transition: 0.2s ease`)

5. **Given** the footer  
   **When** viewed on mobile (< 640px)  
   **Then** it stacks vertically (logo/copyright above, socials below)

6. **Given** social links  
   **When** clicked  
   **Then** they open in a new tab (`target="_blank"`, `rel="noopener noreferrer"`)

## Tasks / Subtasks

- [ ] Task 1: Create footer component (AC: #1, #2, #5)
  - [ ] Create `src/components/layout/footer.tsx`
  - [ ] Two-column layout: logo+copyright left, socials right
  - [ ] Stack on mobile with `flex-col sm:flex-row`
  - [ ] Dark background with top border separator
- [ ] Task 2: Add social media icons (AC: #3, #4, #6)
  - [ ] Use Lucide React icons where available (Instagram, Facebook, Linkedin)
  - [ ] For Threads and X, use custom SVG or text-based icons
  - [ ] Apply hover color transition
  - [ ] All links open in new tab
- [ ] Task 3: Integrate footer in root layout (AC: #1)
  - [ ] Add footer to `src/app/layout.tsx` (after `{children}`)
  - [ ] Remove footer placeholder from homepage

## Dev Notes

- **Lucide React icons available:** Instagram, Facebook, Linkedin, Globe (for website)
- **X (Twitter) icon:** Lucide has `Twitter` icon but it may be outdated. Consider using a simple "𝕏" text or a custom SVG
- **Threads icon:** Not in Lucide — use a custom SVG or text "@" icon
- **Footer is in root layout** so it appears on all pages including admin (consider hiding on admin login page if needed)

### References

- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Footer]
- [Source: requirements.md#FR-006]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
