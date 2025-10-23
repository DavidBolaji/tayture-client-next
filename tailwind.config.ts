import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
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
  			blog_bg: 'rgb(248 248 248/1)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			parallax: 'url("/bg.webp")'
  		},
  		fontFamily: {
  			br: '`var(--font-br)`'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
