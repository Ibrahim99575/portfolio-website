import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { emailJSConfig, emailRecipient, isEmailJSConfigured } from '../config/emailConfig';
import XIcon from './icons/XIcon';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Validate that all required fields are filled
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        throw new Error('Please fill in all required fields.');
      }

      // Email template parameters - matching EmailJS structure
      const templateParams = {
        subject: formData.subject,
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        timestamp: new Date().toLocaleString()
      };

      console.log('Attempting to send email with params:', templateParams);
      console.log('EmailJS Config:', emailJSConfig);
      console.log('Is EmailJS Configured?', isEmailJSConfigured());

      // Check if EmailJS is properly configured
      if (!isEmailJSConfigured()) {
        console.error('EmailJS configuration check failed');
        throw new Error('EmailJS is not properly configured. Please check the configuration.');
      }

      console.log('EmailJS configuration is valid, attempting to send...');

      // Send email via EmailJS using the correct structure
      await emailjs.send(
        emailJSConfig.serviceID, 
        emailJSConfig.templateID, 
        templateParams, 
        emailJSConfig.publicKey
      );
      
      console.log('Email sent successfully via EmailJS');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: emailRecipient,
      href: `mailto:${emailRecipient}`
    },
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: "+91 XXXXX XXXXX",
      href: "tel:+91XXXXXXXXX"
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      content: "India",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin size={24} />,
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ibrahim-9-ali/"
    },
    {
      icon: <Github size={24} />,
      name: "GitHub",
      href: "https://github.com/Ibrahim99575"
    },
    {
      icon: <XIcon size={24} />,
      name: "x.com",
      href: "https://x.com/ibrahim_9_ali"
    }
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div 
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Get In Touch
          </motion.h2>
          
          <motion.p className="section-subtitle" variants={itemVariants}>
            I'm always open to discussing new opportunities, interesting projects, 
            or just having a chat about technology and software development.
          </motion.p>

          <div className="contact-wrapper">
            <motion.div className="contact-info" variants={itemVariants}>
              <h3>Contact Information</h3>
              <div className="contact-details">
                {contactInfo.map((info, index) => (
                  <motion.a 
                    key={index}
                    href={info.href}
                    className="contact-item"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="contact-icon">
                      {info.icon}
                    </div>
                    <div className="contact-text">
                      <h4>{info.title}</h4>
                      <p>{info.content}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="social-links">
                <h4>Follow Me</h4>
                <div className="social-grid">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                      <span>{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div className="contact-form" variants={itemVariants}>
              <h3>Send Me a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <motion.button 
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} />
                </motion.button>

                {submitStatus === 'success' && (
                  <div className="form-message success">
                    ✅ Thank you for your message! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="form-message error">
                    ❌ Sorry, there was an error sending your message. Please try again or contact me directly at {emailRecipient}
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
