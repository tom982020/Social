/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextTranslate = require('next-translate');
const nextConfig = {
	experimental: {
		appDir: true,
	},
  reactStrictMode: false,
  i18n: {
    locales: ['en', 'fr', 'nl'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig