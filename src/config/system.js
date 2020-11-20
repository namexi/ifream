/* eslint-disable */
import {
  isDebug
} from './util/env'

const prodDeployUrl = 'https://nb-oa-web.lianlianlvyou.com/new'
const debugDeployUrl = 'https://nb-oa-web.lianlianlvyou.com/debug'
const devDeployUrl = 'http://192.168.10.113:9085'
console.log(process.env.NODE_ENV === 'debug')
let prefixUrl = isDebug ? devDeployUrl : prodDeployUrl
if (process.env.NODE_ENV === 'debug') prefixUrl = debugDeployUrl
console.log(prefixUrl)
export const subSysTemConfig = {
  crm: {
    name: 'crm',
    url: `${prefixUrl}/crm/index.html`,
    pages: {
      addContractDetail: '/supplier/addContract/detail',
      supplierDetail: '/supplier/detail',
      addContract: '/supplier/addContract'
    }
  },
  warehouse: {
    name: 'warehouse',
    url: `${prefixUrl}/warehouse/index.html`
  },
  design: {
    name: 'design',
    url: `${prefixUrl}/design/index.html`
  },
  technology: {
    name: 'technology',
    url: `${prefixUrl}/technology/index.html`
  },
  common: {
    name: 'common',
    url: `${prefixUrl}/common/index.html`
  },
  finance: {
    name: 'finance',
    url: `${prefixUrl}/finance/index.html`,
    pages: {
      contractDetail: '/business/contract/detail',
      detailFinanceAdmin: '/business/contract/detailFinanceAdmin'
    }
  },
  administration: {
    name: 'administration',
    url: `${prefixUrl}/administration/index.html`
  },
  human: {
    name: 'human',
    url: `${prefixUrl}/human/index.html`
  },
  customer: {
    name: 'customer',
    url: `${prefixUrl}/customer/index.html`
  },
  product: {
    name: 'product',
    url: `${prefixUrl}/product/index.html`,
    pages: {
      productManagerList: '/product/productManager/list',
      productMaster: '/product/productMaster/list'
    }
  },
  docking: {
    name: 'docking',
    url: `${prefixUrl}/docking/index.html`
  },
  brand: {
    name: 'brand',
    url: `${prefixUrl}/brand/index.html`
  },
  third: {
    name: 'third',
    url: `${prefixUrl}/third/index.html`
  },
  contract: {
    name: 'contract',
    url: `${prefixUrl}/contract/index.html`
  },
  market: {
    name: 'market',
    url: `${prefixUrl}/market/index.html`,
    pages: {
      addProductPush: '/order/product/addProductPush'
    }
  },
  order: {
    name: 'order',
    url: `${prefixUrl}/order/index.html`
  },
  weike: {
    name: 'weike',
    url: `${prefixUrl}/weike/index.html`
  },
  channelData: {
    name: 'channelData',
    url: `${prefixUrl}/channelData/index.html`
  },
  dataCenter: {
    name: 'dataCenter',
    url: `${prefixUrl}/dataCenter/index.html`
  }
}

export function getSystem(name = '') {
  return subSysTemConfig[name]
}