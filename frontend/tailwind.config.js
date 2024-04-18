/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'fuerte' : ['fuerte', 'sans-serif'],
      },
      colors: {
        emerald: '#059669',
        teal: '#6A5ACD'
      },
    },
  },
  plugins: [],
}