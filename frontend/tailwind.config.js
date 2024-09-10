/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          background: "#1D2A35", // Dark Gray
          text: "#f0f0f0", // Light text for dark mode
        },
      },
    },
  },
  plugins: [],
};
