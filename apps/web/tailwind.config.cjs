const config = require("tailwind-config/tailwind.config.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      ...config.theme.extend,
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1200px",
        },
      },
      spacing: {
        header: `4rem`,
        "header-tabs": `2.625rem`,
      },
      colors: {
        ...config.theme.extend.colors,
        foreground: {
          DEFAULT: "hsl(var(--color-foreground))",
        },
        neutral: {
          DEFAULT: "hsl(var(--color-neutral))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted))",
          100: "#F6F8FA",
          50: "#FCFDFD",
        },
        primary: "hsl(var(--color-primary))",
      },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        slideDownAndFade: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: "translateX(2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: "translateY(2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: "translateX(-2px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        slideUpFromBottom: {
          "0%": { top: "150%" },
          "60%": { top: "48%" },
          "100%": { top: "50%" },
        },
        slideUpFromLeft: {
          "0%": { left: "-100%", bottom: "-100%" },
          "60%": { left: "0", bottom: "0" },
          "100%": { left: "-1rem", bottom: "-1rem" },
        },
        slideUpFromRight: {
          "0%": { right: "-100%", bottom: "-100%" },
          "60%": { right: "0", bottom: "0" },
          "100%": { right: "-1rem", bottom: "-1rem" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up-from-bottom":
          "slideUpFromBottom 1200ms cubic-bezier(.39,.58,.57,1);",
        "slide-up-from-left":
          "slideUpFromLeft 1200ms cubic-bezier(.39,.58,.57,1);",
        "slide-up-from-right":
          "slideUpFromRight 1200ms cubic-bezier(.39,.58,.57,1);",
      },
      fontSize: {
        xxs: ["0.65625rem", "0.875rem"], // 10px, 14px
        xs: ["0.75rem", "1rem"], // 12px, 16px
        sm: ["0.875rem", "1.25rem"], // 14px, 20px
        base: ["1rem", "1.5rem"], // 16px, 24px
        lg: ["1.125rem", "1.75rem"], // 18px, 28px
        xl: ["1.5rem", "2rem"], // 24px, 32px
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
