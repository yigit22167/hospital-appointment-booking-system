/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'main-blue': '#0EA5E9',
        'second-blue': '#188FC5',
        'main-green': '#15823D',
        'second-green': '#3CB067',
        'main-red': '#F05659',
        'second-red': '#ee3f43'
      }
  },
  plugins: [],
}
}
