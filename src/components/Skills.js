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
