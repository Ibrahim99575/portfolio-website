import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, ExternalLink, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { generateATSResume } from '../utils/resumeGenerator';

const Hero = React.memo(() => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState(null);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadResume = async () => {
    setIsGenerating(true);
    setGenerationStatus(null);
    
    try {
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = generateATSResume();
      
      if (result.success) {
        setGenerationStatus({
          type: 'success',
          message: `Resume generated successfully!\nDownloaded: ${result.filename}`
        });
      } else {
        setGenerationStatus({
          type: 'error',
          message: `Resume generation failed. ${result.message}`
        });
      }
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setGenerationStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Resume generation failed:', error);
      setGenerationStatus({
        type: 'error',
        message: 'Resume generation failed. Please try again.'
      });
      
      setTimeout(() => {
        setGenerationStatus(null);
      }, 5000);
    } finally {
      setIsGenerating(false);
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

  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <div className="hero-gradient"></div>
      </div>
      
      <motion.div 
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-content" variants={itemVariants}>
          <motion.h1 className="hero-title" variants={itemVariants}>
            Hi, I'm <span className="highlight">Ibrahim</span>
          </motion.h1>
          
          <motion.h2 className="hero-subtitle" variants={itemVariants}>
            Software Developer at <span className="company">Air India</span>
          </motion.h2>
          
          <motion.p className="hero-description" variants={itemVariants}>
            🚀 Full-stack developer specializing in Java & Spring Boot, with hands-on experience 
            architecting enterprise notification systems that serve millions of users. I transform 
            complex business requirements into scalable cloud solutions using Azure and AWS, 
            building robust systems that power critical communications for Air India's operations.
          </motion.p>
          
          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToAbout()}
            >
              Learn More
              <ExternalLink size={18} />
            </motion.button>
            
            <motion.button 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadResume}
              disabled={isGenerating}
              style={{
                opacity: isGenerating ? 0.7 : 1,
                cursor: isGenerating ? 'not-allowed' : 'pointer'
              }}
            >
              {isGenerating ? (
                <>
                  <FileText size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Download Resume
                  <Download size={18} />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Status Message */}
          {generationStatus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`status-message ${generationStatus.type}`}
              style={{
                marginTop: '15px',
                padding: '12px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: generationStatus.type === 'success' ? '#10b981' : '#ef4444',
                color: 'white',
                whiteSpace: 'pre-line'
              }}
            >
              {generationStatus.type === 'success' ? (
                <CheckCircle size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
              {generationStatus.message}
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          className="hero-image"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="profile-image">
            <div className="profile-placeholder">
              {/* Add your professional photo here */}
              <span>IBRAHIM ALI</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        onClick={scrollToAbout}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={24} />
        </motion.div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  );
});

export default Hero;
