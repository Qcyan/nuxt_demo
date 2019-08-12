const publicVueConfig = require('../nuxt-config');
const utils = require('blue-utils');

function resolve(dir) {
	return path.join(__dirname, dir);
}

module.exports = utils.extend(publicVueConfig, {
		mode: 'universal',
		/*
		** Headers of the page
		*/
		head: {
			title: process.env.npm_package_name || '',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
			]
		},
		/*
		** Customize the progress-bar color
		*/
		loading: { color: '#fff' },
		/*
		** Global CSS
		*/
		css: [
		],
		/*
		** Plugins to load before mounting the App
		*/
		plugins: [
			{ src: '~/plugins/axios' }
		],
		/*
		** Nuxt.js dev-modules
		*/
		devModules: [
		],
		/*
		** Nuxt.js modules
		*/
		modules: [
		],
		/*
		** Build configuration
		*/
		build: {
			vendor: ['axios'],
			/*
			** You can extend webpack config here
			*/
			extend (config, ctx) {
				config.resolve = {
					alias:{
						//@开头的为项目的别名路径
						'@': resolve('src'),
						'@store': resolve('./store'),
						// '@config': resolve('./config'),
						'@assets': resolve('./assets'),
						// '@css': resolve('./assets/css'),
						'@components': resolve('./components')
					}
				}

			}
		}
	}
)

