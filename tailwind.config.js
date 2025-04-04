import plugin from "tailwindcss/plugin";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".field-sizing-content": {
          "field-sizing": "content",
        },
      });
    }),
  ],
};
