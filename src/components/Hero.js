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
        }
        .mono-frame-outer { width: 220px; height: 220px; animation: mono-spin 20s linear infinite; }
        .mono-frame-inner { width: 220px; height: 220px; animation: mono-spin-rev 20s linear infinite; }
        @keyframes mono-spin {
          from { transform: rotate(12deg); }
          to   { transform: rotate(372deg); }
        }
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
          .hero-tagline {
            font-size: 0.6rem;
            letter-spacing: 0.04em;
            white-space: normal;
            overflow-wrap: break-word;
          }
        }
      `}</style>
    </section>
  );
});

export default Hero;
