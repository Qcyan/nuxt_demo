const path = require('path');
const time = new Date().getTime();
const hash = require('hash-sum');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

//public webpack config
//$开头的为公共别名路径
module.exports = {
  build: {
    extent(config,ctx){
	    config.resolve ={
		    alias: {
			    '$config': resolve(`./config`),
			    '$components': resolve(`./components`),
			    '$scroll': resolve(`./components/bv-scroll/index`),
			    '$page-list': resolve(`./components/m-page-list/index`),
			    '$assets': resolve(`./assets`),
			    '$upload': resolve(`./components/vue-upload-component/upload`),
			    '$wechat': resolve(`./use-in-vue/wechat`),
			    '$use-in-vue': resolve(`./use-in-vue`),
			    '$use-in-vue-router': resolve(`./use-in-vue-router`),
			    '$axios': resolve(`./use-in-vue/axios`),
			    '$api': resolve(`./api`),
			    '$errcode': resolve(`./errcode`),
		    }
	    }
    }

  },
  css: {
    loaderOptions: {
      sass: {
        // data: `@import "@css/index.scss";`
      }
    }
  },
  pwa: {
    assetsVersion: hash(time)
  },
  filenameHashing: true
};