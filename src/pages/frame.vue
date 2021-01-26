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
    // console.log(this.$route, 'frame')
    let { menuList } = this.$store.state.userInfo
    let { path, query } = this.$route
    this.traceList(this.$route, null)
    this.findBreadCrumbs(data, {
      target: query.sysName,
      targetPage: path,
      breadCrumbs: query.breadCrumbs ? query.breadCrumbs.split(',') || query.breadCrumbs.split('') : this.$route.path.split(',') || this.$route.path.split(''),
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
      // if (val.path === v.path) return
      // console.log(val, v)
      let goPath = 1
      let { menuListAll } = this.$store.state
      //通知父跳转时 替换由，此时此处也执行了
      console.log('watch')
      let { path, query } = val
      this.traceList(val, v)
      goPath = this.findBreadCrumbs(menuListAll, {
        target: query.sysName,
        targetPage: path,
        breadCrumbs: query.breadCrumbs ? query.breadCrumbs.split(',') || query.breadCrumbs.split('') : val.path.split(',') || val.path.split(''),
        query: {
          // breadCrumbs: val.fullPath,
          ...query
        }
      })
      if (goPath === 0) return this.$router.go(-1)
      if (val.path !== v.path) {
        this.loading = false
        this.$store.dispatch('setLoading', true)
        this.parseRouter()
        // if (val.query.sysName !== v.query.sysName) this.parseRouter()
      }
      if (val.query.sysName === v.query.sysName) this.$store.dispatch('setLoading', false)
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
    // 精准查找
    finditem(arr, path) {
      let newArr = []
      if (arr && arr.length > 0) {
        newArr = arr.filter((item) => {
          let itemPath = item.path
          if (itemPath.endsWith('/')) {
            itemPath = itemPath.slice(0, itemPath.length - 1)
          }
          return itemPath === path
        })
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
        let breadCrumbs = query.breadCrumbs.split(',') || query.breadCrumbs.split('')
        let len = breadCrumbs.length
        console.log(breadCrumbs)
        if (!obj[breadCrumbs[len - 1]]) {
          if (!v) {
            if (breadCrumbs.length > 1) {
              obj[breadCrumbs[len - 1]] = `${breadCrumbs[len - 1]}?breadCrumbs=${breadCrumbs[len - 2]}`
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
      console.log(obj)
    },

    findBreadCrumbs(arr = [], obj = null) {
      let findArr = []
      let findchild
      let childArr
      let reductionDimensionality
      let childSuperiorArr
      let newfindArr = []
      let findParent = (arrParent, targetPage) => {
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
            if (itemPath.endsWith('/')) {
              itemPath = itemPath.slice(0, itemPath.length - 1)
            }
            return `${targetPage}/`.indexOf(`${itemPath}/`) !== -1 || `${targetPage}/`.indexOf(`${itemPath}?`) !== -1
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
      })
      let pageSystem = getSystem(obj.target).pages
      if (obj.query.breadCrumbs) {
        // 2级以上路由
        // 如果父级为多个系统
        let breadCrumbsLen = obj.breadCrumbs.length
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
                    console.log(newarr1, obj.query)
                    // if (newarr1.length > 1) newarr1 = this.finditem(newarr1, obj.breadCrumbs[i])
                    // if (newarr1.path === obj.breadCrumbs[i] || newarr1.path === JSON.parse(breadCrumbsPath)[obj.breadCrumbs[i]]) {
                    newarr1 = {
                      ...newarr1,
                      path: breadCrumbsPath ? JSON.parse(breadCrumbsPath)[obj.breadCrumbs[i]] || obj.breadCrumbs[i] : obj.breadCrumbs[i]
                    }
                    newfindArr = [item]
                    newchildSuperiorArr.push(newarr1)
                    // }
                  }
                  continue
                }
              }
              childSuperiorArr = newchildSuperiorArr
              // }
            }
          }
        }
      }

      // 查找最后一级
      //没有传递breadCrumbs （2级路由）
      //todo: 从菜单里面找 targetPage 当前path
      // 父级分为多个系统
      if (findArr.length > 1) {
        findArr = [findParent(findArr, obj.targetPage.replace('/frame', ''))]
      }
      // 最后一级
      childArr = findArr[0].children
      childArr = fuzzyLookup(childArr, obj.targetPage.replace('/frame', '')) || []
      if (childArr.length > 0) {
        if (childArr.length > 1) childArr = this.finditem(childArr, obj.targetPage.replace('/frame', ''))
      } else {
        // 当前菜单无法找到
        console.log('-------',obj,findArr)
      }
      if (childArr.length == 0) {
        this.$message.error('当前菜单没有配置')
        return 0
      }
      // 最终面包屑
      if (childSuperiorArr && childSuperiorArr.length > 0) {
        findArr = newfindArr.length > 0 ? newfindArr : findArr
        findArr = [{ ...findArr[0], children: [...childSuperiorArr, ...childArr] }]
      } else {
        findArr = [{ ...findArr[0], children: [...childArr] }]
      }
      this.$store.commit('uploadbreadCrumbs', {
        ...findArr[0]
      })
    }
    // findBreadCrumbs(arr = [], obj = null) {
    //   let findArr = []
    //   let findchild
    //   let childArr
    //   if (arr.length > 0 && obj) {
    //     let pageSystem = getSystem(obj.target).pages
    //     // 查找最后一级
    //     // findArr = arr.filter((item) => item.alias === obj.target)
    //     arr.map((item) => {
    //       if (item.alias === obj.target) {
    //         findArr.push(item)
    //       }
    //     })
    //     // 父级分为多个系统
    //     if (findArr.length > 1) {
    //       let reductionDimensionality = []
    //       findArr.map((item) => {
    //         reductionDimensionality = {
    //           children: item.children.filter((el) => {
    //             let itemPath = el.path
    //             if (itemPath.endsWith('/')) {
    //               itemPath = itemPath.slice(0, itemPath.length - 1)
    //             }
    //             return `${obj.targetPage}/`.indexOf(`${itemPath}/`) !== -1
    //           }),
    //           ...item
    //         }
    //       })
    //       findArr = [
    //         {
    //           ...reductionDimensionality
    //         }
    //       ]
    //     }
    //     childArr = findArr[0].children || []
    //     findchild = childArr.filter((item) => {
    //       let itemPath = item.path
    //       if (itemPath.endsWith('/')) {
    //         itemPath = itemPath.slice(0, itemPath.length - 1)
    //       }
    //       console.log(itemPath, `${obj.targetPage}/`.indexOf(`${itemPath}/`) !== -1)
    //       return `${obj.targetPage}/`.indexOf(`${itemPath}/`) !== -1
    //     })
    //     console.log(findchild)
    //     if (findchild.length > 1) {
    //       // 最后一级不止一个
    //       findchild = findchild.filter((item) => `/frame${item.path}` === obj.targetPage)
    //     }
    //     if (!findchild[0].name) {
    //       this.$message.error('请配置菜单')
    //       return 0
    //     }
    //     findchild = [
    //       {
    //         ...findchild[0],
    //         path: obj.targetPage
    //       }
    //     ]
    //     if (obj.breadCrumbs) {
    //       // 查找上一级
    //       let len = obj.breadCrumbs.length
    //       let findotherchild = []
    //       if (len > 0) {
    //         for (let i = 0; i < len; i++) {
    //           //上一级
    //           let newarr = childArr.filter((item) => {
    //             // console.log(item.path)
    //             return `${obj.breadCrumbs[i]}/`.indexOf(`${item.path}/`) !== -1
    //           })
    //           if (newarr.length > 0) {
    //             console.log(obj.targetPage)
    //             if (newarr.length > 1) {
    //               newarr = newarr.filter((item) => obj.breadCrumbs[i] === item.path)
    //             }
    //             findotherchild.push({
    //               ...newarr,
    //               path: obj.breadCrumbs[i]
    //               // query: {
    //               //   ...obj.query
    //               // }
    //             })
    //             console.log(findotherchild)
    //             // 上一级不存在 就去大菜单里面找吧
    //           } else {
    //             let len = arr.length
    //             for (let j = 0; j < len; j++) {
    //               let item = arr[j]
    //               if (item.children && item.children.length > 0) {
    //                 let newarr1 = item.children.filter((el) => obj.breadCrumbs[i].indexOf(el.path) !== -1)[0]
    //                 if (newarr1) {
    //                   newarr1 = {
    //                     ...newarr1,
    //                     path: obj.breadCrumbs[i]
    //                     // query: {
    //                     //   ...obj.query
    //                     // }
    //                   }
    //                   console.log(newarr1)
    //                   findArr = [arr[j]]
    //                   findotherchild.push(newarr1)
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //       this.$store.commit('uploadbreadCrumbs', {
    //         ...findArr[0],
    //         children: [...findotherchild, ...findchild]
    //       })
    //       return
    //     }
    //     this.$store.commit('uploadbreadCrumbs', {
    //       ...findArr[0],
    //       children: [...findchild]
    //     })
    //   }
    // }
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
