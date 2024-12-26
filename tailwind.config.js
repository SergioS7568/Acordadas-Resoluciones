import containerQuery from "@tailwindcss/container-queries";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      screens: {
        xs: "569px",
      },
    },
  },

  plugins: [containerQuery, require("daisyui")],
};
