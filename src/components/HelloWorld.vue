<template>
  <div>
    <h1 class="hello">{{ msg }}</h1>
    <a-button type="primary">按钮</a-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    test () {
      console.log(111)
    }
  }
}
</script>

<style scoped lang="less">
  @color: #6cf;
  .hello{
    color: @color;
  }
</style>
