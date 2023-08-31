/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        "buttonPurple": "#AD1FEA",
        "buttonPurpleHover": "#C75AF6",
        "buttonBlue": "#4661E6",
        "buttonBlueHover": "#7C91F9",
      },
      boxShadow: {
        "modalShadow": "0px 10px 40px -7px rgba(55, 63, 104, 0.35)",
      }
    },
  },
  plugins: [],
}

