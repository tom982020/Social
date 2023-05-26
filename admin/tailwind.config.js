/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		screens: {
			mobile: '320px',
			tablet: '720px',
			desktop: '1080px',
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [],
};
