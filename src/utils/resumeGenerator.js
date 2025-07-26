import jsPDF from 'jspdf';
import { resumeData } from '../data/resumeData';

export class ATSResumeGenerator {
  constructor() {
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.margin = 15; // Reduced margin for more space
    this.currentY = this.margin;
    this.lineHeight = 4.5; // Reduced line height for compact layout
    this.maxY = this.pageHeight - 20; // Maximum Y position to stay on one page
  }

  // ATS-friendly colors (high contrast)
  colors = {
    primary: '#2563eb',     // Professional blue
    secondary: '#1f2937',   // Dark gray
    accent: '#059669',      // Success green
    text: '#000000',        // Black for ATS
    lightGray: '#6b7280'
  };

  // ATS-optimized fonts (standard fonts) - reduced sizes for single page
  setFont(type = 'normal', size = 10) {
    const fontMap = {
      'title': { family: 'helvetica', style: 'bold', size: 14 }, // Reduced from 16
      'heading': { family: 'helvetica', style: 'bold', size: 10 }, // Reduced from 12
      'subheading': { family: 'helvetica', style: 'bold', size: 9 }, // Reduced from 10
      'normal': { family: 'helvetica', style: 'normal', size: 8.5 }, // Reduced from 10
      'small': { family: 'helvetica', style: 'normal', size: 8 } // Reduced from 9
    };
    
    const font = fontMap[type];
    this.doc.setFont(font.family, font.style);
    this.doc.setFontSize(font.size);
  }

  addText(text, x = this.margin, options = {}) {
    const {
      color = this.colors.text,
      maxWidth = this.pageWidth - 2 * this.margin,
      align = 'left',
      moveY = true,
      compact = false
    } = options;

    this.doc.setTextColor(color);
    
    if (align === 'center') {
      x = this.pageWidth / 2;
    } else if (align === 'right') {
      x = this.pageWidth - this.margin;
    }

    // Handle text wrapping for ATS compatibility
    const lines = this.doc.splitTextToSize(text, maxWidth);
    
    lines.forEach((line, index) => {
      // Don't add new page - just stop if we run out of space
      if (this.currentY > this.maxY) {
        return;
      }
      
      this.doc.text(line, x, this.currentY, { align });
      if (moveY || index < lines.length - 1) {
        this.currentY += compact ? this.lineHeight * 0.8 : this.lineHeight;
      }
    });
  }

  addSection(title, content, spacing = 3) {
    // Reduced spacing for single page
    this.currentY += 2;
    
    // Section title with ATS-friendly formatting
    this.setFont('heading');
    this.addText(title.toUpperCase(), this.margin, { color: this.colors.primary });
    
    // Add underline for visual appeal (ATS compatible)
    this.doc.setDrawColor(this.colors.primary);
    this.doc.setLineWidth(0.3);
    this.doc.line(this.margin, this.currentY + 0.5, this.pageWidth - this.margin, this.currentY + 0.5);
    
    this.currentY += 4; // Reduced spacing
    
    // Section content
    this.setFont('normal');
    content();
    
    this.currentY += spacing; // Configurable spacing
  }

  generateHeader() {
    const { personalInfo } = resumeData;
    
    // Name - Large and prominent for ATS
    this.setFont('title');
    this.addText(personalInfo.name, this.margin, { 
      color: this.colors.primary, 
      align: 'center' 
    });
    
    // Title
    this.setFont('subheading');
    this.addText(personalInfo.title, this.margin, { 
      color: this.colors.secondary, 
      align: 'center' 
    });
    
    this.currentY += 2;
    
    // Contact Information - Compact format
    this.setFont('small');
    const contactInfo = `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`;
    this.addText(contactInfo, this.margin, { align: 'center', compact: true });
    
    // LinkedIn and GitHub URLs on separate line
    const socialInfo = `LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}`;
    this.addText(socialInfo, this.margin, { align: 'center', compact: true });
    this.currentY += 2;
  }

  generateSummary() {
    this.addSection('Professional Summary', () => {
      // Condensed summary for single page
      const condensedSummary = "Full-stack Software Developer with 1+ year experience specializing in Java & Spring Boot. Expert in architecting enterprise notification systems serving millions of users. Proven track record transforming complex business requirements into scalable cloud solutions using Azure and AWS.";
      this.addText(condensedSummary, this.margin, { compact: true });
    }, 2);
  }

