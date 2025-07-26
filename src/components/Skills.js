import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.25
      }
    }
  };

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "Java", level: 90 },
        { name: "C++", level: 85 },
        { name: "Python", level: 75 },
        { name: "JavaScript", level: 70 },
        { name: "C", level: 65 }
      ]
    },
    {
      title: "Java & Frameworks",
      skills: [
        { name: "Spring Boot", level: 90 },
        { name: "Maven", level: 85 },
        { name: "JPA/Hibernate", level: 80 },
        { name: "Java Enterprise", level: 80 },
        { name: "Spring Security", level: 75 }
      ]
    },
    {
      title: "Cloud Platforms",
      skills: [
        { name: "Azure Services", level: 85 },
        { name: "AWS Platform", level: 75 },
        { name: "Azure Databricks", level: 80 },
        { name: "Azure Functions", level: 75 },
        { name: "Cloud Architecture", level: 80 }
      ]
    },
    {
      title: "Development & APIs",
      skills: [
        { name: "Notification System Architecture", level: 90 },
        { name: "RESTful APIs", level: 90 },
        { name: "Event-Driven Architecture", level: 85 },
        { name: "Microservices", level: 85 },
        { name: "Message Queuing", level: 80 }
      ]
    },
    {
      title: "DevOps & Tools",
      skills: [
        { name: "CI/CD Pipelines", level: 80 },
        { name: "Git Version Control", level: 85 },
        { name: "Azure Pipelines", level: 75 },
        { name: "Problem Solving", level: 90 },
        { name: "Team Collaboration", level: 90 }
      ]
    }
  ];

  const SkillBar = ({ skill }) => {
    return (
      <motion.div 
        className="skill-item"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <div className="skill-header">
          <span className="skill-name">{skill.name}</span>
          <span className="skill-percentage">{skill.level}%</span>
        </div>
        <div className="skill-bar">
          <motion.div 
            className="skill-fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />
        </div>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div 
          className="skills-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Skills & Technologies
          </motion.h2>
          
          <motion.p className="section-subtitle" variants={itemVariants}>
            Here are the technologies and skills I've developed during my journey as a software developer
          </motion.p>

          <div className="skills-grid">
            {skillCategories.map((category, index) => (
              <motion.div 
                key={index}
                className="skill-category"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="category-title">{category.title}</h3>
                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar key={skillIndex} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="skills-summary"
            variants={itemVariants}
          >
            <div className="summary-text">
              <h3>Multi-Cloud & DevOps Expertise</h3>
              <p>
                I specialize in multi-cloud environments working with both Azure and AWS platforms. 
                My experience in the Air India Notification team includes working with NetCore platform 
                for WhatsApp template generation, managing Azure Pipelines for automated deployments, 
                and building scalable notification systems across different cloud environments.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
