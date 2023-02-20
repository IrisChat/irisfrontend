import { sveltekit } from '@sveltejs/kit/vite';
import { version } from './package.json';
/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	define: {
		'process.env': {},
		'process.platform': false,
		__VERSION__: version
	},
	resolve: {
		alias: {
			emitter: 'emitter-component',
			Buffer: 'buffer/'
		}
	}
};

export default config;
