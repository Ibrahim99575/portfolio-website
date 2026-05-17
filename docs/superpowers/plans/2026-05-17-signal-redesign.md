# Signal Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely rebuild the portfolio's visual identity using the "Signal" design concept — aerospace navy + electric cyan + amber, Syne + DM Sans + JetBrains Mono typography, dark/light toggle, and distinctive components throughout.

**Architecture:** ThemeContext manages dark/light state with localStorage persistence. CSS custom properties on `[data-theme]` drive all color changes. Each component is fully replaced — no incremental patching of old styles.

**Tech Stack:** React 19, Framer Motion 12, lucide-react, CSS custom properties, SVG animations

**Spec:** `docs/superpowers/specs/2026-05-17-portfolio-redesign-design.md`

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/context/ThemeContext.js` | Theme state, toggle, localStorage, data-theme attr |
| Replace | `src/index.css` | Font imports, grain overlay, scrollbar, scroll-progress bar |
| Replace | `src/App.css` | All CSS tokens (dark + light), global resets, shared utilities |
| Modify | `src/App.js` | Wrap tree in ThemeProvider |
| Replace | `src/components/Header.js` | IA monogram, nav, theme toggle, resume pill |
| Replace | `src/components/Hero.js` | Asymmetric layout, monogram + radar rings, new text stack |
| Replace | `src/components/About.js` | Stat bar, body copy, expertise pillars |
| Replace | `src/components/Experience.js` | Featured case-study card, no timeline |
| Replace | `src/components/Skills.js` | Category tag rows, no progress bars |
| Replace | `src/components/Projects.js` | Asymmetric grid, SVG architecture diagram |
| Replace | `src/components/Contact.js` | Sidebar layout, availability badge, new form |
| Replace | `src/components/Footer.js` | Compact two-row footer |

---

## Task 1: ThemeContext

**Files:**
- Create: `src/context/ThemeContext.js`

- [ ] **Step 1: Create the context file**

```js
// src/context/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
```

- [ ] **Step 2: Verify it compiles — start dev server**

```bash
npm start
```

Expected: compiles with no errors (ThemeContext is not yet wired in, just exported).

- [ ] **Step 3: Commit**

```bash
git add src/context/ThemeContext.js
git commit -m "feat: add ThemeContext with dark/light toggle and localStorage persistence"
```

---

## Task 2: Design System CSS

**Files:**
- Replace: `src/index.css`
- Replace: `src/App.css`

- [ ] **Step 1: Replace `src/index.css` completely**

```css
/* src/index.css */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'DM Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
  position: relative;
}

/* Grain overlay — global atmosphere */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 128px 128px;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg-surface-2); }
::-webkit-scrollbar-thumb { background: var(--accent-cyan); border-radius: 2px; }

/* Scroll progress bar */
#scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--accent-cyan);
  z-index: 10000;
  transition: width 0.1s linear;
}
```

- [ ] **Step 2: Replace `src/App.css` completely**

```css
/* src/App.css */

/* ─── Dark theme tokens (default) ─── */
:root,
[data-theme='dark'] {
  --bg-primary:    #07090F;
  --bg-surface:    #0D1526;
  --bg-surface-2:  #131E35;
  --accent-cyan:   #22D3EE;
  --accent-amber:  #F59E0B;
  --text-primary:  #F0F9FF;
  --text-secondary:#94A3B8;
  --border:        #1E2D4A;
  --success:       #22C55E;
  --shadow:        0 4px 24px rgba(0, 0, 0, 0.4);
}

/* ─── Light theme tokens ─── */
[data-theme='light'] {
  --bg-primary:    #FAFAF9;
  --bg-surface:    #FFFFFF;
  --bg-surface-2:  #F1F5F9;
  --accent-cyan:   #0891B2;
  --accent-amber:  #D97706;
  --text-primary:  #07090F;
  --text-secondary:#475569;
  --border:        #E2E8F0;
  --success:       #16A34A;
  --shadow:        0 4px 24px rgba(0, 0, 0, 0.08);
}

/* ─── Global transitions ─── */
*, *::before, *::after {
  transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
}

/* ─── Layout ─── */
.App { min-height: 100vh; }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section {
  padding: 6rem 0;
  position: relative;
}

.section-alt { background-color: var(--bg-surface); }

/* ─── Section number decorative ─── */
.section-number {
  position: absolute;
  top: 2rem;
  right: 2rem;
  font-family: 'Syne', sans-serif;
  font-size: 8rem;
  font-weight: 800;
  color: var(--border);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  z-index: 0;
}

/* ─── Section title ─── */
.section-title {
  font-family: 'Syne', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 3rem;
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

.section-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 1em;
  background: var(--accent-cyan);
  flex-shrink: 0;
}

/* ─── Shared card ─── */
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-color: var(--accent-cyan);
}

/* ─── Tech tag ─── */
.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  background: var(--bg-surface);
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  cursor: default;
}

.tag:hover {
  border-color: var(--accent-cyan);
  color: var(--text-primary);
  transform: translateY(-2px);
}

.tag-core {
  border-color: var(--accent-cyan);
  color: var(--text-primary);
  background: var(--bg-surface-2);
}

.tag-amber {
  border-color: var(--accent-amber);
  color: var(--accent-amber);
  background: var(--bg-surface-2);
}

/* ─── Button styles ─── */
.btn-primary {
  font-family: 'Syne', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.75rem;
  background: var(--accent-cyan);
  color: var(--bg-primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: filter 0.2s ease, transform 0.2s ease;
}

.btn-primary:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

.btn-secondary {
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.75rem 1.75rem;
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.btn-secondary:hover {
  background: var(--bg-surface-2);
  border-color: var(--accent-cyan);
  color: var(--text-primary);
  transform: translateY(-1px);
}

/* ─── Status badges ─── */
.badge-completed {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--accent-amber);
  color: var(--accent-amber);
  background: transparent;
}

.badge-dev {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  color: var(--accent-cyan);
  background: var(--bg-surface-2);
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.badge-dev-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-cyan);
  animation: pulse-dot 2s ease infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
}

