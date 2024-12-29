import containerQuery from "@tailwindcss/container-queries";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto Slab", "sans-serif"],
        robotoArial: ["Roboto Slab", "Arial"],
      },
      colors: {
        lightBlueShift: ["rgb(63, 117, 168)"],
        darkBlueShift: ["rgb(28, 50, 91)"],
        grayOption: ["rgb(214, 214, 214)"],
        blackOption: ["rgb(40, 40, 40)"],
        darkGrayOption: ["rgb(30, 30, 30)"],
      },
      screens: {
        xs: "569px",
      },
      daisyui: {
        themes: ["light", "dark", "cupcake"],
      },
      darkMode: "class",
    },
  },

  plugins: [containerQuery, require("daisyui")],
};
