/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#fafaf9',
          dark: '#0c0c0c',
          muted: '#f0efed',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          muted: '#525252',
          faint: '#a3a3a3',
        },
        accent: {
          DEFAULT: '#1a1a1a',
          light: '#f0efed',
          dark: '#0c0c0c',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      lineHeight: {
        display: '1.1',
      },
      maxWidth: {
        content: '65ch',
      },
      zIndex: {
        cursor: '50',
        nav: '40',
        loading: '60',
      },
    },
  },
  plugins: [],
}
