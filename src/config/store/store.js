import Vue from 'vue'
import Vuex from 'vuex'
import {
  getUserInfo
} from 'Service'
import {
  data
} from 'autoprefixer'
Vue.use(Vuex)

Vue.data = null
export default new Vuex.Store({
  state: {
    userInfo: null,
    loading: true,
    childrenjump: false,
    breadCrumbs: {
      name: null,
      children: []
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
      console.log(v)
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
