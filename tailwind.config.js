/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js,ts}"],
  theme: {
    extend: {},
    colors: {
      cyan: `hsl(180, 66%, 49%)`,
      darkViolet: `hsl(257, 27%, 26%)`,
      red: `hsl(0, 87%, 67%)`,
      gray: {
        0.3: `hsla(0, 0%, 75%, 0.3)`,
        0: `hsl(0, 0%, 75%)`,
        100: `hsl(257, 7%, 63%)`,
        200: `hsl(255, 11%, 22%)`,
        300: `hsl(260, 8%, 14%)`,
      },
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      normal: "1.25rem",
      "2xl": "1.6rem",
      smallHeader: `1.8rem`,
      "3xl": "1.9rem",
      header: "2.6rem",
      "5xl": "3.052rem",
    },
    screens: {
      smallMobile: `320px`,
      desktop: `770px`,
      bigDesktop: `880px`,
    },
  },
  plugins: [],
};
