module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ahl-red": "#DB0032",
        "ahl-gray": {
          50: "#DDDDDD",
        },
        blue: {
          1000: "#5963b3",
        },
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  }
};
