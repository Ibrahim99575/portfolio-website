import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const Experience = () => {
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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const experiences = [
    {
      title: "Software Developer",
      company: "Air India - Notification Team",
      location: "India",
      period: "2024 - Present",
      description: [
        "Developing cloud-based notification systems using Azure Databricks and Event Hub",
        "Working with NetCore platform for WhatsApp template generation and management",
        "Implementing SMS notifications using Vilpower API integration",
        "Managing email notifications through AWS SES on AWS platform",
        "Working with Azure Service Bus for reliable message queuing and processing",
        "Creating and maintaining serverless solutions using Azure Functions",
        "Managing CI/CD pipelines for automated deployment from GitHub to production",
        "Working with applications deployed across both Azure and AWS platforms"
      ],
      technologies: ["Azure Databricks", "NetCore Platform", "Azure Event Hub", "Azure Service Bus", "Azure Functions", "AWS SES", "Vilpower", "Azure Pipelines", "AWS"]
    }
  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div 
          className="experience-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Professional Experience
          </motion.h2>

          <div className="experience-timeline">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="timeline-item"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="timeline-marker">
                  <Briefcase size={20} />
                </div>
                
                <div className="timeline-content">
                  <div className="experience-header">
                    <h3 className="experience-title">{exp.title}</h3>
                    <h4 className="experience-company">{exp.company}</h4>
                    
                    <div className="experience-meta">
                      <span className="experience-period">
                        <Calendar size={16} />
                        {exp.period}
                      </span>
                      <span className="experience-location">
                        <MapPin size={16} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  
                  <div className="experience-description">
                    <ul>
                      {exp.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="experience-technologies">
                    <h5>Technologies Used:</h5>
                    <div className="tech-tags">
                      {exp.technologies.map((tech, idx) => (
                        <motion.span 
                          key={idx}
                          className="tech-tag"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="experience-summary"
            variants={itemVariants}
          >
            <div className="summary-card">
              <h3>Career Highlights</h3>
              <div className="highlights-grid">
                <div className="highlight-item">
                  <span className="highlight-number">1+</span>
                  <span className="highlight-label">Years Experience</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">Multi-Cloud</span>
                  <span className="highlight-label">Azure & AWS</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">CI/CD</span>
                  <span className="highlight-label">Pipelines</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
