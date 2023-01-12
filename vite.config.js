import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	define: {
		"process.env": {},
		"process.platform": false
	},
	resolve: {
		alias: {
			emitter: 'emitter-component',
			Buffer: 'buffer/'
		}
	}
};

export default config;
