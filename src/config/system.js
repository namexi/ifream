/* eslint-disable */
import {
  isDebug,
  isDev,
  isTest
} from '@/config/util/env'

const prodDeployUrl = 'https://nb-oa-web.lianlianlvyou.com/new'
const debugDeployUrl = 'https://nb-oa-web.lianlianlvyou.com/debug'
const devDeployUrl = 'http://192.168.10.113:9085'
// const devDeployUrl = 'http://0.0.0.0:8087'

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
      productDirectorTotal: '/crm/productDirectorIndex/total',
      temporaryAdd: '/temporaryAdd'
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
    url: `${prefixUrl}/common/index.html`,
    pages: {
      childMenuManage: '/authority/childMenuManage',
      portManage: '/authority/portManage'
    }
  },
  finance: {
    name: 'finance',
    url: `${prefixUrl}/finance/index.html`,
    pages: {
      contractDetail: '/business/contract/detail',
      detailFinanceAdmin: '/business/contract/detailFinanceAdmin',
      merchantsEnter: '/contractDetails/merchantsEnter',
      contractDescController: '/contract/desc/controller',
      ldRule: '/leaveReceipt/ldRule',
      examineDetail: '/service/batchRefund/examineDetail',
      refundDetail: '/service/batchRefund/detail',
      grantDetail: '/administration/grantDetail',
      reservationDetail: '/refund/reservationDetail',
      dataStatistics: '/examine/dataStatistics',
      deduct: '/administration/deduct',
      commission: '/administration/commission',
      examineDetailTest: '/service/batchRefund/examineDetailTest',
      batchRefundExamineDetail: '/service/batchRefundExamineDetail',
      batchRefundDetail: '/service/batchRefundDetail'
    }
  },
  administration: {
    name: 'administration',
    url: `${prefixUrl}/administration/index.html`,
    pages: {
      roomManage: '/roomManage',
      useDetails: '/useDetails',
      departmentDetails: '/departmentDetails',
      assetDetails: '/assetDetails',
      useDetails: '/useDetails',
      allocationDetail: '/assetsManage/allocationDetail',
      updatePurchase: '/updatePurchase',
      warehouseInfo: '/warehouseInfo',
      updateAsset: '/updateAsset',
      warehouseAllot: '/warehouseAllot',
      createNew: '/createNew',
      approvalForm: '/approvalForm',
      approvalView: '/approvalView',
      approvalType: '/approvalType'
    }
  },
  human: {
    name: 'human',
    url: `${prefixUrl}/human/index.html`,
    pages: {
      checkListDetailGroup: '/checkWork/checkList/checkListDetailGroup',
      checkListDetailSub: '/checkWork/checkList/checkListDetailSub',
      editCheckList: '/checkWork/checkList/editCheckList',
      employeesDetail: '/employees/employeesDetail',
      dailySheet: '/offer/dailySheet',
      dailySheetDetail: '/offer/dailySheetDetail',
      templateManage: '/offer/templateManage',
      detailInfo: '/offer/detailInfo',
      wageDetail: '/wage/wageDetail',
      commissionList: '/wage/commissionList',
      wageList: '/wage/wageList',
      financeEmployEdit: '/employees/financeEmployEdit'
    }
  },
  customer: {
    name: 'customer',
    url: `${prefixUrl}/customer/index.html`,
    pages: {
      questionCategory: '/workOrder/questionCategory',
      poolDetail: '/customWorkforce/orderPool/poolDetail',
      reminder: '/customWorkforce/oneCustom/reminder',
      continueDetail: '/customWorkforce/twoCustom/continueDetail',
      bookingDetail: '/query/bookingDetail',
      cashOrderList: '/extraction/orderList',
      cashOrderDetail: '/extraction/orderDetail',
      shopProductStockList: '/business/shopProductStockList',
      batchModifyStock: '/business/batchModifyStock',
      shopProductStockInfo: '/business/shopProductStockInfo',
      reminder: '/customWorkforce/oneCustom/reminder',
      continueDetail: '/customWorkforce/twoCustom/continueDetail',
      detail: '/customize/detail',
      searchResult: '/workOrder/searchResult',
      questionCategory: '/workOrder/questionCategory',
      viewSolution: '/workOrder/viewSolution',
      solveOrViewWO: '/workOrder/solveOrViewWO',
      submitWO: '/workOrder/submitWO',
      submitScheme: '/workOrder/submitScheme',
      feedbackList: '/workOrder/feedbackList',
      viewWorkOrder: '/workOrder/viewWorkOrder',
      workOrderModule: '/workOrder/workOrderModule',
      viewSolution: '/workOrder/viewSolution',
      questionCategory: '/workOrder/questionCategory',
      schemePool: '/workOrder/schemePool',
      myWorkOrder: '/workOrder/myWorkOrder',
      addPoolOrder: '/customWorkforce/eleOrderPool/addPoolOrder',
      elePoolDetail: '/customWorkforce/eleOrderPool/poolDetail'
    }
  },
  product: {
    name: 'product',
    url: `${prefixUrl}/product/index.html`,
    pages: {
      productManagerList: '/product/productManager/list',
      productMaster: '/product/productMaster/list',
      branchManagerList: '/product/branchManager/list',
      viewFeedbackList: '/problemPlan/viewFeedbackList',
      detail: '/problemPlan/detail',
      explosiveProductsDetail: '/explosiveProducts/detail',
      problemAddEdit: '/problemPlan/problemAddEdit',
      problemPlanDetail: '/problemPlan/problemDetail',
      maintainAddEdit: '/explosiveProducts/maintainAddEdit',
      productUseDateList: '/product/productUseDate/list',
      productUseDateallList: '/product/productUseDate/allList',
      setTripartiteSendCode: '/productSetting/setTripartiteSendCode',
      productVisible: '/productSetting/productVisible',
      changeContract: '/productSetting/changeContract',
      changeSendCodeNum: '/productSetting/changeSendCodeNum',
      changeMoneyRelevant: '/productSetting/changeMoneyRelevant',
      changeStoreInfo: '/productSetting/changeStoreInfo',
      appointmentMethod: '/productSetting/appointmentMethod',
      dateSettings: '/productSetting/dateSettings',
      purchaseSettings: '/productSetting/purchaseSettings',
      setMealSort: '/productSetting/setMealSort',
      setMealModify: '/productSetting/setMealModify',
      changeContract: '/productSetting/changeContract',
      productModify: '/productSetting/productModify',
      restrictionsModify: '/productSetting/restrictionsModify'
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
      createModel: '/dockingTables/bindModel/createModel',
      writerEveryDayWork: '/writerEveryDayWork',
      everydayWorkOwn: '/everydayWorkOwn',
      writerAllEveryDayWork: '/writerAllEveryDayWork'
    }
  },
  brand: {
    name: 'brand',
    url: `${prefixUrl}/brand/index.html`,
    pages: {
      noticeDetail: '/notice/detail'
    }
  },
  third: {
    name: 'third',
    url: `${prefixUrl}/third/index.html`
  },
  contract: {
    name: 'contract',
    url: `${prefixUrl}/contract/index.html`,
    pages: {
      contractCurdAdmin: '/contract/curdAdmin',
      contractCurd: '/contract/curd',
      contractAddEcommerce: '/contract/addEcommerce'
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
      add: '/commander/add',
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
    url: `${prefixUrl}/order/index.html`,
    pages: {
      pmRank: '/journal/rank/pmRank',
      ecommercePMRank: '/journal/ecommerce/pmRank',
      commission: '/journal/commission'
    }
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
      blocManageSiteInfo: '/blocManage/SiteInfo',
      productListDGM: '/DGM/productList',
      DGMbusinessDetailsList: '/DGM/businessDetailsList',
      DGMrefundDetailsList: '/DGM/refundDetailsList',
      dataInfo: '/DGM/dataInfo',
      SectionInfo: '/DGM/SectionInfo',
      BranchInfo: '/DGM/BranchInfo',
      kitingNewAdd: '/DGM/kitingNewAdd',
      agentNewAdd: '/DGM/agentNewAdd',
      onLineProductDGM: '/DGM/onLineProduct',
      singUpInfoDGM: '/DGM/singUpInfo',
      onLineProductListDGM: '/DGM/onLineProduct/detailsList',
      singUpInfoListDGM: '/DGM/singUpInfo/detailsList',
      blocManageSiteInfo: '/blocManage/SiteInfo',
      blocManageBranchInfo: '/blocManage/BranchInfo',
      blocManageStaffingInfo: '/blocManage/StaffingInfo',
      onLineProductBlocManage: '/blocManage/onLineProduct',
      singUpInfoBlocManage: '/blocManage/singUpInfo',
      onLineProductListblocManage: '/blocManage/onLineProduct/detailsList',
      singUpInfoListblocManage: '/blocManage/singUpInfo/detailsList',
      rankingInfoBlocManage: '/blocManage/rankingInfo',
      groupLeaderSiteInfo: '/groupLeaderInfo/SiteInfo',
      groupLeaderStaffingInfo: '/groupLeaderInfo/StaffingInfo',
      onLineProductGroup: '/groupLeaderInfo/onLineProduct',
      singUpInfoGroup: '/groupLeaderInfo/singUpInfo',
      onLineProductListGroup: '/groupLeaderInfo/onLineProduct/detailsList',
      singUpInfoListGroup: '/groupLeaderInfo/singUpInfo/detailsList',
      rankingInfoGroup: '/groupLeaderInfo/rankingInfo',
      productDirectorteamInfo: '/productDirector/teamInfo',
      productDirectorteamProduct: '/productDirector/teamProduct',
      productList: '/productManager/productList',
      businessDetailsList: '/productManager/businessDetailsList',
      refundDetailsList: '/productManager/refundDetailsList'
    }
  },
  knowledge: {
    name: 'knowledge',
    url: `${prefixUrl}/knowledge/index.html`,
    pages: {
      moreLore: '/loreStoreIndex/moreLore',
      loreDetail: '/loreStoreDetail/loreDetail',
      loreHistoryDetail: '/loreStoreDetail/loreHistoryDetail',
      previewPage: '/lorePublish/previewPage',
      handleDraft: '/loreStoreList/handleDraft',
      recoverDetail: '/loreStoreList/recoverDetail',
      publishMag: ' /lorePublish/publishMag',
      lorePublish: ' /lorePublish',
      draftList: '/loreStoreList/draftList',
      draftMagList: '/loreStoreList/draftMagList',
      myLoreStoreList: '/loreStoreList/myLoreStoreList',
      loreStoreList: '/loreStoreList',
      myLoreStoreList: '/loreStoreList/myLoreStoreList'
    }
  }
}

export function getSystem(name = '') {
  return subSysTemConfig[name]
}
