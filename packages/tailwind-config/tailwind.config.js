const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    // app content
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}",
    // include packages if not transpiling
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        header: "4.25rem",
      },
      top: {
        header: "4.25rem",
      },
      backdropBlur: {
        xs: "3px",
      },
      screens: {
        xs: "375px",
        lp: "1150px",
        md: "600px",
        xl: "1440px",
        "2xl": "1726px",
      },
      fontSize: {
        sleek: [
          "0.8125rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "457",
          },
        ],
      },
      fontWeight: {
        semibold: "556",
        bold: "656",
      },
      fontFamily: {
        logo: ["logo", ...fontFamily.sans],
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      backgroundImage: () => ({
        "gradient-primary":
          "linear-gradient(90deg, rgba(74,112,254,1) 0%, rgba(177,96,254,1) 100%)",
        "gradient-accent":
          "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(74,112,254,1) 30%, rgba(177,96,254,1) 70%, rgba(255,255,255,0.2) 100%)",
        "gradient-secondary":
          "linear-gradient(267.41deg, #50B5FF 38.68%, #985EFE 63.16%)",
        "gradient-blend":
          "linear-gradient(90deg, rgba(246, 247, 249, 0.12) 0%, rgba(255, 255, 255, 0.6) 51.04%, rgba(246, 247, 249, 0.12) 100%)",
      }),
      borderColor: () => ({
        "gradient-primary":
          "linear-gradient(90deg, rgba(74,112,254,1) 0%, rgba(177,96,254,1) 100%)",
      }),
      boxShadow: {
        "ocean-shadow": "0px 0px 10px rgba(74, 112, 254, 0.3)",
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
          100: "#E6E6E8",
        },
        "mid-dark": {
          DEFAULT: "#2A2B2E",
          900: "#3F4043",
          800: "#555558",
          700: "#6A6B6D",
          600: "#7F8082",
          500: "#949596",
          400: "#AAAAAB",
          300: "#BFBFC0",
          200: "#D4D5D5",
          100: "#EAEAEA",
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
          100: "#F3F3F4",
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
          100: "#F7F7F8",
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
          100: "#EDF1FF",
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
          100: "#F7EFFF",
        },
        specialty: {
          gray: "#F6F7F9",
          green: "#0DAA76",
          red: "#EF4444",
        },
        translucent: {
          DEFAULT: "rgba(255, 255, 255, 0.88)",
        },
      },
      keyframes: {
        "right-to-left": {
          "0%": { right: "-50%", opacity: 0.5 },
          "100%": { right: 0, opacity: 1 },
        },
        "fade-in": {
          "0%": { opacity: 0.4 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        rtl: "right-to-left 0.6s ease-in-out",
        fadeIn: "fade-in 0.4s ease-in-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-radix")(),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
