import animations from 'tailwindcss-animated'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'red-orange': {
					'50': '#fff2f1',
					'100': '#ffe1e0',
					'200': '#ffc9c7',
					'300': '#ffa4a0',
					'400': '#ff6f69',
					'500': '#f9423a',
					'600': '#e7241b',
					'700': '#c21a13',
					'800': '#a01a14',
					'900': '#851c17',
					'950': '#480a07',
				},
			},
		},
	},
	plugins: [animations],
}