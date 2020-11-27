import {
  message
} from 'ant-design-vue'
export const downloadChrome = (function () {
  var ua = navigator.userAgent,
    tem,
    isWin64 = /win64|wow64/.test(ua),
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return 'IE ' + (tem[1] || '');
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge?)\/(\d+)/);
    if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg ', 'Edge ');
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  M = M.join(' ');
  if (/Chrome/.test(M)) {
    // message.success({
    //   content: '已是谷歌内核，无需下载！'
    // })
    return false
  }
  message.success({
    content: '为了您更好的体验，请点击下载浏览器下载谷歌浏览器！'
  })
  return isWin64 ? 'http://ll-oss-oa.oss-cn-beijing.aliyuncs.com/tools/ChromeSetup_x86.exe' : 'http://ll-oss-oa.oss-cn-beijing.aliyuncs.com/tools/ChromeSetup_x64.exe';
})
// module.exports = navigator