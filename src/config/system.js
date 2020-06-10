import { isDebug } from './util/env'

const prodDeployUrl = 'https://nb-oa-web.lianlianlvyou.com'
const devDeployUrl = 'http://192.167.249.180:9085'
const prefixUrl = isDebug ? devDeployUrl : prodDeployUrl
export const subSysTemConfig = {
  crm: {
    name: 'crm',
    url: `${prefixUrl}/crm/index.html`
  },
  design: {
    name: 'design',
    url: `${prefixUrl}/design/index.html`
  },
  technology: {
    name: 'technology',
    url: `${prefixUrl}/technology/index.html`
  },
  finance: {
    name: 'finance',
    url: `${prefixUrl}/finance/index.html`,
    pages: {
      contractDetail: '/contract/detail/:id?'
    }
  }
}

export function getSystem(name = '') {
  return subSysTemConfig[name]
}
