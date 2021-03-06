import errcodes from './errcodes';
//import { unLogin } from '$assets/js/login';
//import { bindPhone } from '$assets/js/bind';
import { $toast } from '~/plugins/mint-ui';
//import router from '@router';

//错误码处理
export function errCodeHandler(opts = {}) {
  const { code, message } = opts;
  switch (code) {

    //未登录处理
    case errcodes.UN_LOGIN:
//      unLogin();
      console.log('没有登录')
      break;

    //未绑定手机号
    case errcodes.BIND_PHONE:
//      bindPhone({
//        to: router.currentRoute
//      });
      break;

    //只做提醒操作
    case errcodes.MESSAGE:
      $toast({
        message: message
      });
      break;

    //default
    default:
      ;
  }
}



