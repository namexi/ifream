import { getQueryString } from 'nearby-common'
import { isDev, isTest } from '@/config/util/env'

export const wxLoginUrl = `https://cd-nt.lianlianlvyou.com/?isOaWeb=1&versionCode=${getQueryString('v')}#/redirectUrl`
let baseUrl = 'https://oa.lianlianlvyou.com'

if (isDev) {
  baseUrl = 'http://192.167.246.37:31001'
} else if (isTest) {
  baseUrl = 'http://192.167.246.37:31001'
}

export const BASE_URL = baseUrl
