import Vue from 'vue';
import App from './App';
import FlowChart from '../packages/index';

Vue.use(FlowChart);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
