/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex:{
        fluid:"max(400px,(100% - 3rem) / 2)"
      },
      gridTemplateColumns:{
        fluid:"max(20%,100px) auto"
      },
      colors:{
        "bg-color":"#ececec",
        "primary":"#007cb9",
        "darkBlue":"#070f4e",
        "dark":"#222831",
        "coldBlue":"#e3f6f5",
        "pinkColor":"#f76b8a",
        "orangeColor":"#ff9a3c",
        "purpleColor":"#7c73e6",
        "trackColor":"#d5def5",
        "deleteColor":"#dc2f2f"
      }
    },
  },
  plugins: [require("daisyui")],
}

