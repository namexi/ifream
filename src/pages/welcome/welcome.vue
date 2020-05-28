<template>
  <div class="welcome" welcome>
    <div style="margin-top: -100px;">
      <h2 class="welcome-title">WELCOME</h2>
      <p class="welcome-word">欢迎进入联联周边游产品系统</p>
      <img src="../../assets/img/welcome.png" alt="" class="welcome-img" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  created() {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped lang="less">
.welcome[welcome] {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  text-align: center;
  .welcome-title {
    font-size: 58px;
  }
  .welcome-word {
    font-size: 34px;
  }
  .welcome-img {
    width: 603px;
    height: 445px;
  }
}
</style>
