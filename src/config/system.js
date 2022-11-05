/* eslint-disable */
import { isDebug, isDev, isTest } from '@/config/util/env'

const prodDeployUrl = 'https://nb-oa-web.lianlianlvyou.com/new'
const debugDeployUrl = 'https://nb-oa-web.lianlianlvyou.com/debug'
const devDeployUrl = 'https://ll-oss-dev.llzby.top/oa'

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
      eb_productInfoEditOther: '/eb_productInfo/edit/other',
      notesToBuyAddOrEdit: '/notesToBuy/addOrEdit'
    }
  },
  technology: {
    name: 'technology',
    url: `${prefixUrl}/technology/index.html`,
    pages: {
      addUser: '/addUser',
      editUser: '/editUser',
      userInfor: '/userInfor',
      addRole: '/addRole',
      editRole: '/editRole',
      roleInfor: '/roleInfor',
      roleClone: '/roleClone'
    }
  },
  common: {
    name: 'common',
    url: `${prefixUrl}/common/index.html`,
    pages: {
      childMenuManage: '/authority/childMenuManage',
      portManage: '/authority/portManage',
      centerOprateLog: '/center/log',
      positionOprateLog: '/position/log'
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
      batchRefundDetail: '/service/batchRefundDetail',
      modificationNoticeDetails: '/kingdee/modificationNotice/details',
      modificationNotice: '/kingdee/modificationNotice',
      overpaymentRecordList: '/overpayment/recordList',
      merchantInvoicesManageDesc: '/merchant/invoices/manage/desc',
      reconciliationDetailed: '/reconciliation/detailed',
      preMoneyDetail: '/quotaManager/preMoneyDetail',
      tiktokImportFile: '/reconciliation/tiktokImportFile',
      reconciliationFile: '/list/ReconciliationFile',
      reconciliationDetails: '/list/ResultsFreezeDetails',
      resultsFenzhangDetails: '/list/resultsFenzhangDetails'
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
      approvalType: '/approvalType',
      myApproval: '/myApproval',
      approvalLog: '/approvalLog'
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
      financeEmployEdit: '/employees/financeEmployEdit',
      employeeOprateLog: '/employee/log',
      branchOprateLog: '/company/log',
      eCommerceLog: '/employee/eCommerceLog',
      jointEmployeeLog: '/employee/jointEmployeeLog',
      programmeDetail: '/kpi/programmeDetail',
      createManage: '/kpi/createManage',
      processDetail: '/kpi/processDetail',
      processDetailManager: '/kpi/processDetailManager',
      sureKpiList: '/kpi/sureKpi',
      resultTemplate: '/kpi/resultTemplate',
      resultTemplateCreate: '/kpi/resultTemplateCreate',
      programmeManage: '/kpi/programmeManage',
      employeeManage: '/kpi/employeeManage',
      merchantList: '/merchant/merchantList',
      productList: '/merchant/productList',
      commissionRules: '/commission/rules',
      commissionPackageDetail: '/commission/package/detail',
      commissionPersonnelPackage: '/commission/personnel/package',
      commissionPersonnelDetail: '/commission/personnel/detail',
      commissionBDetail: '/commission/bd/detail',
      newCommissionPackageDetail: '/newCommission/package/detail',
      newCommissionBDetail: '/newCommission/bd/detail',
      newCommissionPersonnelPackage: '/newCommission/personnel/package',
      newCommissionPersonnelDetail: '/newCommission/personnel/detail',
      RuleConfiguration: '/performanceScheme/RuleConfiguration',
      evaluationDetails: '/evaluationDetails',
      selfAssessment: '/selfAssessment',
      auditProcessing: '/auditProcessing',
      evaluation: '/evaluation',
      valuesManagement: '/valuesManagement'
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
      elePoolDetail: '/customWorkforce/eleOrderPool/poolDetail',
      skillGroupLog: '/skillsGroup/log',
      account: '/bpoManager/account',
      smsmanagement: '/smsManagement',
      oprateRequire: '/oprateRequire',
      skillOprateLog: '/skillOprateLog'
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
      restrictionsModify: '/productSetting/restrictionsModify',
      administratorsList: '/productSetting/administratorsList',
      subtotalListSetting: '/productSetting/subtotalList',
      productManagerListSetting: '/productSetting/productManagerList',
      bannerHistory: '/hotBanner/history',
      popCreate: '/hotPop/create',
      shopHis: '/product/goodShop/his',
      categoryHis: '/product/category/his',
      categoryAdd: '/product/category/add',
      goodShopManagerList: '/product/goodShopManage/manager',
      goodShopAreaList: '/product/goodShopManage/area',
      goodShopAdminList: '/product/goodShopManage/admin',
      deferredApply: '/product/deferredSales/deferredApply',
      saleProductDesc: '/product/deferredSales/saleProductDesc',
      hotelBannerHistory: '/hotelBanner/history',
      deferredApply: '/product/deferredSales/deferredApply',
      saleProductDesc: '/product/deferredSales/saleProductDesc',
      productInfoToyBox: '/productInfo/toyBox',
      newOrder: '/productInfo/newOrder',
      managementModel: '/productInfo/managementModel',
      todayRecommended: '/operate/todayRecommended',
      windowSuspension: '/operate/windowSuspension',
      optimizationBannerHistory: '/productInfo/optimizationBanner/history',
      editSetMealType: '/productInfo/editSetMealType',
      showProductContent: '/productInfo/showProductContent'
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
      contractAddEcommerce: '/contract/addEcommerce',
      dyStoreMerge: '/dy/store/merge',
      myContract: '/v3/contract/list/my',
      myContractYxs: '/v3/my/contract/yxs',
      serverContractDesc: '/v3/server/contract/desc',
      addServiceContract: '/v3/addServiceContract',
      addServiceContractAdd: '/v3/addServiceContract/add',
      createAdditionalAgreement: '/v3/createAdditionalAgreement',
      createContract: '/v3/create/contract',
      contractDesc: '/v3/contract/desc',
      createContractYxs: '/v3/create/contract/yxs',
      annexAgreement: '/v3/contract/desc/annex/agreement',
      contractListYxs: '/v3/contract/list/yxs',
      merchantsReportOne: '/merchants/reportData',
      actionLogDesc: '/action/log/list',
      merchantContractDesc: '/v3/merchant/contract/desc',
      contractGroupDesc: '/v3/contract/group/desc',
      contractInfo: '/v3/contract/desc/contract/info',
      goodsInfo: '/v3/contract/desc/goods/info'
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
      addProductPush: '/order/product/addProductPush',
      dashBoard: '/xlManage/dashBoard'
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
      channelManageEditOther: '/channel/manage/edit/other',
      channelWorkorderList: '/channel/workorder/list'
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
      refundDetailsList: '/productManager/refundDetailsList',
      RegionalSummaryManageRuleSetting: '/RegionalSummaryManage/RuleSetting',
      SiteSummaryManageRuleSetting: '/SiteSummaryManage/RuleSetting'
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
  },
  marketing: {
    name: 'marketing',
    url: `${prefixUrl}/marketing/index.html`,
    pages: {
      anchorManagDesc: '/anchorManag/desc',
      childManage: '/anchorManag/childManage',
      vedioList: '/vedioList',
      spuInfo: '/spuInfo',
      spuManag: '/spuManag',
      addSpu: '/addSpu',
      merchantList: '/merchant/merchantList',
      productList: '/merchant/productList',
      bdlist: '/newOrderProduct/bdlist',
      onlineConfirmationList: '/newOrderProduct/onlineConfirmationList',
      copywritingList: '/newOrderProduct/copywritingList',
      managementShelfList: '/newOrderProduct/managementShelfList',
      spuInfoForPoi: '/kwaiManage/spuInfoForPoi',
      poiManagForSpu: '/kwaiManage/poiManagForSpu',
      boardHost: '/douJiaManage/boardHost',
      boardProductHost: '/douJiaManage/boardProductHost',
      boardShops: '/douJiaManage/boardShops',
      boardProduct: '/douJiaManage/boardProduct',
      dataBoardAdmin: '/douJiaManage/dataBoardAdmin',
      spuPlusInfo: '/spuPlusInfo',
      spuPlusManag: '/spuPlusManag',
      addSpuPlus: '/addSpuPlus'
    }
  },
  merchant: {
    name: 'merchant',
    url: `${prefixUrl}/merchant/index.html`,
    pages: {
      merchant: '/merchant',
      myMerchantList: '/myMerchant/list',
      freshPrebioticList: '/freshPrebiotic/list',
      wineSceneMerchantList: '/wineSceneMerchant/list',
      userAuthentication: '/user/authentication',
      agentAssetsInfo: '/agent/property/info',
      merchantHead: '/merchantDetails',
      agentAdd: '/agent/add',
      agenDetails: '/agent/details',
      managementCoupon: '/list/managementCoupon',
      wineSceneList: '/wineScene/list',
      myMerchantList: '/myMerchant/list'
    }
  },
  dyfxweb: {
    name: 'dyfxweb',
    url: `${prefixUrl}/web-dyfx/`,
    pages: {}
  },
  alipay: {
    name: 'alipay',
    url: `${prefixUrl}/alipay/`,
    pages: {
      recommend: '/recommend',
      check: '/check',
      product: '/product',
      config: '/config',
      order: '/order',
      statistics: '/statistics'
    }
  },
  coupon: {
    name: 'coupon',
    url: `${prefixUrl}/coupon/index.html`,
    pages: {
      coupon: '/coupon',
      ResourceManage: '/Resources/ResourceManage',
      EditorResources: '/Resources/EditorResources',
      ResourceManageAdm: '/ResourcesAdm/ResourceManageAdm',
      EditorResourcesAdm: '/ResourcesAdm/EditorResourcesAdm'
    }
  },
  promote: {
    name: 'promote',
    url: `${prefixUrl}/promote/index.html`
  },
  msg: {
    name: 'msg',
    url: `${prefixUrl}/msg/`,
    pages: {
      messageTemplate: '/message/messageTemplate',
      messageTemplateAdd: '/message/messageTemplateAdd',
      messageSend: '/message/messageSend',
      messageStation: '/message/messageStation'
    }
  },
  budgetManage: {
    name: 'budgetManage',
    url: `${prefixUrl}/budgetManage/`,
    pages: {
      subjectDetailsList: '/subject/details/list',
      budgetListDq: '/subject/details/list',
      budgetListZldq: '/budget/list/zldq',
      budgetListDq: '/budget/list/dq',
      budgetListDetails: '/budget/list/details',
      overpayListFgs: '/overpay/list/fgs'
    }
  },
  community: {
    name: 'community',
    url: `${prefixUrl}/activity/index.html`,
    pages: {
      createActivity: '/activity/createActivity',
      activityDetails: '/activity/details'
    }
  },
  template: {
    name: 'template',
    url: `${prefixUrl}/template/index.html`,
    pages: {
      configureList: '/list/configure'
    }
  },
  file: {
    name: 'file',
    url: `${prefixUrl}/file/index.html`
  },
  leecode: {
    name: 'leecode',
    url: `${prefixUrl}/leecode/index.html`,
    pages: {
      lowcodeEditor: '/lowcode/editor'
    }
  },
  costControl: {
    name: 'costControl',
    url: `${prefixUrl}/costControl/index.html`
  }
}

export function getSystem(name = '') {
  return subSysTemConfig[name]
}
