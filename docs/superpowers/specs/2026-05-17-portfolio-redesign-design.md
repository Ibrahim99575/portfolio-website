# Portfolio Redesign — "Signal" Design Spec
**Date:** 2026-05-17  
**Author:** Ibrahim Ali  
**Status:** Approved for implementation

---

## 1. Overview

A complete visual identity rebuild of Ibrahim Ali's React portfolio website. The concept is **Signal** — inspired by Ibrahim's work building cloud notification systems that handle millions of messages. The design communicates precision, reliability, and architectural depth through an aerospace-dark aesthetic with electric cyan and amber accents.

**Target audience:** Recruiters and hiring managers at tech-forward companies, startups, and enterprise engineering teams.

**Tone:** Refined & Professional + Creative & Distinctive — editorial magazine craft meets developer engineering credibility.

---

## 2. Design System

### 2.1 Color Tokens

#### Dark Mode (default)
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#07090F` | Page background |
| `--bg-surface` | `#0D1526` | Cards, header background |
| `--bg-surface-2` | `#131E35` | Hover states, nested elements |
| `--accent-cyan` | `#22D3EE` | Primary accent, links, highlights, borders |
| `--accent-amber` | `#F59E0B` | Secondary accent, badges, tech tags |
| `--text-primary` | `#F0F9FF` | Headings, primary text |
| `--text-secondary` | `#94A3B8` | Body text, descriptions, labels |
| `--border` | `#1E2D4A` | Card borders, dividers, decorative lines |
| `--success` | `#22C55E` | Availability badge, completed status |

#### Light Mode
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#FAFAF9` | Page background |
| `--bg-surface` | `#FFFFFF` | Cards, header background |
| `--bg-surface-2` | `#F1F5F9` | Hover states |
| `--accent-cyan` | `#0891B2` | Primary accent (darkened for contrast) |
| `--accent-amber` | `#D97706` | Secondary accent |
| `--text-primary` | `#07090F` | Headings |
| `--text-secondary` | `#475569` | Body text |
| `--border` | `#E2E8F0` | Card borders, dividers |
| `--success` | `#16A34A` | Availability badge, completed status |

### 2.2 Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display (hero name) | Syne | 800 | `clamp(3.5rem, 8vw, 7rem)` |
| Section titles | Syne | 700 | `2.5rem` |
| Card headings | Syne | 600 | `1.25rem` |
| Body text | DM Sans | 400 | `1rem / 1.8 line-height` |
| Labels / UI text | DM Sans | 500 | `0.875rem` |
| Tech tags / code | JetBrains Mono | 400 | `0.8rem` |

Google Fonts imports: `Syne:wght@600;700;800`, `DM+Sans:wght@400;500`, `JetBrains+Mono:wght@400`.

### 2.3 Spacing & Radius

- Section vertical padding: `6rem` top/bottom
- Card border-radius: `12px` (featured cards), `8px` (small elements), `4px` (tags)
- Container max-width: `1200px`, centered, `24px` horizontal padding

### 2.4 Global Atmosphere

- **Grain overlay:** A fixed `::after` pseudo-element on `body` with an SVG noise texture at `3% opacity`. Adds tactility and premium depth globally without interfering with content.
- **Custom scrollbar (webkit):** `4px` width, `--bg-surface-2` track, `--accent-cyan` thumb.
- **Scroll progress bar:** `2px` fixed line at top of viewport, fills with `--accent-cyan` as user scrolls.
- **Section number decoratives:** Each section displays its index (`"01"` through `"06"`) in Syne 800 at `8rem`, `--border` color, positioned `top: 2rem; right: 2rem`, absolute, non-interactive. Creates editorial magazine rhythm.

---

## 3. Theme Architecture

- `data-theme="dark|light"` attribute on `<html>` controls all CSS variables via `:root[data-theme="dark"]` and `:root[data-theme="light"]` selectors.
- `ThemeContext` React context provides `theme` state and `toggleTheme` function.
- On mount: read `localStorage.getItem('theme')`. If absent, use `window.matchMedia('(prefers-color-scheme: dark)')`.
- On toggle: update state, write to `localStorage`, set `data-theme` on `document.documentElement`.
- All color transitions: `transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease`.

---

## 4. Component Designs

### 4.1 Header

