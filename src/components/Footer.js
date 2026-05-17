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
          margin: 0;
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
          margin: 0;
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
