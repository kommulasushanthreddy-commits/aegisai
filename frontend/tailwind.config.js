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
        darkBg: '#09090B',
        darkCard: '#111827',
        primaryCyan: '#00D4FF',
        secondaryIndigo: '#6366F1',
        successGreen: '#22C55E',
        warningYellow: '#FACC15',
        dangerRed: '#EF4444',
        textLight: '#F9FAFB',
        brand: {
          dark: '#09090B',
          card: '#111827',
          cardHover: '#1F2937',
          border: 'rgba(255, 255, 255, 0.08)',
          text: '#F9FAFB',
          muted: '#9CA3AF',
          accent: '#00D4FF',
          accentHover: '#00B8E6',
        },
        risk: {
          low: '#22C55E',       // Success Green
          medium: '#FACC15',    // Warning Yellow
          high: '#F97316',      // Orange
          critical: '#EF4444',  // Danger Red
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        // Toned down by 30% for ultra-premium readability
        'glow-cyan': '0 0 15px rgba(0, 212, 255, 0.15)',
        'glow-cyan-lg': '0 0 25px rgba(0, 212, 255, 0.22)',
        'glow-indigo': '0 0 15px rgba(99, 102, 241, 0.15)',
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.15)',
        'glow-yellow': '0 0 15px rgba(250, 204, 21, 0.15)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.15)',
        'glass': '0 10px 30px 0 rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
