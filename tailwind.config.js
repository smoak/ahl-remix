module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ahl-blue": {
          100: "#C8CEEA",
          400: "#6674C2",
          700: "#3D49A1",
          800: "#353F95",
          900: "#292E7F",
        },
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
        blue: {
          1000: "#5963b3",
        },
      },
      gridTemplateColumns: {
        "auto-fill": "repeat(auto-fill, minmax(300px, 1fr))",
      },
    },
  },
};
