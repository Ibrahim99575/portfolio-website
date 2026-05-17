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
  title: 'Air India Event-Driven Notification Platform',
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
};

const supportingProjects = [
  {
    title: 'Flight Disruption Management System',
    status: 'completed',
    year: '2025',
    desc: 'AI-driven prototype for airline disruption impact analysis and resolution. Designed a 4-agent architecture (analysis, severity scoring, option generation, decisioning) built on Claude Code and LangChain.',
    features: [
      'AI-driven 4-agent architecture for disruption resolution',
      'Deterministic state transitions across 5 conversation stages',
      'Production-hardened workflows for outage resolution',
    ],
    tags: ['Python', 'React.js', 'Claude Code', 'LangChain', 'PostgreSQL'],
    github: 'https://github.com/Ibrahim99575',
  },
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

      {/* Featured card */}
      <motion.div
        className="featured-card"
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: EXPO }}
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
