<template>
  <div class="frame-container" frame>
          <div class="loading-box" v-if="getLoading">
        <div class="fulfilling-square-spinner">
          <div class="spinner-inner"></div>
        </div>
      </div>
      <div v-show="!getLoading" class="frame">
        <template v-if="url">
        <iframe id="iframe"  :src="url" frameborder="0" class="frame" ref="frame"></iframe>
    </template>
    <template v-else>
      <page404 />
    </template>
      </div>

  </div>
</template>

<script>
import { getToken } from 'Config/util'
import { getSystem } from 'Config/system'
import { json2params, addQueryString, deleteQueryString } from 'nearby-common'
import Page404 from 'Pages/Page404'
import { mapGetters } from 'vuex'
export default {
  name: 'frame',
  components: { Page404 },
  created() {
    this.loading = true
    this.parseRouter()
   
  },
  data() {
    return {
      url: '',
      sysName: '',
      system: null,
      loading: false
    }
  },
  watch: {
    $route(val,v) {
      if(val.path !== v.path) {
        this.loading = false
        this.$store.dispatch('setLoading',true)
        this.parseRouter()
      }
      if(val.query.sysName === v.query.sysName) this.$store.dispatch('setLoading',false)
    }
  },
  // beforeRouteEnter(to, f, next) {
  //   next((vm) => {
  //     vm.parseRouter()
  //   })
  // },
  methods: {
    parseRouter() {
      const { sysName } = this.$route.query
      if (!sysName) return console.error('没有找到系统')
      const system = getSystem(sysName) // 从query上解析出要跳转到哪个系统
      if (!system) return console.error('没有找到系统')
      this.system = system
      // this.loading = false
      this.getPath()
    },
    getPath() {
      this.$nextTick(() => {
        if (!this.system) return
        let path = this.$route.path
        path = path.substr(6) // 解析出子应用路由
        let url = this.system.url
        url = deleteQueryString(url, 'token')
        url = addQueryString(url, 'token', getToken())
        const queryStr = this.stringifyQuery()
        url = `${url}#${path}${queryStr}`
        this.url = url
        // this.$store.dispatch('setLoading',false)
        this.$nextTick(() => {
          this.$refs.frame.contentWindow.location.replace(url)
          if(this.loading) this.$store.dispatch('setLoading',false)
          // if(!this.$refs.frame.contentWindow) {
          //   console.log('没有适口了')
          //   this.$store.dispatch('setLoading',true)
          //   // document.getElementById('iframe').contentWindow.location.reload(true)
          // } else {
          //   this.$store.dispatch('setLoading',false)
          // }
          // return this.$store.dispatch('setLoading',true)
        })
      })
    },
    stringifyQuery() {
      const query = this.$route.query
      if (!query) return ''
      let copyQuery = JSON.parse(JSON.stringify(query))
      delete copyQuery.sysName
      return '?' + json2params(copyQuery)
    }
  },
  computed:{
    ...mapGetters([
    'getLoading',
    'getChildrenjump'
    ]),
    // loading(){
    //   return this.$store.getters.getLoading
    // }
  }
}
</script>

<style scoped lang="less">
.frame-container[frame] {
  width: 100%;
  height: 100%;
  .frame {
    height: 100%;
    width: 100%;
  }
}
</style>
