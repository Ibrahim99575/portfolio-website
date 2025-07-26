import React from 'react';
import { motion } from 'framer-motion';
import { Code, Coffee, Lightbulb, Target } from 'lucide-react';

const About = () => {
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

  const features = [
    {
      icon: <Code size={32} />,
      title: "Multi-Cloud Development",
      description: "Building solutions across Azure and AWS cloud platforms"
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Notification Architecture",
      description: "Designing and managing enterprise notification systems"
    },
    {
      icon: <Target size={32} />,
      title: "CI/CD Pipelines",
      description: "Automated deployments from GitHub to production environments"
    },
    {
      icon: <Coffee size={32} />,
      title: "Event-Driven Systems",
      description: "Azure Service Bus, Event Hub for real-time messaging"
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div 
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="about-text" variants={itemVariants}>
            <h2 className="section-title">About Me</h2>
            <p className="about-description">
              I'm a dedicated software developer currently working in the Air India 
              Notification team, where I build and maintain sophisticated notification systems 
              using Azure cloud services and AWS platforms. With 1 year of professional experience, 
              I've developed expertise in Azure Databricks, Event Hub, Service Bus, Azure Functions, 
              and enterprise notification system architecture.
            </p>
            <p className="about-description">
              My work involves creating multi-channel notification solutions including email, 
              SMS, and messaging services. I design and implement scalable notification 
              architectures using cloud platforms, with applications deployed on both Azure 
              and AWS environments, utilizing CI/CD pipelines for automated deployments from GitHub 
              repositories to production environments.
            </p>
            <p className="about-description">
              I'm passionate about cloud technologies, DevOps practices, and event-driven 
              architectures. My experience spans from data analytics with Azure Databricks to 
              building serverless functions and managing deployment pipelines for scalable 
              notification systems.
            </p>
          </motion.div>

          <motion.div className="about-features" variants={itemVariants}>
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="feature-card"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
