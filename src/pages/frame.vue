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
import _ from 'lodash'
export default {
  name: 'frame',
  components: { Page404 },
  async created() {
    this.loading = true
    this.parseRouter()
    let data = await this.$store.dispatch('getMenuListAll')
    console.log(this.$route, 'frame')
    let { menuList } = this.$store.state.userInfo
    let { path, query } = this.$route
    this.findBreadCrumbs(data, {
      target: query.sysName,
      targetPage: path,
      breadCrumbs: query.breadCrumbs ? query.breadCrumbs.split(',') || query.breadCrumbs.split('') : null,
      query
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
      // if (val.path === v.path) return
      console.log(val, v)
      let goPath = 1
      let { menuListAll } = this.$store.state
      //通知父跳转时 替换由，此时此处也执行了
      console.log('watch')
      let { path, query } = val
      goPath = this.findBreadCrumbs(menuListAll, {
        target: query.sysName,
        targetPage: path,
        breadCrumbs: query.breadCrumbs ? query.breadCrumbs.split(',') || query.breadCrumbs.split('') : null,
        query
      })
      if (goPath === 0) return
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
    parseRouter(query = null) {
      // debugger
      const { sysName } = this.$route.query
      if (!sysName) return console.error('没有找到系统')
      const system = getSystem(sysName) // 从query上解析出要跳转到哪个系统
      if (!system) return console.error('没有找到系统')
      this.system = system
      // this.loading = false
      this.getPath(query)
      // debugger
    },
    getPath(query = null) {
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
        const queryStr = this.stringifyQuery(query)
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
    stringifyQuery(query = null) {
      if (!query) query = this.$route.query
      if (!query) return ''
      let copyQuery = JSON.parse(JSON.stringify(query))
      delete copyQuery.sysName
      return '?' + json2params(copyQuery)
    },
    findBreadCrumbs(arr = [], obj = null) {
      let findArr = []
      let findchild
      let childArr
      if (arr.length > 0 && obj) {
        let pageSystem = getSystem(obj.target).pages
        // 查找最后一级
        // findArr = arr.filter((item) => item.alias === obj.target)
        arr.map((item) => {
          if (item.alias === obj.target) {
            // findArr[0] = {
            //   ...item,
            //   children: [].push([...item.children])
            // }
            findArr.push(item)
          }
        })
        if (findArr.length > 1) {
          let reductionDimensionality = []
          findArr.map((item) => {
            item.children.map((el) => {
              reductionDimensionality.push(el)
            })
          })
          findArr[0] = {
            ...findArr[0],
            children: reductionDimensionality
          }
        }
        childArr = findArr[0].children || []
        findchild = childArr.filter((item) => {
          let itemPath = item.path
          if (itemPath.endsWith('/')) {
            itemPath = itemPath.slice(0, itemPath.length - 1)
          }
          return `${obj.targetPage}/`.indexOf(`${itemPath}/`) !== -1
        })
        if (findchild.length > 1) {
          findchild = findchild.filter((item) => `/frame${item.path}` === obj.targetPage)
        }
        if (!findchild[0].name) {
          this.$message.error('请配置菜单')
          return 0
        }
        findchild = [
          {
            ...findchild[0],
            path: obj.targetPage
          }
        ]
        console.log(findchild)

        if (obj.breadCrumbs) {
          // 查找上一级
          let len = obj.breadCrumbs.length
          let findotherchild = []
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              //上一级
              let newarr = childArr.filter((item) => obj.breadCrumbs[i].indexOf(item.path) !== -1)[0]
              console.log(newarr)
              if (newarr) {
                findotherchild.push({
                  ...newarr,
                  path: obj.breadCrumbs[i]
                  // query: {
                  //   ...obj.query
                  // }
                })
                // 上一级不存在 就去大菜单里面找吧
              } else {
                let len = arr.length
                for (let j = 0; j < len; j++) {
                  let item = arr[j]
                  if (item.children && item.children.length > 0) {
                    let newarr1 = item.children.filter((el) => obj.breadCrumbs[i].indexOf(el.path) !== -1)[0]
                    if (newarr1) {
                      newarr1 = {
                        ...newarr1,
                        path: obj.breadCrumbs[i]
                        // query: {
                        //   ...obj.query
                        // }
                      }
                      console.log(newarr1)
                      findArr = [arr[j]]
                      findotherchild.push(newarr1)
                    }
                  }
                }
              }
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
    ...mapGetters(['getLoading', 'getBreadCrumbsSystem', 'getBreadCrumbs'])
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
