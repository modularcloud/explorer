module.exports = {
  content: [
    // app content
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-50": "#f9f9f9",
        "bg-100": "#f2f2f2",
        "main-50": "#eeeeee",
        "main-100": "#d9d9d9",
        "main-200": "#7c7c7c",
        "main-300": "#4a4949",
        "alt": "#a8a2a2",
        "success-50": "#eef9f5",
        "success-100": "#2DB993",
        "failure-50": "#e74d4d"
      },
    },
  },
  plugins: [],
};
