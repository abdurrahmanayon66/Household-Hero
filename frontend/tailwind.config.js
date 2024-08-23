/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customNeutral: '#b5c6e8',
        darkOrange: '#f9841a',
        mediumOrange: '#ffa300',
        lightOrange: '#fec619',
        mediumBlue: '#004da9',
        darkBlue: '#13213c',
      },
      keyframes: {
        customPulse: {
          '0%, 100%': { backgroundColor: '#e0e0e0' },
          '50%': { backgroundColor: '#c0c0c0' },
        },
      },
      animation: {
        customPulse: 'customPulse 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        light: {
          'primary': '#bd93f9',
          'secondary': '#ff79c6',
          'accent': '#50fa7b',
          'neutral': '#44475a',
          'base-100': '#282a36',
          'info': '#8be9fd',
          'success': '#50fa7b',
          'warning': '#ffb86c',
          'error': '#ff5555',
          'foreground': '#f8f8f2',
          'comment': '#6272a4',
        },
      },
      // Other themes can be added here
    ],
  },
}
