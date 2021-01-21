<template>
  <div class="home">
    <div class="title-bar">
      <div class="title-left" @click="onToggleCollapse">
        <!--<a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="collapse-icon" />-->
        <a-icon type="menu" class="collapse-icon" />
      </div>
      <div class="title-mid">
        <a-breadcrumb separator="">
          <a-breadcrumb-item class="breadcrumb-home"> <img src="../assets/icon/icon_home@2x.png" alt="" @click="goHome" /> </a-breadcrumb-item>
          <a-breadcrumb-item class="breadcrumb-item" v-if="getBreadCrumbs.name">
            <a
              ><span> {{ getBreadCrumbs.name }} </span></a
            >
          </a-breadcrumb-item>
          <a-breadcrumb-item v-if="getBreadCrumbs.name" class="breadcrumb-item" v-for="(item, i) in getBreadCrumbs.children" :key="i">
            <a
              ><span @click.self="breadcrumbClick(item)"> {{ item.name }} </span></a
            >
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="title-right">
        <div class="logoImg">
          <img src="../assets/icon/logo@2x.png" alt="" />
        </div>
        <a-popover class="user usercolor">
          <template slot="content">
            <div class="flex userInfo">
              <div class="userImgPopover">
                <img src="../assets/icon/logo_dark.png" alt="" />
              </div>
              <div class="f-right">
                <div class="three-title">
                  {{ userInfo.name }}
                </div>
                <p class="three-text" v-for="(items, i) in userInfo.deptPositionName" :key="i">{{ items }}</p>
              </div>
            </div>
            <div class="assistant-list">
              <div class="usercolor code-title">联系技术助理（微信扫一扫添加）</div>
              <img src="../assets/qrcode/ass1.png" class="assistant-code" alt="assistant" />
              <img src="../assets/qrcode/ass2.png" class="assistant-code" alt="assistant" />
              <img src="../assets/qrcode/ass3.png" class="assistant-code" alt="assistant" />
            </div>
            <div class="download-browser" v-if="downloadChromeUrl">
              <p class="three-title">下载浏览器</p>
              <div @click="downloadChrome" v-if="downloadChromeUrl">
                <img src="../assets/icon/chrome-logo@2x.png" alt="" />
                <p class="three-text">谷歌浏览器</p>
              </div>
            </div>
            <div class="logout" @click="handleLogout">退出登录</div>
          </template>
          <span>
            {{ userInfo.name }}
          </span>
        </a-popover>
        <div class="userImg">
          <img src="../assets/icon/logo_dark.png" alt="" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="side-bar" v-show="collapsed">
        <div class="menu-container no-scroll-bar">
          <div :class="[menuSearchActive ? 'menu-selected' : '', 'menu-item-list']" @click="menuChange(userInfo.menuList, null)">
            <a-icon type="search" class="menu-icon" />
            <span class="menu-name">菜单搜索</span>
          </div>
          <div v-for="superItem in userInfo.menuList" :key="superItem.id" :class="[superItem.isActive ? 'menu-selected' : '', 'menu-item-list']" @click="menuChange(userInfo.menuList, superItem)">
            <i :class="superItem.icon" class="menu-icon"></i>
            <span class="menu-name">{{ superItem.name }}</span>
          </div>
        </div>
      </div>
      <div class="menu-sidebar-container" v-show="menuSidebar && collapsed">
        <div class="menu-sidebar">
          <div class="search-container">
            <a-input class="search-input home-search-menu" v-model="search.name" @change="onKeywordChange" placeholder="请输入关键词">
              <a-icon slot="prefix" type="search" @click="onKeywordChange" />
            </a-input>
            <a-icon type="close" @click.native="collapsed = false" class="close-side" />
          </div>
          <div class="favorite-menu" v-if="menuSearchActive">
            <div class="favorite-menu-title">收藏菜单</div>
            <div class="menu-collect-box">
              <div class="favorite-menu-conect" v-for="superItem in collections" :key="superItem.id">
                <div v-for="subItem in superItem.children" :key="subItem.id" :class="[subItem.isActive ? 'menu-selected' : '']" @click="handleFavoritesClick({ superItem, subItem }, $event)">
                  <div class="tool-box">
                    <span class="menu-title" :title="subItem.name">{{ subItem.name }}</span>
                    <img src="../assets/icon/icon_menu_star_active@2x.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="favorite-menu">
            <!-- <div class="favorite-menu-title">最近访问</div> -->
            <!-- <div class="favorite-menu-conect">
              <span> 请款报销列表 </span>
              <div class="span" @click.stop="handleFavorites">
                <img v-if="noFavorites" src="../assets/icon/icon_menu_star_active@2x.png" alt="" />
                <img v-else src="../assets/icon/icon_menu_star_default@2x.png" alt="" />
              </div>
            </div> -->
          </div>
          <div class="search-results" v-if="search.name">
            共找到<span>{{ menuItemList.length }}</span> 个与<span>{{ search.name }}</span> 相关的菜单
          </div>
          <menu-item v-model="menuItemList" :handleClick="handleClick" :handleFavorites="handleFavorites" :itemMenuValue="itemMenuValue"></menu-item>
        </div>
        <div class="menu-sidebar-vacancy" v-if="menuSidebar" @click.stop="collapsed = false"></div>
      </div>

      <div class="main-container">
        <div class="main-router">
          <router-view ref="iframe" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from '../components/menuItem.vue'
