<template>
  <div class="frame-container" frame>
    <div class="loading-box" v-if="getLoading">
      <div class="fulfilling-square-spinner">
        <div class="spinner-inner"></div>
      </div>
    </div>
    <div v-show="!getLoading" class="frame">
      <template v-if="url">
        <iframe id="iframe" :src="url" frameborder="0" class="frame" ref="frame"></iframe>
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
    let { menuList } = this.$store.state.userInfo
    let { path, query } = this.$route
    this.findBreadCrumbs(menuList, {
      target: query.sysName,
      targetPage: path,
      breadCrumbs: query.breadCrumbs ? query.breadCrumbs.split(',') || query.breadCrumbs.split('') : null
    })
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
    $route(val, v) {
      let { menuList } = this.$store.state.userInfo

      //通知父跳转时 替换由，此时此处也执行了
      console.log('watch')
      let { path, query } = val
      this.findBreadCrumbs(menuList, {
        target: query.sysName,
        targetPage: path,
        breadCrumbs: query.breadCrumbs ? query.breadCrumbs.split(',') || query.breadCrumbs.split('') : null
      })
      if (val.path !== v.path) {
        this.loading = false
        this.$store.dispatch('setLoading', true)
        this.parseRouter()
        // if (val.query.sysName !== v.query.sysName) this.parseRouter()
      }
      if (val.query.sysName === v.query.sysName) this.$store.dispatch('setLoading', false)
    }
  },
  // beforeRouteEnter(to, f, next) {
  //   // next((vm) => {
  //   //   console.log(f.path,to.path)
  //   //   vm.parseRouter()
  //   // })
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
        path = path.substr(6) // 解析出子应用路由 去掉/frame
        // let { fullPath } = this.$route
        // fullPath = fullPath.substr(6)
        // console.log(fullPath,123)
        let url = this.system.url
        url = deleteQueryString(url, 'token')
        url = addQueryString(url, 'token', getToken())
        const queryStr = this.stringifyQuery()
        url = `${url}#${path}${queryStr}`
        this.url = url
        this.$nextTick(() => {
          // 再次点击 子系统没有发消息 区别是再次点击还是首次点击
          // if( url.indexOf(path) !== -1 )  {
          // this.$refs.frame.contentWindow.location.reload()
          // } else
          this.$refs.frame.contentWindow.location.replace(url)
          if (this.loading) this.$store.dispatch('setLoading', false)
          // console.log('loading missing',this.getChildrenjump,this.loading)
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
    },
    findBreadCrumbs(arr = [], obj = null) {
      let findArr
      let findchild
      let childArr
      if (arr.length > 0 && obj) {
        findArr = arr.filter((item) => item.alias === obj.target)
        childArr = findArr[0].children
        findchild = childArr.filter((item) => obj.targetPage === `/frame${item.path}`)
        if (obj.breadCrumbs) {
          let len = obj.breadCrumbs.length
          let findotherchild = []
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              findotherchild.push(childArr.filter((item) => obj.breadCrumbs[i].indexOf(item.path) !== -1)[0])
            }
          }
          this.$store.commit('uploadbreadCrumbs', {
            ...findArr[0],
            children: [...findotherchild, ...findchild]
          })
          return
        }
        this.$store.commit('uploadbreadCrumbs', {
          ...findArr[0],
          children: [...findchild]
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getLoading', 'getBreadCrumbsSystem'])
    // loading(){
    //   return this.$store.getters.getLoading
    // }
  },
  destroyed() {
    this.$store.dispatch('clearBreadCrumbs')
  }
}
</script>

<style scoped lang="less">
.frame-container[frame] {
  width: 100%;
  // min-width: 1200px;
  height: 100%;
  .frame {
    height: 100%;
    width: 100%;
    // min-width: 1200px;
  }
}
</style>
