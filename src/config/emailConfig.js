// EmailJS Configuration
// To set up EmailJS, follow the instructions in EMAILJS_SETUP.md
// Configuration is loaded from environment variables for security

// ⚠️ SECURITY NOTE: Replace these with NEW credentials after old ones were compromised
// Fallback configuration for GitHub Pages (when env vars are not available)
// NOTE: Only use this for non-sensitive public keys
const fallbackConfig = {
  serviceID: 'NEW_SERVICE_ID_HERE', // ⚠️ REPLACE WITH NEW SERVICE ID
  templateID: 'NEW_TEMPLATE_ID_HERE', // ⚠️ REPLACE WITH NEW TEMPLATE ID  
  publicKey: 'NEW_PUBLIC_KEY_HERE', // ⚠️ REPLACE WITH NEW PUBLIC KEY
  recipient: 'connect.ibrahim.ali@gmail.com'
};

export const emailJSConfig = {
  // Try environment variables first, fallback to hardcoded for GitHub Pages
  serviceID: process.env.REACT_APP_EMAILJS_SERVICE_ID || fallbackConfig.serviceID,
  templateID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || fallbackConfig.templateID,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || fallbackConfig.publicKey
};

// Email recipient loaded from environment variables or fallback
export const emailRecipient = process.env.REACT_APP_EMAIL_RECIPIENT || fallbackConfig.recipient;

// Check if EmailJS is properly configured
export const isEmailJSConfigured = () => {
  return (
    emailJSConfig.serviceID && 
    emailJSConfig.templateID && 
    emailJSConfig.publicKey &&
    emailJSConfig.serviceID !== 'your_service_id_here' &&
    emailJSConfig.templateID !== 'your_template_id_here' &&
    emailJSConfig.publicKey !== 'your_public_key_here' &&
    emailJSConfig.serviceID !== 'NEW_SERVICE_ID_HERE' && // Check for placeholder
    emailJSConfig.templateID !== 'NEW_TEMPLATE_ID_HERE' &&
    emailJSConfig.publicKey !== 'NEW_PUBLIC_KEY_HERE'
  );
};

// Log configuration source for debugging
if (process.env.NODE_ENV === 'development') {
  console.log('EmailJS Config Source:', 
    process.env.REACT_APP_EMAILJS_SERVICE_ID ? 'Environment Variables' : 'Fallback Configuration'
  );
}

export default emailJSConfig;
