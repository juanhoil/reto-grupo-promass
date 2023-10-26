/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#0284c7",
        "primary-light": "#0ea5e9",
        "primary-dark": "#075985",
        "primary-super-light": "#afe3fa",
        background: "#fafafa",
        sidebar: "#e3e3e3",
        "sidebar-light": "#d6d6d6",
        "sidebar-dark": "#bdbdbd",
        "t-primary": "#636363",
        "t-secondary": "#b0b0b0",
      },
    },
  },
  plugins: [],
};
