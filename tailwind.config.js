/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: { lightblue: "#ADD8E6" },
      width: { "form-btn": "calc(100% - 128px)" },
    },
  },
  plugins: [],
};
