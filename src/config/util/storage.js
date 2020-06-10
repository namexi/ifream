import { getSession, setSession } from 'nearby-common'

export function getToken() {
  return getSession('token') || ''
}

export function setToken(token) {
  setSession('token', token)
}

export function setUserInfo(userInfo) {
  setSession('userInfo', userInfo)
}

export function getUserInfo() {
  return getSession('userInfo')
}
