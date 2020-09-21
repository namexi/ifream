import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

// const originalReplace = Router.prototype.replace;
// Router.prototype.replace = function replace(location) {
//     return originalReplace.call(this, location).catch(err => err);
// }
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'welcome',
      component: (resolve) => require(['Pages/index'], resolve),
      children: [
        {
          path: '/welcome',
          name: 'welcome',
          component: (resolve) => require(['Pages/welcome/welcome'], resolve)
        },
        {
          path: '/frame/*:path',
          name: 'subSystem',
          component: (resolve) => require(['Pages/frame'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['Pages/login/login'], resolve)
    },
    {
      path: '/wxLogin',
      name: 'wxLoginCallBack',
      component: (resolve) => require(['Pages/login/login'], resolve)
    },
    {
      path: '/user/login',
      name: 'accountLogin',
      component: (resolve) => require(['Pages/login/accountLogin'], resolve)
    },
    { path: '*', redirect: '/' }
  ]
})
export default router
