/*
 * @Author : jaydon
 * @Date   : 2021-08-10 10:57
 * @WeChat : i-vshow
 * @Email  : vshow@dooomi.com
 * @Blog   : http://dooomi.com
 */

import App from './index.vue';

const install = Vue => {
  Vue.component(App.name, App);
};

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install
};
