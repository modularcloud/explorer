// @ts-check
const config = require("./tailwind.config.cjs");
module.exports = {
  plugins: {
    tailwindcss: {
      config,
    },
    autoprefixer: {},
  },
};
