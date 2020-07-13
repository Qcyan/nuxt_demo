import Vue from 'vue'
import { Indicator,MessageBox, Lazyload } from 'mint-ui';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import inBrowser from "~/assets/js/in-browser";

Vue.use(MintUI)

Vue.use(Lazyload);

//loading的id
let loadingID = 0;
export function setIndicator(Vue) {
  //open loadding & close loadding
  Vue.prototype.$loading = $loading;
  Vue.prototype.$closeLoading = $closeLoading;

  //open toast & close loadding
  Vue.prototype.$toast = $toast;
  Vue.prototype.$closeToast = $closeToast;

  //set message
  Vue.prototype.$messageBox = MessageBox;
}

//open loadding & close loadding
export function $closeLoading(id) {
  if (!inBrowser()) return;
  if (!id || (id === loadingID)) {
    Indicator.close();
  }
}
export function $loading(opts = {}) {
  if (inBrowser()) {
    let config = {
      text: opts.text || '加载中...',
      spinnerType: opts.spinnerType || 'snake'
    };
    if (!opts.text) {
      delete config.text;
    }
    Indicator.open(config);
    return ++loadingID;
  }
  return 0;
}

//open toast & close loadding
export function $toast(opts) {
  if(inBrowser()){
    $closeToast();
    lastToast = Toast(opts);
  }
}
export function $closeToast(){
  if (lastToast) {
    lastToast.close();
  }
}
setIndicator(Vue);
