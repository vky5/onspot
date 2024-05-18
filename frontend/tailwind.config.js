/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#02816C',
        secondary: '#6DADA2',
        priDark: '#050301',
        secDark:  '#424242'
      }
    },
  },
  plugins: [],
});