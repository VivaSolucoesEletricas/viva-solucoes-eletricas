/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "sans-serif"] },
      colors: {
        "viva-orange": "#F0401E",
        "viva-blue": "#0470AA",
      },
      backgroundImage: {
        "viva-gradient":
          "linear-gradient(106deg, rgba(166,32,6,1) 0%, rgba(240,64,30,1) 35%, rgba(255,137,102,1) 100%)",
      },
    },
  },
  plugins: [],
};
