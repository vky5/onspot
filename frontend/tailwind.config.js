/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
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
        slate: '#6A5ACD',
        bgBlog: '#A4D5D2'
      },
    },
  },
  plugins: [],
});