**Structure:** Fixed, full-width. `--bg-surface` + `backdrop-filter: blur(12px)`. Default: `1px solid --border` bottom edge. On scroll: border brightens, subtle `box-shadow: 0 4px 24px rgba(0,0,0,0.3)`.

**Logo:** `IA` monogram — Syne 700. `I` in `--text-primary`, `A` in `--accent-cyan`. `2px` amber underline beneath `A`.

**Nav links:** DM Sans 500, `--text-secondary` → `--accent-cyan` on hover. Active section link stays cyan. `2px` underline slides in from left on hover (`transform: scaleX(0→1)`, `transform-origin: left`).

**Right controls:**
- Dark/light toggle: lucide-react Sun/Moon icon, `--text-secondary`. Rotates `180deg` on switch, `0.3s ease`.
- Resume pill button: `1px solid --accent-amber`, amber text, fills amber on hover, DM Sans 500, `6px` radius.

**Mobile:** Hamburger → `×` toggle. Right-side drawer with dark overlay. Nav items stagger in with Framer Motion `x: 20 → 0`.

---

### 4.2 Hero Section

**Background:** `--bg-primary` base. Radial gradient from bottom-right: `--accent-cyan` at `5% opacity → transparent`. Dot-grid overlay: `radial-gradient` repeating at `24px`, `1px` dots, `--border` color.

**Layout:** Asymmetric two-column — left 60% text, right 40% monogram.

**Monogram (`IA`):**
- Size: ~`280px` square
- Letters: Syne 800, very large scale. `I` in `--text-primary`, `A` in `--accent-cyan`
- Frame: two thin `1px --border` squares, outer rotated `12deg`, inner `6deg`
- Idle animation: very slow rotation, `20s` CSS `@keyframes` loop, `rotate(0deg → 360deg)`
- Radar rings: two concentric `border-radius: 50%` rings, `1px solid --accent-cyan`, `opacity: 0.4 → 0` expanding `@keyframes` at `3s` stagger. Embodies the "Signal / notification ping" concept.

**Text stack:**
```
Full-stack Engineer          ← DM Sans 500, --text-secondary, letter-spacing: 0.15em, uppercase, 0.875rem
IBRAHIM ALI                  ← Syne 800, --text-primary, clamp(3.5rem, 8vw, 7rem)
                             ← 3px --accent-cyan underline beneath "ALI" only
```

**Tagline:** `"Java · Spring Boot · Azure · AWS · CI/CD"` — JetBrains Mono, `--accent-amber`, `0.8rem`, letter-spacing `0.1em`, all caps.

**CTAs:**
- Primary: `"View My Work"` — `--accent-cyan` fill, `--bg-primary` text, Syne 600, `4px` radius
- Secondary: `"Download Resume ↓"` — `1px solid --border`, `--text-secondary`, fills `--bg-surface-2` on hover

**Scroll indicator:** Vertical `2px --accent-cyan` line, `scaleY: 0 → 1 → 0` cycling animation, `1.5s` ease infinite.

**Entry animation (Framer Motion, staggered):**
1. Role label: `y: 20 → 0, opacity: 0 → 1, delay: 0s`
2. Name: `delay: 0.15s`
3. Tagline: `delay: 0.3s`
4. CTAs: `delay: 0.45s`
5. Monogram: `delay: 0.2s`, scale `0.9 → 1`

---

### 4.3 About Section

**Background:** `--bg-surface`. Section number `"01"` top-right.

**Section title:** `"About"` — Syne 700, `--text-primary`. `3px solid --accent-cyan` left border, `8px` left padding.

**Zone 1 — Stat Bar (full-width horizontal strip):**
```
1 yr 9 mo          2              Millions
Years Experience   Cloud Platforms  Users Served
```
Numbers: Syne 800, `--accent-cyan`, `3rem`. Labels: DM Sans, `--text-secondary`, `0.875rem`. Separated by `1px solid --border` vertical dividers. `whileInView` count-up animation on numbers.

**Zone 2 — Body Copy:**
Two paragraphs, DM Sans 400, `1.1rem`, `1.8` line-height, `--text-secondary`, `60ch` max-width.

**Zone 3 — Expertise Pillars (4-column grid):**
Cards: `--bg-surface-2`, `1px solid --border`, `8px` radius, left-aligned.
- Top-left: 2-char amber monospace identifier (`ML`, `NT`, `CD`, `ES`)
- Title: Syne 600, `--text-primary`
- Description: DM Sans, `--text-secondary`, one line
- Hover: `translateY(-4px)`, border brightens to `--accent-cyan`, `0.2s ease`

