/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      'sm': '480',

      'md': '640px',

      'lg': '1024px',

      'xl': '1280px',

    },
    extend: {
      colors: {
        "main": "#800000",
        "submain": "#E9BA46",

      }
    }
  },
  plugins: []
};