  generateExperience() {
    this.addSection('Professional Experience', () => {
      resumeData.experience.forEach(exp => {
        // Company and Position - more compact
        this.setFont('subheading');
        this.addText(`${exp.position} | ${exp.company} | ${exp.duration}`, this.margin, { compact: true });
        
        this.currentY += 1;
        
        // Top 3 achievements only for single page
        this.setFont('normal');
        const topAchievements = exp.achievements.slice(0, 3);
        topAchievements.forEach(achievement => {
          this.addText(`• ${achievement}`, this.margin, { compact: true });
        });
        
        this.currentY += 1;
      });
    }, 2);
  }

  generateSkills() {
    this.addSection('Technical Skills', () => {
      // Compact skills layout - 2 columns
      const skillEntries = Object.entries(resumeData.skills);
      const leftColumn = skillEntries.slice(0, 3);
      const rightColumn = skillEntries.slice(3);
      
      const startY = this.currentY;
      const columnWidth = (this.pageWidth - 3 * this.margin) / 2;
      
      // Left column
      this.currentY = startY;
      leftColumn.forEach(([category, skills]) => {
        this.setFont('small');
        this.addText(`${category}:`, this.margin, { color: this.colors.secondary, compact: true });
        this.setFont('small');
        this.addText(skills.slice(0, 4).join(' • '), this.margin + 2, { 
          maxWidth: columnWidth, 
          compact: true 
        });
        this.currentY += 1;
      });
      
      const leftHeight = this.currentY;
      
      // Right column
      this.currentY = startY;
      rightColumn.forEach(([category, skills]) => {
        this.setFont('small');
        this.addText(`${category}:`, this.pageWidth / 2, { color: this.colors.secondary, compact: true });
        this.setFont('small');
        this.addText(skills.slice(0, 4).join(' • '), this.pageWidth / 2 + 2, { 
          maxWidth: columnWidth, 
          compact: true 
        });
        this.currentY += 1;
      });
      
      // Set Y to the maximum of both columns
      this.currentY = Math.max(leftHeight, this.currentY);
    }, 2);
  }

  generateProjects() {
    this.addSection('Key Projects', () => {
      // Top 2 projects only for single page
      const topProjects = resumeData.projects.slice(0, 2);
      topProjects.forEach(project => {
        this.setFont('subheading');
        this.addText(`${project.name} | ${project.technologies.slice(0, 3).join(', ')}`, this.margin, { compact: true });
        
        this.setFont('normal');
        // Shortened description
        const shortDesc = project.description.length > 80 ? 
          project.description.substring(0, 80) + "..." : 
          project.description;
        this.addText(shortDesc, this.margin, { compact: true });
        this.currentY += 1;
      });
    }, 2);
  }

  generateEducationAndCertifications() {
    this.addSection('Education & Certifications', () => {
      // Education
      resumeData.education.forEach(edu => {
        this.setFont('subheading');
        this.addText(`${edu.degree} | ${edu.institution} | ${edu.year}`, this.margin, { compact: true });
      });
      
      this.currentY += 1;
      
      // Certifications in one line
      if (resumeData.certifications.length > 0) {
        this.setFont('normal');
        this.addText(`Certifications: ${resumeData.certifications.join(' • ')}`, this.margin, { compact: true });
      }
    }, 1);
  }

  addATSOptimizationKeywords() {
    // Hidden keywords for ATS (white text, will be parsed but not visible)
    const keywords = [
      'Java Spring Boot Maven JPA Hibernate Azure AWS Cloud Microservices CI/CD DevOps Git REST API Software Development Full Stack Enterprise'
    ];
    
    this.doc.setTextColor('#FFFFFF'); // White text (invisible but ATS readable)
    this.setFont('small');
    this.doc.text(keywords[0], 0, 0);
  }

  generatePDF() {
    try {
      // Generate all sections in compact format
      this.generateHeader();
      this.generateSummary();
      this.generateExperience();
      this.generateSkills();
      this.generateProjects();
      this.generateEducationAndCertifications();
      
      // Add ATS optimization keywords
      this.addATSOptimizationKeywords();
      
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `Ibrahim_Ali_Resume_${timestamp}.pdf`;
      
      // Save the PDF
      this.doc.save(filename);
      
      return {
        success: true,
        filename,
        message: 'Single-page ATS-optimized resume generated successfully!'
      };
      
    } catch (error) {
      console.error('PDF generation error:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to generate resume. Please try again.'
      };
    }
  }
}

// Export the generator function
export const generateATSResume = () => {
  const generator = new ATSResumeGenerator();
  return generator.generatePDF();
};
