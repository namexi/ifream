<template>
  <div class="login" login>
    <div class="bg-container">
      <img src="@/assets/img/login_bg.png" alt="" class="bg" />
      <div class="title-container">
        <img src="@/assets/icon/logo.png" alt="" class="logo-img" />
        <span class="title-name">联联周边游产品系统</span>
      </div>
    </div>
    <div class="login-card-container">
      <div class="login-card">
        <div class="logo-container">
          <img src="@/assets/icon/logo_dark.png" @click="jumpAccountLogin" alt="" class="logo-img-dark" />
        </div>
        <div class="title-name">联联周边游</div>
        <div class="login-way">
          <div id="wx-container" v-show="scene === 'web'"></div>
          <a-spin :spinning="loading" v-if="scene === 'account'">
            <account-login okText="绑定" @submit="onBind"></account-login>
          </a-spin>
          <div v-else-if="scene === 'wx'" class="during-login">登录中<span class="dota">...</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuthAppId, loginWithCode as wxLoginWithCode, wxBind } from 'Service'
import { isInWechat, isNil, wxCallBackUrl, isProd, wxAuthLogin, wxAuthCallBackUrl, setToken, http } from 'Config/util'
import { getQueryString, addQueryString } from 'nearby-common'
import { AccountLogin } from 'Components'
export default {
  name: 'login',
  components: { AccountLogin },
  created() {
    setToken('')
    this.checkRoute()
  },
  watch: {
    $route() {
      this.checkRoute()
    }
  },
  data() {
    return {
      loading: false,
      platform: 1,
      scene: 'account', // web网页扫码登录 wx自动登录 account账号密码登录
      uid: ''
    }
  },
  methods: {
    jumpAccountLogin() {
      if (!isProd) {
        this.$router.push('/user/login')
      }
    },
    checkRoute() {
      const wxCode = getQueryString('code')
      if (!isNil(wxCode)) {
        // 网址query上的code是微信自动登录来的
        this.platform = 2
        return this.loginWithCode(wxCode)
      }
      const { code } = this.$route.query
      if (!isNil(code)) {
        // 路由query上的code是通过扫码跳转的
        this.platform = 1
        return this.loginWithCode(code)
      }
      if (isInWechat) {
        // 在微信环境直接登录
        this.platform = 2
        this.scene = 'wx'
        this.autoLogin()
      } else {
        // 扫码登录
        this.platform = 1
        this.scene = 'web'
        this.requestQrCode()
      }
    },
    onBind({ userName, password }) {
      this.loading = true
      wxBind(userName, password, this.uid).then((res) => {
        this.loginSuccess(res.token)
        this.loading = false
      })
    },
    loginSuccess(token = '') {
      setToken(token)
      http.defaults.headers['Authorization'] = token
      this.$router.replace('/')
    },
    loginWithCode(code) {
      wxLoginWithCode(code, this.platform).then((res) => {
        const errCode = parseInt(res.code)
        switch (errCode) {
          case 1:
            // 1是微信登录出错，需要重新扫码
            location.reload()
            break
          case 2:
            // 未绑定账号，需要授权绑定
            this.$message.error(res.message)
            this.uid = res.token.id
            this.scene = 'account'
            break
          default:
            // 登录成功
            this.loginSuccess(res.data.token)
            break
        }
      })
    },
    requestQrCode() {
      // 扫码在微信生态属于网站应用登录，需要从服务器获取appId去请求二维码
      getAuthAppId(this.platform).then((res) => {
        if (!res.appId) return
        const appId = res.appId || ''
        if (!appId) return
        const href = `${isProd ? location.href : wxCallBackUrl}`
        // eslint-disable-next-line
        new WxLogin({
          self_redirect: false,
          id: 'wx-container',
          appid: appId,
          scope: 'snsapi_login',
          redirect_uri: encodeURIComponent(href),
          state: '123456',
          style: '',
          href: 'https://cdn.lianlianlvyou.com/lib/css/qr_code.css'
        })
      })
    },
    autoLogin() {
      getAuthAppId(this.platform).then((res) => {
        const appId = res.appId || ''
        if (!appId) return
        const versionCode = getQueryString('v') || '233'
        const url = addQueryString(wxAuthCallBackUrl, 'versionCode', versionCode)
        const callback = encodeURIComponent(url)
        wxAuthLogin(appId, callback, 0, '123456')
      })
    }
  }
}
</script>

<style lang="less">
#wx-container {
  height: 100%;
  iframe {
    height: 100%;
    width: 100%;
  }
}
.login[login] {
  height: 100%;
  width: 100%;
  position: relative;
  .bg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 74px;
    padding-left: 46px;
    .bg {
      position: absolute;
      height: 100%;
      width: auto;
      top: 0;
      left: 0;
    }
    .title-container {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      .logo-img {
        width: 63px;
        height: 63px;
        margin-right: 22px;
      }
      .title-name {
        color: #fff;
        font-size: 30px;
      }
    }
  }
  .login-card-container {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    padding-right: 210px;
    align-items: center;
    justify-content: flex-end;
    .login-card {
      width: 500px;
      height: 500px;
      box-shadow: 0 0 45px 0 rgba(203, 203, 203, 0.45);
      border-radius: 20px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 24px 40px;
      display: flex;
      flex-direction: column;
      .logo-container {
        display: flex;
        justify-content: center;
        .logo-img-dark {
          width: 61px;
          height: 61px;
        }
      }
      .title-name {
        text-align: center;
        font-size: 32px;
        margin-top: 18px;
        color: #53ade8;
        font-weight: 500;
      }
      .login-way {
        height: 100%;
      }
    }
  }
  @media (max-width: @media-small-device) {
    .bg-container {
      padding: 0;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      .title-container {
        display: none;
      }
    }
    .login-card-container {
      padding: 0;
      justify-content: center;
      .login-card {
        width: 70vw;
        height: fit-content;
        .login-way {
          .during-login {
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
