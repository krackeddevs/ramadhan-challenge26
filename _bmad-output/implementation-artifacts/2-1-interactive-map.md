# Story 2.1: Implement Interactive Malaysia Map with Mosque Pins

Status: ready-for-dev

## Story

As a public visitor,
I want to see a dark-themed interactive map of Malaysia with neon green pins for each mosque submission,
so that I can visually discover where the community's apps are located.

## Acceptance Criteria

1. **Given** the homepage is loaded  
   **When** the map section renders  
   **Then** a Leaflet map displays using CartoDB Dark Matter tiles (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`)

2. **Given** the map renders  
   **When** centered  
   **Then** it is focused on Malaysia at approximately lat 4.2, lng 108.0, zoom 6

3. **Given** submissions exist in the database  
   **When** the map loads  
   **Then** each submission is represented by a custom neon green SVG marker at its lat/lng coordinates

4. **Given** a user hovers over a marker  
   **When** the tooltip appears  
   **Then** it shows the App Name and Mosque Name with dark background and neon green text

5. **Given** the map section  
   **When** rendered on desktop  
   **Then** it is full-width with min-height 70vh  
   **And** on mobile it is min-height 50vh

6. **Given** the map  
   **When** zoom controls render  
   **Then** default Leaflet controls are hidden and custom themed buttons are shown (neon green border, dark background)

7. **Given** 200 submissions in the database  
   **When** the map renders all pins  
   **Then** rendering completes within 2 seconds (NFR-002)

8. **Given** the map component  
   **When** it is imported  
   **Then** it uses `"use client"` directive and is dynamically imported with `next/dynamic` (SSR disabled for Leaflet)

9. **Given** the API endpoint `/api/submissions`  
   **When** a GET request is made  
   **Then** it returns all submissions as JSON array: `{ data: Submission[] }`

## Tasks / Subtasks

- [ ] Task 1: Create submissions API route (AC: #9)
  - [ ] Create `src/app/api/submissions/route.ts`
  - [ ] GET handler: query all submissions via Prisma, return `{ data: submissions }`
  - [ ] Handle errors: return `{ error: { message, code } }` with appropriate status
- [ ] Task 2: Create map component (AC: #1, #2, #5, #6, #8)
  - [ ] Create `src/components/map/map-view.tsx` with `"use client"`
  - [ ] Install Leaflet CSS import
  - [ ] Configure CartoDB Dark Matter tile layer
  - [ ] Center map on Malaysia (lat 4.2, lng 108.0, zoom 6)
  - [ ] Set responsive height: 70vh desktop, 50vh mobile
  - [ ] Hide default controls, add custom styled zoom buttons
- [ ] Task 3: Create custom marker component (AC: #3)
  - [ ] Create `src/components/map/mosque-marker.tsx`
  - [ ] Custom neon green SVG icon using Leaflet `divIcon` or custom `L.Icon`
  - [ ] SVG marker: pin/circle shape with `#39FF14` fill
- [ ] Task 4: Create tooltip component (AC: #4)
  - [ ] Create `src/components/map/map-tooltip.tsx`
  - [ ] Dark background tooltip with neon green text
  - [ ] Show App Name (bold) + Mosque Name
- [ ] Task 5: Dynamic import in homepage (AC: #8)
  - [ ] Replace map placeholder in `src/app/page.tsx` with dynamic import
  - [ ] `const MapView = dynamic(() => import('@/components/map/map-view'), { ssr: false })`
  - [ ] Add loading skeleton for map section
- [ ] Task 6: Fetch and display submissions (AC: #3, #7)
  - [ ] Fetch from `/api/submissions` in map component
  - [ ] Render markers for each submission
  - [ ] Test with seed data to verify rendering performance

## Dev Notes

- **Leaflet + Next.js SSR conflict:** Leaflet requires `window` object. Always use `next/dynamic` with `{ ssr: false }` to import the map component
- **Leaflet CSS:** Must import `leaflet/dist/leaflet.css` in the map component or globals
- **CartoDB Dark Matter tiles** are free, no API key needed. Attribution required
- **Custom SVG marker example:**

  ```tsx
  const neonIcon = L.divIcon({
    className: 'custom-marker',
    html: `<svg width="24" height="36" viewBox="0 0 24 36"><path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#39FF14"/></svg>`,
    iconSize: [24, 36],
    iconAnchor: [12, 36],
  })
  ```

- **React Leaflet components:** Use `<MapContainer>`, `<TileLayer>`, `<Marker>`, `<Tooltip>`, `<ZoomControl>`

### References

- [Source: _bmad-output/planning-artifacts/architecture.md#Frontend Architecture]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Map Section]
- [Source: _bmad-output/planning-artifacts/architecture.md#API & Communication]

## Dev Agent Record

### Agent Model Used

### Debug Log References

### Completion Notes List

### File List
