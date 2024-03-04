import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: '#FF7517',
        tag: 'rgba(255, 117, 23, 0.08)',
        tag_border: 'rgba(255, 117, 23, 0.08)',
        card_border: 'rgba(35, 35, 35, 0.20)',
        orange_light: '#FFA466',
        orange_school: 'rgba(255, 117, 23, 0.20)',
        upload: 'rgba(255, 117, 23, 0.08)',
        orange_dark: '#993E00',
        success: '#8CC63F',
        success_light: '#B8DC89',
        success_dark: '#527623',
        error: '#B3261E',
        process: '#FFCC00',
        ash_200: '#FAF9F9',
        ash_400: '#70645C',
        ash_600: '#E9E8E8',
        black: '#000000',
        black_200: '#232323',
        black_400: '#050505',
        success2: '#34C759',
      },
      backgroundImage: {
        parallax: 'url("/bg.webp")',
      },
      fontFamily: {
        br: `var(--font-br)`,
      },
    },
  },
  plugins: [],
}
export default config