import { getUserInfo, menuCollect, menuSearch } from 'Service'
import { getToken, openSubSystem, setToken, http, isUrl } from 'Config/util'
import { getQueryString, deleteQueryString } from 'nearby-common'
import store from 'Config/store/store'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  created() {
    const menus = this.userInfo.menuList || []
    const items = []
    this.collectionHandle()
    menus.forEach((e) => {
      items.push(...e.children)
    })
    let currentPath = this.$route.path
    if (currentPath.startsWith('/frame/')) {
      currentPath = currentPath.slice(6)
    }
    const menu = items.find((e) => e.path === currentPath)
    if (!menu) {
      this.menuSearchActive = true //默认选中菜单
      this.menuSidebar = true
      return
    }
    this.openKeys = menu.superId
    this.defaultKeys = menu.id
    this.userInfo.menuList.forEach((item, index) => {
      // 菜单还原
      if (item.id === menu.superId) {
        this.menuChange(this.userInfo.menuList, item)
        if (item.children && item.children.length) {
          item.children
            .filter((child) => {
              return child.display == 1
            })
            .forEach((row, itemIndex) => {
              if (row.id === menu.id) {
                let data = {
                  superItem: item,
                  subItem: row,
                  index: itemIndex,
                  i: 0
                }
                this.itemMenuValue = data
              }
            })
        }
      }
    })
  },
  data() {
    return {
      openKeys: null,
      defaultKeys: null,
      collapsed: false, // 父菜单控制隐藏
      search: {
        name: '',
        collapsed: false
      },
      prePath: null,
      sysName: null,
      noFavorites: true,
      collections: [],
      menuItemList: [],
      menuSidebar: false, // 子菜单显示隐藏
      menuSearchActive: false, // 菜单搜索是否选中
      itemMenuValue: {} // 索引数据
    }
  },
  computed: {
    ...mapGetters(['getLoading', 'getBreadCrumbs']),
    userInfo: {
      get() {
        let userInfo = store.state.userInfo
        //userInfo.menuList = userInfo.menuList.filter((item) => (item.children = item.children.filter((el) => el.display == 1)))
        return userInfo
      },
      set(val) {
        store.commit('updateUser', val)
      }
    },
    srcHerf() {
      return `https://ooa.lianlianlvyou.com/?token=${getToken()}#/`
    },
    defaultSelectedKeys() {
      return this.$route.path
    }
  },
  watch: {
    $route(val, v) {
      // console.log(val,v)
      this.prePath = val.path
      this.sysName = val.query.sysName
    }
  },
  beforeRouteEnter(to, f, next) {
    const urlToken = getQueryString('token')
    if (urlToken) {
      setToken(urlToken)
      let href = location.href
      href = deleteQueryString(href, 'token')
      location.href = href
    }
    const token = getToken()
    if (!token) {
      next('/login')
      return
    }
    getUserInfo()
      .then((res) => {
        store.commit('updateUser', res)
        next()
      })
      .catch(() => {
        next('/login')
      })
  },
  methods: {
    // 下载浏览器
    downloadChrome() {
      window.open(this.downloadChromeUrl, '_blank')
    },
    onSearchClick() {
      if (this.collapsed) {
        this.onToggleCollapse()
      }
    },
    handleLogout() {
      this.$confirm({
        centered: true,
        title: '退出登录',
        content: '确定要退出登录吗？',
        okText: '确定退出',
        cancelText: '取消',
        onOk: () => {
          http.defaults.headers['Authorization'] = ''
          this.userInfo = {}
          this.$store.dispatch('clearBreadCrumbs')
          setToken('')
          this.$router.push('/login')
        },
        onCancel() {}
      })
    },
    menuChange(arr = [], item) {
      this.menuItemList = []
      this.search.name = ''
      let seletArr = this.selectdStyle(arr, item)
      this.menuSearchActive = false
      if (item) {
        this.openKeys = item.id
        let el = item.children.filter((el) => el.display == 1)
        this.menuItemList.push({
          ...item,
          children: el
        })
      } else {
        this.openKeys = null
        this.menuSearchActive = true
      }
      // this.$store.dispatch('setBreadCrumbs', item)
      this.menuSidebar = true
    },
    onKeywordChange(v) {
      if (v)
        return new Promise((resolve, reject) => {
          let params = {
            name: this.search.name,
            menuId: this.openKeys
          }
          menuSearch(params)
            .then((res) => {
              this.menuItemList = res || []
              this.menuItemList = this.menuItemList.filter((item) => (item.children = item.children.filter((el) => el.display == 1)))
              resolve(res)
            })
            .catch((e) => {
              reject(e)
            })
        })
    },
    goHome() {
      this.$router.push('/')
    },
    onToggleCollapse() {
      this.collapsed = !this.collapsed
      this.openKeys = null // 关闭所有打开的二级菜单，防止二级菜单飘窗
    },
    handleClick({ superItem, subItem }, event) {
      // debugger
      // 再次点击
      // console.dir(event)
      // if (subItem.display == 0) return
      this.$store.dispatch('setLoading', true)
      // this.$store.dispatch('setBreadCrumbs', {})
      this.$refs.iframe.loading = false
      // 当前系统路径
      const { alias = '', path = '' } = superItem
      if (isUrl(path)) {
        this.$nextTick(() => {
          // 当前页面路径
          const { path } = subItem
          const iframeDom = this.$refs.iframe.$refs.frame
          // this.$store.dispatch('setBreadCrumbs', { alias, path })
          openSubSystem(alias, subItem.path, null, subItem.query)
          // 重复点击
          if (this.prePath && this.prePath.indexOf(path) !== -1) {
            //
            setTimeout(() => {
              this.$refs.iframe.loading = true
              this.$refs.iframe.parseRouter()
            }, 1000)
            return
          }
        })
        if (this.sysName && alias === this.sysName) this.$refs.iframe.parseRouter()
      } else {
        const { alias, path } = subItem
        if (alias === 'oa') return (window.location.href = `${path}?token=${getToken()}`)
        this.$router.push({
          path: subItem.path
        })
      }
      this.collapsed = false
      // debugger
    },
    // 收藏功能
    handleFavorites(item) {
      menuCollect({ menuId: item.id })
        .then(() => {
          item.collection ? (item.collection = 0) : (item.collection = 1)
          if (item.collection) {
            this.userInfo.collectionList.push(item)
          } else {
            this.userInfo.collectionList.forEach((row, index) => {
              if (row.id === item.id) {
                this.userInfo.collectionList.splice(index, 1)
              }
            })
          }
          this.collectionHandle()
        })
        .catch(() => {})
    },
    // 收藏区域跳转
    handleFavoritesClick({ superItem, subItem }, $event) {
      let arr = this.selectdStyle(superItem.children, subItem)
      this.handleClick({ superItem, subItem }, $event)
    },
    collectionHandle() {
      if (this.userInfo.collectionList && this.userInfo.collectionList.length) {
        // 处理收藏
        this.userInfo.collectionList.forEach((item, i) => {
          this.userInfo.menuList.forEach((list) => {
            if (list.id === item.superId) {
              this.collections[i] = {
                ...list,
                id: item.id,
                children: [
                  {
                    ...item
                  }
                ]
              }
            }
          })
        })
      }
    },
    // 选中样式
    selectdStyle(arr = [], item) {
      arr.forEach((row) => {
        this.$set(row, 'isActive', false)
      })
      if (item) {
        let index = arr.indexOf(item)
        this.$set(arr[index], 'isActive', true)
      }
      return arr
    },
    mainClick() {
      console.log(1111)
    },
    // 面包屑
    breadcrumbClick(v) {
      console.log(v)
      let pathCrumbs = v.path
      let { path } = this.$route
      let { children } = this.getBreadCrumbs
      if (path === pathCrumbs) return false
      //保留点击之前导航层级数
      let i = children.indexOf(v)
      let len = children.length
      let priorToDifference = len - (i + 1)
      if (priorToDifference >= 0 && i !== 0) {
        let newchild = children.slice(0, priorToDifference)
        let breadCrumbs = ''
        for (let i = 0; i < newchild.length; i++) {
          let el = newchild[i]
          breadCrumbs += `,${el.path}`
        }
        v = {
          ...v,
          query: {
            ...v.query,
            breadCrumbs
          }
        }
        this.$router.go(-1)
        return
      }
      this.handleClick({ superItem: this.getBreadCrumbs, subItem: v })
    }
  },
  components: {
    MenuItem
  }
}
</script>

