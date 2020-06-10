import { getQueryString, ApiParser, Mscf } from 'nearby-common'
import { isDebug, isDev, isTest } from '@/config/util/env'

export const wxLoginUrl = `https://cd-nt.lianlianlvyou.com/?isOaWeb=1&versionCode=${getQueryString('v')}#/redirectUrl`
export const wxCallBackUrl = 'https://nb-oa-web.lianlianlvyou.com/#/login' // 扫码登录回调地址
export const wxAuthCallBackUrl = 'https://cd-nt.lianlianlvyou.com/?isOaWeb=1#/redirectUrl' // 微信授权登录回调地址
export const currentHost = `${location.protocol}//${location.host}`
let baseUrl = 'https://oa.lianlianlvyou.com'

if (isDev) {
  baseUrl = 'http://192.101.50.134:8080'
} else if (isTest) {
  baseUrl = 'http://192.167.246.37:8188'
}

export const BASE_URL = baseUrl

export const parser = new ApiParser(isDebug)

const mscfInstance = new Mscf({ role: 'father', token: 'nearby', name: 'foundation' })

export const mscf = mscfInstance
