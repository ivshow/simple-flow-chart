import Vue from 'vue';
import App from './App';
import SimpleFlowChart from '../packages/index';

Vue.use(SimpleFlowChart);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
