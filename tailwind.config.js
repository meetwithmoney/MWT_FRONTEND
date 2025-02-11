/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white": "#FFFFFF",
        "green": "#3DBF69",
        "red": "#F54B3C",
        "red-500":"red",
        "black": "#000000",
        "blue":"#007AFF",
        "black-100": "#151313",
        "light-gray-100": "#FAF5F5",
        "light-gray-200": "#F6F9FF",
        "light-gray-300": "#E9E9F2",
        "light-gray-400": "#C2C9CB",
        "light-gray-500":"#949494",
        "gray-200": "#7F7F89",
        "gray-300": "#5B5D5D",
        "gray-400": "#D9D9D9",
        "gray-500": "#969696",
        "gray-600":"#434343",
        "primary": "#007AFF",
      },
      backgroundImage: {
        'gradient-text': 'linear-gradient(90deg, #E8A8C8 0%, #8DC8E7 100%)', // Define the combined gradient here
      },
      boxShadow: {
        buttonShadow: "0px 16px 34px 0px #0000001A,0px 63px 63px 0px #00000017,0px 141px 85px 0px #0000000D,0px 251px 100px 0px #00000003,0px 391px 110px 0px #00000000",
        profileFormShadow:"0px 4px 4px 0px #FFFFFF40"
      },
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
      },

    },
  },
  plugins: [],
}