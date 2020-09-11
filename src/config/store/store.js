import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    loading:true
  },
  actions:{
    setLoading({commit},v) {
      commit('loadingChange',v)
    }
  },
  mutations: {
    updateUser(state, userInfo) {
      state.userInfo = userInfo
    },
    loadingChange(state,v){
      state.loading = v
    }
  },
  getters:{
    getLoading:state => state.loading
    
  }
})
