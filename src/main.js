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

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
