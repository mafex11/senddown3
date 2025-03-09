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
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
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