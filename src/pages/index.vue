<template>
  <div class="home">
    <div class="title-bar">
      <div class="title-left" @click="onToggleCollapse">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="collapse-icon" />
      </div>
      <div class="title-mid">
        <a-breadcrumb separator="">
          <a-breadcrumb-item class="breadcrumb-home"> <img src="../assets/icon/icon_home@2x.png" alt="" @click="goHome" /> </a-breadcrumb-item>
          <!-- <a-breadcrumb-item class="breadcrumb-item" href=""> Application Center </a-breadcrumb-item> -->
          <a-breadcrumb-item class="breadcrumb-item" href=""> <span> Application List </span> </a-breadcrumb-item>
          <a-breadcrumb-item class="breadcrumb-item" href="">
            <span> An Application </span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="title-right">
        <!-- <a-button v-if="downloadChromeUrl" type="link" icon="download" size="large" @click="downloadChrome"> 下载浏览器 </a-button> -->
        <!-- <a class="user" :href="srcHerf" target="_blank">回到旧版</a> -->
        <!-- <a-dropdown placement="bottomCenter">
          <a class="assistant ant-dropdown-link" href="javascript:;">联系技术助理</a>
          <div slot="overlay" class="assistant-list">
            <div>微信扫一扫，添加助理微信</div>
            <img src="../assets/qrcode/ass1.png" class="assistant-code" alt="assistant" />
            <img src="../assets/qrcode/ass2.png" class="assistant-code" alt="assistant" />
            <img src="../assets/qrcode/ass3.png" class="assistant-code" alt="assistant" />
          </div>
        </a-dropdown> -->
        <div class="logoImg">
          <img src="../assets/icon/logo@2x.png" alt="" />
        </div>
        <!-- <span class="user">{{ userInfo.name }}</span> -->
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
              <!-- <p v-else>无需下载！！</p> -->
            </div>
            <div class="logout" @click="handleLogout">退出登录</div>
            <!-- <p>Content</p> -->
          </template>
          <span>
            {{ userInfo.name }}
          </span>
        </a-popover>
        <!-- <span class="logout" @click="handleLogout">[退出]</span> -->
        <div class="userImg">
          <img src="../assets/icon/logo_dark.png" alt="" />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="side-bar" :class="collapsed ? 'fold' : 'unfold'">
        <div class="menu-container no-scroll-bar" :class="collapsed ? 'fold' : 'unfold'">
          <!-- <div class="search-container" @click="onSearchClick">
            <div v-if="collapsed" class="home-search-menu">
              <a-icon style="font-size: 16px" type="search" />
            </div>
            <a-input v-else class="search-input home-search-menu" v-model="search.keyword" @change="onKeywordChange" placeholder="菜单搜索">
              <a-icon slot="prefix" type="search" />
            </a-input>
          </div> -->
          <div>
            <a-icon type="search" class="menu-icon" />
            <span class="menu-name">菜单搜索</span>
          </div>
          <div v-for="superItem in userInfo.menuList" :key="superItem.id">
            <i :class="superItem.icon" class="menu-icon"></i>
            <span class="menu-name">{{ superItem.name }}</span>
          </div>
          <!-- <template v-if="!search.keyword">
            <a-menu :open-keys="openKeys" mode="inline" :inline-collapsed="collapsed" :defaultSelectedKeys="defaultKeys" theme="dark" @openChange="onOpenChange">
              <a-sub-menu v-for="superItem in userInfo.menuList" :key="superItem.id">
                <span slot="title">
                  <i :class="superItem.icon" class="menu-icon"></i>
                  <span class="menu-name">{{ superItem.name }}</span>
                </span>
                <a-menu-item v-for="subItem in superItem.children" :key="subItem.id">
                  <div style="font-size: 13px; padding-left: 48px" @click="handleClick({ superItem, subItem }, $event)">{{ subItem.name }}</div>
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </template>
          <template v-else>
            <a-menu :open-keys="search.openKeys" mode="inline" :inline-collapsed="collapsed" theme="dark" @openChange="onSearchOpenChange">
              <a-sub-menu v-for="superItem in menuList" :key="superItem.id">
                <span slot="title">
                  <i :class="superItem.icon" class="menu-icon"></i>
                  <span class="menu-name">{{ superItem.name }}</span>
                </span>
                <a-menu-item v-for="subItem in superItem.children" :key="subItem.id">
                  <div style="font-size: 13px; padding-left: 48px" @click="handleClick({ superItem, subItem }, $event)">{{ subItem.name }}</div>
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </template> -->
        </div>
      </div>
      <div class="menu-sidebar" v-if="menuSidebar">
        <div class="search-container">
          <a-input class="search-input home-search-menu" v-model="search.keyword" @change="onKeywordChange" placeholder="请输入关键词">
            <a-icon slot="prefix" type="search" />
          </a-input>
        </div>
        <div class="favorite-menu">
          <div class="favorite-menu-title">收藏菜单</div>
          <div class="favorite-menu-conect">
            <span> 请款报销列表 </span>
            <img src="../assets/icon/icon_menu_star_active@2x.png" alt="" />
          </div>
        </div>
        <div class="favorite-menu">
          <div class="favorite-menu-title">最近访问</div>
          <div class="favorite-menu-conect">
            <span> 请款报销列表 </span>
            <div class="span" @click.stop="handleFavorites">
              <img v-if="noFavorites" src="../assets/icon/icon_menu_star_active@2x.png" alt="" />
              <img v-else src="../assets/icon/icon_menu_star_default@2x.png" alt="" />
            </div>
          </div>
        </div>
        <div class="search-results" v-if="search.keyword">
          共找到<span>12</span> 个与<span>{{ search.keyword }}</span> 相关的产品
        </div>
        <menu-item :noFavorites="noFavorites" v-model="userInfo.menuList" :handleClick="handleClick" :handleFavorites="handleFavorites"></menu-item>
        <!-- <div class="menu-children-list">
          <div v-for="superItem in userInfo.menuList" :key="superItem.id">
            <div class="serach-menu-title">{{ superItem.name }}</div>
            <div class="search-menu-child">
              <div v-for="subItem in superItem.children" :key="subItem.id" class="search-menu-child-title" @click.self="handleClick({ superItem, subItem }, $event)">
                {{ subItem.name }}
                <div class="span" @click.stop="handleFavorites">
                  <img v-if="noFavorites" src="../assets/icon/icon_menu_star_active@2x.png" alt="" />
                  <img v-else src="../assets/icon/icon_menu_star_default@2x.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div> -->
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
import { getUserInfo } from 'Service'
import { getToken, openSubSystem, setToken, http, isUrl } from 'Config/util'
import { getQueryString, deleteQueryString } from 'nearby-common'
import store from 'Config/store/store'
import { mapGetters } from 'vuex'
export default {
  name: 'home',
  created() {
    console.log(this.$route)
    const menus = this.userInfo.menuList || []
    const items = []
    menus.forEach((e) => {
      items.push(...e.children)
    })
    let currentPath = this.$route.path
    if (currentPath.startsWith('/frame/')) {
      currentPath = currentPath.slice(6)
    }
    const menu = items.find((e) => e.path === currentPath)
    if (!menu) return
    this.openKeys = [menu.superId]
    this.defaultKeys = [menu.id]
  },
  data() {
    return {
      openKeys: [],
      defaultKeys: [],
      collapsed: false,
      search: {
        keyword: '',
        openKeys: [],
        collapsed: false
      },
      prePath: null,
      sysName: null,
      noFavorites: true,
      menuSidebar: true
    }
  },
  computed: {
    ...mapGetters(['getLoading', 'getChildrenjump']),
    menuList() {
      return this.getSearchMenu(this.search.keyword)
    },
    userInfo: {
      get() {
        return store.state.userInfo
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
    /**
     * 通过关键字找到子菜单含有该关键字的菜单列表
     * @param kw
     * @return {[]}
     */
    getSearchMenu(kw) {
      let res = []
      let openKeys = []
      this.userInfo.menuList.forEach((superItem) => {
        let findSubItem = superItem.children.filter((e) => e.name.indexOf(kw) !== -1)
        if (findSubItem && findSubItem.length) {
          const copySuper = JSON.parse(JSON.stringify(superItem))
          openKeys.push(copySuper.id)
          copySuper.children = findSubItem
          res.push(copySuper)
        }
      })
      this.search.openKeys = openKeys
      return res
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
          setToken('')
          this.$router.push('/login')
        },
        onCancel() {}
      })
    },
    onKeywordChange() {
      this.search.openKeys = []
    },
    goHome() {
      this.$router.push('/')
    },
    onToggleCollapse() {
      this.collapsed = !this.collapsed
      this.openKeys = [] // 关闭所有打开的二级菜单，防止二级菜单飘窗
      this.search.openKeys = []
    },
    handleClick({ superItem, subItem }, event) {
      console.log(this.defaultKeys)
      // debugger
      // 再次点击
      console.dir(event)
      this.$store.dispatch('setLoading', true)
      this.$refs.iframe.loading = false
      // 当前系统路径
      const { alias = '', path = '' } = superItem
      if (isUrl(path)) {
        this.$nextTick(() => {
          // 当前页面路径
          const { path } = subItem
          const iframeDom = this.$refs.iframe.$refs.frame
          openSubSystem(alias, subItem.path)
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
        this.$router.push(subItem.path)
      }
      // this.menuSidebar = false
      // debugger
    },
    onSearchOpenChange(openKeys) {
      const keys = this.menuList.map((e) => e.id)
      const latestOpenKey = openKeys.find((key) => this.search.openKeys.indexOf(key) === -1)
      if (keys.indexOf(latestOpenKey) === -1) {
        this.search.openKeys = openKeys
      } else {
        this.search.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    onOpenChange(openKeys) {
      const keys = this.userInfo.menuList.map((e) => e.id)
      const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1)
      if (keys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    // 收藏
    handleFavorites() {
      this.noFavorites = !this.noFavorites
    },
    // 选中样式
    selectdStyle(v) {
      console.log(v)
    }
  },
  components: {
    MenuItem
  }
}
</script>

<style scoped lang="less">
@header-height: 55px;
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
      height: @header-height;
      width: @header-height;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #eee;
      cursor: pointer;
      .collapse-icon {
        font-size: 16px;
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
    width: 200px;
    flex-shrink: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: @color-menu;
    color: #fff;
    transition: width 0.1s ease-out;
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
      .menu-icon {
        font-size: 14px;
        margin-right: 10px;
      }
      &.fold {
        .menu-name {
          max-width: 0;
          opacity: 0;
          width: 0;
        }
      }
    }
    &.fold {
      width: 80px;
    }
  }
  .main-container {
    height: 100%;
    width: 100%;

    .main-router {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: @header-height+15px 15px 15px;
    }
  }
  .menu-sidebar {
    position: absolute;
    width: 643px;
    height: 100%;
    left: 200px;
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
      .favorite-menu-conect {
        height: 20px;
        line-height: 20px;
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
  }
}
</style>
