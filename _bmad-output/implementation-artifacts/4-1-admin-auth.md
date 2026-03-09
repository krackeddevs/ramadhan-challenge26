# Story 4.1: Admin Authentication & Route Protection

Status: ready-for-dev

## Story

As an admin,
I want to log in with my email and password so that I can manage submissions,
so that only authorized KD staff can add or modify challenge entries.

## Acceptance Criteria

1. **Given** the admin navigates to `/admin/login`  
   **When** they enter valid email and password and click "Sign In"  
   **Then** they are authenticated via NextAuth.js Credentials provider and redirected to `/admin`

2. **Given** authentication succeeds  
   **When** the session is created  
   **Then** a JWT session is stored in an HTTP-only cookie  
   **And** the password was verified against a bcrypt hash in the `Admin` table (NFR-005)

3. **Given** the login page  
   **When** rendered  
   **Then** it shows a centered card on dark background with grid pattern  
   **And** email and password inputs have dark backgrounds with neon green focus borders (`ring-[#39FF14]`)  
   **And** the "Sign In" button is solid neon green (`bg-[#39FF14]`) with black text

4. **Given** the admin enters invalid credentials  
   **When** they click "Sign In"  
   **Then** an error message "Invalid email or password" is displayed via a red toast

5. **Given** an unauthenticated user  
   **When** they try to access any `/admin` route (except `/admin/login`)  
   **Then** they are redirected to `/admin/login` via Next.js middleware (FR-011)

6. **Given** the Prisma seed script  
   **When** `npx prisma db seed` is run  
   **Then** an admin user is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables with bcrypt-hashed password

## Tasks / Subtasks

- [ ] Task 1: Configure NextAuth.js (AC: #1, #2)
  - [ ] Create `src/lib/auth.ts` with NextAuth v5 config
  - [ ] Credentials provider: accepts email + password
  - [ ] Authorize function: query Admin table, verify bcrypt hash
  - [ ] JWT session strategy, HTTP-only cookie
  - [ ] Session callback to include user id
- [ ] Task 2: Create NextAuth API route (AC: #1)
  - [ ] Create `src/app/api/auth/[...nextauth]/route.ts`
  - [ ] Export GET and POST handlers from NextAuth
- [ ] Task 3: Create login page and form (AC: #3, #4)
  - [ ] Update `src/app/admin/login/page.tsx`
  - [ ] Create `src/components/admin/login-form.tsx` (`"use client"`)
  - [ ] Shadcn Card + Input + Button components
  - [ ] Use React Hook Form + Zod for validation
  - [ ] Call `signIn("credentials", ...)` on submit
  - [ ] Show error toast on failure, redirect on success
- [ ] Task 4: Create middleware for route protection (AC: #5)
  - [ ] Create `src/middleware.ts`
  - [ ] Match `/admin` routes (exclude `/admin/login`)
  - [ ] Check for valid session token
  - [ ] Redirect to `/admin/login` if unauthenticated
- [ ] Task 5: Create Prisma seed script (AC: #6)
  - [ ] Create `prisma/seed.ts` (if not already from Story 1.1)
  - [ ] Read `ADMIN_EMAIL` and `ADMIN_PASSWORD` from env
  - [ ] Hash password with bcrypt (12 rounds)
  - [ ] Upsert admin user (create if not exists)
  - [ ] Update `package.json` with prisma seed config

## Dev Notes

- **NextAuth v5 (Auth.js)** uses a different config pattern than v4:

  ```ts
  // src/lib/auth.ts
  import NextAuth from "next-auth"
  import Credentials from "next-auth/providers/credentials"
  export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [Credentials({ ... })],
    session: { strategy: "jwt" },
  })
  ```

- **Middleware pattern for NextAuth v5:**

  ```ts
  // src/middleware.ts
  export { auth as middleware } from "@/lib/auth"
  export const config = { matcher: ["/admin/((?!login).*)"] }
  ```

- **bcrypt:** Use `bcryptjs` (pure JS, no native deps — better for Railway)
- **NEXTAUTH_SECRET** must be set in Railway env vars: `openssl rand -base64 32`
- **NEXTAUTH_URL** must match Railway's public domain

### Project Structure Notes

- `src/lib/auth.ts` — NextAuth configuration
- `src/app/api/auth/[...nextauth]/route.ts` — Auth API
- `src/middleware.ts` — Route protection
- `src/components/admin/login-form.tsx` — Login UI
- `prisma/seed.ts` — Admin seeder

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Authentication & Security]
- [Source: _bmad-output/planning-artifacts/architecture.md#Implementation Patterns]
- [Source: requirements.md#FR-008, FR-011, NFR-005]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
