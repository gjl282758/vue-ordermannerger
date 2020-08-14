import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/reset.css'

import router from './router.js'
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

// import dayjs from "dayjs"
// Vue.prototype.dayjs = dayjs;

Vue.use(ElementUI);

//创建一个全局bus，在main中
Vue.prototype.$bus=new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
