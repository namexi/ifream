import { getSession, setSession } from 'nearby-common'

export function getToken() {
  return getSession('token') || ''
}

export function setToken(token) {
  setSession('token', token)
}

export function isNil(t) {
  if (typeof t === 'undefined' || t === null || t === 'undefined' || t === 'null') {
    return true
  } else if (t instanceof Array) {
    return t.length === 0
  } else if (typeof t === 'string') {
    return t.replace(/(^\s*)|(\s*$)/g, '').length === 0
  }
}

// 微信授权登录
export function wxAuthLogin(appId, redirectUrl, silence = 1, state = '') {
  const scope = silence ? 'snsapi_base' : 'snsapi_userinfo'
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
  window.location.replace(url)
}