/* ─── Animations ─── */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.animate-spin { animation: spin 1s linear infinite; }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.status-message { animation: fadeInUp 0.3s ease-out; }

/* ─── Responsive ─── */
@media (max-width: 768px) {
  .section { padding: 4rem 0; }
  .section-number { font-size: 5rem; top: 1rem; right: 1rem; }
  .section-title { font-size: 1.875rem; }
}
```

- [ ] **Step 3: Verify dev server — check for CSS parse errors**

```bash
npm start
```

Expected: compiles successfully. Page will look broken (no component styles yet) — that's expected.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/App.css
git commit -m "feat: replace design system with Signal theme tokens (navy/cyan/amber, Syne/DM Sans)"
```

---

## Task 3: Wire ThemeContext into App.js

**Files:**
- Modify: `src/App.js`
- Modify: `src/index.js` (add scroll progress bar)

- [ ] **Step 1: Update `src/App.js`**

```jsx
// src/App.js
import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = `${(scrolled / total) * 100}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div id="scroll-progress" />;
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <ScrollProgress />
        <Header />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
```

- [ ] **Step 2: Verify — check console has no errors, scroll progress bar renders**

Open browser at `http://localhost:3000`. Open DevTools console — should be clean. Scroll the page — a thin cyan line should appear at top tracking scroll position.

- [ ] **Step 3: Commit**

```bash
git add src/App.js
git commit -m "feat: wrap app in ThemeProvider, add scroll progress bar"
```

---

## Task 4: Header Component

**Files:**
- Replace: `src/components/Header.js`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Download } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Experience', id: 'experience' },
  { name: 'Skills', id: 'skills' },
  { name: 'Projects', id: 'projects' },
  { name: 'Contact', id: 'contact' },
];

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['hero', ...navItems.map(n => n.id)];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileOpen(false);
  };

  const handleResumeDownload = () => scrollTo('contact');

  return (
    <>
      <motion.header
        className={`header ${isScrolled ? 'header-scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="header-inner container">
          {/* IA Monogram */}
          <button className="logo-btn" onClick={() => scrollTo('hero')}>
            <span className="logo-i">I</span>
            <span className="logo-a">A</span>
          </button>

          {/* Desktop nav */}
          <nav className="desktop-nav">
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'nav-link-active' : ''}`}
                onClick={() => scrollTo(item.id)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 + 0.2 }}
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="header-controls">
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              title="Toggle theme"
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </motion.button>

            <motion.button
              className="resume-pill"
              onClick={handleResumeDownload}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={14} />
              Resume
            </motion.button>

            <button
              className="mobile-toggle"
              onClick={() => setIsMobileOpen(o => !o)}
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.nav
              className="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  className="mobile-nav-link"
                  onClick={() => scrollTo(item.id)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          background: var(--bg-surface);
          border-bottom: 1px solid transparent;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .header-scrolled {
          border-bottom-color: var(--border);
          box-shadow: 0 4px 24px rgba(0,0,0,0.25);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        .logo-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.4rem;
          line-height: 1;
          padding: 0;
          display: flex;
          align-items: baseline;
          gap: 0;
        }
        .logo-i { color: var(--text-primary); }
        .logo-a {
          color: var(--accent-cyan);
          border-bottom: 2px solid var(--accent-amber);
          padding-bottom: 1px;
        }
        .desktop-nav {
          display: flex;
          gap: 0.25rem;
        }
        .nav-link {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--text-secondary);
          padding: 0.5rem 0.75rem;
          border-radius: 4px;
          position: relative;
          transition: color 0.2s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0.75rem; right: 0.75rem;
          height: 2px;
          background: var(--accent-cyan);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.2s ease;
        }
        .nav-link:hover { color: var(--accent-cyan); }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link-active { color: var(--accent-cyan); }
        .nav-link-active::after { transform: scaleX(1); }
        .header-controls {
          display: flex; align-items: center; gap: 0.75rem;
        }
        .theme-toggle {
          background: none; border: none; cursor: pointer;
          color: var(--text-secondary);
          padding: 0.4rem;
          border-radius: 6px;
          display: flex; align-items: center;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .theme-toggle:hover {
          color: var(--accent-cyan);
          background: var(--bg-surface-2);
        }
        .resume-pill {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.82rem;
          display: flex; align-items: center; gap: 0.35rem;
          padding: 0.4rem 0.9rem;
          border: 1px solid var(--accent-amber);
          color: var(--accent-amber);
          background: transparent;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .resume-pill:hover {
          background: var(--accent-amber);
          color: var(--bg-primary);
        }
        .mobile-toggle {
          display: none;
          background: none; border: none; cursor: pointer;
          color: var(--text-primary);
          padding: 0.25rem;
        }
        .mobile-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1001;
        }
        .mobile-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: 260px;
          background: var(--bg-surface);
          border-left: 1px solid var(--border);
          z-index: 1002;
          padding: 5rem 2rem 2rem;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .mobile-nav-link {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-secondary);
          text-align: left;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s ease;
        }
        .mobile-nav-link:hover { color: var(--accent-cyan); }
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .resume-pill { display: none; }
          .mobile-toggle { display: flex; }
        }
      `}</style>
    </>
  );
};

export default Header;
```

- [ ] **Step 2: Verify visually**

