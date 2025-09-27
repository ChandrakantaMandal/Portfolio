# 🚀 Chandrakanta Mandal - Portfolio Website

A modern, responsive portfolio website built with React, featuring smooth animations, dark/light theme switching, and interactive components. This project showcases my skills as a full-stack developer through a clean, professional interface.

![Portfolio Preview](https://via.placeholder.com/800x400/3de58f/ffffff?text=Portfolio+Website)

## ✨ Features

### 🎨 **Design & UI/UX**
- **Responsive Design**: Fully responsive across all device sizes
- **Dark/Light Theme**: Seamless theme switching with smooth transitions
- **Modern Animations**: Powered by Framer Motion for engaging interactions
- **Particle Background**: Dynamic particle system for visual appeal
- **Smooth Scrolling**: Enhanced user experience with smooth scroll behavior

### 📊 **Interactive Components**
- **Circular Progress Bars**: Animated skill level indicators
- **Scroll Progress Indicator**: Circular progress bar showing reading progress
- **Filter System**: Dynamic skill category filtering with animations
- **Contact Form**: Functional contact form with EmailJS integration
- **Live Chat System**: AI-powered chat assistant for visitor engagement

### 🔧 **Technical Features**
- **Performance Optimized**: Fast loading with Vite bundler
- **Error Boundaries**: Robust error handling throughout the app
- **Lazy Loading**: Code splitting for optimal performance
- **Theme Context**: Centralized theme management
- **Form Validation**: Client-side form validation with real-time feedback

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and context
- **Vite** - Fast build tool and development server
- **Framer Motion** - Advanced animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Icons** - Comprehensive icon library

### **Services & APIs**
- **EmailJS** - Email service for contact form
- **UUID** - Unique identifier generation

### **Development Tools**
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChandrakantaMandal/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your EmailJS configuration in `.env`:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📧 EmailJS Setup

To enable the contact form functionality:

1. **Create an EmailJS account** at [emailjs.com](https://www.emailjs.com/)
2. **Add an email service** (Gmail, Outlook, etc.)
3. **Create an email template** with these variables:
   - `{{from_name}}` - User's name
   - `{{from_email}}` - User's email
   - `{{subject}}` - Email subject
   - `{{message}}` - User's message
4. **Get your Service ID, Template ID, and Public Key**
5. **Update your `.env` file** with the actual values

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BackToTop.jsx   # Scroll to top button
│   ├── ErrorBoundary.jsx # Error handling
│   ├── Footer.jsx      # Site footer
│   ├── LoadingPage.jsx # Loading spinner
│   ├── Navbar.jsx      # Navigation header
│   ├── ParticleBackground.jsx # Particle system
│   ├── ScrollProgress.jsx # Reading progress indicator
│   ├── ThemeNotification.jsx # Theme switch feedback
│   └── LiveChat/       # Chat system components
├── contexts/           # React contexts
│   ├── ChatContext.jsx # Chat state management
│   └── ThemeContext.jsx # Theme management
├── hooks/              # Custom React hooks
├── pages/              # Main page components
│   ├── About.jsx       # About section with skills
│   ├── Contact.jsx     # Contact form
│   ├── Hero.jsx        # Landing section
│   ├── NotFound.jsx    # 404 page
│   └── Projects.jsx    # Projects showcase
├── App.jsx             # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

## 🎯 Key Sections

### **Hero Section**
- Professional introduction with animated text
- Call-to-action buttons with smooth animations
- Responsive design with mobile optimization

### **About Section**
- Personal introduction and background
- Interactive skill categories with filtering
- Circular progress bars showing proficiency levels
- Smooth animations on scroll

### **Projects Section**
- Showcase of portfolio projects
- Responsive grid layout
- Project filtering and categorization

### **Contact Section**
- Functional contact form with validation
- Social media links
- Direct contact information
- EmailJS integration for form submissions

## 🎨 Theme System

The website features a comprehensive theme system:

- **Light Theme**: Clean, professional appearance
- **Dark Theme**: Modern, eye-friendly dark mode
- **Smooth Transitions**: 300ms transitions between themes
- **Context-Based**: Centralized theme management
- **Persistent**: Theme preference saved in localStorage

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: Tailored for all screen sizes
- **Touch Friendly**: Optimized for touch interactions
- **Performance**: Optimized images and lazy loading

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📈 Performance Features

- **Code Splitting**: Lazy loaded components
- **Optimized Images**: Responsive image loading
- **Minimal Bundle**: Tree shaking and optimization
- **Fast Refresh**: Hot module replacement in development

## 🤝 Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: chandrakantamandal28@gmail.com
- **LinkedIn**: [chandrakanta-mandal](https://www.linkedin.com/in/chandrakanta-mandal)
- **GitHub**: [ChandrakantaMandal](https://github.com/ChandrakantaMandal)
- **Location**: Cuttack, Odisha, India

---

⭐ **If you like this project, please give it a star on GitHub!** ⭐
