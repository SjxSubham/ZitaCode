# 🚀 ZitaCode - Interactive Online Code Editor

<div align="center">

![ZitaCode Logo](https://github.com/user-attachments/assets/422ce720-fb8f-4439-9e24-1a7f5d9d4e64)

**A modern, feature-rich online code editor with real-time execution, AI-powered code review, and seamless collaboration.**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-ZitaCode-blue?style=for-the-badge)](dub.sh/ZitaCode)
[![Next.js](https://img.shields.io/badge/Next.js-15.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## ✨ Features

### 🖥️ **Multi-Language Code Editor**
- **10+ Programming Languages**: JavaScript, TypeScript, Python, Java, Go, Rust, C++, C#, Ruby, Swift, C
- **Monaco Editor Integration**: VS Code-like editing experience with syntax highlighting
- **Real-time Code Execution**: Powered by Piston API for secure server-side execution
- **Custom Themes**: Light/Dark mode with persistent theme storage

### 🤖 **AI-Powered Code Analysis**
- **Intelligent Code Review**: Get suggestions for code improvement using Google Gemini AI
- **Complexity Analysis**: Time and space complexity evaluation
- **Best Practices**: Code quality and performance recommendations
- **Interactive Suggestions**: Markdown-formatted responses with syntax highlighting

### 🎨 **Modern User Experience**
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progressive Web App (PWA)**: Install as a native app with offline capabilities
- **Keyboard Shortcuts**: `Ctrl + '` to run code quickly
- **Real-time Feedback**: Loading states and error handling

### 🔐 **Authentication & Data Management**
- **Clerk Authentication**: Secure user authentication with multiple providers
- **Convex Database**: Real-time data synchronization and storage
- **Code Snippets**: Save and manage your code snippets
- **Execution History**: Track your coding sessions

### 🛠️ **Developer Features**
- **TypeScript Support**: Full TypeScript integration with type safety
- **Code Persistence**: Automatic saving to localStorage
- **Font Size Customization**: Adjustable editor font size (10-24px)
- **Network Status**: Real-time network connectivity monitoring

## 🏗️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.3 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.4 with custom animations
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: Zustand for global state
- **Animations**: Framer Motion for smooth interactions

### **Backend & Services**
- **Database**: Convex (Real-time database)
- **Authentication**: Clerk (Multi-provider auth)
- **Code Execution**: Piston API
- **AI Integration**: Google Gemini AI for code review
- **Deployment**: Vercel with PWA support

### **Key Libraries**
- **Code Editor**: Monaco Editor (VS Code engine)
- **Syntax Highlighting**: React Syntax Highlighter
- **Markdown Rendering**: React Markdown
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or later
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SjxSubham/ZitaCode.git
   cd ZitaCode
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Convex Database
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CONVEX_DEPLOY_KEY=your_convex_deploy_key

   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key

   # Clerk Webhook (Optional)
   CLERK_WEBHOOK_SECRET=your_webhook_secret
   ```

4. **Initialize Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### **Basic Code Editing**
1. Select your preferred programming language from the dropdown
2. Write your code in the Monaco editor
3. Click "Run Code" or press `Ctrl + '` to execute
4. View results in the output panel

### **AI Code Review**
1. Write your code in the editor
2. Click the "AI Review" button
3. Get intelligent suggestions for improvement
4. Copy code snippets directly from suggestions

### **Theme & Customization**
- Toggle between light/dark themes using the theme button
- Adjust font size using the font size controls
- Your preferences are automatically saved

### **Code Snippets**
- Save frequently used code snippets
- Access saved snippets from the snippets page
- Organize by programming language

## 📱 PWA Features

ZitaCode works as a Progressive Web App with:
- **Offline Capability**: Continue coding without internet connection
- **Native App Experience**: Install on desktop/mobile devices
- **Background Sync**: Sync data when connection is restored
- **Push Notifications**: Stay updated with latest features

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure responsive design
- Add proper error handling
- Write descriptive commit messages

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Convex
npx convex dev       # Start Convex development
npx convex deploy    # Deploy Convex functions
```

## 🌟 Project Structure

```
zitacode/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (root)/            # Main application pages
│   │   │   ├── _components/   # Page-specific components
│   │   │   └── _constants/    # Language configurations
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   ├── hooks/                 # Custom React hooks
│   ├── store/                 # Zustand state management
│   └── types/                 # TypeScript type definitions
├── convex/                    # Convex backend functions
├── public/                    # Static assets
└── package.json              # Dependencies and scripts
```

## 🎨 Key Components

- **EditorPanel**: Monaco editor with language selection and themes
- **OutputPanel**: Code execution results and error display
- **AICodeReviewDialog**: AI-powered code analysis interface
- **LanguageSelector**: Multi-language support dropdown
- **ThemeSelector**: Light/dark mode toggle
- **Header**: Navigation and user authentication

## 🔧 Configuration

### **Supported Languages**
The application supports multiple programming languages with specific runtime configurations:

- **JavaScript** (Node.js 18.15.0)
- **TypeScript** (Latest)
- **Python** (Latest)
- **Java** (Latest)
- **Go** (Latest)
- **Rust** (Latest)
- **C++** (GCC 11.0.0)
- **C#** (Latest)
- **Ruby** (Latest)
- **Swift** (Latest)
- **C** (Latest)

## 📞 Support & Contact

- **Documentation**: Check the code comments and TypeScript definitions
- **Issues**: Report bugs on [GitHub Issues](https://github.com/SjxSubham/ZitaCode/issues)
- **Email**: Contact the developer for support
- **Community**: Join discussions in the repository

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Piston API** for secure code execution
- **Monaco Editor** for the amazing code editing experience
- **Google Gemini AI** for intelligent code analysis
- **Clerk** for seamless authentication
- **Convex** for real-time database functionality
- **Vercel** for excellent hosting and deployment

---

<div align="center">

**Built with ❤️ by [@SjxSubham](https://github.com/SjxSubham)**

[⭐ Star this repository](https://github.com/SjxSubham/ZitaCode) if you found it helpful!

</div>
