module.exports = {
  mode: 'spa',
  head: {
    title: '饿了么ccc',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication-tap-highlight', content: 'no' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
    ],
    link: [
      { rel: 'SHORTCUT ICON', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://easytuan.gitee.io/node-elm-api/public/flexible.js' },
    ],
  },

  loading: { color: '#3B8070' },

  cache: true,

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: [
    [
      '/api',{
      // target: 'http://localhost:9000',
      target: 'https://elm-api.caibowen.net',
      // target: 'https://pc.lifest.dtb315.cn',
      changeOrigin: true,
      pathRewrite: { 
        '^/api' : '/' 
      }
    }
    ]
  ],

  build: {
    vendor: ['axios', 'mint-ui', 'js-cookie'], //防止重复打包
    extend (config, { isDev, isClient }) { 
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },

  plugins: [
    { src: '~plugins/mint-ui' },
    { src: '~/axios/index.js', ssr: false }

  ],
}

