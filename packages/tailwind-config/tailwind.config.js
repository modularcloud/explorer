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
      backgroundImage: () => ({
        "gradient-primary":
          "linear-gradient(90deg, rgba(74,112,254,1) 0%, rgba(177,96,254,1) 100%)",
        "gradient-accent":
          "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(74,112,254,1) 30%, rgba(177,96,254,1) 70%, rgba(255,255,255,0.2) 100%)",
        "gradient-secondary":
          "linear-gradient(267.41deg, #50B5FF 38.68%, #985EFE 63.16%)",
      }),
      boxShadow: {
        "input-shadow":
          "0px 0px 6px rgba(74, 112, 254, 0.2), 0px 0px 2px rgba(42, 43, 46, 0.04)",
      },
      colors: {
        "bg-50": "#f9f9f9",
        "bg-100": "#f2f2f2",
        "main-50": "#eeeeee",
        "main-100": "#d9d9d9",
        "main-200": "#7c7c7c",
        "main-300": "#4a4949",
        alt: "#a8a2a2",
        "success-50": "#eef9f5",
        "success-100": "#2DB993",
        "failure-50": "#e74d4d",

        // added colors
        primary: {
          30: "#4A70FE4D",
          100: "#4A70FE",
        },
        secondary: "#B160FE",
        gray: {
          10: "#2A2B2E1A",
          50: "#2A2B2E29",
          100: "#2A2B2E0D",
        },
        black: {
          30: "#1D1A27",
          50: "#14121C",
          100: "#080615",
        },
        "input-border": "#2A2B2E1A",
      },
    },
  },
  plugins: [],
};
