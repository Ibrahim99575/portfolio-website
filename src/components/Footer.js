import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-main"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-info">
              <h3>Let's Build Something Amazing Together</h3>
              <p>
                I'm always excited to work on new projects and collaborate with 
                fellow developers, designers, and innovators.
              </p>
            </div>

            <motion.button 
              className="scroll-to-top"
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <ArrowUp size={24} />
            </motion.button>
          </motion.div>

          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="footer-credits">
              <p>
                © {currentYear} Made with <Heart size={16} className="heart-icon" /> by Ibrahim
              </p>
              <p className="footer-note">
                Software Developer - Air India Notification Team
              </p>
            </div>

            <div className="footer-links">
              <a href="#hero" onClick={(e) => {
                e.preventDefault();
                document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
              }}>
                Home
              </a>
              <a href="#about" onClick={(e) => {
                e.preventDefault();
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
              }}>
                About
              </a>
              <a href="#experience" onClick={(e) => {
                e.preventDefault();
                document.getElementById('experience').scrollIntoView({ behavior: 'smooth' });
              }}>
                Experience
              </a>
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}>
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
