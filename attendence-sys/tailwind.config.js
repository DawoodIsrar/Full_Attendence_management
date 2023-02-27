/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      xs:'370px',
      sm: '520px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px',
          },
      extend:{
        colors: {
          "dark-purple": "#081A51",
          "light-white": "rgba(255,255,255,0.17)",
        },
      }
  },
  plugins: [
  ],
}
