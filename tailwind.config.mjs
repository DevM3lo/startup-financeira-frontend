/** @type {import('tailwindcss').Config} */
module.exports = { // ou export default se for .mjs
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cores personalizadas da KeepCoin
        keepBlue: {
          DEFAULT: '#0f2545', // Azul marinho profundo (baseado no escudo)
          light: '#1e3a66',
          dark: '#051020', // Para fundos muito escuros
        },
        coinGold: {
          DEFAULT: '#EAB308', // Amarelo Ouro (Yellow-500 do Tailwind é ótimo)
          hover: '#CA8A04',   // Um pouco mais escuro pro hover
        }
      },
    },
  },
  plugins: [],
};