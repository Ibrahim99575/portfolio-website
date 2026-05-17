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