---

### 4.4 Experience Section

**Background:** `--bg-primary`. Section number `"02"` top-right.

**Section title:** `"Experience"` — Syne 700 with cyan left-border accent.

**No timeline.** Single full-width featured case study card.

**Card:** `--bg-surface`, `1px solid --border`, `12px` radius, `2px solid --accent-amber` bottom accent line.

**Card Top Strip:**
```
Software Developer                           2024 — Present
Air India · Notification Team                India
```
Role: Syne 600, `--text-primary`. Company: DM Sans, `--accent-cyan`. Date/location: DM Sans, `--text-secondary`, right-aligned. Separated by `1px solid --border` line.

**Card Body — two columns (60/40):**

Left: Four impact statements. Each: `2px solid --accent-cyan` left border, `8px` padding-left, `16px` gap. DM Sans, `--text-secondary`. Strong verb openings, measurable outcomes.

Right: `"Stack Used"` panel — tech tags in JetBrains Mono, amber border, `4px` radius. Below: metric strip showing `Azure | AWS | Multi-Cloud` and pipeline tools.

---

### 4.5 Skills Section

**Background:** `--bg-surface`. Section number `"03"` top-right.

**Section title:** `"Skills & Stack"` — Syne 700 with cyan left-border accent.

**Layout:** Five full-width category rows, each separated by `1px solid --border`.

**Row structure:**
- Left (fixed `180px`): Category label — JetBrains Mono, `--accent-amber`, small caps, `0.75rem`
- Right (flex-wrap): Skill tags

**Tag tiers:**
- Core skills (Java, Spring Boot, Azure, AWS SES, Event Hub): `--bg-surface-2`, `1px solid --accent-cyan`, `--text-primary`, JetBrains Mono `0.8rem`
- Supporting skills: `--bg-surface`, `1px solid --border`, `--text-secondary`
- Hover (all): `translateY(-2px)`, border → `--accent-cyan`, text → `--text-primary`, `0.2s ease`

**Categories:**
```
LANGUAGES    Java · C++ · Python · JavaScript · C
FRAMEWORKS   Spring Boot · JPA/Hibernate · Spring Security · Maven · Java Enterprise
CLOUD        Azure Databricks · Event Hub · Service Bus · Azure Functions · AWS SES · AWS
DEVOPS       GitHub Actions · Azure Pipelines · Docker · CI/CD
APIs         REST APIs · NetCore Platform · Vilpower API · EmailJS · jsPDF
```

**Bottom summary:** DM Sans `--text-secondary`, one line: `"Specialising in enterprise Java systems, multi-cloud infrastructure, and event-driven notification architecture."`

---

### 4.6 Projects Section

**Background:** `--bg-primary`. Section number `"04"` top-right.

**Section title:** `"Projects"` — Syne 700 with cyan left-border accent.

**Layout:** Asymmetric grid — featured card full-width, then two supporting cards in a 50/50 row below.

**Featured Card (Air India Notification System):**
- Full-width, `--bg-surface`, `1px solid --border`, `12px` radius
- Internal two-column: left 55% content, right 45% architecture SVG
- Status badge: pulsing `6px --accent-cyan` dot + `"IN DEVELOPMENT"` text, `--bg-surface-2` background
- Architecture SVG: nodes (`GitHub → Azure Pipelines → Azure/AWS`) in `--bg-surface-2` boxes, connected by dashed `--accent-cyan` lines with animated `stroke-dashoffset` flow

**Supporting Cards:**
- `--bg-surface`, `1px solid --border`, `12px` radius
- Compact: title + badge, 2-sentence description, 3 features with `→` cyan prefix, tech tags, GitHub icon-button

**Status badge standards:**
- `COMPLETED`: `1px solid --accent-amber`, amber text, no fill
- `IN DEVELOPMENT`: pulsing `6px` cyan dot + cyan text, `--bg-surface-2` fill

---

### 4.7 Contact Section

**Background:** `--bg-surface`. Section number `"05"` top-right.

**Section title:** `"Let's Talk"` — Syne 700 with cyan left-border accent.

