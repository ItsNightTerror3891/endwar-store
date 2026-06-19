import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        end: {
          50: '#f0e6ff', 100: '#d4b3ff', 200: '#b880ff', 300: '#9c4dff',
          400: '#801aff', 500: '#6b00e6', 600: '#5400b3', 700: '#3d0080',
          800: '#26004d', 900: '#0f001a', 950: '#08000d',
        },
        obsidian: {
          50: '#f2f2f3', 100: '#d6d6d9', 200: '#bababf', 300: '#9e9ea6',
          400: '#82828c', 500: '#666673', 600: '#525259', 700: '#3d3d40',
          800: '#292926', 900: '#14140d',
        },
      },
      fontFamily: {
        minecraft: ['var(--font-minecraft)', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        glow: { '0%, 100%': { boxShadow: '0 0 5px #9c4dff' }, '50%': { boxShadow: '0 0 20px #9c4dff, 0 0 40px #6b00e6' } },
        portal: { '0%': { transform: 'rotate(0deg) scale(1)' }, '50%': { transform: 'rotate(180deg) scale(1.1)' }, '100%': { transform: 'rotate(360deg) scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
        portal: 'portal 8s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
