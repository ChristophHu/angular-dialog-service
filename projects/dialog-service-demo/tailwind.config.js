/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,css,scss,sass,less,styl}',
    './projects/**/*.{html,ts,css,scss,sass,less,styl}'
  ],
  theme: {
    extend: {
      width: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}