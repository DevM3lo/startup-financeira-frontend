/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        coinGold: '#EAB308',
        keepBlue: {
          light: '#3b82f6',
          DEFAULT: '#1e3a8a',
          dark: '#172554',
        },
        keepDark: '#020617',
      },
    },
  },
  plugins: [require("tailwindcss-animate")], 
}