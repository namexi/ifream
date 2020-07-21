<template>
  <div class="frame-container" frame>
    <template v-if="url">
      <iframe :src="url" frameborder="0" class="frame" ref="frame"></iframe>
    </template>
    <template v-else>
      <page404 />
    </template>
  </div>
</template>

<script>
import { getToken } from 'Config/util'
import { getSystem } from 'Config/system'
import { json2params, addQueryString, deleteQueryString } from 'nearby-common'
import Page404 from 'Pages/Page404'
export default {
  name: 'frame',
  components: { Page404 },
  created() {
    this.parseRouter()
  },
  data() {
    return {
      url: '',
      sysName: '',
      system: null
    }
  },
  watch: {
    $route(val) {
      this.parseRouter()
    }
  },
  beforeRouteEnter(to, f, next) {
    next((vm) => {
      vm.parseRouter()
    })
  },
  methods: {
    parseRouter() {
      const { sysName } = this.$route.query
      if (!sysName) return console.error('没有找到系统')
      const system = getSystem(sysName) // 从query上解析出要跳转到哪个系统
      if (!system) return console.error('没有找到系统')
      this.system = system
      this.getPath()
    },
    getPath() {
      this.$nextTick(() => {
        if (!this.system) return
        let path = this.$route.path
        path = path.substr(6) // 解析出子应用路由
        let url = this.system.url
        url = deleteQueryString(url, 'token')
        url = addQueryString(url, 'token', getToken())
        const queryStr = this.stringifyQuery()
        this.url = `${url}#${path}${queryStr}`
      })
    },
    stringifyQuery() {
      const query = this.$route.query
      if (!query) return ''
      let copyQuery = JSON.parse(JSON.stringify(query))
      delete copyQuery.sysName
      delete copyQuery._r
      return '?' + json2params(copyQuery)
    }
  }
}
</script>

<style scoped lang="less">
.frame-container[frame] {
  width: 100%;
  height: 100%;
  .frame {
    height: 100%;
    width: 100%;
  }
}
</style>
