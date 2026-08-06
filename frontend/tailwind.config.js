/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a0d14',
          card: '#121723',
          cardHover: '#182030',
          border: '#1e2638',
          borderLight: '#2a344a',
          text: '#f1f5f9',
          muted: '#94a3b8',
          accent: '#14b8a6', // Teal reserved for AI security layer
          accentHover: '#0d9488',
          accentLight: '#2dd4bf',
          accentGlow: 'rgba(20, 184, 166, 0.15)',
        },
        risk: {
          low: '#10b981',       // Emerald
          medium: '#f59e0b',    // Amber
          high: '#f97316',      // Orange
          critical: '#ef4444',  // Red
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.25)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.25)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.25)',
      }
    },
  },
  plugins: [],
}
