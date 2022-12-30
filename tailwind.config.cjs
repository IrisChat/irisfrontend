/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Using modern `rgb`
				primary: 'rgb(var(--color-primary) / var(--tw-bg-opacity))',
				secondary: 'rgb(var(--color-secondary) / var(--tw-bg-opacity))',
				tertiary: 'rgb(var(--color-tertiary) / var(--tw-bg-opacity))',
				option: 'rgb(var(--color-option) / var(--tw-bg-opacity))',
				text: 'rgb(var(--color-text) / var(--tw-bg-opacity))',
			}
		}
	},
	plugins: []
};
