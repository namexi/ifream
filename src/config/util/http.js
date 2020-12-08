import {
  BASE_URL
} from './const'
import {
  getToken
} from './storage'
import axios from 'axios'
import router from '@/router'
import {
  parser
} from 'Config/util'
import {
  replaceHost
} from 'nearby-common'
import {
  message as $message
} from 'ant-design-vue'

console.log(BASE_URL)
let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: {
    Authorization: getToken() || ''
  }
})

instance.interceptors.request.use((config) => {
  let reqUrl = config.url || ''
  const localHost = parser.getLocalHost(reqUrl)
  if (localHost) {
    reqUrl = replaceHost(reqUrl, localHost)
  }
  config.url = reqUrl
  return config
})

instance.interceptors.response.use(
  (response) => {
    const body = response.data || {}
    const {
      code,
      message
    } = body
    switch (code) {
      case 1002:
      case 1001:
        $message.error(message)
        return
      case 500:
        return Promise.reject(new Error('processed'))
      case 401:
        $message.error('用户失效，请重新登录')
        router.replace('/login')
        return Promise.reject(new Error('processed'))
      default:
        return body.data
    }
  },
  (e) => {
    return Promise.reject(e)
  }
)

export const http = instance