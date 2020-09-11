/* eslint-disable */
import {mscf,openSubSystem} from './util'
import {message} from 'ant-design-vue'
import {getSystem} from '@/config/system'
import {compile} from 'path-to-regexp'
import router from '@/router'
import {addQueryString} from 'nearby-common'
import store from '@/config/store/store.js'
import _ from 'lodash'
message.config({
  duration:6
})
function getPath(route, params) {
  let toPath = compile(route)
  return toPath(params)
}
mscf.on('toast.error', (e) => {
  message.error(e.data)
})
mscf.on('toast.success', (e) => {
  message.success(e.data)
})
mscf.on('toast.warning', (e) => {
  message.warning(e.data)
})

// 某个系统想跳转到其他子系统
mscf.on('redirect', (e) => {
  const {target,page,params,query} = e.data
  const system = getSystem(target)
  if (!system) return console.error(`Unregistered system: "${target}"!`)
  let targetPage = system.pages[page]
  if (!targetPage) {
    return console.error(`Invalid target page: "${page}"!`)
  }
  targetPage = getPath(targetPage, params)
  openSubSystem(target, targetPage, query)
})

const handler = _.debounce((e) => {
  let path = e.data
  const lastPath = sessionStorage.getItem('last-path')
  if (lastPath && lastPath === path) return
  console.log('父系统收到的消息，需要跳转：')
  console.log(path)
  store.dispatch('setLoading',false)
  sessionStorage.setItem('last-path', path)
  path = addQueryString(path, 'sysName', e.origin)
 
  path = '/frame' + path
  router.replace(path)
  
}, 200)
// 子系统切换了域名
mscf.on('routeChange', handler)

// 401 跳转登陆页
mscf.on('loginExpire', () => {
  message.error('用户已失效，请重新授权登录！')
  router.push('/login')
})
