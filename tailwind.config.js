/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}"],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "544px",
      md: "896px",
      lg: "1024px",
    },
    extend: {
      colors: {
        primary: {
          1: "#00FF00",
          2: "#00e500",
          3: "#00cc00",
          4: "#00b200",
          5: "#009900",
          6: "#007f00",
          7: "#006600",
          8: "#004c00",
          9: "#003300",
          10: "#001900",
          11: "#19FF19",
          12: "#33FF33",
          13: "#4DFF4D",
          14: "#66FF66",
          15: "#80FF80",
          16: "#99FF99",
        },
      },
      fontFamily: {
        inter: "inter, sans-serif, Arial",
      },
    },
  },
  plugins: [],
};
