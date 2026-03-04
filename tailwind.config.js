/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mal: {
          bgStart: '#0D0D1A',
          bgEnd: '#1A0A2E',
          panel: '#12122A',
          textPrimary: '#F1F5F9',
          textSecondary: '#94A3B8'
        }
      }
    },
  },
  plugins: [],
}