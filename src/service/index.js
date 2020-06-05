import { http } from '@/config/util'

export const getAuthAppId = (authType = 1) => http.get('https://nb-oa.lianlianlvyou.com/v2/wx/auth?platForm=' + authType)

// 账号密码登录
export const accountLogin = (userName, password) => http.post('/v2/crm/user', { phoneNumber: userName, password })

export const loginWithCode = (code, state, platform) => http.get(`/v2/aut/wechat/user/login?state=${state}&code=${code}&platForm=${platform}`)

export const wxBind = (userName, password, uid) => http.post('/v2/wechat/user/login', { phoneNumber: userName, password, uid })
