/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#f56566',
        'secondary': '#6b645d',
        'saffron': '#f5c32b'
      }
    },
  },
  plugins: [],
}