import Vue from 'vue'
import Vuex from 'vuex'
import {
  getUserInfo,
  menuAllList
} from 'Service'
import {
  data
} from 'autoprefixer'
Vue.use(Vuex)

Vue.data = null
export default new Vuex.Store({
  state: {
    menuListAll: null,
    userInfo: null,
    loading: true,
    childrenjump: false,
    breadCrumbs: {
      name: null,
      children: [{
        name: null,
        id: null
      }]
    },
    breadCrumbsSystem: null
  },
  actions: {
    async setUserInfo({
      commit
    }) {
      let res = Vue.data = await getUserInfo()
      console.log(res)
      commit('updateUser', res)
      return true
    },
    setLoading({
      commit
    }, v) {
      commit('loadingChange', v)
    },
    setChildrenJump({
      commit
    }, v) {
      commit('loadingChange', v)
    },
    setBreadCrumbs({
      commit
    }, v) {
      // i 是父级索引 index是children索引
      let routes = {}

      let {
        superItem,
        subItem,
        i,
        index
      } = v
      routes = {
        ...superItem,
        children: [{
          ...superItem.children[index]
        }]
      }
      commit('uploadbreadCrumbs', routes)
    },
    setBreadCrumbsSystem({
      commit
    }, v) {
      commit('updateBreadCrumbsSystem', v)
    },
    clearBreadCrumbs({
      commit
    }) {
      commit('uploadbreadCrumbs', {
        name: null,
        children: []
      }, )
    },
    async getMenuListAll({
      commit
    }) {
      let data = await menuAllList()
      if (data) {
        commit('updatemenuListAll', data)
        return data
      }
      return console.log('菜单接口出错了')
    }
  },
  mutations: {
    updateUser(state, userInfo) {
      state.userInfo = userInfo
    },
    loadingChange(state, v) {
      state.loading = v
    },
    childrenjumpChange(state, v) {
      state.childrenjump = v
    },
    uploadbreadCrumbs(state, v) {
      state.breadCrumbs = v
    },
    updateBreadCrumbsSystem(state, v) {
      state.breadCrumbsSystem = v
    },
    updatemenuListAll(state, data) {
      state.menuListAll = data
    }
  },
  getters: {
    getLoading: state => state.loading,
    getChildrenjump: state => state.childrenjump,
    getBreadCrumbs: state => state.breadCrumbs,
    getBreadCrumbsSystem: state => state.breadCrumbsSystem,
    // getUserInfo: () => {
    //   return {
    //     ...Vue.data,
    //     menuList: Vue.data.menuList.filter((item) => (item.children = item.children.filter((el) => el.display == 1)))
    //   }
    // }
  }
})
