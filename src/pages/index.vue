<template>
  <div class="home">
    <div class="side-bar" :class="collapsed ? 'fold' : 'unfold'">
      <div class="logo-container">
        <img src="../assets/icon/logo.png" alt="" class="logo" />
        <div class="sys-title" v-if="!collapsed">联联周边游产品系统</div>
      </div>
      <div class="menu-container no-scroll-bar" :class="collapsed ? 'fold' : 'unfold'">
        <a-menu :open-keys="openKeys" mode="inline" :inline-collapsed="collapsed" theme="dark" @openChange="onOpenChange">
          <a-sub-menu v-for="i in 10" :key="'sub' + i">
            <span slot="title">
              <a-icon type="mail" /><span>Navigation {{ i }}</span></span
            >
            <a-menu-item v-for="j in 10" :key="'i' + i + j"> Option {{ j }} </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
    </div>
    <div class="main-container">
      <div class="title-bar">
        <div class="title-left" @click="onToggleCollapse">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" class="collapse-icon" />
        </div>
        <div class="title-right">
          <a-dropdown placement="bottomCenter">
            <a class="assistant ant-dropdown-link" href="javascript:;">联系技术助理</a>
            <div slot="overlay" class="assistant-list">
              <div>微信扫一扫，添加助理微信</div>
              <img src="../assets/qrcode/ass1.png" class="assistant-code" alt="assistant" />
              <img src="../assets/qrcode/ass2.png" class="assistant-code" alt="assistant" />
              <img src="../assets/qrcode/ass3.png" class="assistant-code" alt="assistant" />
            </div>
          </a-dropdown>
          <span class="user">刘逍simon</span>
          <span class="logout">[退出]</span>
        </div>
      </div>
      <div class="main-router">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { getSession } from 'nearby-common'
export default {
  name: 'index',
  created() {},
  data() {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10'],
      openKeys: ['sub1'],
      collapsed: false
    }
  },
  beforeRouteEnter(to, f, next) {
    const token = getSession('token')
    if (!token) {
      next('/login')
      // next()
    } else {
      next()
    }
  },
  methods: {
    onToggleCollapse() {
      this.collapsed = !this.collapsed
    },
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
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
    transition: width 0.5s ease-out;
    .logo-container {
      height: @header-height;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      border-bottom: 1px solid #417cff;
      justify-content: center;
      .logo {
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
    }
    &.fold {
      width: 80px;
    }
  }
  .main-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    .title-bar {
      height: @header-height;
      background-color: #fff;
      box-shadow: 0 0 5px 0 rgba(79, 79, 79, 0.15);
      display: flex;
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
      padding: 15px;
    }
  }
}
</style>
