
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},

				/*
				 * Ayusya retail brand system — sampled from the production print files.
				 * See Ayusya_Brand_Guidelines.md §3. Cream, caramel and bronze never
				 * change; only the per-SKU ingredient accent varies.
				 */
				cream: {
					DEFAULT: '#FFE7B8',
					50: '#FFFDF8',
					100: '#FFF7E8',
					200: '#FFEFD3',
					300: '#FFE7B8',
					400: '#F7D89A',
				},
				caramel: {
					DEFAULT: '#D19F75',
					light: '#E2BA96',
					dark: '#B8865C',
				},
				bronze: {
					DEFAULT: '#451B03',
					light: '#6B3410',
					metallic: '#AD8A61',
				},
				umber: {
					DEFAULT: '#594838',
					/*
					 * Darkened from #7A6650. That hex measured 4.52:1 on cream — nominally
					 * passing AA, but with no margin, so on the slightly deeper grounds it
					 * dropped under (the /products count line came in at 4.46:1). This is
					 * the lightest warm value that holds 5.29:1 on cream and still reads as
					 * a clear step down from umber for secondary copy.
					 */
					light: '#6E5C48',
				},

				/* Premium / corporate mode — business cards, B2B. Guidelines §8:
				 * never mix this with the cream/caramel retail system in one piece. */
				onyx: '#1A1919',
				gold: {
					light: '#FCC788',
					DEFAULT: '#C09A6B',
					deep: '#896E4F',
				},

				/* Per-SKU ingredient accents. Guidelines §3: every accent is pulled
				 * from the real colour of the ingredient, never an arbitrary brand hue. */
				sku: {
					moringa: '#4E732A',
					bittergourd: '#4C781C',
					amla: '#365611',
					carrot: '#E96A00',
					banana: '#E38C00',
					ginger: '#C8860D',
					beetroot: '#A00639',
					sweetpotato: '#B1143C',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: 'calc(var(--radius) + 4px)',
				'2xl': 'calc(var(--radius) + 12px)',
				'3xl': 'calc(var(--radius) + 20px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},

				/* Ambient story motion. Slow, warm, never attention-grabbing —
				 * these loop forever behind content, so they stay subtle. */
				'sun-rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'sun-pulse': {
					'0%, 100%': { opacity: '0.55' },
					'50%': { opacity: '1' }
				},
				'rise': {
					'0%': { transform: 'translateY(0) scale(0.9)', opacity: '0' },
					'25%': { opacity: '0.7' },
					'100%': { transform: 'translateY(-52px) scale(1.25)', opacity: '0' }
				},
				'sway': {
					'0%, 100%': { transform: 'rotate(-2.5deg)' },
					'50%': { transform: 'rotate(2.5deg)' }
				},
				'shimmer-band': {
					'0%': { transform: 'translateX(-120%)' },
					'100%': { transform: 'translateX(120%)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'fade-scale-in': 'fade-in 0.5s ease-out, scale-in 0.3s ease-out',
				'sun-rotate': 'sun-rotate 120s linear infinite',
				'sun-pulse': 'sun-pulse 6s ease-in-out infinite',
				'rise': 'rise 4.5s ease-out infinite',
				'sway': 'sway 7s ease-in-out infinite',
				'shimmer-band': 'shimmer-band 2.6s ease-in-out infinite',
			},
			fontFamily: {
				/* Guidelines §4: these four are the official typefaces, not an
				 * approximation — no original font files exist for the brand. */
				'display': ['"Baloo 2"', 'system-ui', 'sans-serif'],
				'sans': ['Poppins', 'system-ui', 'sans-serif'],
				'script': ['Pacifico', 'cursive'],
				'wordmark': ['Cinzel', 'Georgia', 'serif'],
				/* Retained so existing font-serif usage keeps resolving during migration. */
				'serif': ['Cinzel', 'Georgia', 'serif'],
			},
			backgroundImage: {
				'cream-warm': 'linear-gradient(180deg, #FFF7E8 0%, #FFE7B8 100%)',
				'caramel-band': 'linear-gradient(180deg, #E2BA96 0%, #D19F75 100%)',
				'gold-sheen': 'linear-gradient(135deg, #FCC788 0%, #C09A6B 50%, #896E4F 100%)',
				'sun-glow': 'radial-gradient(circle at 50% 0%, rgba(173,138,97,0.28), transparent 62%)',
			},
			boxShadow: {
				'warm': '0 4px 18px -4px rgba(69,27,3,0.14)',
				'warm-lg': '0 18px 44px -12px rgba(69,27,3,0.22)',
				'seal': '0 0 0 1px rgba(69,27,3,0.14), 0 2px 10px -2px rgba(69,27,3,0.18)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
