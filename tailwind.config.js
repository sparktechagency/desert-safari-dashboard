/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fb5a10",
        secondary: "#ffefe7",
      }
    },
  },
  plugins: [],
}

