/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#f7f3ee",
        ink: "#1f2937",
        clay: "#9a5b3d",
        cedar: "#4f3422",
        blush: "#d9785d",
        sage: "#7b8b6f",
        mist: "#e9dfd1",
      },
      boxShadow: {
        card: "0 12px 24px rgba(79, 52, 34, 0.08)",
      },
    },
  },
  plugins: [],
};
