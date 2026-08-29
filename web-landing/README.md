# KeyCare Landing Page

A premium, production-ready landing page for KeyCare built with **Vite + React + TypeScript + Tailwind CSS**.

## ✨ Features

- 🌍 **Multi-language Support**: English, French, Arabic (with RTL)
- 🎨 **Premium Dark Theme**: Modern gradients and glassmorphism
- ⚡ **Optimized Performance**: Vite-powered, code-split, lazy-loaded
- 📱 **Fully Responsive**: Mobile-first design
- 🎬 **Smooth Animations**: Framer Motion powered
- 📝 **Beta Signup**: Formspree integration
- 🚀 **GitHub Pages Ready**: Automated deployment

## 🛠️ Local Development

### Prerequisites

- Node.js 18+ 
- npm 9+

### Setup

```bash
# Navigate to landing folder
cd keycare-landing

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your Formspree URL
# VITE_FORMSPREE_URL=https://formspree.io/f/YOUR_FORM_ID

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the landing page.

## 🔧 Configuration

### Formspree (Beta Signup)

1. Create a free account at [Formspree.io](https://formspree.io)
2. Create a new form and copy the form endpoint
3. Set `VITE_FORMSPREE_URL` in your `.env` file:
   ```
   VITE_FORMSPREE_URL=https://formspree.io/f/xyzabcde
   ```

### Assets

Replace the placeholder files in `/public/assets/`:

| File | Purpose | Specs |
|------|---------|-------|
| `logo.png` | Logo in navbar/footer | 512x512px, PNG with transparency |
| `og.png` | Social media preview | 1200x630px, PNG |
| `screens/screen1.png` | Screenshot 1 | Mobile aspect ratio |
| `screens/screen2.png` | Screenshot 2 | Mobile aspect ratio |
| `screens/screen3.png` | Screenshot 3 | Mobile aspect ratio |
| `screens/screen4.png` | Screenshot 4 | Mobile aspect ratio |

### APK Download

Place your APK at `/public/downloads/KeyCare-latest.apk` or update the download URL in `Hero.tsx`.

## 🌐 Translations

Translation files are in `/src/i18n/`:
- `en.json` - English
- `fr.json` - French  
- `ar.json` - Arabic (RTL)

To add a new language:
1. Create `xx.json` in `/src/i18n/`
2. Add the language code to the resources in `/src/i18n/i18n.ts`
3. Add the language option in `Navbar.tsx`

## 📦 Build

```bash
# Production build
npm run build

# Preview production build
npm run preview
```

The built files will be in `/dist/`.

## 🚀 Deployment

### GitHub Pages (Automated)

1. Push to `main` branch (changes in `keycare-landing/` folder)
2. GitHub Actions will automatically build and deploy
3. Set `VITE_FORMSPREE_URL` as a repository secret

### Manual Deployment

```bash
npm run build
# Upload contents of /dist/ to your hosting
```

### Base Path

The site is configured for GitHub Pages with base path `/keycare/`. 

To change:
1. Update `base` in `vite.config.ts`
2. Update `homepage` in `package.json`
3. Update OG image URL in `index.html`

## 📁 Project Structure

```
keycare-landing/
├── public/
│   ├── assets/
│   │   ├── logo.png
│   │   ├── og.png
│   │   └── screens/
│   └── downloads/
│       └── KeyCare-latest.apk
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   ├── Screenshots.tsx
│   │   ├── BetaSignup.tsx
│   │   ├── Team.tsx
│   │   ├── FAQ.tsx
│   │   └── Footer.tsx
│   ├── i18n/
│   │   ├── i18n.ts
│   │   ├── en.json
│   │   ├── fr.json
│   │   └── ar.json
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:
```js
colors: {
  primary: { 500: '#00E5C4' },  // Teal accent
  dark: { ... }                  // Background shades
}
```

### Fonts

- **Body**: Inter (Google Fonts)
- **Arabic**: Noto Sans Arabic (Google Fonts)

---

Built with ❤️ by the KeyCare Team
