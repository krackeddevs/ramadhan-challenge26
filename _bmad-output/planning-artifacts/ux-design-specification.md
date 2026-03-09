---
stepsCompleted: [init, information-architecture, interaction-patterns, component-design, responsive-strategy]
inputDocuments: [requirements.md]
---

# UX Design Specification — KD Ramadhan Challenge 2026

**Author:** Muhaiminjuhari  
**Date:** 2026-03-09  

---

## 1. Design Philosophy

A **dark, immersive, geo-visual showcase** that lets the KD brand speak through the interface. Every screen should feel like exploring a cyber command center — minimal chrome, maximum content, neon highlights drawing the eye to interactive elements.

**Principles:**

- **Map-first discovery** — The map is the hero; users discover by exploring
- **Glanceable cards** — Submission info scans in under 3 seconds
- **Zero learning curve** — Pin → Click → Detail, no onboarding needed
- **Brand immersion** — Every pixel reinforces the Kracked Devs identity

---

## 2. Information Architecture

```
Homepage (/)
├── Hero Section (Tagline + CTA)
├── Interactive Map Section (Full-width Malaysia map)
├── Participants/Teams Section (Grid of team cards)
├── Supported By Section (Sponsor logos)
└── Footer (KD links + social media)

Submission Detail (/submission/[id] or Modal)
├── Featured Image (Hero)
├── App Info (Name, Description, Tech Stack)
├── Team Info (Team Name, Members)
└── Mosque Info (Name, Location on mini-map)

Admin Login (/admin/login)
└── Email + Password form

Admin Dashboard (/admin)
├── Submissions List (Table view)
└── Add Submission Form (/admin/submissions/new)
```

---

## 3. Screen Specifications

### 3.1 Homepage

#### Hero Section

- **Layout:** Full-width, vertically centered content over a subtle animated grid background
- **Content:**
  - KD logo (top-left or centered)
  - Title: "Ramadhan Challenge 2026" in pixelated heading font
  - Subtitle: "Community-built apps for mosques across Malaysia"
  - CTA button: "Explore the Map ↓" — smooth scrolls to map section
- **Background:** Animated CSS gridline pattern (thin neon green lines on `#050505`)

#### Map Section

- **Layout:** Full-width, min-height 70vh
- **Map Config:**
  - Dark tile layer (CartoDB Dark Matter)
  - Centered on Malaysia (~lat 4.2, lng 108.0, zoom 6)
  - Custom neon green SVG markers for each mosque pin
  - Cluster markers when >10 pins are within close proximity
- **Interaction:**
  - Hover on pin → tooltip showing App Name + Mosque Name
  - Click on pin → opens submission detail (modal on desktop, full page on mobile)
- **Controls:** Zoom +/- buttons styled with neon border, no default Leaflet controls

#### Participants Section

- **Layout:** Section title "Submissions" + responsive grid (3 cols desktop, 2 tablet, 1 mobile)
- **Card Design:**
  - Dark surface card (`#111111`) with subtle neon green border on hover
  - Featured image thumbnail (top, 16:9 aspect ratio)
  - App Name (bold, white)
  - Team Name (muted gray)
  - Mosque Name (neon green accent text)
  - Tech Stack tags (small pill badges)
- **Interaction:** Card click → same detail view as map pin click

#### Supported By Section

- **Layout:** Centered row of 3 logos with "Supported By" heading
- **Logos:** Grayscale by default, full color on hover (subtle transition)
- **Spacing:** Generous padding, separator line above

#### Footer

- **Layout:** Dark footer (`#050505`), two-column on desktop
  - Left: KD logo + "© 2026 Kracked Devs"
  - Right: Social media icon row (Threads, X, Facebook, LinkedIn, Instagram)
- **Icons:** Neon green on hover, muted gray default

### 3.2 Submission Detail View

**Desktop:** Modal overlay with dark backdrop blur  
**Mobile:** Full-screen page with back button

- **Hero Image:** Full-width featured image with gradient overlay at bottom
- **Content Block:**
  - App Name (H1, pixelated font)
  - Description (body text, regular font)
  - Tech Stack (horizontal pill badges, e.g., "Laravel", "React" with neon green outline)
- **Team Block:**
  - Team Name (H2)
  - Team Members (comma-separated list or avatar-style initials)
- **Mosque Block:**
  - Mosque Name
  - Small embedded map showing pin location (static or mini Leaflet map)
  - Coordinates displayed in monospace font

### 3.3 Admin Login

