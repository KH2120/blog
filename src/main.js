import Vue from 'vue'
import App from './App.vue'
import './plugins/element'
import router from './route'
import axios from "axios";

import store from './store'

Vue.prototype.axios = axios;


Vue.config.productionTip = false
import './assets/css/theme/index.css';
import './assets/css/base.css';


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')