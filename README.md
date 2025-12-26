# DUNYA Restaurant Website

A modern, responsive restaurant website built with TypeScript, featuring a clean design, smooth animations, and a dynamic checkered pattern.

## ✨ Features

- **TypeScript**: Fully typed codebase for better development experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Navigation**: Fixed navigation bar with hamburger menu for mobile
- **Dynamic Checkered Pattern**: Animated red and white checkered banner under the logo
- **Smooth Animations**: Scroll-based animations and hover effects
- **Menu Showcase**: Interactive menu sections with image placeholders
- **Contact Information**: Multiple contact methods including social media

## 🎨 Design

### Color Scheme
- **Red**: Primary brand color (#dc3545) - Used for logo and accents
- **Blue**: Accent color (#0d6efd) - Used in gradients and highlights
- **Green**: Accent color (#198754) - Used in gradients and highlights  
- **White**: Background and clean design

### Special Effects
- **Animated Checkered Pattern**: Red and white checkered banner that moves left to right
- **Parallax Effects**: Smooth scrolling with depth
- **Hover Animations**: Interactive elements with smooth transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm (version 8 or higher)

### Installation

1. **Clone/Download** the project
2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development

1. **Start development server** (with TypeScript watch mode):
   ```bash
   npm run dev
   ```
   This will build the project and start live-server with auto-reload

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Serve production build**:
   ```bash
   npm start
   ```

### Available Scripts

- `npm run dev` - Start development server with TypeScript watch mode
- `npm run build` - Clean build directory and compile everything
- `npm start` - Build and serve the production version
- `npm run clean` - Remove the dist directory
- `npm run type-check` - Run TypeScript type checking without compilation
- `npm run watch` - Run TypeScript compiler in watch mode
- `npm run serve` - Serve the dist directory (requires existing build)

## 📁 Project Structure

```
├── src/                    # Source files (EDIT THESE)
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles and animations
│   └── script.ts          # TypeScript source code
├── dist/                  # Compiled output (AUTO-GENERATED)
│   ├── index.html         # Compiled HTML
│   ├── styles.css         # Copied CSS
│   ├── script.js          # Compiled JavaScript
│   ├── script.d.ts        # TypeScript declarations
│   └── *.map              # Source maps for debugging
├── node_modules/          # Dependencies (AUTO-GENERATED)
├── package.json           # npm configuration
├── tsconfig.json          # TypeScript configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🛠️ Development Guidelines

### File Organization
- **Source files**: Only edit files in the `src/` directory
- **Build output**: The `dist/` directory is auto-generated, never edit directly
- **TypeScript**: Use `script.ts` for all JavaScript functionality

### TypeScript Features
- **Strict type checking** enabled
- **Interface definitions** for better code organization
- **Class-based architecture** for maintainable code
- **Modern ES2020** features supported

### CSS Architecture
- **Mobile-first** responsive design
- **CSS Grid** and **Flexbox** for layouts
- **CSS Animations** for smooth effects
- **Custom properties** for consistent theming

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 481px - 768px
- **Desktop**: > 768px

## 🎯 Menu Sections

1. **Shawarma Station** - Beef and Chicken options
2. **Falafel Station** - Classic falafel
3. **Sides & Refreshments** - Fattouch, fries, homemade ice tea
4. **Lebanese Ice Cream** - Traditional authentic flavors

## 📞 Contact Methods

- 📧 **Email**: info@dunyarestaurant.com
- 📱 **Phone**: +1 (555) 123-4567
- 📸 **Instagram**: @dunyarestaurant
- 🎵 **TikTok**: @dunyarestaurant

## 📄 License

MIT License - Feel free to use this project as a starting point for your restaurant website.

---

**Built with ❤️ for DUNYA Restaurant**
