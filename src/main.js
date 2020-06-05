// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Menu, Icon, Dropdown, Input, message, FormModel, Spin } from 'ant-design-vue'

import './assets/style/reset.less'
import './assets/style/antd.less'
import './assets/style/global.less'
import '../static/iconfont/style.css' // 字体图标

Vue.prototype.$message = message
Vue.component(Button.name, Button)
Vue.component(Menu.name, Menu)
Vue.component(Menu.Item.name, Menu.Item)
Vue.component(Menu.SubMenu.name, Menu.SubMenu)
Vue.component(Icon.name, Icon)
Vue.component(Dropdown.name, Dropdown)
Vue.component(Input.name, Input)
Vue.component(FormModel.name, FormModel)
Vue.component(FormModel.Item.name, FormModel.Item)
Vue.component(Input.Password.name, Input.Password)
Vue.component(Spin.name, Spin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
