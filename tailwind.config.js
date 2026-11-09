/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Oswald', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#0c0a09',       // stone-950
          surface: '#1c1917',  // stone-900
          border: '#292524',   // stone-800
          cream: '#ffedd5',    // orange-100
          parchment: '#fff7ed',// orange-50
          accent: '#c2410c',   // orange-700
          accentHover: '#ea580c', // orange-600
        },
      },
    },
  },
  plugins: [],
};
