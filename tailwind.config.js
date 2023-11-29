/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#B10F2E',
        'secondary': '#0A0903',
        'utOrange': '#FF8200'
      }
    },
  },
  plugins: [],
}