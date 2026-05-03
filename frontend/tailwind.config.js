/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5eb',
          100: '#FFEDCE', // from image
          200: '#ffdbb6',
          300: '#FFC193', // from image
          400: '#ff9d8b',
          500: '#FF8383', // from image
          600: '#ff5c5c',
          700: '#FF3737', // from image
          800: '#d92626',
          900: '#b01c1c',
        }
      }
    },
  },
  plugins: [],
}
