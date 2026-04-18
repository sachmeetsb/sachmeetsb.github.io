/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: '#2D1B69',
          mid: '#4A2F9A',
        },
        saffron: {
          DEFAULT: '#FF5E0E',
          light: '#FF9058',
          core: '#FFAA70',
        },
        teal: {
          DEFAULT: '#00BFA5',
          deep: '#0B7A6E',
        },
        void: '#0F0A1E',
        surface: {
          dark: '#0F0A1E',
          mid: '#1E1535',
          light: '#FAFAFA',
        },
        text: {
          dark: '#1A1A2E',
          body: '#3D3B52',
          muted: '#6B6B8A',
        },
      },
      fontFamily: {
        'display': ['"Plus Jakarta Sans"', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'card': '45px',
        'pill': '999px',
      },
      maxWidth: {
        'container': '1440px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'pulse-slow': 'pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orb-float': 'orbFloat 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
