import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const IS_DEV = process.argv.includes('dev');
const BASE_PATH = IS_DEV ? '' : process.env.BASE_PATH || '';

const getEntries = () => {
	const entries = ['/', '/1', '/2', '/3', '/4', '/5', '/6', '/7', '/8'];
	return BASE_PATH ? entries.map((entry) => `/${BASE_PATH}${entry}`) : entries;
};

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: BASE_PATH
		},
		prerender: {
			entries: getEntries()
		}
	}
};
export default config;
