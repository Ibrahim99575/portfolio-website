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
                key={imp.slice(0, 30)}
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
