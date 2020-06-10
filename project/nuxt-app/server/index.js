//搭建后台，调用自己的接口时使用，调用外部接口可以不用
const express = require('express')
const consola = require('consola')
const proxy = require('express-http-proxy')
const { Nuxt, Builder } = require('nuxt')

// const PROXY_URL = 'http://localhost:9000'; // 反向代理域名，测试
const PROXY_URL = 'http://elm-api.caibowen.net'; // 反向代理域名，生产

const app = express()
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;


app.set('port', port)

//nuxt.config.js 配置反向代理
app.use('/api')

//nuxt.config.js 没有配置反向代理
// app.use('/api', proxy(PROXY_URL));

async function start() {
  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(process.env.NODE_ENV === 'production')

  // Init Nuxt.js
  const nuxt = await new Nuxt(config)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Build only in dev mode
  if (config.dev) {
    try{   
      const builder = new Builder(nuxt)
      await builder.build()
    }catch{
      console.error(error) // eslint-disable-line no-console
      process.exit(1)
    }

  }

  // Listen the server
  app.listen(port,host)
  consola.ready({
    message: `Server listening on ${host} : http://localhost:${port}`,
    badge: true
  })
}
start()
