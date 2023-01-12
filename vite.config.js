import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	define: {
		'process.env': {}
	},
	resolve: {
		alias: {
			Buffer: 'buffer/'
		}
	},
};

export default config;
