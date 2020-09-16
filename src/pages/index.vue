<template>
  <div class="home">
    <div class="side-bar" :class="collapsed ? 'fold' : 'unfold'">
      <div class="logo-container" @click="goHome">
        <img src="../assets/icon/logo.png" alt="" class="logo" />
        <!--<img :src="userInfo.headimgurl" alt="" class="logo" />-->
        <div class="sys-title" v-if="!collapsed">联联周边游产品系统</div>
      </div>
      <div class="menu-container no-scroll-bar" :class="collapsed ? 'fold' : 'unfold'">
        <div class="search-container" @click="onSearchClick">
          <div v-if="collapsed" class="home-search-menu">
            <a-icon style="font-size: 16px;" type="search" />
          </div>
          <a-input v-else class="search-input home-search-menu" v-model="search.keyword" @change="onKeywordChange" placeholder="菜单搜索">
            <a-icon slot="prefix" type="search" />
          </a-input>
        </div>
        <template v-if="!search.keyword">
          <a-menu :open-keys="openKeys" mode="inline" :inline-collapsed="collapsed" :defaultSelectedKeys="defaultKeys" theme="dark" @openChange="onOpenChange">
            <a-sub-menu v-for="superItem in userInfo.menuList" :key="superItem.id">
              <span slot="title">
                <i :class="superItem.icon" class="menu-icon"></i>
                <span class="menu-name">{{ superItem.name }}</span>
              </span>
              <a-menu-item v-for="subItem in superItem.children" :key="subItem.id" @click.native.stop="onClick({ superItem, subItem })">
                <div style="font-size: 13px;">{{ subItem.name }}</div>
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
              <a-menu-item v-for="subItem in superItem.children" :key="subItem.id" @click.native="onClick({ superItem, subItem })">
                <div style="font-size: 13px;">{{ subItem.name }}</div>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </template>
      </div>
    </div>
    <div class="main-container">
      <div class="title-bar">
        <div class="title-left" @click="onToggleCollapse">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="collapse-icon" />
        </div>
        <div class="title-right">
          <a class="user" :href="srcHerf" target="_blank">回到旧版</a>
          <a-dropdown placement="bottomCenter">
            <a class="assistant ant-dropdown-link" href="javascript:;">联系技术助理</a>
            <div slot="overlay" class="assistant-list">
              <div>微信扫一扫，添加助理微信</div>
              <img src="../assets/qrcode/ass1.png" class="assistant-code" alt="assistant" />
              <img src="../assets/qrcode/ass2.png" class="assistant-code" alt="assistant" />
              <img src="../assets/qrcode/ass3.png" class="assistant-code" alt="assistant" />
            </div>
          </a-dropdown>
          <!-- <span class="user">{{ userInfo.name }}</span> -->
          <a-popover class="user">
            <template slot="content">
              <p v-for="(items,i) in userInfo.deptPositionName" :key="i">{{items}}</p>
              <!-- <p>Content</p> -->
            </template>
            <span>
              {{ userInfo.name }}
            </span>
          </a-popover>
          <span class="logout" @click="handleLogout">[退出]</span>
        </div>
      </div>
      <div class="main-router">
        <router-view ref="iframe" />
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from 'Service'
import { getToken, openSubSystem, setToken, http, isUrl } from 'Config/util'
import { getQueryString, deleteQueryString } from 'nearby-common'
import store from 'Config/store/store'
export default {
  name: 'home',
  created() {
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
      }
    }
  },
  computed: {
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
    srcHerf(){
      return `https://ooa.lianlianlvyou.com/?token=${getToken()}#/`
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
    onClick({ superItem, subItem }) {
      // debugger
      // 再次点击
      console.log('点击')
      this.$store.dispatch('setLoading',true)
      this.$refs.iframe.loading = false
      const { alias = '', path = '' } = superItem
      if (isUrl(path)) {
        openSubSystem(alias, subItem.path)
        this.$refs.iframe.parseRouter()
      } else {
        this.$router.push(subItem.path)
      }
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
    }
  }
}
</script>

<style scoped lang="less">
@header-height: 55px;
.assistant-list {
  text-align: center;
  background-color: #fff;
  white-space: nowrap;
  .assistant-code {
    width: 200px;
    height: 200px;
  }
}
.home {
  height: 100%;
  display: flex;
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
    position: relative;
    .title-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: @header-height;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 0 5px 0 rgba(79, 79, 79, 0.15);
      // display: flex;
      display: -webkit-box;
      align-items: center;
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
      .title-right {
        display: flex;
        align-items: center;
        padding-right: 48px;
        .assistant {
          margin-right: 13px;
        }
        .user {
          margin-right: 13px;
        }
        .logout {
          cursor: pointer;
          &:hover {
            color: @primary-color;
          }
        }
      }
    }
    .main-router {
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: @header-height+15px 15px 15px;
    }
  }
}
</style>
