<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log(process.env)
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
