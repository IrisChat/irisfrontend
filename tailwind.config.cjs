/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Using modern `rgb`
				NORD0: 'rgb(var(--NORD0) / var(--tw-bg-opacity))',
				NORD1: 'rgb(var(--NORD1) / var(--tw-bg-opacity))',
				NORD2: 'rgb(var(--NORD2) / var(--tw-bg-opacity))',
				NORD3: 'rgb(var(--NORD3) / var(--tw-bg-opacity))',
				NORD4: 'rgb(var(--NORD4) / var(--tw-bg-opacity))',
				NORD5: 'rgb(var(--NORD5) / var(--tw-bg-opacity))',
				NORD6: 'rgb(var(--NORD6) / var(--tw-bg-opacity))',
				NORD7: 'rgb(var(--NORD7) / var(--tw-bg-opacity))',
				NORD8: 'rgb(var(--NORD8) / var(--tw-bg-opacity))',
				NORDFROST0: 'rgb(var(--NORDFROST0) / var(--tw-bg-opacity))',
				NORDFROST1: 'rgb(var(--NORDFROST1) / var(--tw-bg-opacity))',
				NORDEXTRA0: 'rgb(var(--NORDEXTRA0) / var(--tw-bg-opacity))'
			}
		}
	},
	plugins: []
};
