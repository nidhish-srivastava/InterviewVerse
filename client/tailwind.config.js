/** @type {import('tailwindcss').Config} */
export default {
    purge: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: '#ec4755',
          secondary: '#a12c34',
          tertiary: '#99a0a3',
          border: '#1a2e35',
          background: '#ffffff',
        },
        animation: {
          vote: 'vote 1s ease-in-out',
        },
        keyframes: {
          vote: {
            '0%, 100%': {
              transform: 'rotate(0deg)',
            },
            '25%': {
              transform: 'rotate(-30deg)',
            },
            '75%': {
              transform: 'rotate(30deg)',
            },
          },
        },
      },
    },
    variants: {},
    plugins: [],
}