<style scoped lang="less">
@header-height: 50px;
.assistant-list {
  padding: 14px;
  // text-align: center;
  background-color: #fff;
  white-space: nowrap;
  .code-title {
    margin-bottom: 8px;
    margin-left: 3px;
  }
  .assistant-code {
    width: 111px;
    height: 111px;
  }
}
.download-browser {
  padding: 0 14px;
  img {
    width: 48px;
    height: 48px;
  }
  div {
    cursor: pointer;
  }
}
.userImgPopover {
  img {
    width: 39px;
    height: 39px;
    border-radius: 50%;
  }
}
.f-right {
  margin-left: 12px;
}
.usercolor {
  color: #4c84ff;
}
.userInfo {
  padding: 0 14px;
  border-bottom: 1px solid #f6f6f6;
}
.logout {
  height: 40px;
  background: #f6f6f6;
  color: #ff8712;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  &:hover {
    color: @primary-color;
  }
}
.ant-breadcrumb {
  height: @header-height;
  line-height: @header-height;
  .breadcrumb-item {
    // width: 116px;
    // height: 50px;
    display: inline-block;
    // margin-left: 20px;
    -webkit-transform: skew(-40deg);
    background: linear-gradient(90deg, #f6f6f6 0%, #ffffff 100%);
    padding: 0 31px 0 29px;
    .ant-breadcrumb-link {
      span {
        display: inline-block;
        transform: skew(40deg);
      }
    }
  }
  .breadcrumb-home {
    display: inline-block;
    width: 68px;
    text-align: center;
    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
}
.home {
  height: 100%;
  position: relative;
  .title-bar {
    display: flex;
    // position: absolute;
    // top: 0;
    // left: 0;
    height: @header-height;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
    text-align: center;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    .title-left {
      height: 50px;
      width: 50px;
      text-align: center;
      line-height: 50px;
      background-color: #4c84ff;
      cursor: pointer;
      .collapse-icon {
        font-size: 18px;
        color: #fff;
      }
    }
    .title-mid {
      flex: 1;
      text-align: left;
      line-height: @header-height;
    }
    .title-right {
      // flex: 1;
      line-height: @header-height;
      display: flex;
      // align-items: center;
      text-align: right;
      padding-right: 16px;
      .assistant {
        margin-right: 13px;
      }
      .logoImg {
        img {
          width: 144px;
          height: 20px;
        }
      }
      .user {
        margin-left: 35px;
      }
      // .logout {
      //   cursor: pointer;
      //   &:hover {
      //     color: @primary-color;
      //   }
      // }
      .userImg {
        margin-left: 10px;
        img {
          width: 26px;
          height: 26px;
          // background: #e5e4e4;
          box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
          border-radius: 50%;
        }
      }
    }
  }
  .container {
    position: relative;
    display: flex;
    height: calc(100% - @header-height);
  }
  // display: flex;
  .side-bar {
    position: fixed;
    width: 200px;
    flex-shrink: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: @color-menu;
    color: #fff;
    transition: width 0.1s ease-out;
    padding-bottom: 50px;
    .logo-container {
      cursor: pointer;
      height: @header-height;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      border-bottom: 1px solid #417cff;
      justify-content: center;
      .logo {
        border-radius: 100%;
        height: 26px;
        width: 26px;
      }
      .sys-title {
        margin-left: 10px;
        white-space: nowrap;
        word-break: keep-all;
      }
    }
    .menu-container {
      height: 100%;
      overflow: hidden auto;
      .search-container {
        cursor: pointer;
        height: 62px;
        width: 100%;
        box-sizing: border-box;
        background-color: transparent;
        padding: 14px;
        .search-input {
          border-radius: 34px;
          overflow: hidden;
        }
      }
      .menu-item-list {
        padding-left: 30px;
        height: 50px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
      .menu-selected {
        background-color: #6c9aff;
      }
      .menu-icon {
        font-size: 16px;
        margin-right: 10px;
      }
    }
  }
  .main-container {
    height: 100%;
    width: 100%;

    .main-router {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 15px 15px 15px;
    }
  }
  .menu-sidebar-container {
    // position: relative;
    position: absolute;
    left: 200px;
    width: calc(100% - 200px);
    height: 100%;
    display: flex;
    .menu-sidebar {
      width: 643px;
      height: 100%;
      background: #6c9aff;
      padding: 25px 36px;
      overflow: auto;
      .favorite-menu {
        color: #fff;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        .favorite-menu-title {
          font-size: 16px;
          margin: 20px 0;
        }
        .menu-collect-box {
          display: flex;
          flex-wrap: wrap;
          .tool-box {
            display: flex;
            align-items: center;
          }
          .menu-title {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .favorite-menu-conect {
          // height: 20px;
          line-height: 34px;
          width: 29%;
          display: inline-block;
          padding: 0 8px;
          // margin-bottom: 14px;
          cursor: pointer;
          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }
        .span {
          display: inline-block;
        }
        img {
          width: 14px;
          height: 14px;
          margin-left: 20px;
        }
      }
      .search-results {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        margin: 20px 0;
        span {
          // width: 18px;
          height: 14px;
          background: #ffffff;
          opacity: 0.5;
          color: #333333;
          line-height: 14px;
          padding: 0 5px;
          margin: 0 3px;
          font-weight: 500;
        }
      }
      .serach-menu-title {
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;
        margin: 20px 0 13px 0px;
      }
      .search-menu-child {
        // padding: 20px;
      }
      .search-menu-child-title {
        display: inline-block;
        min-width: 166px;
        line-height: 34px;
        color: #ffffff;
        padding: 0 0px 0 8px;
        margin-right: 20px;
        margin-bottom: 14px;
        cursor: pointer;
        .span {
          display: none;
        }
        &:hover {
          background: rgba(255, 255, 255, 0.1);
          .span {
            display: inline-block;
          }
        }
        img {
          width: 14px;
          height: 14px;
          margin-left: 20px;
          margin-right: 20px;
        }
      }
      .close-side {
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        position: absolute;
        top: 18px;
        // right: 14px;
      }
    }
    .menu-sidebar-vacancy {
      flex: 1;
    }
  }
}
</style>
