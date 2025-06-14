module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ahl-red": {
          50: "#DB0032",
          100: "#DD3333",
          700: "#DB1E36",
          800: "#CE1430",
          900: "#C00023",
        },
        "ahl-gray": {
          50: "#DDDDDD",
        },
        "ahl-blue": {
          50: "#f3f5fb",
          100: "#e5e8f4",
          200: "#d0d7ed",
          300: "#b0bde0",
          400: "#8b9bcf",
          500: "#6f7dc2",
          600: "#5963b3",
          700: "#5156a4",
          800: "#464887",
          900: "#3c3e6c",
          950: "#282943",
        },
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
};
