/* eslint-disable */
import { getQueryString, ApiParser } from 'nearby-common'

import Mscf from '../../../node_modules/nearby-common/src/mscf.js'
import { isDebug, isDev, isTest, isProd } from '@/config/util/env'

export const wxLoginUrl = `https://cd-nt.lianlianlvyou.com/?isOaWeb=1&versionCode=${getQueryString('v')}#/redirectUrl` // 暂未使用
export const wxCallBackUrl = 'https://nb-oa-web.lianlianlvyou.com/#/login' // 扫码登录回调地址
export const wxAuthCallBackUrl = 'https://cd-nt.lianlianlvyou.com/?isOaWeb=2#/redirectUrl' // 微信授权登录回调地址
export const currentHost = `${location.protocol}//${location.host}`
export const crmCallbackUrl = (token = '') => (isProd ? `https://yhcrm.lianlianlvyou.com/?token=${token}` : `https://debug.lianlianlvyou.com/yhcrm/?token=${token}`)

let baseUrl = 'https://oas.lianlianlvyou.com'

if (isDev) {
  baseUrl = 'https://oasd.lianlianlvyou.com'
  // baseUrl = 'http://192.168.10.124:32011'
} else if (isTest) {
  baseUrl = 'http://192.167.246.37:31001'
  // baseUrl = 'http://192.101.50.134:8080'
  baseUrl = 'https://oasd.lianlianlvyou.com'
}

export const BASE_URL = baseUrl

export const parser = new ApiParser(isDebug)

const mscfInstance = new Mscf({
  role: 'father',
  token: 'nearby',
  name: 'foundation'
})

export const mscf = mscfInstance
