/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const content = [
	'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	// Path to the Tremor module
	'./node_modules/@tremor/**/*.{js,ts,jsx,tsx}'
];
export const theme = {
	container: {
		center: true,
		padding: '2rem',
		screens: {
			'2xl': '1400px'
		}
	},
	extend: {
		colors: {
			tremor: {
				brand: {
					faint: '#eff6ff', // blue-50
					muted: '#bfdbfe', // blue-200
					subtle: '#60a5fa', // blue-400
					DEFAULT: '#3b82f6', // blue-500
					emphasis: '#1d4ed8', // blue-700
					inverted: '#ffffff' // white
				},
				background: {
					muted: '#f9fafb', // gray-50
					subtle: '#f3f4f6', // gray-100
					DEFAULT: '#ffffff', // white
					emphasis: '#374151' // gray-700
				},
				border: {
					DEFAULT: '#e5e7eb' // gray-200
				},
				ring: {
					DEFAULT: '#e5e7eb' // gray-200
				},
				content: {
					subtle: '#9ca3af', // gray-400
					DEFAULT: '#6b7280', // gray-500
					emphasis: '#374151', // gray-700
					strong: '#111827', // gray-900
					inverted: '#ffffff' // white
				}
			},
			border: '#FFD700',
			input: '#bebeb9',
			ring: '#989894',
			error: '#f44336',
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			primary: {
				DEFAULT: '#FFB670',
				foreground: '#1C020C'
			},
			secondary: {
				DEFAULT: '#FF8300',
				foreground: '#1C020C'
			},
			destructive: {
				DEFAULT: '#ffd700',
				foreground: '#1C020C'
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
				DEFAULT: '#FFF9D9',
				foreground: '#1C020C'
			},
			selected: {
				DEFAULT: '#FA9D3A',
				foreground: '#1C020C'
			}
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		keyframes: {
			'accordion-down': {
				from: { height: 0 },
				to: { height: 'var(--radix-accordion-content-height)' }
			},
			'accordion-up': {
				from: { height: 'var(--radix-accordion-content-height)' },
				to: { height: 0 }
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out'
		}
	},
	boxShadow: {
		// light
		'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
		'tremor-card':
			'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
		'tremor-dropdown':
			'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
		// dark
		'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
		'dark-tremor-card':
			'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
		'dark-tremor-dropdown':
			'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
	},
	borderRadius: {
		'tremor-small': '0.375rem',
		'tremor-default': '0.5rem',
		'tremor-full': '9999px'
	},
	fontSize: {
		'tremor-label': ['0.75rem'],
		'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
		'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
		'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
		'text-3xl': ['30px', { lineHeight: '2.25rem' }]
	}
};
export const safelist = [
	{
		pattern:
			/^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		variants: ['hover', 'ui-selected']
	},
	{
		pattern:
			/^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		variants: ['hover', 'ui-selected']
	},
	{
		pattern:
			/^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		variants: ['hover', 'ui-selected']
	},
	{
		pattern:
			/^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
	},
	{
		pattern:
			/^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
	},
	{
		pattern:
			/^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/
	}
];
export const plugins = [
	require('tailwindcss-animate'),
	require('@headlessui/tailwindcss')
];
