// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your src folder structure
  ],
  theme: {
    extend: {
      animation: {
        fadeInOut: 'fadeInOut 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [
    // Add this for backdrop-filter support
    function ({ addUtilities }) {
      addUtilities({
        '.backdrop-blur-sm': { 'backdrop-filter': 'blur(4px)' },
        '.backdrop-blur-md': { 'backdrop-filter': 'blur(8px)' },
        '.backdrop-blur-lg': { 'backdrop-filter': 'blur(12px)' },
      });
    },
  ],
};