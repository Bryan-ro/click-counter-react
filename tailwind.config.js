/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        "arial": ["Arial", "sans-serif"],
        "nunito": ['Nunito', "sans-serif"]
      },
      colors: {
        "primary": "#717FFF"
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "fade-in": "fade-in .5s"
      }
    },
  },
  plugins: [],
};

