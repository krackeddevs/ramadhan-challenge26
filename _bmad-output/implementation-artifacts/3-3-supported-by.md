# Story 3.3: Supported By Sponsor Section

Status: ready-for-dev

## Story

As a public visitor,
I want to see which organizations support the challenge,
so that I know who is behind the initiative.

## Acceptance Criteria

1. **Given** the homepage is loaded  
   **When** the user scrolls to the "Supported By" section  
   **Then** a heading "Supported By" is displayed in Press Start 2P font with `id="supported-by"`

2. **Given** the section renders  
   **When** logos are displayed  
   **Then** three logos are shown in a centered row:
   - Lovable (`/logos/lovable.png`)
   - Google Cloud Platform (`/logos/google.png`)
   - Kracked Devs (`/logos/kdlogo.png`)

3. **Given** sponsor logos  
   **When** in default state  
   **Then** logos are displayed in grayscale (`filter: grayscale(100%)`)  
   **And** on hover, they transition to full color (`filter: grayscale(0%)`, `transition: 0.3s ease`)

4. **Given** the section  
   **When** rendered  
   **Then** it has generous padding (`py-16`) and a top separator line (`border-t border-[#222222]`)

5. **Given** the section on mobile  
   **When** rendered  
   **Then** logos stack or wrap if needed, maintaining visual balance

## Tasks / Subtasks

- [ ] Task 1: Create supported-by component (AC: #1, #2, #3, #4, #5)
  - [ ] Create `src/components/layout/supported-by.tsx`
  - [ ] Heading "Supported By" in pixelated font
  - [ ] Flex row centered with gap, wrapping on mobile
  - [ ] Each logo: `<Image>` with grayscale filter, hover removes filter
  - [ ] Top separator and padding
- [ ] Task 2: Ensure logo files exist (AC: #2)
  - [ ] Verify `public/logos/lovable.png`, `public/logos/google.png`, `public/logos/kdlogo.png` exist
  - [ ] If logos directory was not copied to public in Story 1.2, copy them now
- [ ] Task 3: Integrate into homepage (AC: #1)
  - [ ] Replace supported-by placeholder in `src/app/page.tsx`
  - [ ] Place between submissions grid and footer

## Dev Notes

- **Logo images** should already be in `public/logos/` from Story 1.2 when logos were copied
- **Grayscale filter CSS:** `className="grayscale hover:grayscale-0 transition-all duration-300"`
- **Logo sizing:** Use consistent max-height (e.g., `h-12` or `h-16`) with `width: auto`
- Keep the section minimal — this is a simple branding element

### References

- [Source: requirements.md#FR-007]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Supported By Section]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
