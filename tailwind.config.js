/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          '100': '#FFF1E0',
          '300': '#FFD3A3',
          '500': '#FF9933',
          '700': '#E67E22',
          '900': '#D35400',
        },
        golden: {
          'DEFAULT': '#D4AF37',
          'light': '#F0E68C',
          'dark': '#B8860B',
        },
        ivory: '#FFFDF7',
      },
      fontFamily: {
        'devanagari': ['"Tiro Devanagari Hindi"', 'serif'],
        'sans': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}