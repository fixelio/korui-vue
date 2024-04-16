/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    ripple: theme => ({
      colors: theme('colors')
    }),
    extend: {
      
    },
  },
  plugins: [
    require('tailwindcss-elevation'),
    require('tailwindcss-ripple')()
  ],
}