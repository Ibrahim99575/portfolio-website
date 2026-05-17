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