- **Layout:** Centered card on dark background with grid pattern
- **Form Fields:**
  - Email input (dark input, neon green focus border)
  - Password input (same styling, toggle visibility)
  - "Sign In" button (solid neon green, black text)
- **Error State:** Red toast/banner for invalid credentials
- **No registration link** — admin accounts are pre-provisioned

### 3.4 Admin Dashboard

- **Layout:** Simple sidebar-free layout with top nav showing "Dashboard" + "Logout"
- **Submissions Table:**
  - Columns: App Name, Team Name, Mosque, Date Added, Actions (Edit/Delete)
  - Dark table with alternating row shading
  - Search/filter bar at top
- **Add Submission Button:** Fixed position or in header, neon green accent

### 3.5 Admin — Add Submission Form

- **Layout:** Single-column centered form (max-width 680px)
- **Fields:**

  | Field | Type | Required | Notes |
  |-------|------|----------|-------|
  | App Name | Text input | Yes | |
  | Team Name | Text input | Yes | |
  | Team Members | Multi-input (tags) | No | Add/remove member names |
  | Description | Textarea | Yes | Markdown support optional |
  | Feature Image | File upload + URL fallback | Yes | Preview shown after upload |
  | Tech Stack | Multi-select tags | Yes | Common options + custom entry |
  | Mosque Name | Text input | Yes | |
  | Latitude | Number input | Yes | Decimal degrees |
  | Longitude | Number input | Yes | Decimal degrees |

- **Map Preview:** Small map below coordinate fields showing pin at entered lat/lng (updates live)
- **Submit Button:** "Add Submission" — neon green, full width

---

## 4. Component Patterns (Shadcn UI Mapping)

| Component | Shadcn Base | Customization |
|-----------|-------------|---------------|
| Navigation | — | Custom top bar, minimal |
| Card | `Card` | Dark surface, neon border hover, sharp corners |
| Button (Primary) | `Button` | Neon green bg `#39FF14`, black text, sharp corners |
| Button (Secondary) | `Button variant="outline"` | Transparent bg, neon green border |
| Input | `Input` | Dark bg `#1A1A2E`, neon green focus ring |
| Modal/Dialog | `Dialog` | Backdrop blur, dark panel, neon green close button |
| Badge/Tag | `Badge` | Outline style, neon green border, small text |
| Table | `Table` | Dark rows, subtle borders, muted header |
| Toast | `Toast` | Error: red accent, Success: neon green accent |
| Tooltip | `Tooltip` | Dark bg, neon green text, sharp corners |

**Theme Tokens:**

```css
--background: #050505;
--foreground: #E0E0E0;
--card: #111111;
--card-foreground: #E0E0E0;
--primary: #39FF14;
--primary-foreground: #050505;
--secondary: #1A1A2E;
--accent: #00D4FF;
--muted: #333333;
--border: #222222;
--ring: #39FF14;
--radius: 0px;
```

---

## 5. Responsive Strategy

| Breakpoint | Layout Changes |
|------------|----------------|
| **Mobile** (< 640px) | Single column, full-screen detail view (no modal), stacked footer, hamburger nav for admin |
| **Tablet** (640–1024px) | 2-column card grid, modal detail view, map height 60vh |
| **Desktop** (> 1024px) | 3-column card grid, modal detail view, map height 70vh, side-by-side footer |

**Map Behavior:**

- Mobile: Map is full-width, 50vh height, touch-to-pan enabled
- Desktop: Map is full-width, 70vh height, mouse scroll zoom enabled

---

## 6. Interaction & Animation Patterns

| Interaction | Behavior |
|-------------|----------|
| Page load | Grid background animates in (fade + subtle pulse) |
| Map pin hover | Pin scales up 1.2x with glow effect |
| Map pin click | Modal slides up (mobile) or fades in (desktop) |
| Card hover | Neon green border fades in, subtle card lift (translateY -2px) |
| Button hover | Background brightness increases, slight scale |
| Form submit | Loading spinner replaces button text, success toast on complete |
| Scroll to map | Smooth scroll triggered by CTA button |
| Sponsor logos | Grayscale → color transition on hover (0.3s ease) |

---

## 7. Navigation Architecture

**Public:**

- Single-page scrolling homepage (anchor links: Map, Submissions, Supported By)
- Detail view accessed via map pin or card click

**Admin:**

- `/admin/login` → `/admin` (dashboard) → `/admin/submissions/new` (form)
- Top bar with "Dashboard" and "Logout" only
- No public-facing admin navigation
