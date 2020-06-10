import { Button, Menu, Icon, Dropdown, Input, message, FormModel, Spin, Modal } from 'ant-design-vue'
import antDirective from 'ant-design-vue/lib/_util/antDirective'
import Vue from 'vue'

Vue.use(antDirective) // use all ant directives
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm
// Vue.component(Modal.name, Modal)
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
