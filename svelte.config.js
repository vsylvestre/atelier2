import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const IS_DEV = process.argv.includes('dev');
const BASE_PATH = IS_DEV ? '' : process.env.BASE_PATH || '';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: BASE_PATH
		}
	}
};
export default config;
