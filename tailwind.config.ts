import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
        poltawski: ['Poltawski Nowy', ...defaultTheme.fontFamily.serif],
        saoldisplay: ['Saol Display', ...defaultTheme.fontFamily.serif],
        montglades: ['Mont Glades', ...defaultTheme.fontFamily.serif],
        firacode: ['Fira Code', ...defaultTheme.fontFamily.mono],
        spacegrotesk: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#fdfdfd',
          100: '#f6f6f6',
          200: '#eeeeee',
          300: '#dddddd',
          400: '#bfbfbf',
          500: '#808080',
          600: '#414141',
          700: '#222222',
          800: '#121212',
          900: '#020202',
          950: '#000000',
        },
      },
      keyframes: {
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  colors: {
    primary: {
      50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
      100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
      200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
      300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
      400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
      500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
      600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
      700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
      800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
      900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
      950: 'rgb(var(--tw-color-primary-950) / <alpha-value>)',
    },
    dark: '#222222',
    muted: '#8E8E8E',
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config
