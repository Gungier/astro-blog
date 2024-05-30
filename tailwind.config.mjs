/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ['"Lato", "sans-serif"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        teal: "rgb(34, 195, 188)",
      },
      backgroundImage: {
        "gradient-bg":
          "linear-gradient(0deg, rgba(34, 195, 188, 1) 0%, rgba(191, 45, 253, 0.583) 100%)",
        "gradient-header":
          "linear-gradient(0deg, rgba(27, 139, 134, 0.5) 0%, rgba(136, 28, 186, 0.3) 100%)",
      },
      backdropFilter: {
        none: "none",
        blur: 'blur(8px)',
      },
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive']
    }
  },
  plugins: [],
};
