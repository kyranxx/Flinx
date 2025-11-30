# Flinx - 100% PageSpeed Optimization Service

A high-performance, mobile-first landing page for a PageSpeed optimization service, built with Next.js 16, TypeScript, and optimized for perfect PageSpeed Insights scores.

## 🚀 Features

- **Multi-language Support**: English, German, French, Russian, Mandarin (expandable to 20+ languages)
- **Mobile-First Design**: Optimized for all devices with responsive layouts
- **Perfect PageSpeed Scores**: Built to achieve 100/100 on all PageSpeed Insights metrics
- **Interactive Components**:
  - Authentic PageSpeed Insights score visualizations
  - Smooth scroll navigation
  - Animated transitions with Framer Motion
  - Mobile hamburger menu
  - Accordion FAQ section
  - Form validation with "human verification"
  
## 📁 Project Structure

```
src/
├── app/
│   ├── [lang]/          # Dynamic language routes
│   │   ├── layout.tsx   # Language-specific layout
│   │   └── page.tsx     # Main page with all sections
│   ├── globals.css      # Global styles
│   └── page.tsx         # Root redirect to /en
├── components/
│   ├── Header.tsx       # Top navigation with anchors
│   ├── Hero.tsx         # Hero section with CTA
│   ├── ScoreComparison.tsx  # Before/After PageSpeed scores
│   ├── Services.tsx     # Feature cards
│   ├── Testimonials.tsx # Customer testimonials
│   ├── FAQ.tsx          # Accordion FAQ section
│   ├── ContactForm.tsx  # Contact form with validation
│   └── Footer.tsx       # Footer with links and logo
└── lib/
    └── i18n.ts          # Translation system

```

## 🌍 Supported Languages

Base implementation includes:
- 🇺🇸 English (default)
- 🇩🇪 German
- 🇫🇷 French
- 🇷🇺 Russian
- 🇨🇳 Mandarin Chinese

Ready to expand to 20+ languages including:
Spanish, Italian, Portuguese, Dutch, Polish, Czech, Romanian, Greek, Turkish, Arabic, Hindi, Japanese, Korean, and more.

## 🎯 PageSpeed Optimization Techniques

This site implements best practices for perfect PageSpeed scores:

1. **Performance**:
   - Font display swap for Google Fonts
   - Minimal JavaScript bundle
   - Optimized animations with Framer Motion
   - Server-side rendering with Next.js

2. **Accessibility**:
   - Semantic HTML
   - Proper heading hierarchy
   - ARIA labels
   - Keyboard navigation support

3. **Best Practices**:
   - CSS custom properties
   - Modern web standards
   - No console errors
   - Secure practices

4. **SEO**:
   - Dynamic metadata per language
   - Proper lang attributes
   - Semantic structure
   - Fast page load

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit:
- **English (default)**: http://localhost:3000
- **German**: http://localhost:3000/de
- **French**: http://localhost:3000/fr
- **Russian**: http://localhost:3000/ru
- **Mandarin**: http://localhost:3000/zh

## 🌐 Routing Structure

The site uses a smart routing structure:
- **English** is served at the root (`/`) for the main domain
- **Other languages** use language-specific routes (`/de`, `/fr`, `/ru`, `/zh`)
- This provides the best user experience for English visitors while supporting full internationalization

## 📝 Adding New Languages

1. Open `src/lib/i18n.ts`
2. Add language to `languages` array:
```typescript
{ code: 'es', name: 'Español', flag: '🇪🇸' }
```
3. Add translations to `translations` object
4. Add to `generateStaticParams` in `src/app/[lang]/page.tsx`

## 🎨 Design System

### Colors
- **Primary Background**: `#050505`
- **Secondary Background**: `#0f0f0f`
- **Accent Purple**: `#6d28d9`
- **Success Green**: `#00ff9d`
- **Error Red**: `#ff3366`

### Typography
- **Body**: Outfit (Google Fonts)
- **Logo**: Exo 2 (Google Fonts)

### Components
All components use Tailwind CSS utility classes with custom CSS properties for maintainability.

## 📧 Contact Form

The contact form includes:
- Client-side validation
- "Human verification" checkbox
- Animated success state
- Mobile-optimized inputs

**Note**: Form submission is currently simulated. You'll need to integrate with your backend API or email service.

## 🔧 To-Do

- [ ] Connect contact form to backend API
- [ ] Add language switcher in header
- [ ] Implement actual PageSpeed testing integration
- [ ] Add pricing calculator
- [ ] Set up analytics
- [ ] Add blog section
- [ ] Create admin panel for translations

## 📄 License

Proprietary - All rights reserved

## 🤝 Contributing

For internal use only. Contact the development team for access.

---

**Made with ⚡ for speed**
