import { mscf, openSubSystem } from './util'
import { message } from 'ant-design-vue'
import { getSystem } from '@/config/system'
import { compile } from 'path-to-regexp'
import router from '@/router'
import { addQueryString } from 'nearby-common'

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
  const { target, page, params, query } = e.data
  console.log(e.data)
  const system = getSystem(target)
  if (!system) return console.error(`Unregistered system: "${target}"!`)
  let targetPage = system.pages[page]
  if (!targetPage) {
    return console.error(`Invalid target page: "${page}"!`)
  }
  targetPage = getPath(targetPage, params)
  openSubSystem(target, targetPage, query)
})

// 子系统切换了域名
mscf.on('routeChange', (e) => {
  let path = e.data
  path = '/frame' + addQueryString(path, 'sysName', e.origin)
  router.replace(path)
})
