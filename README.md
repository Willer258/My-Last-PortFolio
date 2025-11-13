# 🚀 Modern Portfolio with 3D Effects & Interactive Features

A stunning, modern portfolio website built with cutting-edge technologies, featuring 3D graphics, smooth animations, internationalization, and fun interactive elements!

## ✨ Features

### 🎨 Visual & Design
- **Three.js 3D Graphics**: Interactive floating geometries in the hero section
- **Framer Motion Animations**: Smooth, professional animations throughout
- **Modern Design**: Beautiful gradient colors and glass-morphism effects
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Fully Responsive**: Perfect on all devices from mobile to desktop

### 🌍 Internationalization
- **Bilingual Support**: Complete English and French translations
- **Easy Language Toggle**: Switch languages instantly with a single click
- **Persistent Preference**: Language choice saved for next visit

### 🎯 Sections
1. **Hero**: Animated hero with 3D background and typing effect
2. **About**: Timeline of experience with stats and highlights
3. **Skills**: Animated skill bars with icons and categories
4. **Projects**: Filterable project cards with detailed information
5. **Contact**: Functional contact form with validation
6. **Footer**: Social links and Easter eggs!

### 🎮 Interactive Features
- **AI Chatbot**: Intelligent chatbot to answer questions about the portfolio
  - Context-aware responses
  - Suggested questions
  - Smooth animations
- **Snake Game**: Classic snake game built with React
  - Keyboard controls
  - Score tracking
  - High score memory
- **Easter Eggs**: Hidden surprises throughout the site
- **Smooth Scrolling**: Navigate seamlessly between sections

### 🛠️ Technical Features
- **TypeScript**: Full type safety
- **Zustand**: Lightweight state management
- **Next.js 12**: Server-side rendering and optimization
- **Tailwind CSS**: Utility-first styling with custom theme
- **React Hot Toast**: Beautiful notifications
- **React Icons**: Comprehensive icon library

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ (currently running on Node.js 22.21.1)
- Yarn or npm

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd My-Last-PortFolio
\`\`\`

2. Install dependencies:
\`\`\`bash
yarn install
# or
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
yarn dev
# or
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

\`\`\`bash
yarn build
yarn start
\`\`\`

## 🎨 Customization

### Personal Information
Edit \`/data/portfolio.ts\` to customize:
- Skills and proficiency levels
- Projects and their details
- Timeline/experience
- Social links

### Translations
Edit translation files:
- \`/public/locales/en/common.json\` (English)
- \`/public/locales/fr/common.json\` (French)

### Colors & Theme
Customize the theme in \`/tailwind.config.js\`:
- Primary colors
- Secondary colors
- Accent colors
- Custom animations

### Content
- **Hero Section**: Edit \`/components/sections/Hero.tsx\`
- **About Section**: Edit \`/components/sections/About.tsx\`
- **Skills**: Edit \`/components/sections/Skills.tsx\`
- **Projects**: Edit \`/components/sections/Projects.tsx\`
- **Contact**: Edit \`/components/sections/Contact.tsx\`

## 📦 Technologies Used

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 12, React 18 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, CSS Modules |
| **3D Graphics** | Three.js, @react-three/fiber |
| **Animations** | Framer Motion |
| **State Management** | Zustand |
| **Internationalization** | next-i18next, i18next |
| **UI Components** | React Icons, React Hot Toast |
| **Type Animation** | react-type-animation |

## 🎮 Interactive Elements

### Chatbot
Click the chat icon in the bottom-right corner to:
- Ask about skills and technologies
- Learn about projects
- Get contact information
- Explore the portfolio interactively

### Snake Game
Click the play button in the bottom-left corner to:
- Play the classic snake game
- Challenge yourself to beat the high score
- Take a fun break while browsing!

### Easter Eggs
Find hidden surprises by:
- Clicking on unusual elements
- Exploring interactive components
- Counter tracks your discoveries!

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### Project Structure
\`\`\`
My-Last-PortFolio/
├── components/
│   ├── 3d/              # Three.js components
│   ├── games/           # Interactive games
│   ├── sections/        # Page sections
│   ├── ui/              # Reusable UI components
│   ├── Chatbot.tsx
│   ├── Footer.tsx
│   ├── GameButton.tsx
│   └── Navbar.tsx
├── data/
│   └── portfolio.ts     # Portfolio data
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   └── api/
├── public/
│   └── locales/         # Translation files
├── store/
│   └── useStore.ts      # Zustand store
└── styles/
    └── globals.css
\`\`\`

## 🎯 Performance

- **Lighthouse Score**: 95+ (aim)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized with SWC minification

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourusername)
- Email: your.email@example.com

## 🌟 Show your support

Give a ⭐️ if you like this project!

---

**Built with 💙 and lots of ☕**
