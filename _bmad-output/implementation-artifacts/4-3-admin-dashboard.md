# Story 4.3: Admin Dashboard — Submissions List

Status: ready-for-dev

## Story

As an admin,
I want to see all existing submissions in a table view,
so that I can review what has been submitted and manage entries.

## Acceptance Criteria

1. **Given** the admin is logged in and on `/admin`  
   **When** the page loads  
   **Then** a top navigation bar shows "Dashboard" title and a "Logout" button

2. **Given** the dashboard  
   **When** rendered  
   **Then** an "Add Submission" button (neon green) links to `/admin/submissions/new`

3. **Given** the dashboard  
   **When** submissions exist  
   **Then** a Shadcn Table displays all submissions with columns: App Name, Team Name, Mosque, Date Added

4. **Given** the table  
   **When** rendered  
   **Then** rows have dark backgrounds with alternating shading and subtle borders (`#222222`)

5. **Given** the "Logout" button  
   **When** clicked  
   **Then** the admin is signed out and redirected to `/admin/login`

## Tasks / Subtasks

- [ ] Task 1: Create submissions table component (AC: #3, #4)
  - [ ] Create `src/components/admin/submissions-table.tsx`
  - [ ] Use Shadcn Table components (Table, TableHeader, TableBody, TableRow, TableCell)
  - [ ] Columns: App Name, Team Name, Mosque, Date Added (formatted)
  - [ ] Alternating row shading via CSS (even/odd)
  - [ ] Dark theme styling
- [ ] Task 2: Create admin dashboard page (AC: #1, #2, #5)
  - [ ] Update `src/app/admin/page.tsx`
  - [ ] Server Component — fetch all submissions via Prisma
  - [ ] Top bar with "Dashboard" heading and Logout button
  - [ ] "Add Submission" CTA button (neon green) linking to `/admin/submissions/new`
  - [ ] Render submissions table
- [ ] Task 3: Implement logout (AC: #5)
  - [ ] Create `src/actions/auth.ts` with signOut server action
  - [ ] Or use NextAuth's `signOut()` client function
  - [ ] After signout, redirect to `/admin/login`

## Dev Notes

- **Dashboard is a Server Component** — fetches data directly from Prisma, no API call needed
- **Logout** can use `signOut()` from `next-auth/react` on client side, which requires a small client component for the button
- **Date formatting:** Use `toLocaleDateString('en-MY')` for Malaysian date format or `Intl.DateTimeFormat`
- **Empty state:** If no submissions exist, show a message "No submissions yet" with CTA to add first submission
- This is the simplest admin page — no edit/delete functionality in MVP

### Project Structure Notes

- `src/app/admin/page.tsx` — Dashboard page
- `src/components/admin/submissions-table.tsx` — Table component
- `src/actions/auth.ts` — Auth server actions

### References

- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#3.4 Admin Dashboard]
- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
