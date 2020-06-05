import { BASE_URL } from './const'
import { getToken } from './method'
import axios from 'axios'

let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: { Authorization: getToken() || '' }
})

instance.interceptors.response.use(
  (response) => {
    const body = response.data || {}
    const { data } = body
    return { res: data || {}, body }
  },
  () => {}
)

export const http = instance
