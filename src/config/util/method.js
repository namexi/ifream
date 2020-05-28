import { getSession } from 'nearby-common'

export function getToken() {
  return getSession('token')
}
