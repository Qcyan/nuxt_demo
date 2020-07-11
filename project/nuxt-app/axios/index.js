//import Vue from 'vue'
//import request from './request';
//
//var MyPlugin= {
//  install(Vue){
//    Vue.prototype.$request = {
//      get:(url,params)=>{
//        return request({
//          url: url,
//          method: 'GET',
//          data: params,
//        })
//      },
//      post:(url,params)=>{
//        return request({
//          url: url,
//          method: 'POST',
//          data: params,
//        })
//      }
//    }
//
//  }
//}
//Vue.use(MyPlugin);

import Vue from 'vue'
import axios from 'axios';
import config from '~/config';
import errcodes from '~/axios/errcodes.js';    //错误码
import { errCodeHandler } from '~/axios/errhandle.js';   //错误码处理
import { $loading, $closeLoading } from '~/plugins/mint-ui.js';
//import { Toast } from 'mint-ui';

let baseURL;
if(process.server){
  baseURL: config.BASE_URL
};
let options = {
  baseURL: baseURL,
  timeout: config.TIMEOUT,
  headers: config.HEADERS
}

export const $Axios = axios.create(options);

//扩展到Vue中
export function useAxiosInVue(Vue, opts = {}) {
  //axios in vue prototype
  Vue.prototype.$axios = $Axios;
}

//拦截request
requestInterceptors();

//拦截response
responseInterceptors();

function requestInterceptors(){
  $Axios.interceptors.request.use((axiosConfig) => {
    console.log(99999)
    const isLoading = axiosConfig.isLoading;
    //是否loading显示
    if (isLoading === undefined || isLoading === true) {
      //设置当前的loading的id
      axiosConfig.loadingID = $loading({
        text: false
      });
    }
    console.log(axiosConfig)
    return axiosConfig;
  },(error)=>{
    return Promise.reject(error);
  })
}

function responseInterceptors(){
  $Axios.interceptors.response.use((res) => {
    const status = res.status;
    const axiosConfig = res.config;
    const isLoading = axiosConfig.isLoading;
    if (isLoading === undefined || isLoading === true) {
      $closeLoading(axiosConfig.loadingID);
    }

    //success httprequest state
    if (status === 200) {
      const { code, message } = res.data;
      //success code
      if (code === errcodes.SUCCESS) {
        return res;
      } else if (code === errcodes.REDIRECT) {    //作为重定向跳转
        let redirectTime = 0;
        //存在重定向信息
        if (message) {
          $toast({
            message
          });
          redirectTime = 1000;
        }
        setTimeout(() => {
          redirect(res.data);
        }, redirectTime);
      }else {
        //error code错误码处理
        errCodeHandler(res.data);
        //这里最好的就是reject吧
        return Promise.reject(res);
      }
    }
  },(error)=>{
    const axiosConfig = error.config;
    const isTimeout = /timeout/ig.test(error.message);
    const status = isTimeout ? 'timeout' : error.response.status;
    const errorConfig = config.error;
    $closeLoading(axiosConfig.loadingID);

    //处理超时信息，重写信息,只有超时有提示
    if (isTimeout) {
      error.message = '数据请求超时，请刷新';
      $toast({
        message: error.message
      });
    }

    //跳转指定的错误状态页
    if (status >= 400 && status < 600) {
      const errorPath = errorConfig[status] ? errorConfig[status].path : errorConfig[404].path;
      router.push(errorPath);
    }

    return Promise.reject(error);

  })
}


// 请求拦截器
//axios.interceptors.request.use( request => {
//  if (!config.IS_RELEASE) {
//    console.log(
//      `${new Date().toLocaleString()}【 M=${request.url} 】P=`,
//      request.params || request.data,
//    );
//  }
//  return request;
//}, error => {
//  return Promise.reject(error);
//});

//export default async (options = { method: 'GET' }) => {
//  let isdata = true;
//  if (
//    options.method.toUpperCase() !== 'POST'
//    && options.method.toUpperCase() !== 'PUT'
//    && options.method.toUpperCase() !== 'PATCH'
//  ) {
//    isdata = false;
//  }
//  const res = await axios({
//    method: options.method,
//    url: options.url,
//    data: isdata ? options.data : null,
//    params: !isdata ? options.data : null,
//  });
//  debugger;
//  if (res.status >= 200 && res.status < 300) {
//    if (!config.IS_RELEASE) {
//      console.log(
//        `${new Date().toLocaleString()}【接口响应：】`,
//        // res.data,
//      );
//    }
//    // 浏览器环境弹出报错信息
//    if(typeof window !== "undefined" && res.data.code !== 0) {
//      Toast(res.data.msg);
//    }
//    return res.data;
//  }else {
//    if(typeof window !== "undefined" && res.data.code !== 0) {
//      Toast('请求错误');
//    }
//  }
//
//};




