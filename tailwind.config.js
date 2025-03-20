const multipleOfFours = (until = 1600) => {
	const fours = {};
	for (let i = 4; i <= until; i += 4) {
		const value = i.toFixed(1);
		fours[i] = `${value}px`;
	}
	return fours;
};

/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	plugins: [],
	future: {
		hoverOnlyWhenSupported: true
	},
	content: {
		files: ['src/**/*.svelte']
	},
	theme: {
		screens: {
			min: '360px',
			bp: '800px',
			max: '1600px'
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			red: '#ff0000'
		},
		fill: ({ theme }) => theme('colors'),
		spacing: () => ({
			0: '0',
			1: '1px',
			2: '2px',
			6: '6px',
			...multipleOfFours(),
			'1/2': '50%',
			'1/3': 'calc(100% / 3 * 1)',
			'2/3': 'calc(100% / 3 * 2)',
			'1/4': '25%',
			'3/4': '75%',
			'1/5': '20%',
			'2/5': '40%',
			'3/10': '30%',
			'7/10': '70%',
			'9/10': '90%',
			'3/20': '15%',
			'11/20': '55%',
			full: '100%',
			min: 'min-content',
			max: 'max-content',
			fit: 'fit-content'
		}),
		width: ({ theme }) => ({
			none: 'none',
			auto: 'auto',
			screen: '100vw',
			...theme('spacing')
		}),
		maxWidth: ({ theme }) => theme('width'),
		minWidth: ({ theme }) => theme('width'),
		height: ({ theme }) => ({
			none: 'none',
			auto: 'auto',
			screen: '100vh',
			lvh: '100lvh',
			svh: '100svh',
			dvh: '100dvh',
			...theme('spacing')
		}),
		maxHeight: ({ theme }) => theme('height'),
		minHeight: ({ theme }) => theme('height'),
		size: ({ theme }) => ({
			none: 'none',
			auto: 'auto',
			...theme('spacing')
		}),
		gap: ({ theme }) => ({
			auto: 'auto',
			...theme('spacing')
		}),
		fontFamily: {
			base: ['arial', 'sans-serif']
		},
		fontSize: {
			8: '8px',
			10: '10px',
			12: '12px',
			14: '14px',
			20: '20px',
			18: '18px',
			26: '26px',
			32: '32px',
			36: '36px',
			40: '40px',
			48: '48px',
			64: '64px',
			80: '80px',
			120: '120px',
			148: '148px',
			200: '200px'
		},
		lineHeight: {
			90: '0.9',
			95: '0.95',
			96: '0.96',
			100: '1',
			110: '1.1',
			115: '1.15',
			120: '1.2',
			130: '1.3',
			140: '1.4',
			150: '1.5'
		},
		borderWidth: {
			0: '0',
			1: '1px',
			2: '2px',
			4: '4px',
			6: '6px',
			8: '8px'
		},
		borderRadius: {
			0: '0',
			...multipleOfFours(),
			full: '9999px'
		}
	}
};
