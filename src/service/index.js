import { http } from '@/config/util'

// todo check this api
export const getAuthAppId = (authType = 1) => http.get('/common/login/getAppId?platform=' + authType)

// 账号密码登录
export const accountLogin = (userName, password) => http.post('/common/open/login/loginByPassword', { phoneNumber: userName, password })

export const loginWithCode = (code, platform) => http.post('/common/open/login/wechat/login', { code, platform })

export const wxBind = (userName, password, uid) => http.post('/common/open/login/wechat/loginByToken', { phoneNumber: userName, password, uid })

// 获取菜单和用户信息
export const getUserInfo = () => http.get('/common/login/getUserInfo')