Check `http://localhost:3000` — header should show `IA` monogram (I in white, A in cyan with amber underline), nav links, sun/moon toggle, resume pill. Click the toggle — theme should switch, all colors updating smoothly.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.js
git commit -m "feat: redesign header with IA monogram, theme toggle, amber resume pill"
```

---

## Task 5: Hero Section

**Files:**
- Replace: `src/components/Hero.js`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/Hero.js
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

const Hero = memo(() => {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-grid" />
      <div className="hero-bg-radial" />

      <div className="container hero-inner">
        {/* Left — text */}
        <div className="hero-text">
          <motion.p className="hero-role" {...fadeUp(0)}>
            Full-stack Engineer
          </motion.p>

          <motion.h1 className="hero-name" {...fadeUp(0.15)}>
            IBRAHIM<br />
            <span className="hero-name-accent">ALI</span>
          </motion.h1>

          <motion.p className="hero-tagline" {...fadeUp(0.3)}>
            Java · Spring Boot · Azure · AWS · CI/CD
          </motion.p>

          <motion.p className="hero-bio" {...fadeUp(0.38)}>
            Full-stack developer specializing in Java &amp; Spring Boot, architecting
            enterprise notification systems that serve millions of users across
            multi-cloud infrastructure.
          </motion.p>

          <motion.div className="hero-ctas" {...fadeUp(0.45)}>
            <button className="btn-primary hero-cta-primary" onClick={() => scrollTo('projects')}>
              View My Work <ArrowRight size={16} />
            </button>
            <button className="btn-secondary hero-cta-secondary" onClick={() => scrollTo('contact')}>
              Download Resume <Download size={15} />
            </button>
          </motion.div>
        </div>

        {/* Right — IA Monogram */}
        <motion.div
          className="hero-monogram-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Radar rings */}
          <div className="radar-ring radar-ring-1" />
          <div className="radar-ring radar-ring-2" />

          {/* Outer rotated frame squares */}
          <div className="mono-frame mono-frame-outer" />
          <div className="mono-frame mono-frame-inner" />

          {/* Letters */}
          <div className="mono-letters">
            <span className="mono-i">I</span>
            <span className="mono-a">A</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: var(--bg-primary);
          padding-top: 64px;
        }
        .hero-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, var(--border) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0.5;
        }
        .hero-bg-radial {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse at 80% 80%, rgba(34,211,238,0.06) 0%, transparent 60%);
        }
        .hero-inner {
          display: grid;
          grid-template-columns: 60fr 40fr;
          align-items: center;
          gap: 4rem;
          padding-top: 4rem;
          padding-bottom: 4rem;
          position: relative;
          z-index: 1;
        }
        .hero-role {
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 0.85rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }
        .hero-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(3.5rem, 8vw, 6.5rem);
          line-height: 0.95;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }
        .hero-name-accent {
          color: var(--text-primary);
          position: relative;
          display: inline-block;
        }
        .hero-name-accent::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 3px;
          background: var(--accent-cyan);
        }
        .hero-tagline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-amber);
          margin-bottom: 1.5rem;
        }
        .hero-bio {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 52ch;
          margin-bottom: 2.5rem;
        }
        .hero-ctas {
          display: flex; gap: 1rem; flex-wrap: wrap;
        }
        .hero-cta-primary {
          display: flex; align-items: center; gap: 0.5rem;
        }
        .hero-cta-secondary {
          display: flex; align-items: center; gap: 0.5rem;
        }

        /* ── Monogram ── */
        .hero-monogram-wrap {
          position: relative;
          width: 280px; height: 280px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto;
        }
        .radar-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--accent-cyan);
          animation: radar-expand 3s ease-out infinite;
        }
        .radar-ring-1 { width: 200px; height: 200px; animation-delay: 0s; }
        .radar-ring-2 { width: 200px; height: 200px; animation-delay: 1.5s; }
        @keyframes radar-expand {
          0%   { width: 140px; height: 140px; opacity: 0.6; }
          100% { width: 320px; height: 320px; opacity: 0; }
        }
        .mono-frame {
          position: absolute;
          border: 1px solid var(--border);
          animation: mono-spin 20s linear infinite;
        }
        .mono-frame-outer { width: 220px; height: 220px; transform: rotate(12deg); }
        .mono-frame-inner { width: 220px; height: 220px; transform: rotate(6deg); animation-direction: reverse; }
        @keyframes mono-spin {
          to { transform: rotate(372deg); }
        }
        .mono-frame-inner { animation-name: mono-spin-rev; }
        @keyframes mono-spin-rev {
          from { transform: rotate(6deg); }
          to   { transform: rotate(-354deg); }
        }
        .mono-letters {
          position: relative; z-index: 1;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 6.5rem;
          line-height: 1;
          letter-spacing: -0.05em;
          display: flex; align-items: baseline;
          user-select: none;
        }
        .mono-i { color: var(--text-primary); }
        .mono-a { color: var(--accent-cyan); }

        /* ── Scroll indicator ── */
        .scroll-indicator {
          position: absolute;
          bottom: 2rem; left: 50%;
          transform: translateX(-50%);
        }
        .scroll-line {
          width: 2px; height: 48px;
          background: var(--accent-cyan);
          animation: scroll-pulse 1.8s ease-in-out infinite;
          transform-origin: top;
        }
        @keyframes scroll-pulse {
          0%, 100% { transform: scaleY(0); opacity: 0; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        @media (max-width: 768px) {
          .hero-inner {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }
          .hero-bio { max-width: 100%; }
          .hero-ctas { justify-content: center; }
          .hero-monogram-wrap { width: 200px; height: 200px; }
          .mono-letters { font-size: 4.5rem; }
          .mono-frame-outer { width: 160px; height: 160px; }
          .mono-frame-inner { width: 160px; height: 160px; }
        }
      `}</style>
    </section>
  );
});

