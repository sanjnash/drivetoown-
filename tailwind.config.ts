import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0F2444',
        'navy-light': '#1A365D',
        red: {
          DEFAULT: '#DC2626',
          hover: '#B91C1C',
        },
        sky: {
          DEFAULT: '#EFF6FF',
          mid: '#DBEAFE',
        },
        text: '#1E293B',
        muted: '#64748B',
        border: '#E2E8F0',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(15,36,68,0.08)',
        'card-hover': '0 8px 40px rgba(15,36,68,0.16)',
        modal: '0 25px 50px rgba(0,0,0,0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'pulse-ring': 'pulseRing 2s ease-out infinite',
        'fill-bar': 'fillBar 1.5s ease forwards',
'road-dash': 'roadDash 1s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        fillBar: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--fill-width, 0%)' },
        },
        roadDash: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-64px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
