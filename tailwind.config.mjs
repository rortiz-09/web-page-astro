import animations from 'tailwindcss-animated'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media', // System preference
  theme: {
    extend: {
      colors: {
        // Semantic Colors (High Contrast)
        background: 'var(--bg-primary)',
        surface: 'var(--bg-surface)',
        'text-main': 'var(--text-primary)',
        'text-muted': 'var(--text-secondary)',
        border: 'var(--border-color)',

        // Brand Colors (Direct Mapping)
        primary: {
          DEFAULT: '#F9423A', // Reitcom Red
          hover: '#D62F27',
          light: 'rgba(249, 66, 58, 0.1)', // Soft red for backgrounds
        },
        secondary: {
          DEFAULT: '#FFD700', // Reitcom Yellow
          hover: '#E6C200',
        },
      },
      fontFamily: {
        sans: ['Montserrat Variable', 'system-ui', 'sans-serif'],
        display: ['Montserrat Variable', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'glass': 'var(--glass-bg)',
        'gradient-subtle': 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-primary) 100%)',
      },
      boxShadow: {
        // iOS-style Soft Shadows
        'sm': '0 2px 8px -2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 16px -4px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 32px -8px rgba(0, 0, 0, 0.12)',
        'xl': '0 20px 48px -12px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(249, 66, 58, 0.3)',
        'glass': 'var(--glass-shadow)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      }
    },
  },
  plugins: [animations],
}