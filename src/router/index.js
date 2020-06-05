import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'welcome',
      component: (resolve) => require(['@pages/index'], resolve),
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: (resolve) => require(['@pages/welcome/welcome'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@pages/login/login'], resolve)
    },
    {
      path: '/wxLogin',
      name: 'wxLoginCallBack',
      component: (resolve) => require(['@pages/login/login'], resolve)
    },
    {
      path: '/user/login',
      name: 'accountLogin',
      component: (resolve) => require(['@pages/login/accountLogin'], resolve)
    },
    { path: '*', redirect: '/' }
  ]
})
export default router
