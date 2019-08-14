
module.exports = {
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,maximun-scale=1.0, user-scalable=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: ['@/assets/css/index.scss'],
  plugins: [
    // '@/plugins/element-ui',
    '@/plugins/main',
    // {
    //   src: "~/plugins/axios",
    //   ssr: false
    // },
  ],
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  modules: [ '@nuxtjs/axios', '@nuxtjs/proxy' ], // 不需要加入@nuxtjs/proxy
  axios: {
    proxy: true,
    prefix: '/api', // baseURL
    credentials: true,
  },
  proxy: {
    '/': {
      // target: 'https://pc.lifest.dtb315.cn', // 代理地址
      target: 'http://127.0.0.1:8080', // 代理地址
      changeOrigin: true,
      // pathRewrite: {
      //   '^/api': ''
      // },
    },
  }

}



//
// export default {
//   mode: 'universal',
//   /*
//   ** Headers of the page
//   */
//   head: {
//     title: process.env.npm_package_name || '',
//     meta: [
//       { charset: 'utf-8' },
//       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
//       { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
//     ],
//     link: [
//       { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
//     ]
//   },
//   /*
//   ** Customize the progress-bar color
//   */
//   loading: { color: '#fff' },
//   /*
//   ** Global CSS
//   */
//   css: [
//   ],
//   /*
//   ** Plugins to load before mounting the App
//   */
//   plugins: [
//   ],
//   /*
//   ** Nuxt.js dev-modules
//   */
//   devModules: [
//   ],
//   /*
//   ** Nuxt.js modules
//   */
//   modules: [
//   ],
//   /*
//   ** Build configuration
//   */
//   build: {
//     /*
//     ** You can extend webpack config here
//     */
//     extend (config, ctx) {
//     }
//   }
// }
