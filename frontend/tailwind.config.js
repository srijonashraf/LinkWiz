import flowbite from "flowbite/plugin"; // Use 'plugin' instead of directly 'flowbite'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}" // Add the path to Flowbite's content
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite],
};
