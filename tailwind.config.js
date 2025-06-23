module.exports = {
    important: false,
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./src/app/**/*.{js,ts,jsx,tsx}",
      // add other paths as needed
    ],
    darkMode: 'class',
    theme: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['DM Sans', 'sans-serif'],
      },
      screens: {
        xs: '380px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        primary: '#333647',
        secondary: '#252734',
        tertiary: '#555a77',
        highlight: '#39BB9A',
        lowlight: '#1b6452',
        lowestlight: '#034a43',
        peach: '#F4876E',
        yellow: '#FFC12A',
        transparent: 'transparent',
        black: '#000',
        white: '#fff',
        gray: {
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },

    },
    plugins: [],
};
