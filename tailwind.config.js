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
        calc: {
          dark: '#0a0d14',
          'dark-card': '#121722',
          'dark-surface': '#1b2234',
          'dark-btn': '#222b40',
          'dark-btn-hover': '#2d3852',
          'dark-accent': '#3b82f6',
          'dark-accent-hover': '#2563eb',
          'dark-op': '#f97316',
          'dark-op-hover': '#ea580c',
          'dark-sci': '#1e293b',
          'dark-sci-hover': '#334155',
          
          light: '#f1f5f9',
          'light-card': '#ffffff',
          'light-surface': '#f8fafc',
          'light-btn': '#f1f5f9',
          'light-btn-hover': '#e2e8f0',
          'light-accent': '#2563eb',
          'light-op': '#f97316',
          'light-sci': '#e2e8f0',
          'light-sci-hover': '#cbd5e1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glass-light': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'btn-dark': '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
        'btn-light': '0 2px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.35)',
        'glow-orange': '0 0 20px rgba(249, 115, 22, 0.35)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
