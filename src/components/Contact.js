// src/components/Contact.js
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MapPin, Send, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailJSConfig } from '../config/emailConfig';

const contactItems = [
  {
    icon: Mail,
    label: 'Email',
    value: 'connect.ibrahim.ali@gmail.com',
    href: 'mailto:connect.ibrahim.ali@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ibrahim-9-ali',
    href: 'https://www.linkedin.com/in/ibrahim-9-ali/',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Ibrahim99575',
    href: 'https://github.com/Ibrahim99575',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'India',
    href: null,
  },
];

const Contact = () => {
  const formRef = useRef(null);
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const handleChange = (e) =>
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await emailjs.sendForm(
        emailJSConfig.serviceID,
        emailJSConfig.templateID,
        formRef.current,
        emailJSConfig.publicKey,
      );
      setStatus('success');
      setFields({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.warn('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section section-alt">
      <span className="section-number">05</span>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title">Let's Talk</h2>
        <p className="contact-subtitle">
          Open to new opportunities, interesting engineering problems, and
          conversations about cloud architecture.
        </p>

        <div className="contact-layout">
          {/* Sidebar */}
          <motion.div
            className="contact-sidebar"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="contact-item">
                <Icon size={18} className="contact-icon" />
                <div>
                  <p className="contact-item-label">{label}</p>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="contact-item-value contact-link">
                      {value}
                    </a>
                  ) : (
                    <p className="contact-item-value">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div className="availability-badge">
              <span className="avail-dot" />
              Available for opportunities
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="form-heading">Send Me a Message</h3>
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              {[
                { name: 'name', label: 'Your Name', type: 'text' },
                { name: 'email', label: 'Your Email', type: 'email' },
                { name: 'subject', label: 'Subject', type: 'text' },
              ].map(({ name, label, type }) => (
                <div key={name} className="field-wrap">
                  <label className="field-label" htmlFor={name}>{label}</label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    required
                    value={fields[name]}
                    onChange={handleChange}
                    className="field-input"
                    autoComplete={name === 'email' ? 'email' : 'off'}
                    disabled={status === 'loading'}
                  />
                </div>
              ))}
              <div className="field-wrap">
                <label className="field-label" htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={fields.message}
                  onChange={handleChange}
                  className="field-input field-textarea"
                  disabled={status === 'loading'}
                />
              </div>

              {status === 'success' && (
                <div className="form-success status-message" role="status" aria-live="polite">
                  Message sent — I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="form-error status-message" role="alert" aria-live="assertive">
                  Something went wrong. Try emailing me directly.
                </div>
              )}
              {status !== 'success' && (
                <button type="submit" className="btn-primary submit-btn" disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <><Loader size={16} className="animate-spin" /> Sending…</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .contact-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          color: var(--text-secondary);
          margin-top: -2rem;
          margin-bottom: 3rem;
          max-width: 56ch;
        }
        .contact-layout {
          display: grid;
          grid-template-columns: 35fr 65fr;
          gap: 4rem;
          align-items: start;
        }
        .contact-sidebar {
          display: flex; flex-direction: column; gap: 1.5rem;
        }
        .contact-item {
          display: flex; align-items: flex-start; gap: 0.875rem;
        }
        .contact-icon { color: var(--text-secondary); margin-top: 2px; flex-shrink: 0; }
        .contact-item-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.15rem;
        }
        .contact-item-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: var(--text-primary);
          text-decoration: none;
        }
        .contact-link:hover { color: var(--accent-cyan); }
        .availability-badge {
          display: flex; align-items: center; gap: 0.5rem;
          margin-top: 0.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }
        .avail-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--success);
          animation: pulse-dot 2s ease infinite;
          flex-shrink: 0;
        }
        .contact-form-wrap {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 2rem;
        }
        .form-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }
        .contact-form { display: flex; flex-direction: column; gap: 1.25rem; }
        .field-wrap { display: flex; flex-direction: column; gap: 0.35rem; }
        .field-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
        }
        .field-input {
          background: var(--bg-surface-2);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 0.65rem 0.875rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: var(--text-primary);
          transition: border-color 0.2s ease;
          outline: none;
          width: 100%;
        }
        .field-input:focus { border-color: var(--accent-cyan); }
        .field-textarea { resize: vertical; min-height: 100px; }
        .submit-btn {
          display: flex; align-items: center; justify-content: center;
          gap: 0.5rem; width: 100%;
        }
        .form-success {
          padding: 0.875rem 1rem;
          border-radius: 6px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid var(--success);
          color: var(--success);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          text-align: center;
        }
        .form-error {
          padding: 0.875rem 1rem;
          border-radius: 6px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid #ef4444;
          color: #ef4444;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          text-align: center;
        }
        @media (max-width: 768px) {
          .contact-layout { grid-template-columns: 1fr; gap: 2.5rem; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
