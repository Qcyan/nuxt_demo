import Vue from 'vue'
import request from './request';

var MyPlugin= {
  install(Vue){
    Vue.prototype.$request = {
      get:(url,params)=>{
        return request({
          url: url,
          method: 'GET',
          data: params,
        })
      },
      post:(url,params)=>{
        return request({
          url: url,
          method: 'POST',
          data: params,
        })
      }
    }

  }
}
Vue.use(MyPlugin);

