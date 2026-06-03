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
      boxShadow: {
        'glow-saffron': '0 0 60px rgba(255,94,14,0.25)',
        'glow-saffron-lg': '0 0 120px rgba(255,94,14,0.35)',
        'glow-indigo': '0 0 80px rgba(74,47,154,0.4)',
        'card-dark': '0 24px 70px -24px rgba(0,0,0,0.65)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'pulse-slow': 'pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orb-float': 'orbFloat 6s ease-in-out infinite',
        'aurora': 'aurora 18s ease-in-out infinite',
        'border-beam': 'borderBeam 4s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
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
        aurora: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.6' },
          '50%': { transform: 'translate3d(3%, -4%, 0) scale(1.12)', opacity: '0.85' },
        },
        borderBeam: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
