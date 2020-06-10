<template>
  <div class="accountLogin" accountLogin>
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
          <img src="@/assets/icon/logo_dark.png" alt="" class="logo-img-dark" />
        </div>
        <div class="title-name">联联周边游</div>
        <div class="login-way">
          <a-spin :spinning="loading">
            <account-login @submit="onLogin"></account-login>
          </a-spin>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AccountLogin } from 'Components'
import { accountLogin } from 'Service'
import { setToken, http } from 'Config/util'
export default {
  name: 'accountLoginPage',
  components: { AccountLogin },
  created() {},
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onLogin({ userName, password }) {
      this.loading = true
      accountLogin(userName, password)
        .then((res) => {
          this.loading = false
          const token = res.token || ''
          setToken(token)
          http.defaults.headers['Authorization'] = token
          this.$router.replace('/')
        })
        .catch((e) => {
          console.log(e)
          this.loading = false
        })
    }
  }
}
</script>

<style scoped lang="less">
.accountLogin[accountLogin] {
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
}
</style>
