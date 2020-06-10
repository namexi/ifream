import { http } from '@/config/util'

// todo check this api
export const getAuthAppId = (authType = 1) => http.get('https://nb-oa.lianlianlvyou.com/v2/wx/auth?platForm=' + authType)

// 账号密码登录
export const accountLogin = (userName, password) => http.post('/common/login/loginByPassword', { phoneNumber: userName, password })

export const loginWithCode = (code, platform) => http.post('/common/login/wechat/login', { code, platform })

export const wxBind = (userName, password, uid) => http.post('/common/login/wechat/loginByToken', { phoneNumber: userName, password, uid })

// 获取菜单和用户信息
export const getUserInfo = () => http.get('/common/login/getUserInfo')
