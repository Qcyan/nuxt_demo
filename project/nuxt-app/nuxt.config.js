module.exports = {
  mode: 'spa',
  head: {
    title: '香飘飘',
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
    // html head 中创建 script 标签
    script: [
      { src: 'https://easytuan.gitee.io/node-elm-api/public/flexible.js' },
      // { innerHTML: require('./assets/js/flexible_nuxt'), type: 'text/javascript', charset: 'utf-8'}
      // { innerHTML: 'console.log("hello")', type: 'text/javascript', charset: 'utf-8'}
    ],
    // 不对<script>标签中内容做转义处理
    //__dangerouslyDisableSanitizers: ['script']
  },
  // Global CSS
  css: [
    {src:'~/assets/css/main/base.scss',lang:'scss'}
    ],

  loading: { color: '#3B8070' },

  cache: true,

  modules: [
    '@nuxtjs/axios',
     '@nuxtjs/proxy',
    '@nuxtjs/style-resources'  //解决sass变量不能再页面中直接使用
  ],
  styleResources: {
    scss: '~/assets/css/main/base.scss'
  },
//  axios:{
//    prefix:'https://pc.lifest.dtb315.cn',
//    proxy:true
//  },
  proxy: [
    [
      '/api',{
        // target: 'http://localhost:9000',
        target: 'https://pc.lifest.dtb315.cn',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api' : ''
        // }
      }
    ]
  ],
  env: {
    ENV: process.env.ENV
  },
  build: {
    vendor: ['axios', 'mint-ui', 'js-cookie'], //防止重复打包
    postcss: [
//      require('postcss-px2rem')({
//        remUnit: 75
//      })
    ],
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
//    { src: '~/plugins/axios', ssr: false },
    { src: '~/axios/index', ssr: false },
    { src: '~/mock/index.js', ssr: false }
  ],
}

