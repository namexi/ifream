import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'Config/store/store'
import Router from "vue-router";
import './assets/style/reset.less'
import './assets/style/antd.less'
import './assets/style/global.less'
import '../static/iconfont/style.css' // 字体图标
import './config/antConfig'
import './config/mscf'
import {
  Monitor
} from 'nearby-common'
import {
  BASE_URL
} from 'Config/util'
import {
  downloadChrome
} from 'Config/util/checkBower.js'

Vue.use(Monitor, {
  disabled: process.env.NODE_ENV !== 'production',
  console: process.env.NODE_ENV !== 'production',
  url: BASE_URL,
  appId: 'foundation',
  vueErr: true,
  ajax: true,
  js: true,
  promise: true,
  blank: false,
  performance: true,
  custom: true
})
Vue.prototype.downloadChromeUrl = downloadChrome()
// const routerPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error => error);
// }

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store
})