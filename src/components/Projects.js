// src/components/Projects.js
import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';
import DENSArchitecture from './DENSArchitecture';
import FDMSArchitecture from './FDMSArchitecture';


const featuredProjects = [
  {
    title: 'Departure Event Notification System (DENS)',
    status: 'dev',
    year: '2024–Present',
    desc: 'High-throughput distributed delivery platform processing 3,500+ flight events/day and ~500,000 passenger notifications/day. Migrated from a polling-based scheduler generating 30,000 daily API calls to a fully event-driven model — cutting operational costs from Rs.40L/month to under Rs.10L/month.',
    features: [
      '3,500+ flight events/day → ~500K passenger notifications — WhatsApp, SMS, email',
      'Event-driven microservices at 1M+ notifications/day capacity via Azure Event Hub',
      'Distributed scheduling engine: 100K+ booking events + 400K+ scheduled notifications',
      '150,000+ burst records pipeline via Event Hub with Azure Data Factory orchestration',
    ],
    tags: ['Java', 'Spring Boot', 'Azure Event Hub', 'Service Bus', 'AWS SES', 'Azure Data Factory', 'Azure Pipelines'],
    github: 'https://github.com/Ibrahim99575',
    Architecture: DENSArchitecture,
  },
  {
    title: 'Flight Disruption Management System (FDMS)',
    status: 'completed',
    year: '2025',
    desc: 'AI-driven prototype for airline disruption impact analysis and resolution. Designed a 4-agent architecture (Impact, Severity, Options, Decisioning) coordinated by a LangChain runtime and a 5-stage state machine — all backed by Claude Sonnet as the LLM tier.',
    features: [
      '4 specialised agents: impact analysis, severity scoring, option generation, decisioning',
      'Deterministic 5-stage state machine for auditable conversation flow',
      'Multi-source ingestion: Amadeus PSS, weather APIs, manual ops triggers',
      'Full decision audit trail in PostgreSQL — every agent step persisted for compliance',
    ],
    tags: ['Python', 'React.js', 'Claude Sonnet', 'LangChain', 'PostgreSQL'],
    github: 'https://github.com/Ibrahim99575',
    Architecture: FDMSArchitecture,
  },
];

const supportingProjects = [
  {
    title: 'Portfolio Website',
    status: 'completed',
    year: '2025',
    desc: 'This portfolio — built with React 19, Framer Motion, and the Signal design system. Features dark/light theme, animated SVG diagrams, EmailJS contact, and dynamic experience calculation.',
    features: [
      'Signal design system — navy, cyan, amber palette',
      'Expo-eased scroll animations + count-up stats',
      'Theme toggle with localStorage persistence',
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

const EXPO = [0.16, 1, 0.3, 1];

const Projects = () => (
  <section id="projects" className="section">
    <span className="section-number">04</span>
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EXPO }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      {/* Featured cards (each with its own architecture diagram) */}
      {featuredProjects.map((proj, idx) => {
        const Architecture = proj.Architecture;
        return (
          <motion.div
            key={proj.title}
            className="featured-card"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EXPO, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="featured-content">
              <div className="proj-header-row">
                <StatusBadge status={proj.status} />
                <span className="proj-year">{proj.year}</span>
              </div>
              <h3 className="proj-title">{proj.title}</h3>
              <p className="proj-desc">{proj.desc}</p>
              <ul className="proj-features">
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
                  <Github size={18} />
                </a>
              </div>
            </div>

            {/* Architecture — full-width below content */}
            <div className="featured-arch">
              <div className="arch-header">
                <span className="arch-header-label">System Architecture · Data Flow</span>
                <span className="arch-legend">
                  <span className="leg leg-ext">External</span>
                  <span className="leg leg-int">Internal µService</span>
                  <span className="leg leg-hub">Core Hub</span>
                  <span className="leg leg-data">Data Store</span>
                </span>
              </div>
              <Architecture />
            </div>
          </motion.div>
        );
      })}

      {/* Supporting cards */}
      <div className="supporting-grid">
        {supportingProjects.map((proj, i) => (
          <motion.div
            key={proj.title}
            className="card"
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: EXPO, delay: i * 0.1 }}
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
        display: flex;
        flex-direction: column;
        background: var(--bg-surface);
        border: 1px solid var(--border);
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 1.5rem;
      }
      .featured-content { padding: 2rem 2.5rem 1.75rem; }
      .featured-arch {
        border-top: 1px solid var(--border);
        background: var(--bg-surface-2);
        padding: 1rem 1.5rem 1.25rem;
      }
      .arch-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.75rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .arch-header-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.67rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-secondary);
        opacity: 0.7;
      }
      .arch-legend {
        display: flex; gap: 0.75rem; flex-wrap: wrap;
      }
      .leg {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.65rem;
        padding: 0.15rem 0.5rem;
        border-radius: 3px;
        border: 1px solid;
      }
      .leg-ext  { border-color: var(--accent-amber); color: var(--accent-amber); }
      .leg-int  { border-color: var(--accent-cyan); color: var(--accent-cyan); opacity: 0.7; }
      .leg-hub  { border-color: var(--accent-cyan); color: var(--accent-cyan); background: rgba(34,211,238,0.07); }
      .leg-data { border-color: var(--border); color: var(--text-secondary); }
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
        padding: 0;
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
