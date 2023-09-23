// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("tailwind-config/tailwind.config.js");

module.exports = {
  plugins: {
    tailwindcss: { config },
    autoprefixer: {},
  },
};
