import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: { 50: "#fcfcf9", 100: "#fffffd" },
        slate: { 900: "#13343b", 500: "#626c71" },
        teal: { 500: "#21808d", 600: "#1d7480", 700: "#1a6873" },
        brown: { 600: "#5e5240" }
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,.06)"
      },
      borderRadius: {
        xl: "14px"
      }
    },
  },
  plugins: [],
};
export default config;
