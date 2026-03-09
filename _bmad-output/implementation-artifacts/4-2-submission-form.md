# Story 4.2: Admin Submission Form with Image Upload

Status: ready-for-dev

## Story

As an admin,
I want to fill out a form to add a new challenge submission,
so that the entry appears on the public map and directory immediately.

## Acceptance Criteria

1. **Given** the admin is logged in and navigates to `/admin/submissions/new`  
   **When** the form renders  
   **Then** it displays a single-column centered form (max-width 680px) with these fields:

   | Field | Type | Required |
   |-------|------|----------|
   | App Name | Text input | Yes |
   | Team Name | Text input | Yes |
   | Team Members | Multi-input tags (add/remove) | No |
   | Description | Textarea | Yes |
   | Feature Image | File upload with preview | Yes |
   | Tech Stack | Multi-select tags + custom entry | Yes |
   | Mosque Name | Text input | Yes |
   | Latitude | Number input (decimal) | Yes |
   | Longitude | Number input (decimal) | Yes |

2. **Given** latitude and longitude are entered  
   **When** coordinates change  
   **Then** a small map preview below the fields shows a pin at the entered lat/lng (updates live)

3. **Given** the form  
   **When** validated with Zod  
   **Then** all required fields must be present, image ≤ 5 MB (NFR-004), lat between -90 and 90, lng between -180 and 180

4. **Given** the "Add Submission" button  
   **When** rendered  
   **Then** it is neon green (`bg-[#39FF14]`), full width, with black text

5. **Given** the admin fills out the form and clicks "Add Submission"  
   **When** submitted  
   **Then** the feature image is uploaded to Cloudinary via `/api/upload`  
   **And** the submission data (with Cloudinary URL) is saved to PostgreSQL via Server Action  
   **And** a success toast shows and admin is redirected to `/admin`  
   **And** the new submission is immediately visible on the public map and grid (FR-010)

6. **Given** form validation fails  
   **When** the user tries to submit  
   **Then** field-level error messages appear next to invalid fields

## Tasks / Subtasks

- [ ] Task 1: Create Zod validation schema (AC: #3)
  - [ ] Create or update `src/lib/validations.ts`
  - [ ] `createSubmissionSchema`: appName (required string), teamName (required), teamMembers (optional string array), description (required), techStack (required string array, min 1), mosqueName (required), latitude (number, -90 to 90), longitude (number, -180 to 180)
- [ ] Task 2: Create Cloudinary upload route (AC: #5)
  - [ ] Create `src/app/api/upload/route.ts`
  - [ ] POST handler: accept FormData with image file
  - [ ] Validate file type (image/*) and size (≤ 5 MB)
  - [ ] Upload to Cloudinary using `cloudinary` SDK
  - [ ] Return `{ data: { url: string } }` or `{ error: { message, code } }`
  - [ ] Create `src/lib/cloudinary.ts` with upload helper
- [ ] Task 3: Create team members input component (AC: #1)
  - [ ] Create `src/components/admin/team-members-input.tsx` (`"use client"`)
  - [ ] Text input + "Add" button
  - [ ] Display added names as removable chips/badges
  - [ ] Returns string array to parent form
- [ ] Task 4: Create submission form component (AC: #1, #2, #4, #6)
  - [ ] Create `src/components/admin/submission-form.tsx` (`"use client"`)
  - [ ] React Hook Form with Zod resolver
  - [ ] All fields from acceptance criteria table
  - [ ] Tech stack multi-select with common options (Laravel, React, Vue, Next.js, Flutter, etc.) + custom entry
  - [ ] File input with image preview after selection
  - [ ] Mini Leaflet map preview for coordinates
  - [ ] Field-level error display
- [ ] Task 5: Create submission server action (AC: #5)
  - [ ] Create `src/actions/submissions.ts`
  - [ ] `createSubmission` server action
  - [ ] Validate with Zod
  - [ ] Save to database via Prisma
  - [ ] Revalidate homepage path (`revalidatePath('/')`)
  - [ ] Return success/error response
- [ ] Task 6: Create submission page (AC: #1, #5)
  - [ ] Update `src/app/admin/submissions/new/page.tsx`
  - [ ] Protected by middleware (Story 4.1)
  - [ ] Render submission form component
  - [ ] Handle success redirect to `/admin`

## Dev Notes

- **Cloudinary config:**

  ```ts
  // src/lib/cloudinary.ts
  import { v2 as cloudinary } from 'cloudinary'
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
  ```

- **Image upload flow:** Client selects file → form submission → server action uploads to Cloudinary → stores URL in DB
- **Tech stack common options:** `['Next.js', 'React', 'Vue', 'Laravel', 'Flutter', 'Node.js', 'Python', 'Django', 'Express', 'PostgreSQL', 'MongoDB', 'Firebase', 'Tailwind CSS']`
- **Mini map preview** is a small Leaflet map (height ~200px) that centers on entered coordinates. Use `"use client"` and dynamic import
- **`revalidatePath('/')`** is critical so the new submission shows on the homepage immediately without manual refresh

### Project Structure Notes

- `src/components/admin/submission-form.tsx` — Main form
- `src/components/admin/team-members-input.tsx` — Tag input
- `src/actions/submissions.ts` — Server actions
- `src/app/api/upload/route.ts` — Image upload endpoint
- `src/lib/cloudinary.ts` — Cloudinary helper
- `src/lib/validations.ts` — Zod schemas

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#API & Communication]
- [Source: _bmad-output/planning-artifacts/architecture.md#Process Patterns — Image Upload Flow]
- [Source: requirements.md#FR-009, FR-010, FR-012, NFR-004]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
