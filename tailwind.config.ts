import plugin from "tailwindcss/plugin";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [plugin(() => {})],
}
