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
        darkBg: '#0B1220',
        darkCard: '#131B2F',
        cyanPrimary: '#00D4FF',
        successGreen: '#00E676',
        warningYellow: '#FFC107',
        dangerRed: '#FF5252',
        brand: {
          dark: '#0B1220',
          card: '#131B2F',
          cardHover: '#1A253E',
          border: '#1E293B',
          borderLight: '#334155',
          text: '#F8FAFC',
          muted: '#94A3B8',
          accent: '#00D4FF',
          accentHover: '#00B8E6',
          accentLight: '#38BDF8',
          accentGlow: 'rgba(0, 212, 255, 0.2)',
        },
        risk: {
          low: '#00E676',       // Success Green
          medium: '#FFC107',    // Amber
          high: '#FF9100',      // Orange
          critical: '#FF5252',  // Red
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 212, 255, 0.3)',
        'glow-cyan-lg': '0 0 35px rgba(0, 212, 255, 0.45)',
        'glow-green': '0 0 25px rgba(0, 230, 118, 0.3)',
        'glow-amber': '0 0 25px rgba(255, 193, 7, 0.3)',
        'glow-red': '0 0 25px rgba(255, 82, 82, 0.3)',
        'soft-card': '0 10px 30px -5px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
