import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
import axios from "axios";
import Clipboard from 'clipboard';

import VueRouter from "vue-router";
import router from './router';
import store from './store';
Vue.prototype.$axios=axios;
Vue.prototype.$httpUrl='http://8.134.192.12:8090'
Vue.config.productionTip = false
Vue.use(ElementUI,{size:'small'});


import {
  MessageBox as ElMessageBox,
  Message as ElMessage
} from 'element-ui';


Vue.prototype.$confirm = ElMessageBox.confirm;
Vue.prototype.$message = ElMessage;

Vue.use(VueRouter)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