export default Hero;
```

- [ ] **Step 2: Verify visually**

Check `http://localhost:3000`. The hero should show:
- "Full-stack Engineer" label above the name
- "IBRAHIM / ALI" in large Syne 800 with cyan underline beneath ALI
- JetBrains Mono amber tagline
- "View My Work" cyan button + "Download Resume" outlined button
- IA monogram on the right with slowly rotating frame squares and pulsing radar rings

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.js
git commit -m "feat: redesign hero with Signal monogram, radar rings, dot-grid background"
```

---

## Task 6: About Section

**Files:**
- Replace: `src/components/About.js`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/About.js
import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '1yr 9mo', label: 'Professional Experience' },
  { value: '2', label: 'Cloud Platforms' },
  { value: 'Millions', label: 'Users Served Daily' },
];

const pillars = [
  { code: 'ML', title: 'Multi-Cloud', desc: 'Azure & AWS infrastructure at scale' },
  { code: 'NT', title: 'Notification Arch', desc: 'Enterprise multi-channel delivery systems' },
  { code: 'CD', title: 'CI/CD Pipelines', desc: 'GitHub → production automation' },
  { code: 'ES', title: 'Event-Driven', desc: 'Service Bus, Event Hub, async messaging' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => (
  <section id="about" className="section section-alt">
    <span className="section-number">01</span>
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <h2 className="section-title">About</h2>

      {/* Stat bar */}
      <motion.div
        className="about-stats"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((s, i) => (
          <React.Fragment key={s.label}>
            <motion.div className="about-stat" variants={itemVariants}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
            {i < stats.length - 1 && <div className="stat-divider" />}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Body copy */}
      <motion.div
        className="about-body"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <p>
          I'm a software developer on the Air India Notification Team, building and
          maintaining the cloud infrastructure that delivers millions of critical
          notifications daily — flight alerts, booking confirmations, and operational
          communications across WhatsApp, SMS, and email channels.
        </p>
        <p>
          My work spans Azure Databricks, Event Hub, Service Bus, and Azure Functions
          on the Microsoft side, and AWS SES on the Amazon side. I design scalable
          architectures, build reliable pipelines, and ship with CI/CD automation
          that keeps deployments fast and zero-downtime.
        </p>
      </motion.div>

      {/* Expertise pillars */}
      <motion.div
        className="about-pillars"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {pillars.map((p) => (
          <motion.div key={p.code} className="pillar-card card" variants={itemVariants}>
            <span className="pillar-code">{p.code}</span>
            <h3 className="pillar-title">{p.title}</h3>
            <p className="pillar-desc">{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>

    <style>{`
      .about-stats {
        display: flex;
        align-items: center;
        gap: 0;
        margin-bottom: 3rem;
        border: 1px solid var(--border);
        border-radius: 12px;
        overflow: hidden;
        background: var(--bg-surface-2);
      }
      .about-stat {
        flex: 1;
        padding: 2rem;
        text-align: center;
        display: flex; flex-direction: column; gap: 0.5rem;
      }
      .stat-value {
        font-family: 'Syne', sans-serif;
        font-weight: 800;
        font-size: 2.25rem;
        color: var(--accent-cyan);
        line-height: 1;
      }
      .stat-label {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.85rem;
        color: var(--text-secondary);
      }
      .stat-divider {
        width: 1px;
        align-self: stretch;
        background: var(--border);
      }
      .about-body {
        max-width: 64ch;
        margin-bottom: 3rem;
        display: flex; flex-direction: column; gap: 1.25rem;
      }
      .about-body p {
        font-family: 'DM Sans', sans-serif;
        font-size: 1.05rem;
        line-height: 1.8;
        color: var(--text-secondary);
      }
      .about-pillars {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
      }
      .pillar-card { text-align: left; }
      .pillar-code {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        color: var(--accent-amber);
        display: block;
        margin-bottom: 0.75rem;
        letter-spacing: 0.05em;
      }
      .pillar-title {
        font-family: 'Syne', sans-serif;
        font-weight: 600;
        font-size: 1rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
      }
      .pillar-desc {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        color: var(--text-secondary);
        line-height: 1.6;
      }
      @media (max-width: 768px) {
        .about-stats { flex-direction: column; }
        .stat-divider { width: 100%; height: 1px; }
        .about-pillars { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 480px) {
        .about-pillars { grid-template-columns: 1fr; }
      }
    `}</style>
  </section>
);

export default About;
```

- [ ] **Step 2: Verify visually**

Scroll to About section. Should show: stat bar with "1yr 9mo / 2 / Millions" in cyan, two body paragraphs, four expertise pillar cards with amber monospace codes (ML, NT, CD, ES).

- [ ] **Step 3: Commit**

```bash
git add src/components/About.js
git commit -m "feat: redesign about section with stat bar and expertise pillars"
```

---

## Task 7: Experience Section

**Files:**
- Replace: `src/components/Experience.js`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/Experience.js
import React from 'react';
import { motion } from 'framer-motion';

const impacts = [
  'Architected enterprise notification system processing 20M+ daily notifications with 99.9% uptime using Java & Spring Boot.',
  'Optimised Azure Databricks pipelines and database queries — reduced system response time by 40%.',
  'Implemented CI/CD pipelines on GitHub Actions and Azure Pipelines — cut deployment time by 60% with zero-downtime releases.',
  'Designed multi-channel delivery across WhatsApp (NetCore), SMS (Vilpower), and email (AWS SES) on a unified event-driven architecture.',
];

const stackTags = [
  'Java', 'Spring Boot', 'Azure Databricks', 'Azure Event Hub',
  'Azure Service Bus', 'Azure Functions', 'AWS SES', 'GitHub Actions',
  'Azure Pipelines', 'MySQL',
];

const Experience = () => (
  <section id="experience" className="section">
    <span className="section-number">02</span>
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <h2 className="section-title">Experience</h2>

      <motion.div
        className="exp-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Card header strip */}
        <div className="exp-header">
          <div className="exp-header-left">
            <h3 className="exp-role">Software Developer</h3>
            <p className="exp-company">Air India · Notification Team</p>
          </div>
          <div className="exp-header-right">
            <span className="exp-date">2024 — Present</span>
            <span className="exp-location">India</span>
          </div>
        </div>

        {/* Card body */}
        <div className="exp-body">
          {/* Impact statements */}
          <div className="exp-impacts">
            {impacts.map((imp, i) => (
              <motion.div
                key={i}
                className="impact-item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                {imp}
              </motion.div>
            ))}
          </div>

          {/* Stack panel */}
          <div className="exp-stack">
            <p className="stack-label">Stack Used</p>
            <div className="stack-tags">
              {stackTags.map(t => (
                <span key={t} className="tag tag-amber">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    <style>{`
      .exp-card {
        background: var(--bg-surface);
        border: 1px solid var(--border);
        border-radius: 12px;
        overflow: hidden;
        border-bottom: 2px solid var(--accent-amber);
      }
      .exp-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 2rem 2rem 1.5rem;
        border-bottom: 1px solid var(--border);
      }
      .exp-role {
        font-family: 'Syne', sans-serif;
        font-weight: 600;
        font-size: 1.4rem;
        color: var(--text-primary);
        margin-bottom: 0.25rem;
      }
      .exp-company {
        font-family: 'DM Sans', sans-serif;
        font-size: 1rem;
        color: var(--accent-cyan);
      }
      .exp-header-right {
        text-align: right;
        display: flex; flex-direction: column; gap: 0.25rem;
      }
      .exp-date, .exp-location {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        color: var(--text-secondary);
      }
      .exp-body {
        display: grid;
        grid-template-columns: 3fr 2fr;
        gap: 0;
      }
      .exp-impacts {
        padding: 2rem;
        display: flex; flex-direction: column; gap: 1.25rem;
        border-right: 1px solid var(--border);
      }
      .impact-item {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.95rem;
        line-height: 1.7;
        color: var(--text-secondary);
        padding-left: 1rem;
        border-left: 2px solid var(--accent-cyan);
      }
      .exp-stack {
        padding: 2rem;
      }
      .stack-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-secondary);
        margin-bottom: 1rem;
      }
      .stack-tags {
        display: flex; flex-wrap: wrap; gap: 0.5rem;
      }
      @media (max-width: 768px) {
        .exp-header { flex-direction: column; gap: 0.75rem; }
        .exp-header-right { text-align: left; }
        .exp-body { grid-template-columns: 1fr; }
        .exp-impacts { border-right: none; border-bottom: 1px solid var(--border); }
      }
    `}</style>
  </section>
);

export default Experience;
```

- [ ] **Step 2: Verify visually**

Scroll to Experience section. Should show: full-width card with amber bottom border, header strip (role left, date right), two-column body (impact statements with cyan left borders, stack tags in amber).

- [ ] **Step 3: Commit**

```bash
git add src/components/Experience.js
git commit -m "feat: redesign experience as featured case study card, drop timeline"
```

---

## Task 8: Skills Section

**Files:**
- Replace: `src/components/Skills.js`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/Skills.js
import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  {
    label: 'LANGUAGES',
    core: ['Java', 'C++'],
    rest: ['Python', 'JavaScript', 'C'],
  },
  {
    label: 'FRAMEWORKS',
    core: ['Spring Boot', 'JPA/Hibernate'],
    rest: ['Spring Security', 'Maven', 'Java Enterprise'],
  },
  {
    label: 'CLOUD',
    core: ['Azure Databricks', 'AWS SES', 'Event Hub'],
    rest: ['Service Bus', 'Azure Functions', 'Azure Pipelines'],
  },
  {
    label: 'DEVOPS',
    core: ['GitHub Actions', 'CI/CD'],
    rest: ['Docker', 'Azure Pipelines', 'Git'],
  },
  {
    label: 'APIs & TOOLS',
    core: ['REST APIs'],
    rest: ['NetCore Platform', 'Vilpower API', 'EmailJS', 'jsPDF', 'Postman'],
  },
];

const Skills = () => (
  <section id="skills" className="section section-alt">
    <span className="section-number">03</span>
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <h2 className="section-title">Skills &amp; Stack</h2>

      <motion.div
        className="skills-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            className="skill-row"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <span className="cat-label">{cat.label}</span>
            <div className="cat-tags">
              {cat.core.map(t => (
                <span key={t} className="tag tag-core">{t}</span>
              ))}
              {cat.rest.map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <p className="skills-summary">
        Specialising in enterprise Java systems, multi-cloud infrastructure,
        and event-driven notification architecture.
      </p>
    </div>

    <style>{`
      .skills-grid {
        border: 1px solid var(--border);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 2rem;
      }
      .skill-row {
        display: flex;
        align-items: flex-start;
        gap: 2rem;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid var(--border);
      }
      .skill-row:last-child { border-bottom: none; }
      .cat-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.7rem;
        letter-spacing: 0.1em;
        color: var(--accent-amber);
        flex-shrink: 0;
        width: 120px;
        padding-top: 0.35rem;
      }
      .cat-tags {
        display: flex; flex-wrap: wrap; gap: 0.5rem;
      }
      .skills-summary {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.9rem;
        color: var(--text-secondary);
        text-align: center;
        font-style: italic;
      }
      @media (max-width: 768px) {
        .skill-row { flex-direction: column; gap: 0.75rem; }
        .cat-label { width: auto; }
      }
    `}</style>
  </section>
);

export default Skills;
```

- [ ] **Step 2: Verify visually**

Scroll to Skills section. Should show: five category rows separated by borders, amber monospace category labels on the left, cyan-bordered core skill tags + standard tags on the right. No progress bars.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.js
git commit -m "feat: replace progress bar skills with tag-row grid (no fake percentages)"
```

---

## Task 9: Projects Section

**Files:**
- Replace: `src/components/Projects.js`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/Projects.js
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

/* SVG architecture diagram for the featured card */
const ArchDiagram = () => (
  <svg viewBox="0 0 320 200" className="arch-svg" aria-label="System architecture diagram">
    <defs>
      <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="var(--accent-cyan)" opacity="0.7" />
      </marker>
      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -24; }
        }
        .arch-line {
          stroke: var(--accent-cyan);
          stroke-width: 1.5;
          stroke-dasharray: 6 4;
          fill: none;
          animation: dash-flow 1.5s linear infinite;
          opacity: 0.6;
          marker-end: url(#arrow);
        }
      `}</style>
    </defs>

    {/* GitHub */}
    <rect x="10" y="80" width="72" height="36" rx="6"
      fill="var(--bg-surface-2)" stroke="var(--border)" strokeWidth="1" />
    <text x="46" y="95" textAnchor="middle" fill="var(--text-secondary)"
      fontSize="8" fontFamily="JetBrains Mono,monospace">GitHub</text>
    <text x="46" y="108" textAnchor="middle" fill="var(--text-secondary)"
      fontSize="7" fontFamily="DM Sans,sans-serif">Repository</text>

    {/* Arrow 1 */}
    <line x1="82" y1="98" x2="112" y2="98" className="arch-line" />

    {/* Azure Pipelines */}
    <rect x="112" y="74" width="80" height="48" rx="6"
      fill="var(--bg-surface-2)" stroke="var(--accent-cyan)" strokeWidth="1" strokeOpacity="0.5" />
    <text x="152" y="94" textAnchor="middle" fill="var(--accent-cyan)"
      fontSize="8" fontFamily="JetBrains Mono,monospace">Azure</text>
    <text x="152" y="107" textAnchor="middle" fill="var(--accent-cyan)"
      fontSize="8" fontFamily="JetBrains Mono,monospace">Pipelines</text>

    {/* Arrow to Azure */}
    <line x1="192" y1="88" x2="228" y2="60" className="arch-line" style={{ animationDelay: '0.3s' }} />

    {/* Arrow to AWS */}
    <line x1="192" y1="108" x2="228" y2="136" className="arch-line" style={{ animationDelay: '0.6s' }} />

    {/* Azure Cloud */}
    <rect x="228" y="40" width="76" height="36" rx="6"
      fill="var(--bg-surface-2)" stroke="var(--border)" strokeWidth="1" />
    <text x="266" y="55" textAnchor="middle" fill="var(--text-primary)"
      fontSize="8" fontFamily="JetBrains Mono,monospace">Azure</text>
    <text x="266" y="68" textAnchor="middle" fill="var(--text-secondary)"
      fontSize="7" fontFamily="DM Sans,sans-serif">Databricks · SB</text>

    {/* AWS Cloud */}
    <rect x="228" y="116" width="76" height="36" rx="6"
      fill="var(--bg-surface-2)" stroke="var(--border)" strokeWidth="1" />
    <text x="266" y="131" textAnchor="middle" fill="var(--text-primary)"
      fontSize="8" fontFamily="JetBrains Mono,monospace">AWS</text>
    <text x="266" y="144" textAnchor="middle" fill="var(--text-secondary)"
      fontSize="7" fontFamily="DM Sans,sans-serif">SES · Lambda</text>
  </svg>
);

const featuredProject = {
  title: 'Air India Multi-Cloud Notification System',
  status: 'dev',
  year: '2024',
  desc: 'Enterprise notification platform delivering 20M+ daily notifications across WhatsApp, SMS, and email channels using Azure and AWS infrastructure.',
  features: [
    'WhatsApp template generation via NetCore platform',
    'SMS delivery through Vilpower API integration',
    'Email notifications via AWS SES',
    'Automated deployment with Azure Pipelines',
  ],
  tags: ['Java', 'Spring Boot', 'Azure Databricks', 'Event Hub', 'AWS SES', 'CI/CD'],
  github: 'https://github.com/Ibrahim99575',
};

const supportingProjects = [
  {
    title: 'Automated Deployment Pipeline',
    status: 'completed',
    year: '2024',
    desc: 'CI/CD pipeline system automating GitHub-to-production deployments across Azure and AWS with zero-downtime releases.',
    features: [
      'Multi-cloud deployment support',
      'Pipeline monitoring and alerting',
      'Rollback capabilities',
    ],
    tags: ['GitHub Actions', 'Azure Pipelines', 'Docker', 'YAML'],
    github: 'https://github.com/Ibrahim99575',
  },
  {
    title: 'Portfolio Website',
    status: 'completed',
    year: '2025',
    desc: 'This portfolio — built with React, Framer Motion, and a custom design system. Features dark/light theme, EmailJS contact form, and PDF resume generation.',
    features: [
      'Signal dark/light design system',
      'Framer Motion animations',
      'EmailJS contact integration',
    ],
    tags: ['React', 'Framer Motion', 'CSS', 'EmailJS'],
    github: 'https://github.com/Ibrahim99575/portfolio-website',
  },
];

const StatusBadge = ({ status }) =>
  status === 'dev' ? (
    <span className="badge-dev">
      <span className="badge-dev-dot" />
      In Development
    </span>
  ) : (
    <span className="badge-completed">Completed</span>
  );

const Projects = () => (
  <section id="projects" className="section">
    <span className="section-number">04</span>
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <h2 className="section-title">Projects</h2>

      {/* Featured card */}
      <motion.div
        className="featured-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="featured-content">
          <div className="proj-header-row">
            <StatusBadge status={featuredProject.status} />
            <span className="proj-year">{featuredProject.year}</span>
          </div>
          <h3 className="proj-title">{featuredProject.title}</h3>
          <p className="proj-desc">{featuredProject.desc}</p>
          <ul className="proj-features">
            {featuredProject.features.map(f => (
              <li key={f}><span className="feat-arrow">→</span>{f}</li>
            ))}
          </ul>
          <div className="proj-footer">
            <div className="proj-tags">
              {featuredProject.tags.map(t => (
                <span key={t} className="tag tag-amber">{t}</span>
              ))}
            </div>
            <a href={featuredProject.github} target="_blank" rel="noreferrer" className="icon-btn">
              <Github size={18} />
            </a>
          </div>
        </div>
        <div className="featured-diagram">
          <ArchDiagram />
        </div>
      </motion.div>

      {/* Supporting cards */}
      <div className="supporting-grid">
        {supportingProjects.map((proj, i) => (
          <motion.div
            key={proj.title}
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="proj-header-row">
              <StatusBadge status={proj.status} />
              <span className="proj-year">{proj.year}</span>
            </div>
            <h3 className="proj-title proj-title-sm">{proj.title}</h3>
            <p className="proj-desc proj-desc-sm">{proj.desc}</p>
            <ul className="proj-features proj-features-sm">
              {proj.features.map(f => (
                <li key={f}><span className="feat-arrow">→</span>{f}</li>
              ))}
            </ul>
            <div className="proj-footer">
              <div className="proj-tags">
                {proj.tags.map(t => (
                  <span key={t} className="tag tag-amber">{t}</span>
                ))}
              </div>
              <a href={proj.github} target="_blank" rel="noreferrer" className="icon-btn">
                <Github size={16} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <style>{`
      .featured-card {
        display: grid;
        grid-template-columns: 55fr 45fr;
        background: var(--bg-surface);
        border: 1px solid var(--border);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 1.5rem;
      }
      .featured-content { padding: 2.5rem; border-right: 1px solid var(--border); }
      .featured-diagram {
        padding: 2rem;
        display: flex; align-items: center; justify-content: center;
        background: var(--bg-surface-2);
      }
      .arch-svg { width: 100%; max-width: 320px; height: auto; }
      .supporting-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
      }
      .proj-header-row {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 1rem;
      }
      .proj-year {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.8rem;
        color: var(--text-secondary);
      }
      .proj-title {
        font-family: 'Syne', sans-serif;
        font-weight: 600;
        font-size: 1.25rem;
        color: var(--text-primary);
        margin-bottom: 0.75rem;
        line-height: 1.3;
      }
      .proj-title-sm { font-size: 1.05rem; }
      .proj-desc {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.9rem;
        line-height: 1.7;
        color: var(--text-secondary);
        margin-bottom: 1.25rem;
      }
      .proj-desc-sm { font-size: 0.875rem; }
      .proj-features {
        list-style: none;
        display: flex; flex-direction: column; gap: 0.5rem;
        margin-bottom: 1.5rem;
      }
      .proj-features li {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        color: var(--text-secondary);
        display: flex; gap: 0.5rem;
      }
      .proj-features-sm { margin-bottom: 1.25rem; }
      .feat-arrow {
        color: var(--accent-cyan);
        flex-shrink: 0;
      }
      .proj-footer {
        display: flex; align-items: center;
        justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;
      }
      .proj-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
      .icon-btn {
        color: var(--text-secondary);
        transition: color 0.2s ease, transform 0.2s ease;
        display: flex;
      }
      .icon-btn:hover { color: var(--accent-cyan); transform: scale(1.1); }
      @media (max-width: 768px) {
        .featured-card { grid-template-columns: 1fr; }
        .featured-content { border-right: none; border-bottom: 1px solid var(--border); }
        .supporting-grid { grid-template-columns: 1fr; }
      }
    `}</style>
  </section>
);

export default Projects;
```

- [ ] **Step 2: Verify visually**

Scroll to Projects. Should show: one full-width featured card with animated SVG architecture diagram on the right, two smaller project cards below in a two-column grid. All status badges use the new design (no old green/amber filled pills).

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.js
git commit -m "feat: redesign projects with asymmetric grid and animated architecture SVG"
```

---

## Task 10: Contact Section

**Files:**
- Replace: `src/components/Contact.js`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/Contact.js
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/emailConfig';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'connect.ibrahim.ali@gmail.com',
    href: 'mailto:connect.ibrahim.ali@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ibrahim-9-ali',
    href: 'https://www.linkedin.com/in/ibrahim-9-ali/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Ibrahim99575',
    href: 'https://github.com/Ibrahim99575',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: null,
  },
];

const Contact = () => {
  const formRef = useRef(null);
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const handleChange = (e) =>
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await emailjs.sendForm(
        emailConfig.serviceId,
        emailConfig.templateId,
        formRef.current,
        emailConfig.publicKey,
      );
      setStatus('success');
      setFields({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section section-alt">
      <span className="section-number">05</span>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title">Let's Talk</h2>
        <p className="contact-subtitle">
          Open to new opportunities, interesting engineering problems, and
          conversations about cloud architecture.
        </p>

        <div className="contact-layout">
          {/* Sidebar */}
          <motion.div
            className="contact-sidebar"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="contact-item">
                <Icon size={18} className="contact-icon" />
                <div>
                  <p className="contact-item-label">{label}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="contact-item-value contact-link">
                      {value}
                    </a>
                  ) : (
                    <p className="contact-item-value">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div className="availability-badge">
              <span className="avail-dot" />
              Available for opportunities
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="form-heading">Send Me a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              {[
                { name: 'name', label: 'Your Name', type: 'text' },
                { name: 'email', label: 'Your Email', type: 'email' },
                { name: 'subject', label: 'Subject', type: 'text' },
              ].map(({ name, label, type }) => (
                <div key={name} className="field-wrap">
                  <label className="field-label" htmlFor={name}>{label}</label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    required
                    value={fields[name]}
                    onChange={handleChange}
                    className="field-input"
                    autoComplete={name === 'email' ? 'email' : 'off'}
                  />
                </div>
              ))}
              <div className="field-wrap">
                <label className="field-label" htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={fields.message}
                  onChange={handleChange}
                  className="field-input field-textarea"
                />
              </div>

              {status === 'success' ? (
                <div className="form-success status-message">
                  Message sent — I'll get back to you soon.
                </div>
              ) : status === 'error' ? (
                <div className="form-error status-message">
                  Something went wrong. Try emailing me directly.
                </div>
              ) : (
                <button type="submit" className="btn-primary submit-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <><Loader size={16} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: var(--text-secondary);
          margin-top: -2rem;
          margin-bottom: 3rem;
          max-width: 56ch;
        }
        .contact-layout {
          display: grid;
          grid-template-columns: 35fr 65fr;
          gap: 4rem;
          align-items: start;
        }
        .contact-sidebar {
          display: flex; flex-direction: column; gap: 1.5rem;
        }
        .contact-item {
          display: flex; align-items: flex-start; gap: 0.875rem;
        }
        .contact-icon { color: var(--text-secondary); margin-top: 2px; flex-shrink: 0; }
        .contact-item-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.15rem;
        }
        .contact-item-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: var(--text-primary);
          text-decoration: none;
        }
        .contact-link:hover { color: var(--accent-cyan); }
        .availability-badge {
          display: flex; align-items: center; gap: 0.5rem;
          margin-top: 0.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .avail-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--success);
          animation: pulse-dot 2s ease infinite;
          flex-shrink: 0;
        }
        .contact-form-wrap {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
        }
        .form-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }
        .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .field-wrap { display: flex; flex-direction: column; gap: 0.35rem; }
        .field-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
        }
        .field-input {
          background: var(--bg-surface-2);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 0.65rem 0.875rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: var(--text-primary);
          transition: border-color 0.2s ease;
          outline: none;
          width: 100%;
        }
        .field-input:focus { border-color: var(--accent-cyan); }
        .field-textarea { resize: vertical; min-height: 100px; }
        .submit-btn {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; width: 100%;
        }
        .form-success {
          padding: 0.875rem 1rem;
          border-radius: 6px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid var(--success);
          color: var(--success);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          text-align: center;
        }
        .form-error {
          padding: 0.875rem 1rem;
          border-radius: 6px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          color: #ef4444;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          text-align: center;
        }
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr; gap: 2.5rem; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
```

- [ ] **Step 2: Verify visually**

Scroll to Contact section. Should show: "Let's Talk" heading, subtitle, sidebar with Email/LinkedIn/GitHub/Location (no phone), green pulsing availability badge, and a form card with styled inputs that glow cyan on focus.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.js
git commit -m "feat: redesign contact with sidebar layout, availability badge, remove phone"
```

---

## Task 11: Footer Component

**Files:**
- Replace: `src/components/Footer.js`

- [ ] **Step 1: Replace the entire file**

```jsx
// src/components/Footer.js
import React from 'react';
import { Linkedin, Github } from 'lucide-react';

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-row-1">
          <button className="footer-logo" onClick={scrollToTop}>
            <span className="footer-logo-i">I</span>
            <span className="footer-logo-a">A</span>
          </button>
          <p className="footer-built">Built with React &amp; Framer Motion</p>
          <button className="back-to-top" onClick={scrollToTop}>
            ↑ Back to top
          </button>
        </div>

        <div className="footer-divider" />

        <div className="footer-row-2">
          <p className="footer-copy">
            © {new Date().getFullYear()} Ibrahim Ali · Software Developer
          </p>
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/ibrahim-9-ali/" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com/Ibrahim99575" target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://x.com" target="_blank" rel="noreferrer" className="social-link" aria-label="X / Twitter">
              <XIcon />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--bg-surface);
          border-top: 1px solid var(--border);
          padding: 2rem 0;
        }
        .footer-inner { display: flex; flex-direction: column; gap: 1rem; }
        .footer-row-1 {
          display: flex; align-items: center;
          justify-content: space-between;
        }
        .footer-logo {
          background: none; border: none; cursor: pointer;
          font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.2rem;
          display: flex; align-items: baseline; gap: 0; padding: 0;
        }
        .footer-logo-i { color: var(--text-primary); }
        .footer-logo-a {
          color: var(--accent-cyan);
          border-bottom: 2px solid var(--accent-amber);
          padding-bottom: 1px;
        }
        .footer-built {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .back-to-top {
          background: none; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: color 0.2s ease;
        }
        .back-to-top:hover { color: var(--accent-cyan); }
        .footer-divider { height: 1px; background: var(--border); }
        .footer-row-2 {
          display: flex; align-items: center;
          justify-content: space-between;
        }
        .footer-copy {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .footer-socials { display: flex; gap: 1rem; }
        .social-link {
          color: var(--text-secondary);
          display: flex; align-items: center;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .social-link:hover { color: var(--accent-cyan); transform: scale(1.1); }
        @media (max-width: 480px) {
          .footer-row-1 { flex-direction: column; gap: 0.75rem; text-align: center; }
          .footer-row-2 { flex-direction: column; gap: 0.75rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: Final full-page visual verification**

Open `http://localhost:3000`. Scroll through the entire page and verify:
- [ ] Header: IA monogram, nav links, theme toggle (Sun/Moon), amber resume pill
- [ ] Hero: Name, tagline, CTAs, IA monogram with radar rings on right
- [ ] About: Stat bar (1yr 9mo / 2 / Millions), body copy, 4 pillar cards
- [ ] Experience: Single full-width card, amber bottom border, impact statements, stack tags
- [ ] Skills: 5 category rows with amber labels, cyan core tags
- [ ] Projects: Featured card with SVG diagram, 2 supporting cards below
- [ ] Contact: Sidebar + form, green availability dot, no phone number
- [ ] Footer: Compact 2-row with IA monogram, social icons
- [ ] Toggle dark/light — all colors switch smoothly
- [ ] Custom scrollbar (cyan) visible on right edge
- [ ] Scroll progress bar (cyan) fills at top as you scroll

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.js
git commit -m "feat: redesign footer with compact two-row layout and IA monogram"
```

---

## Task 12: Final Cleanup & Responsive Check

**Files:**
- No new files — verify and fix responsive issues found during testing

- [ ] **Step 1: Test at 768px (tablet)**

In DevTools, set viewport to 768px width. Verify:
- Hero stacks to single column
- About pillars go 2-column
- Experience card body stacks vertically
- Skills rows stack label above tags
- Projects featured card stacks vertically, 1-column supporting
- Contact goes single column

- [ ] **Step 2: Test at 480px (mobile)**

Set viewport to 375px. Verify:
- Hero name scales down via `clamp()`
- Monogram shrinks to ~200px
- About pillars go 1-column
- Footer rows stack vertically

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete Signal redesign — dark/light theme, Syne typography, naval palette"
```
