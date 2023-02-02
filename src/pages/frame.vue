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
import { getToken, mscf } from 'Config/util'
import { getSystem } from 'Config/system'
import { json2params, addQueryString, deleteQueryString } from 'nearby-common'
import Page404 from 'Pages/Page404'
import { mapGetters } from 'vuex'
import _ from 'lodash'
export default {
  name: 'frame',
  components: { Page404 },
  async created() {
    let { path, query } = this.$route
    this.loading = true
    this.parseRouter(query)
    let data = await this.$store.dispatch('getMenuListAll')
    // console.log(this.$route, 'frame')
    let { menuList } = this.$store.state.userInfo

    this.traceList(this.$route, null)
    let breadCrumbs = query.breadCrumbs
      ? Array.isArray(query.breadCrumbs)
        ? [sessionStorage.getItem('upper-path')] || []
        : query.breadCrumbs.split(',') || query.breadCrumbs.split('')
      : this.$route.path.split(',') || this.$route.path.split('')

    console.log(breadCrumbs)

    breadCrumbs = breadCrumbs.map((item) => {
      const regex = /\$/g
      const tofullPath = item.replace(regex, '&')
      return tofullPath
    })
    // console.log(breadCrumbs, 'str')
    this.findBreadCrumbs(data, {
      target: query.crossName ? query.crossName : query.sysName, // 3.刷新时 辨别是否跨系统
      targetPage: path,
      breadCrumbs,
      query: {
        // breadCrumbs: this.$route.fullPath,
        ...query
      }
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
      // console.log(val, v, 'fream')
      let { breadCrumbs } = v.query
      if (val.path === v.path && val.breadCrumbs === breadCrumbs) return
      // console.log(val, v)
      let goPath = 1
      let { menuListAll } = this.$store.state
      //通知父跳转时 替换由，此时此处也执行了

      let { path, query } = val
      console.log(query, 'watch')
      goPath = this.findBreadCrumbs(menuListAll, {
        target: query.crossName ? query.crossName : query.sysName, // 3.后退时 辨别是否跨系统
        targetPage: path,
        breadCrumbs: query.breadCrumbs ? query.breadCrumbs.split(',') || query.breadCrumbs.split('') : val.path.split(',') || val.path.split(''),
        query: {
          // breadCrumbs: val.fullPath,
          ...query
        }
      })

      if (goPath === 0) {
        mscf.emit('routeChangeCall', '*', 'error')
        // sessionStorage.setItem('routeChangeCall', '0');
        return window.history.go(-1)
      }
      this.traceList(val, v)

      if (val.path !== v.path || val.breadCrumbs !== breadCrumbs) {
        this.loading = false
        this.$store.dispatch('setLoading', true)
        this.parseRouter(query)
        // if (val.query.sysName !== v.query.sysName) this.parseRouter()
      }
      // 跨域的也直接关闭loading  this.loading为刷新时 点击不走this.loading
      if (val.query.sysName === v.query.sysName || val.query.crossName) this.$store.dispatch('setLoading', false)
      // if (val.path === v.path) this.$store.dispatch('setLoading', true)
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
      const { sysName, sysCross } = this.$route.query
      if (!sysName) return console.error('没有找到系统')
      // 1. 正向点击跳转时，正确拉取资源
      const system = sysCross ? getSystem(sysName, sysCross) : getSystem(sysName) // 从query上解析出要跳转到哪个系统
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
          console.log(this.loading)
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

      if (copyQuery.sysCross) {
        // 2. 点击跳转成功后 替换跨系统标识值（面包屑需要使用）
        copyQuery.crossName = copyQuery.sysName
        delete copyQuery.sysCross
      }
      delete copyQuery.sysName
      return '?' + json2params(copyQuery)
    },
    // 精准查找
    finditem(arr, path) {
      let newArr = []
      if (arr && arr.length > 0) {
        newArr = arr.filter((item) => {
          let itemPath = item.path
          if (itemPath.endsWith('/')) {
            itemPath = itemPath.slice(0, itemPath.length - 1)
          }
          path = path.replace(/\?.*/, '')

          // console.log(`${itemPath}/`.indexOf(`${path}/`) !== -1, itemPath, path)
          return itemPath === path
        })
      }
      if (newArr.length === 0) {
        for (let i = 0; i < arr.length; i++) {
          let item = arr[i]
          let itemPath = item.path
          if (itemPath.endsWith('/')) {
            itemPath = itemPath.slice(0, itemPath.length - 1)
          }
          let pathArrr = path.replace('/', '').split('/')
          let itemPathArr = itemPath.replace('/', '').split('/')
          // let routePathArr = this.$route.path.replace('/frame', '').replace('/', '').split('/')
          // for (let i = 0; i < itemPathArr.length; i++) {
          //   let item = itemPathArr[i]
          //   let pathItem = pathArrr[i]
          // }
          if (pathArrr.length - itemPathArr.length === 1) return (newArr = [item])
          // if (routePathArr.length - itemPathArr.length === 1) return itemPath === this.$route.path.replace('/frame', '')
        }
      }
      return newArr
    },
    // 痕迹管理
    traceList(routes = { query: null, path: null }, v) {
      // 设定默认值
      let { query, path, fullPath } = routes
      // 设定对比值
      const lastPath = sessionStorage.getItem('last-path')
      let upperPath = sessionStorage.getItem('upper-path') || null
      let obj = sessionStorage.getItem('breadCrumbs-path') || null
      obj = obj ? JSON.parse(obj) : {}
      if (query.breadCrumbs) {
        let breadCrumbs = Array.isArray(query.breadCrumbs) ? query.breadCrumbs : query.breadCrumbs.split(',') || query.breadCrumbs.split('')
        let len = breadCrumbs.length

        if (!obj[breadCrumbs[len - 1]]) {
          if (!v) {
            if (breadCrumbs.length > 1) {
              obj[breadCrumbs[len - 1]] = `${breadCrumbs[len - 1]}?breadCrumbs=${breadCrumbs[len - 2]}`
              sessionStorage.setItem('breadCrumbs-path', JSON.stringify(obj))
            } else {
              obj[breadCrumbs[len - 1]] = `${breadCrumbs[len - 1]}`
              sessionStorage.setItem('breadCrumbs-path', JSON.stringify(obj))
            }
          }

          // 查找存在不存在
          if (v && upperPath != lastPath) {
            // arr[len - 1] = {
            //   [breadCrumbs[len - 1]]: upperPath
            // }
            upperPath = lastPath
            if (upperPath) {
              obj[breadCrumbs[len - 1]] = upperPath
            } else {
              obj[breadCrumbs[len - 1]] = lastPath
            }
            sessionStorage.setItem('upper-path', upperPath)
            sessionStorage.setItem('breadCrumbs-path', JSON.stringify(obj))
          }
        }
      }
    },

    findBreadCrumbs(arr = [], obj = null) {
      let findArr = []
      let findchild
      let childArr
      let reductionDimensionality
      let childSuperiorArr
      let newfindArr = []
      // let sysCross = obj.sysCross || obj.query.sysCross
      let findParent = (arrParent, targetPage) => {
        console.log(arrParent, targetPage)
        for (let index = 0; index < arrParent.length; index++) {
          const item = arrParent[index]
          let childrenArr = []
          if (item.children && item.children.length > 0) {
            childrenArr = fuzzyLookup(item.children, targetPage)
            if (childrenArr.length > 0) return item
          }
        }
      }
      let fuzzyLookup = (arrItem, targetPage) => {
        let newArr
        if (arrItem && arrItem.length > 0) {
          newArr = arrItem.filter((el) => {
            let itemPath = el.path
            let { sysCross } = el
            if (itemPath.endsWith('/')) {
              itemPath = itemPath.slice(0, itemPath.length - 1)
            }

            // v1.0
            // return `${targetPage}/`.indexOf(`${itemPath}/`) !== -1 || `${targetPage}/`.indexOf(`${itemPath}?`) !== -1
            // v1.0.1
            let newarrPath = itemPath.replace(/\//g, '') // 系统输入的路径

            newarrPath = newarrPath.replace(/\?.*/, '') // 将系统输入的参数去掉
            let breadCrumbsPathStr = targetPage.replace(/\//g, '')

            let reg = new RegExp('^' + newarrPath)

            return reg.test(breadCrumbsPathStr) || `${targetPage}/`.indexOf(`${itemPath}?`) !== -1
          })
        }
        if (newArr.length > 0) return newArr
        return false
      }
      // 查找父级
      arr.map((item) => {
        if (item.alias === obj.target) {
          findArr.push(item)
        }
        // if (sysCross && item.alias === sysCross) {
        //   findArr.push(item)
        // }
      })

      // 父级分为多个系统
      if (findArr.length > 1) {
        findArr = [findParent(findArr, obj.targetPage.replace('/frame', ''))]
      }
      console.log(findArr)

      let pageSystem = getSystem(obj.target).pages
      if (obj.query.breadCrumbs) {
        // 2级以上路由
        // 如果父级为多个系统
        let breadCrumbsLen = obj.breadCrumbs.length
        // console.log(obj.breadCrumbs, '------>>>>>>>>>>>>>', '面包学 没得参数')
        let newchildSuperiorArr = []
        let breadCrumbsPath = sessionStorage.getItem('breadCrumbs-path') || null
        // 查找上一级
        for (let i = 0; i < breadCrumbsLen; i++) {
          if (obj.breadCrumbs[i] !== '') {
            if (findArr.length > 1) findArr = [findParent(findArr, obj.breadCrumbs[i])] // 上一级
            childSuperiorArr = findArr[0].children

            childSuperiorArr = fuzzyLookup(childSuperiorArr, obj.breadCrumbs[i])

            // if (!childSuperiorArr) {
            if (childSuperiorArr.length > 0) {
              if (childSuperiorArr.length > 1) childSuperiorArr = this.finditem(childSuperiorArr, obj.breadCrumbs[i])
              newchildSuperiorArr.push({
                ...childSuperiorArr[0],
                path: breadCrumbsPath ? JSON.parse(breadCrumbsPath)[obj.breadCrumbs[i]] || obj.breadCrumbs[i] : obj.breadCrumbs[i]
                // query: {
                //   ...obj.query
                // }
              })
              childSuperiorArr = newchildSuperiorArr
            } else {
              // 没有在当前菜单中找到，就去大菜单找
              let len = arr.length
              for (let j = 0; j < len; j++) {
                let item = arr[j]
                if (item.children && item.children.length > 0) {
                  let newarr1 = item.children.filter((el) => `${obj.breadCrumbs[i]}/`.indexOf(`${el.path}/`) !== -1)[0]
                  if (newarr1) {
                    // if (newarr1.length > 1) newarr1 = this.finditem(newarr1, obj.breadCrumbs[i])
                    // console.log(JSON.parse(breadCrumbsPath)[obj.breadCrumbs[i]], newarr1.path)
                    // JSON.parse(breadCrumbsPath)[obj.breadCrumbs[i]].indexOf(newarr1.path) !== -1
                    if (newarr1.path === obj.breadCrumbs[i]) {
                      newarr1 = {
                        ...newarr1,
                        path: breadCrumbsPath ? JSON.parse(breadCrumbsPath)[obj.breadCrumbs[i]] || obj.breadCrumbs[i] : obj.breadCrumbs[i]
                      }
                      newfindArr = [item]
                      newchildSuperiorArr.push(newarr1)
                    }
                  }
                  continue
                }
              }
              // if (newchildSuperiorArr.length > 1) {
              //   console.log('-----------')
              // }
              childSuperiorArr = newchildSuperiorArr
              // }
            }
          }
        }
      }

      // 查找最后一级
      //没有传递breadCrumbs （2级路由）
      //todo: 从菜单里面找 targetPage 当前path
      // 最后一级
      childArr = findArr[0].children || []

      childArr = fuzzyLookup(childArr, obj.targetPage.replace('/frame', '')) || []

      if (childArr.length > 0) {
        if (childArr.length > 1) childArr = this.finditem(childArr, obj.targetPage.replace('/frame', ''))
      } else {
        // 当前菜单无法找到
        // console.log(obj)
      }

      if (childArr.length == 0) {
        // this.$message.error('当前菜单没有配置')
        // return 0
      }

      // 最终面包屑
      if (childSuperiorArr && childSuperiorArr.length > 0) {
        findArr = newfindArr.length > 0 ? newfindArr : findArr
        findArr = [{ ...findArr[0], children: [...childSuperiorArr, ...childArr] }]
      } else {
        findArr = [{ ...findArr[0], children: [...childArr] }]
      }
      // console.log(findArr, '====>>>>>>最终有没得参数')
      this.$store.commit('uploadbreadCrumbs', {
        ...findArr[0]
      })
      // console.log(findArr[0], '=------------------------->')
      // sessionStorage.setItem('routeChangeCall', '1');
      return 1
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
  // min-width: 1470px;
  height: 100%;
  .frame {
    height: 100%;
    width: 100%;
    // min-width: 1470px;
  }
}
</style>
