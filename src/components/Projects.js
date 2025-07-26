import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar } from 'lucide-react';

const Projects = () => {
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

  const projects = [
    {
      title: "Air India Multi-Cloud Notification System",
      description: "A comprehensive notification platform deployed across Azure and AWS, handling WhatsApp template generation via NetCore platform, SMS through Vilpower, and email via AWS SES with automated Azure Pipelines.",
      technologies: ["Azure Databricks", "NetCore Platform", "Azure Event Hub", "Azure Service Bus", "AWS SES", "Azure Pipelines"],
      features: [
        "WhatsApp template generation with NetCore",
        "SMS integration with Vilpower API",
        "Email notifications through AWS SES",
        "Multi-cloud deployment (Azure & AWS)",
        "Automated Azure Pipelines from GitHub"
      ],
      status: "In Development",
      year: "2024"
    },
    {
      title: "Automated Deployment Pipeline System",
      description: "Built and maintained Azure Pipelines for automated deployment of notification services from GitHub repositories to production environments across Azure and AWS platforms.",
      technologies: ["Azure Pipelines", "Azure Functions", "AWS Deployment", "CI/CD", "Pipeline Automation"],
      features: [
        "Automated GitHub to production deployment",
        "Multi-cloud deployment support",
        "Pipeline monitoring and alerting",
        "Rollback capabilities",
        "Environment-specific configurations"
      ],
      status: "Completed",
      year: "2024"
    },
    {
      title: "Personal Portfolio Website",
      description: "A responsive portfolio website showcasing my multi-cloud development skills and notification system experience. Features smooth animations and modern design principles built with React.",
      technologies: ["React", "Framer Motion", "CSS3", "JavaScript"],
      features: [
        "Responsive design",
        "Smooth animations", 
        "Interactive components",
        "SEO optimized"
      ],
      status: "Completed",
      year: "2024",
      github: "https://github.com/Ibrahim99575/portfolio-website",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div 
          className="projects-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Featured Projects
          </motion.h2>
          
          <motion.p className="section-subtitle" variants={itemVariants}>
            Here are some of the projects I've worked on that demonstrate my skills and experience
          </motion.p>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                className="project-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta">
                    <span className={`project-status ${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                    <span className="project-year">
                      <Calendar size={14} />
                      {project.year}
                    </span>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-technologies">
                  <h4>Technologies:</h4>
                  <div className="tech-tags">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>

                {(project.github || project.live) && (
                  <div className="project-links">
                    {project.github && (
                      <motion.a 
                        href={project.github}
                        className="project-link"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={18} />
                        View Code
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a 
                        href={project.live}
                        className="project-link primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="projects-note"
            variants={itemVariants}
          >
            <p>
              More projects are available on my{' '}
              <button 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-color)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  font: 'inherit'
                }}
                onClick={() => window.open('https://github.com/Ibrahim99575', '_blank')}
              >
                GitHub profile
              </button>. 
              I'm always working on new ideas and contributing to open-source projects.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
