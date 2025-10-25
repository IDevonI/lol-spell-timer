/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        leagueNavy: '#0a1020',
        leaguePanel: '#1c2541',
        leagueGold: '#c8aa6e',
        leagueBlunt: '#aaa',
      },
    },
  },
  plugins: [],
};