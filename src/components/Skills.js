import React from 'react';
import { motion } from 'framer-motion';

const EXPO = [0.16, 1, 0.3, 1];

const categories = [
  {
    label: 'LANGUAGES',
    core: ['Java', 'C/C++'],
    rest: ['Python', 'SQL', 'JavaScript'],
  },
  {
    label: 'BACKEND',
    core: ['Spring Boot', 'REST APIs'],
    rest: ['SOAP APIs', 'JUnit', 'Microservices', 'Event-Driven Systems'],
  },
  {
    label: 'DISTRIBUTED',
    core: ['Azure Event Hub', 'Kafka', 'Service Bus'],
    rest: ['Event Streaming', 'Async Messaging', 'Azure Data Factory'],
  },
  {
    label: 'CLOUD',
    core: ['Azure', 'AWS (S3, EC2, Lambda)'],
    rest: ['Azure Functions', 'AKS', 'App Service', 'CloudWatch'],
  },
  {
    label: 'DEVOPS',
    core: ['Docker', 'Kubernetes', 'Azure Pipelines'],
    rest: ['GitHub Actions', 'SonarQube', 'Grafana', 'CI/CD'],
  },
  {
    label: 'DATABASES',
    core: ['PostgreSQL', 'Redis'],
    rest: ['MySQL', 'CosmosDB', 'Databricks'],
  },
];

const Skills = () => (
  <section id="skills" className="section section-alt">
    <span className="section-number">03</span>
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EXPO }}
        viewport={{ once: true }}
      >
        Skills &amp; Stack
      </motion.h2>

      <div className="skills-grid">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            className="skill-row"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: EXPO, delay: i * 0.07 }}
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
      </div>

      <motion.p
        className="skills-summary"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        Specialising in high-throughput event-driven systems, multi-cloud infrastructure,
        and scalable backend architecture for mission-critical airline operations.
      </motion.p>
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
        padding: 1.25rem 2rem;
        border-bottom: 1px solid var(--border);
      }
      .skill-row:last-child { border-bottom: none; }
      .cat-label {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.68rem;
        letter-spacing: 0.1em;
        color: var(--accent-amber);
        flex-shrink: 0;
        width: 110px;
        padding-top: 0.3rem;
      }
      .cat-tags {
        display: flex; flex-wrap: wrap; gap: 0.45rem;
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
