export const isDev = process.env.NODE_ENV === 'development'
export const isTest = process.env.NODE_ENV === 'testing'
export const isProd = process.env.NODE_ENV === 'production'
export const isDebug = !isProd

export const isInWechat = /micromessenger/i.test(window.navigator.userAgent.toLowerCase())
