import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import Vant from 'vant';
import 'vant/lib/index.css';
//自动设置 rem 基准值
import 'amfe-flexible';

Vue.use(Vant)
//加载全局样式
import "../src/styles/index.css";

import './utils/day'//处理时间
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");