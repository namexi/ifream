import { BASE_URL } from './const'
import { getToken } from './method'
import axios from 'axios'

let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: { Authorization: getToken() }
})

instance.interceptors.response.use(
  (response) => {
    console.log(response.data)
    return response.data
  },
  () => {}
)

export const http = instance