**Layout:** Sidebar (35%) left + form (65%) right.

**Sidebar contact items (no cards, plain rows):**
- Email: `connect.ibrahim.ali@gmail.com` — copyable, cyan on hover
- LinkedIn: profile URL — opens new tab
- GitHub: `github.com/Ibrahim99575` — opens new tab
- Location: `India` — plain text, no link
- Phone: **removed**

**Availability badge:** Pulsing `8px #22C55E` dot + `"Available for opportunities"` — DM Sans, `--text-secondary`.

**Form inputs:**
- Background: `--bg-surface-2`
- Border: `1px solid --border` → `1px solid --accent-cyan` on focus
- Border-radius: `6px`
- Floating labels above inputs
- Font: DM Sans, `--text-primary`
- Fields: Name, Email, Subject, Message (4-row textarea)

**Submit button:** Full-width, `--accent-cyan` fill, dark text, Syne 600. Loading spinner inline on submit. Success/error replaces button inline.

---

### 4.8 Footer

**Background:** `--bg-surface`. `1px solid --border` top edge.

**Row 1:**
```
IA (monogram)    ←left    Built with React    ←center    ↑ Back to top    ←right
```

**Row 2:**
```
© 2025 Ibrahim Ali · Software Developer        [LinkedIn] [GitHub] [X] icons
```

Social icons: lucide-react, `--text-secondary` → `--accent-cyan` hover, `0.2s ease`.

---

## 5. Animation System

| Element | Animation | Trigger |
|---------|-----------|---------|
| All sections | `opacity: 0→1, y: 30→0, 0.5s ease` | `whileInView`, once |
| Section children | Stagger `0.1s` per child | With parent |
| Hero elements | Stagger `0.15s`, `y: 20→0` | On mount |
| IA monogram | Slow `rotate 360deg`, `20s` infinite | Always |
| Radar rings | Expand + fade, `3s` stagger | Always |
| Stat bar numbers | Count-up to final value, `1.5s` | `whileInView` |
| Skill tags | `translateY(-2px)`, border brighten | Hover |
| Card hover | `translateY(-4px)`, shadow deepen | Hover |
| Architecture SVG | `stroke-dashoffset` flow | Always |
| Theme toggle | `rotate(180deg)`, `0.3s` | On click |
| Nav underline | `scaleX: 0→1` | Hover |
| Scroll progress | Fill with scroll position | Scroll |

---

## 6. Responsive Breakpoints

| Breakpoint | Layout changes |
|------------|---------------|
| `> 1024px` | Full desktop — all multi-column layouts active |
| `768px–1024px` | Hero: stack vertically. About pillars: 2-column. Projects: stack featured, 1-column supporting. |
| `< 768px` | Single column everything. Stat bar: 1-column stack. Skills: category label above tags. Monogram: 180px. |
| `< 480px` | Hero CTAs stack vertically. Footer: single column. |

---

## 7. Files to Create / Modify

| File | Action |
|------|--------|
| `src/index.css` | Replace fonts (Syne, DM Sans, JetBrains Mono), add grain overlay, scrollbar, scroll-progress |
| `src/App.css` | Replace entire design system (CSS variables, dark/light tokens, global styles) |
| `src/App.js` | Add ThemeProvider, ThemeContext, `data-theme` attribute management |
| `src/components/Header.js` | Redesign: IA monogram logo, new nav styles, theme toggle, resume pill |
| `src/components/Hero.js` | Redesign: new layout, IA monogram with radar rings, new text stack, CTAs |
| `src/components/About.js` | Redesign: stat bar, body copy, expertise pillars (no purple circles) |
| `src/components/Experience.js` | Redesign: drop timeline, featured case study card |
| `src/components/Skills.js` | Redesign: category rows with tag tiers (no progress bars) |
| `src/components/Projects.js` | Redesign: asymmetric grid, featured card with SVG diagram |
| `src/components/Contact.js` | Redesign: sidebar layout, remove phone, availability badge, new form |
| `src/components/Footer.js` | Redesign: compact two-row, no gradient circle button |
| `src/context/ThemeContext.js` | Create: theme context, toggle logic, localStorage persistence |

---

## 8. Out of Scope

- Backend changes
- EmailJS configuration changes
- Resume generator logic changes
- Routing / URL structure changes
- New sections not currently present
- Real profile photo (user will use IA monogram)
