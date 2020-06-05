import { getQueryString } from 'nearby-common'
import { isDev, isTest } from '@/config/util/env'

export const wxLoginUrl = `https://cd-nt.lianlianlvyou.com/?isOaWeb=1&versionCode=${getQueryString('v')}#/redirectUrl`
export const wxCallBackUrl = 'https://nb-oa-web.lianlianlvyou.com/#/login' // 扫码登录回调地址
export const wxAuthCallBackUrl = 'https://cd-nt.lianlianlvyou.com/?isOaWeb=1#/redirectUrl' // 微信授权登录回调地址
export const currentHost = `${location.protocol}//${location.host}`
let baseUrl = 'https://oa.lianlianlvyou.com'

if (isDev) {
  baseUrl = 'http://192.167.246.37:31001'
} else if (isTest) {
  baseUrl = 'http://192.167.246.37:31001'
}

export const BASE_URL = baseUrl
