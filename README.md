# Ibrahim Ali - Portfolio Website

This is a modern, responsive portfolio website built with React showcasing my software development experience and skills.

## 🚀 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Contact Form**: Integrated with EmailJS for direct messaging
- **Dynamic Resume Generation**: One-click PDF resume download with ATS optimization
- **Modern Animations**: Smooth animations using Framer Motion
- **Professional Sections**: Hero, About, Skills, Experience, Projects, and Contact

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Ibrahim99575/portfolio-website.git
cd portfolio-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the environment template and configure your credentials:
```bash
cp .env.example .env
```

Edit `.env` file with your actual EmailJS credentials:
```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
REACT_APP_EMAIL_RECIPIENT=your_email@example.com
```

### 4. Start Development Server
```bash
npm start
```

## 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add these credentials to your `.env` file

**Important**: Never commit your `.env` file to version control!

## � Deployment

### Option 1: GitHub Actions (Recommended)
This method uses GitHub Secrets to securely build and deploy:

1. **Add GitHub Secrets**: Go to your repository → Settings → Secrets and Variables → Actions
   Add these secrets:
   ```
   REACT_APP_EMAILJS_SERVICE_ID
   REACT_APP_EMAILJS_TEMPLATE_ID  
   REACT_APP_EMAILJS_PUBLIC_KEY
   REACT_APP_EMAIL_RECIPIENT
   ```

2. **Enable GitHub Pages**: Repository Settings → Pages → Source: "GitHub Actions"

3. **Deploy**: Push to main branch - GitHub Actions will automatically build and deploy

### Option 2: Manual Deployment (Fallback)
If you prefer manual deployment, the app includes fallback configuration:

```bash
npm run deploy
```

**Note**: This method exposes EmailJS credentials in the built code, but EmailJS public keys are designed to be client-side safe.

## �🔒 Security

- Environment variables are used to protect sensitive EmailJS credentials
- The `.env` file is excluded from version control via `.gitignore`
- Use `.env.example` as a template for required environment variables

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
