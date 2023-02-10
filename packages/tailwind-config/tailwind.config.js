const { fontFamily } = require('tailwindcss/defaultTheme')

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
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      colors: {
        night: {
          DEFAULT: "#080615",
          900: "#211F2C",
          800: "#393844",
          700: "#52515B",
          600: "#6B6A73",
          500: "#83828A",
          400: "#9C9BA1",
          300: "#B5B4B9",
          200: "#CECDD0",
          100: "#E6E6E8"
        },
        'mid-dark': {
          DEFAULT: "#2A2B2E",
          900: "#3F4043",
          800: "#555558",
          700: "#6A6B6D",
          600: "#7F8082",
          500: "#949596",
          400: "#AAAAAB",
          300: "#BFBFC0",
          200: "#D4D5D5",
          100: "#EAEAEA"
        },
        slate: {
          DEFAULT: "#888A90",
          900: "#94969B",
          800: "#A0A1A6",
          700: "#ACADB1",
          600: "#B8B9BC",
          500: "#C3C5C7",
          400: "#CFD0D3",
          300: "#DBDCDE",
          200: "#E7E8E9",
          100: "#F3F3F4"
        },
        gray: {
          DEFAULT: "#AEB0B7",
          900: "#B6B8BE",
          800: "#BEC0C5",
          700: "#C6C8CD",
          600: "#CED0D4",
          500: "#D7D7DB",
          400: "#DFDFE2",
          300: "#E7E7E9",
          200: "#EFEFF1",
          100: "#F7F7F8"
        },
        ocean: {
          DEFAULT: "#4A70FE",
          900: "#5C7EFE",
          800: "#6E8DFE",
          700: "#809BFE",
          600: "#92A9FE",
          500: "#A4B7FF",
          400: "#B7C6FF",
          300: "#C9D4FF",
          200: "#DBE2FF",
          100: "#EDF1FF"
        },
        royal: {
          DEFAULT: "#B160FE",
          900: "#B970FE",
          800: "#C180FE",
          700: "#C890FE",
          600: "#D0A0FE",
          500: "#D8AFFF",
          400: "#E0BFFF",
          300: "#E8CFFF",
          200: "#EFDFFF",
          100: "#F7EFFF"
        }
      },
    },
  },
  plugins: [],
};
