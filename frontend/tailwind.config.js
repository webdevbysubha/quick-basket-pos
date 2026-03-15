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
        primary: {
          light: '#8882FF',
          DEFAULT: '#6C63FF',
          dark: '#5249E6',
        },
        secondary: {
          light: '#FF88A1',
          DEFAULT: '#FF6584',
          dark: '#E64D6B',
        },
        accent: {
          light: '#33D4B8',
          DEFAULT: '#00C9A7',
          dark: '#00A88A',
        },
        appbg: '#F4F6FB',
        card: '#FFFFFF',
        checkoutEnd: '#00A8E8'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s infinite ease-in-out',
        'scan-line': 'scanLine 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'toast-in': 'toastIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
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
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        scanLine: {
          '0%': { top: '-5%' },
          '50%': { top: '105%' },
          '100%': { top: '-5%' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
