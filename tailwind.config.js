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
        lightCyanShift: ["rgb(229, 246, 253)"],
        darkCyanShift: ["rgb(183, 229, 249)"],
        lightBlueShift: ["rgb(63, 117, 168)"],
        darkBlueShift: ["rgb(28, 50, 91)"],
        lightGreenShift: ["rgb(212, 237, 218)"],
        darkGreenShift: ["rgb(58, 94, 58)"],
        grayOption: ["rgb(214, 214, 214)"],
        lightgrayOption: ["rgb(158, 158, 158)"],
        darkgrayOption: ["rgb(145, 145, 145)"],
        blackDarkgrayoption: ["rgb(114, 114, 114)"],
        darkBlackOption: ["rgb(54, 54, 54)"],
        blackgrayOption: ["rgb(45, 45, 45)"],
        blackOption: ["rgb(40, 40, 40)"],
        darkGrayOption: ["rgb(30, 30, 30)"],
      },
      screens: {
        xs: "569px",
      },
      minHeight: {
        height8: "80vh",
        height9: "90vh",

        rem87: "87rem",
      },

      maxWidth: {
        Width8: "80vh",
        Width9: "90vh",
        screen1200: "1200px",
      },
      daisyui: {
        themes: ["light", "dark", "cupcake"],
      },
      darkMode: "class",
    },
  },

  plugins: [containerQuery, require("daisyui")],
};
