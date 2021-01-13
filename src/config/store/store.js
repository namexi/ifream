import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

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
    getBreadCrumbsSystem: state => state.breadCrumbsSystem
  }
})
