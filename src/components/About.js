import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const EXPO = [0.16, 1, 0.3, 1];
const JOIN_DATE = new Date(2024, 7, 1); // August 1, 2024

const getExperience = () => {
  const now = new Date();
  const totalMonths =
    (now.getFullYear() - JOIN_DATE.getFullYear()) * 12 +
    (now.getMonth() - JOIN_DATE.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months}mo`;
  if (months === 0) return `${years}yr`;
  return `${years}yr ${months}mo`;
};

// Animates a number from 0 → target
function CountUp({ target, suffix = '', duration = 1200 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

const pillars = [
  { code: 'ED', title: 'Event-Driven Systems', desc: 'Azure Event Hub, Service Bus, Kafka — async at scale' },
  { code: 'MC', title: 'Multi-Cloud', desc: 'Azure & AWS distributed architectures' },
  { code: 'AI', title: 'AI-Assisted Tools', desc: 'MCP server + Spring Boot for live diagnostics' },
  { code: 'RE', title: 'Reliability', desc: 'SonarQube, Grafana, PR governance, zero-downtime CI/CD' },
];

const About = () => (
  <section id="about" className="section section-alt">
    <span className="section-number">01</span>
    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EXPO }}
        viewport={{ once: true }}
      >
        About
      </motion.h2>

      {/* Stat bar */}
      <motion.div
        className="about-stats"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EXPO }}
        viewport={{ once: true }}
      >
        <div className="about-stat">
          <span className="stat-value">{getExperience()}</span>
          <span className="stat-label">Industry Experience</span>
        </div>
        <div className="stat-divider" />
        <div className="about-stat">
          <span className="stat-value">
            <CountUp target={1} suffix="M+" duration={900} />
          </span>
          <span className="stat-label">Notifications / Day</span>
        </div>
        <div className="stat-divider" />
        <div className="about-stat">
          <span className="stat-value">
            <CountUp target={5} suffix="" duration={800} />
          </span>
          <span className="stat-label">Excellence Awards</span>
        </div>
      </motion.div>

      {/* Body copy */}
      <motion.div
        className="about-body"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EXPO, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <p>
          I'm a Software Engineer on the Air India Notification Team, owning and scaling
          the real-time event-driven delivery platform that processes 3,500+ flight events
          per day and delivers ~500,000 passenger notifications daily — flight alerts,
          booking confirmations, and schedule changes across WhatsApp, SMS, and email.
        </p>
        <p>
          I architected the migration from a polling-based scheduler (30,000 daily API
          calls to the Amadeus reservation system) to a fully event-driven microservices
          model, cutting operational costs from Rs.40L/month to under Rs.10L/month and
          scaling the platform to handle 1M+ notifications/day with Azure Event Hub,
          Service Bus, and AWS SES.
        </p>
      </motion.div>

      {/* Expertise pillars */}
      <div className="about-pillars">
        {pillars.map((p, i) => (
          <motion.div
            key={p.code}
            className="pillar-card card"
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EXPO, delay: i * 0.08 }}
            viewport={{ once: true }}
          >
            <span className="pillar-code">{p.code}</span>
            <h3 className="pillar-title">{p.title}</h3>
            <p className="pillar-desc">{p.desc}</p>
          </motion.div>
        ))}
      </div>
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
        max-width: 68ch;
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
        margin-top: 0;
      }
      .pillar-desc {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.875rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin: 0;
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
