import Vue from 'vue'
import App from './App'
import router from './router'
import store from 'Config/store/store'

import './assets/style/reset.less'
import './assets/style/antd.less'
import './assets/style/global.less'
import '../static/iconfont/style.css' // 字体图标
import './config/antConfig'
import './config/mscf'
import { Monitor } from 'nearby-common'
import { BASE_URL } from 'Config/util'

Vue.use(Monitor, {
  disabled: process.env.NODE_ENV !== 'production',
  console: process.env.NODE_ENV !== 'production',
  url: BASE_URL,
  appId: 'foundation',
  vueErr: true,
  ajax: true,
  js: true,
  promise: true,
  blank: true,
  performance: true,
  custom: true
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
