/*
 * @Author : jaydon
 * @Date   : 2021-08-10 10:57
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import App from './index.vue';
import VModal from 'vue-js-modal';
import VueClipboard from 'vue-clipboard2';

const install = Vue => {
  Vue.component(App.name, App);
  Vue.use(VModal).use(VueClipboard);
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
