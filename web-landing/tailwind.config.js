/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00E5C4', // This is your main Brand Color
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        dark: {
          100: '#d1d5db',
          200: '#9ca3af',
          300: '#6b7280',
          400: '#374151', // Borders
          500: '#1f2937', // Cards
          600: '#1a1a1a', // Section Backgrounds
          700: '#161616', // Footer
          800: '#111111', // Darker Elements
          900: '#0a0a0a', // Main Background
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Or 'Tajawal' for Arabic support
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
    },
  },
  plugins: [],
}