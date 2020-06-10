import { Button, Menu, Icon, Dropdown, Input, message, FormModel, Spin } from 'ant-design-vue'
import Vue from 'vue'

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
