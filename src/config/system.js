/* eslint-disable */
import {
  isDebug,
  isDev,
  isTest
} from '@/config/util/env'

const prodDeployUrl = 'https://nb-oa-web.lianlianlvyou.com/new'
const debugDeployUrl = 'https://nb-oa-web.lianlianlvyou.com/debug'
const devDeployUrl = 'http://192.168.10.113:9085'
console.log(process.env.NODE_ENV === 'debug')
let prefixUrl = isDebug ? devDeployUrl : prodDeployUrl
if (isTest) prefixUrl = debugDeployUrl
console.log(prefixUrl)
export const subSysTemConfig = {
  crm: {
    name: 'crm',
    url: `${prefixUrl}/crm/index.html`,
    pages: {
      addContractDetail: '/supplier/addContract/detail',
      supplierDetail: '/supplier/detail',
      addContract: '/supplier/addContract',
      addPriceDate: '/crm/addPriceDate',
      myClientdetails: '/myClientdetails',
      browseCustomers: '/browseCustomers',
      editCustomers: '/editCustomers',
      browseCustomersSea: '/browseCustomersSea',
      myClientdetailsSale: '/myClientdetailsSale',
      temporaryEdit: '/temporaryEdit',
      editCustomersSale: '/editCustomersSale',
      myClientdetails: '/myClientdetails',
      newCustomers: '/newCustomers',
      addContact: '/crm/addContact',
      addT: '/crm/branchManagerIndex/total',
      productDirectorTotal: '/crm/productDirectorIndex/total'
    }
  },
  warehouse: {
    name: 'warehouse',
    url: `${prefixUrl}/warehouse/index.html`
  },
  design: {
    name: 'design',
    url: `${prefixUrl}/design/index.html`,
    pages: {
      productInfoEdit: '/productInfo/edit',
      businessInfoAdd: '/businessInfo/add',
      businessInfoAddOther: '/businessInfo/add/other',
      businessInfoDetail: '/businessInfo/detail',
      businessInfoDetailOther: '/businessInfo/detail/other',
      productInfoCourseEdit: '/productInfo/courseEdit',
      productInfoEdit: '/productInfo/edit',
      productInfoEditview: '/productInfo/edit/view',
      productInfoEditOther: '/productInfo/edit/other',
      productUseDateSetAddDate: '/productUseDateSet/addDate',
      advertiseManagementElectronicCommerceEdit: '/advertiseManagement/electronicCommerce/edit',
      advertiseManagementVaultEdit: '/advertiseManagement/vault/edit',
      advertiseManagementBusinessSchoolEdit: '/advertiseManagement/businessSchool/edit',
      classifiedManagementEdit: '/classifiedManagement/edit',
      nb_productInfoEdit: '/nb_productInfo/edit',
      nb_productInfoEditOther: '/nb_productInfo/edit/other',
      eb_productInfoEdit: '/eb_productInfo/edit',
      eb_productInfoEditOther: '/eb_productInfo/edit/other'
    }
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
      detailFinanceAdmin: '/business/contract/detailFinanceAdmin',
      merchantsEnter: '/contractDetails/merchantsEnter',
      contractDescController: '/contract/desc/controller',
      ldRule: "/leaveReceipt/ldRule"
    }
  },
  administration: {
    name: 'administration',
    url: `${prefixUrl}/administration/index.html`,
    pages: {
      approvalView: '/approvalView'
    }
  },
  human: {
    name: 'human',
    url: `${prefixUrl}/human/index.html`
  },
  customer: {
    name: 'customer',
    url: `${prefixUrl}/customer/index.html`,
    pages: {
      questionCategory: '/workOrder/questionCategory',
      poolDetail: '/customWorkforce/orderPool/poolDetail',
      reminder: '/customWorkforce/oneCustom/reminder',
      continueDetail: '/customWorkforce/twoCustom/continueDetail'
    }
  },
  product: {
    name: 'product',
    url: `${prefixUrl}/product/index.html`,
    pages: {
      productManagerList: '/product/productManager/list',
      productMaster: '/product/productMaster/list',
      branchManagerList: '/product/branchManager/list'
    }
  },
  docking: {
    name: 'docking',
    url: `${prefixUrl}/docking/index.html`,
    pages: {
      editDocking: '/editDocking',
      productDetail: '/product/detail',
      productId: '/product',
      product: '/productProduct',
      writer: '/writer',
      bindModelDetail: '/dockingTables/bindModel/bindModelDetail',
      createModel: '/dockingTables/bindModel/createModel'
    }
  },
  brand: {
    name: 'brand',
    url: `${prefixUrl}/brand/index.html`
  },
  third: {
    name: 'third',
    url: `${prefixUrl}/third/index.html`,

  },
  contract: {
    name: 'contract',
    url: `${prefixUrl}/contract/index.html`,
    pages: {
      contractCurdAdmin: '/contract/curdAdmin',
      contractCurd: '/contract/curd'
    }
  },
  market: {
    name: 'market',
    url: `${prefixUrl}/market/index.html`,
    pages: {
      addProductPush: '/order/product/addProductPush',
      agentUserDayStatistical: '/agent/user/day/statistical',
      subordinateList: '/agent/agentList/subordinateList',
      subordinateListAdmin: '/agent/agentList/subordinateListAdmin',
      ordinateAgentManage: '/agent/manage/ordinate',
      bdManageDetail: '/bdManage/bdManageDetail',
      centerAdd: '/center/add',
      messageDetail: '/center/messageDetail',
      add: "/commander/add",
      detail: '/commander/detail',
      orderList: '/commander/orderList',
      extraction: '/extraction',
      cashOrderList: '/extraction/orderList',
      cashOrderDetail: '/extraction/orderDetail',
      operatorList: '/operator/list',
      operatorEdit: '/operator/edit',
      operatorDetail: '/operator/detail',
      operatorCashOut: '/operator/cashOut',
      operatorCashOutCause: '/operator/cashOut/cause',
      operatorCashOutMaking: '/operator/cashOut/making',
      operatorCashOutFinance: '/operator/cashOut/finance',
      operatorCashOutFinanceAgain: '/operator/cashOut/financeAgain',
      operatorCashOutAdd: '/operator/cashOut/add',
      operatorCashOutEdit: '/operator/cashOut/edit',
      operatorCashOutDetail: '/operator/cashOut/detail',
      operatorCashOutCauseDetail: '/operator/cashOut/cause/detail',
      operatorCashOutFinanceDetail: '/operator/cashOut/finance/detail',
      operatorCashOutFinanceAgainDetail: '/operator/cashOut/financeAgain/detail',
      operatorCashOutMakingDetail: '/operator/cashOut/making/detail',
      operatorApplyList: '/operator/apply/list',
      checkOrderList: '/order',
      orderDetail: '/order/detail',
      orderAdminDetail: '/order/adminDetail',
      addChannel: '/order/channel/channelManage/addChannel',
      channelProductList: '/order/channel/productList',
      channelOrderList: '/order/channel/orderList',
      getCodeOrderList: '/order/automaticGetCode/orderList',
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
    url: `${prefixUrl}/channelData/index.html`,
    pages: {
      channelDetail: '/channel/detail',
      channelManageEdit: '/channel/manage/edit',
      channelManageEditOther: '/channel/manage/edit/other'
    }
  },
  dataCenter: {
    name: 'dataCenter',
    url: `${prefixUrl}/dataCenter/index.html`,
    pages: {
      blocManageSiteInfo: '/blocManage/SiteInfo'
    }
  },
  knowledge: {
    name: 'knowledge',
    url: `${prefixUrl}/knowledge/index.html`
  }
}

export function getSystem(name = '') {
  return subSysTemConfig[name]
}
