import axios from 'axios';
import { Message } from 'element-ui';
import errcodes from '../errcode/errcodes';  //错误码
import config from './config';



const $Axios = axios.create(config);


//扩展到Vue中
export function useAxiosInVue(Vue, opts = {}) {
  //axios in vue prototype
  Vue.prototype.$axios = $Axios;
}

//拦截request
requestInterceptors();

//拦截response
responseInterceptors();


//request interceptors
function requestInterceptors() {
  $Axios.interceptors.request.use((axiosConfig) => {

    // if (config.method === 'post') config.data = qs.stringify(config.data)

    return axiosConfig;
  }, (error) => {
    return Promise.reject(error);
  });
}

//response interceptors
function responseInterceptors() {
  $Axios.interceptors.response.use((res) => {
    const status = res.status;


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
      } else if(res.data.status == 0){

        let redirectTime = 0;
        if (res.data.info) {
          $toast({
            message:res.data.info
          });
          redirectTime = 1000;
        }
        setTimeout(() => {
          location.href = programUrl['gou-wu-bao']+res.data.url;
          //redirect(res.data.url);
        }, redirectTime);

      }else {
        //error code错误码处理
        errCodeHandler(res.data);
        //这里最好的就是reject吧
        return Promise.reject(res);
      }
    }
  }, (error) => {
    // const axiosConfig = error.config;
    // const isTimeout = /timeout/ig.test(error.message);
    // const status = isTimeout ? 'timeout' : error.response.status;
    // const errorConfig = config.error;
    //
    // //处理超时信息，重写信息,只有超时有提示
    // if (isTimeout) {
    //   error.message = '数据请求超时，请刷新';
    //   $toast({
    //     message: error.message
    //   });
    // }
    //
    // //跳转指定的错误状态页
    // if (status >= 400 && status < 600) {
    //   const errorPath = errorConfig[status] ? errorConfig[status].path : errorConfig[404].path;
    //   router.push(errorPath);
    // }

    return Promise.reject(error);
  });
}


export default $Axios;
