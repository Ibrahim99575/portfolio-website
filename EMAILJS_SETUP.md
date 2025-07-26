# EmailJS Setup Instructions

To enable email functionality for your portfolio contact form, follow these steps:

## 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## 2. Set Up Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. Note down your **Service ID** (e.g., 'service_portfolio')

## 3. Create Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template content:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
        </h2>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Contact Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 8px; font-weight: bold; color: #374151;">Name:</td>
                    <td style="padding: 8px; color: #6b7280;">{{from_name}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 8px; color: #6b7280;">{{from_email}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold; color: #374151;">Subject:</td>
                    <td style="padding: 8px; color: #6b7280;">{{subject}}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; font-weight: bold; color: #374151;">Date:</td>
                    <td style="padding: 8px; color: #6b7280;">{{timestamp}}</td>
                </tr>
            </table>
        </div>
        
        <div style="background: #ffffff; padding: 20px; border-left: 4px solid #2563eb; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Message:</h3>
            <div style="background: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap; color: #374151;">{{message}}</div>
        </div>
        
        <div style="background: #eff6ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #1e40af;">Quick Actions:</h4>
            <p style="margin: 5px 0;">
                <a href="mailto:{{from_email}}?subject=Re: {{subject}}" 
                   style="color: #2563eb; text-decoration: none; font-weight: 500;">
                   📧 Reply to {{from_name}}
                </a>
            </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <div style="text-align: center; color: #6b7280; font-size: 14px;">
            <p>This email was sent from your portfolio website contact form.</p>
            <p style="margin: 5px 0;">
                <strong>Portfolio:</strong> 
                <a href="http://localhost:3000" style="color: #2563eb;">Ibrahim's Portfolio</a>
            </p>
        </div>
    </div>
</body>
</html>
```

4. Set **Template ID** as 'template_contact'
5. Configure template settings:
   - To Email: connect.ibrahim.ali@gmail.com
   - Reply To: {{from_email}}
   - Subject: New Contact: {{subject}}

## 4. Get Public Key
1. Go to "Account" > "General"
2. Find your **Public Key**
3. Copy it for use in the code

## 5. Update Code Configuration
In `src/components/Contact.js`, update the emailJSConfig object:

```javascript
const emailJSConfig = {
    serviceID: 'your_service_id_here',     // From step 2
    templateID: 'template_contact',        // From step 3
    publicKey: 'your_public_key_here'      // From step 4
};
```

## 6. Enable Email Sending
Uncomment this line in Contact.js:
```javascript
await emailjs.send(emailJSConfig.serviceID, emailJSConfig.templateID, templateParams, emailJSConfig.publicKey);
```

## 7. Test the Form
1. Fill out your contact form
2. Check your email (connect.ibrahim.ali@gmail.com)
3. You should receive a nicely formatted email with the submission details

## Email Template Features:
- ✅ Professional HTML formatting
- ✅ Organized contact details table
- ✅ Highlighted message content
- ✅ Quick reply button
- ✅ Responsive design
- ✅ Branded styling matching your portfolio
- ✅ Automatic timestamps
- ✅ Reply-to functionality

## Notes:
- EmailJS free plan allows 200 emails/month
- Emails are sent directly from your chosen email service
- All form data is securely transmitted
- No backend server required
