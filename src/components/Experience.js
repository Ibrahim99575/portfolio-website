import React from 'react';
import { motion } from 'framer-motion';

const EXPO = [0.16, 1, 0.3, 1];

const roles = [
  {
    title: 'Software Engineer',
    company: 'Air India Limited',
    period: 'Aug 2025 — Present',
    location: 'Gurugram, India',
    impacts: [
      'Led modernisation of the event-driven delivery platform — scaled to handle 1M+ daily communications and sustained 50,000+ requests/hour under peak demand using Azure Service Bus and async messaging.',
      'Reduced infrastructure costs by 60% by shifting workloads to serverless and containerised runtimes on Azure Functions and AKS, replacing vendor-managed services with AWS SES in-house delivery.',
      'Designed a two-tier caching architecture combining application-level LRU in-memory caching with Redis-based distributed caching — reduced response latency from 2 seconds to sub-200ms.',
      'Built an MCP-based client-server platform integrated with Spring Boot services, cutting production issue identification time from 30 minutes to under 5 minutes through real-time system diagnostics.',
    ],
    tags: ['Java', 'Spring Boot', 'Azure Service Bus', 'AWS SES', 'Azure Functions', 'AKS', 'Redis', 'Docker', 'Kubernetes'],
    awards: [
      'High Flyer Award ×1',
      'AI IMPACCT Champion Award ×1',
    ],
  },
  {
    title: 'Software Development Engineer Trainee',
    company: 'Air India Limited',
    period: 'Aug 2024 — Jul 2025',
    location: 'Kochi, India',
    impacts: [
      'Owned and scaled a real-time high-throughput event-driven platform processing 3,500+ flight events/day and delivering ~500,000 passenger notifications/day — replacing a polling-based scheduler that generated 30,000 daily API calls to the Amadeus reservation system.',
      'Reduced operational costs from Rs.40L/month to under Rs.10L/month through improved event processing efficiency, channel optimisation, and system consolidation.',
      'Architected distributed scheduling engine orchestrating 100,000+ booking events/day and 400,000+ scheduled notifications, combining event-driven booking ingestion with periodic flight schedule evaluation.',
      'Engineered a survey distribution pipeline processing 150,000+ burst records via Azure Event Hub with Azure Data Factory for throughput orchestration — introduced WhatsApp & Email-first strategy reducing SMS/robocall costs by ~60%/month.',
    ],
    tags: ['Java', 'Spring Boot', 'Azure Event Hub', 'Azure Data Factory', 'Service Bus', 'Azure Functions', 'AWS SES', 'Azure Pipelines', 'MySQL'],
    awards: [
      'Dream Team Award',
      'High Flyer Award ×1',
      'AI IMPACCT Champion Award ×1',
    ],
  },
];

const Experience = () => (
  <section id="experience" className="section">
    <span className="section-number">02</span>
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EXPO }}
        viewport={{ once: true }}
      >
        Experience
      </motion.h2>

      <div className="exp-timeline">
        {roles.map((role, ri) => (
          <motion.div
            key={role.title}
            className="exp-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EXPO, delay: ri * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="exp-header">
              <div className="exp-header-left">
                <h3 className="exp-role">{role.title}</h3>
                <p className="exp-company">{role.company}</p>
              </div>
              <div className="exp-header-right">
                <span className="exp-date">{role.period}</span>
                <span className="exp-location">{role.location}</span>
              </div>
            </div>

            <div className="exp-body">
              <div className="exp-impacts">
                {role.impacts.map((imp, i) => (
                  <motion.div
                    key={imp.slice(0, 30)}
                    className="impact-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: EXPO, delay: i * 0.09 }}
                    viewport={{ once: true }}
                  >
                    {imp}
                  </motion.div>
                ))}
              </div>

              <div className="exp-stack">
                <p className="stack-label">Stack Used</p>
                <div className="stack-tags">
                  {role.tags.map(t => (
                    <span key={t} className="tag tag-amber">{t}</span>
                  ))}
                </div>

                {role.awards && (
                  <div className="exp-awards">
                    <p className="stack-label" style={{ marginTop: '1.5rem' }}>Awards</p>
                    {role.awards.map(a => (
                      <div key={a} className="award-item">
                        <span className="award-dot">★</span>
                        {a}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>

    <style>{`
      .exp-timeline {
        display: flex; flex-direction: column; gap: 1.5rem;
      }
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
        padding: 1.75rem 2rem 1.5rem;
        border-bottom: 1px solid var(--border);
      }
      .exp-role {
        font-family: 'Syne', sans-serif;
        font-weight: 600;
        font-size: 1.25rem;
        color: var(--text-primary);
        margin: 0 0 0.25rem 0;
      }
      .exp-company {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.95rem;
        color: var(--accent-cyan);
        margin: 0;
      }
      .exp-header-right {
        text-align: right;
        display: flex; flex-direction: column; gap: 0.2rem;
        flex-shrink: 0;
      }
      .exp-date, .exp-location {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.85rem;
        color: var(--text-secondary);
      }
      .exp-body {
        display: grid;
        grid-template-columns: 3fr 2fr;
      }
      .exp-impacts {
        padding: 1.75rem 2rem;
        display: flex; flex-direction: column; gap: 1.1rem;
        border-right: 1px solid var(--border);
      }
      .impact-item {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.9rem;
        line-height: 1.7;
        color: var(--text-secondary);
        padding-left: 1rem;
        border-left: 2px solid var(--accent-cyan);
      }
      .exp-stack {
        padding: 1.75rem 2rem;
      }
      .stack-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.68rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-secondary);
        margin: 0 0 0.75rem 0;
      }
      .stack-tags {
        display: flex; flex-wrap: wrap; gap: 0.4rem;
      }
      .exp-awards { margin-top: 0; }
      .award-item {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.82rem;
        color: var(--text-secondary);
        display: flex; align-items: center; gap: 0.5rem;
        padding: 0.3rem 0;
      }
      .award-dot {
        color: var(--accent-amber);
        font-size: 0.7rem;
        flex-shrink: 0;
      }
      @media (max-width: 768px) {
        .exp-header { flex-direction: column; gap: 0.5rem; }
        .exp-header-right { text-align: left; }
        .exp-body { grid-template-columns: 1fr; }
        .exp-impacts { border-right: none; border-bottom: 1px solid var(--border); }
      }
    `}</style>
  </section>
);

export default Experience;
