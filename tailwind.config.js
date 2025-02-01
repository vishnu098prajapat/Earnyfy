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
          100: '#EBF5FF',
          200: '#90CDF4',
          500: '#3182CE',
          600: '#2B6CB0',
          900: '#2A4365',
        },
        secondary: {
          100: '#FFF5F5',
          500: '#F56565',
          900: '#742A2A',
        },
        background: {
          light: '#FFFFFF',
          dark: '#1A202C',
        },
        bronze: '#CD7F32',
        silver: '#C0C0C0',
        gold: '#FFD700',
      },
    },
  },
  plugins: [],
}
