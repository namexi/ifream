import {
  getSystem
} from '../system'
import router from '@/router'

/**
 * 判断是否为空，额外校验了字符串undefined和字符串null
 * @param t target 要校验的参数
 * @return {boolean}
 */
export function isNil(t) {
  if (typeof t === 'undefined' || t === null || t === 'undefined' || t === 'null') {
    return true
  } else if (t instanceof Array) {
    return t.length === 0
  } else if (typeof t === 'string') {
    return t.replace(/(^\s*)|(\s*$)/g, '').length === 0
  }
}

/**
 * 跳转到子系统
 * @param name 子系统名称
 * @param url 子系统路由地址
 * @param query 路由参数query
 */
export function openSubSystem(name, url, params, query = {}) {
  const system = getSystem(name)
  if (!system) return
  let path = '/frame' + url
  if (params && typeof params == 'object') {
    for (let k in params) {
      path += `/${params[k]}`
    }
  }
  router.push({
    path,
    query: {
      ...query,
      sysName: name,
    },
  })
}

//新窗口
export function openNewSystem(name, url, query = {}) {
  const system = getSystem(name)
  if (!system) return
  let queryStr = ''
  for (let k in query) {
    queryStr = queryStr + `${k}=${query[k]}&`

  }
  window.open(`./index.html#/frame${url}?${queryStr}sysName=${name}`)
}

export function isUrl(url = '') {
  if (typeof url === 'string') {
    return url.startsWith('http://') || url.startsWith('https://')
  }
  return false
}

// 微信授权登录
export function wxAuthLogin(appId, redirectUrl, silence = 1, state = '') {
  const scope = silence ? 'snsapi_base' : 'snsapi_userinfo'
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
  window.location.replace(url)
}
