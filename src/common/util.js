function findIndex(ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function(item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  /* istanbul ignore next */
  return index
}

function getUrlName(url) {
  const target_page_name = url.replace('.html', '')
  return target_page_name
}

function getFormateDate(fmt, Date) {
  const o = {
    'M+': Date.getMonth() + 1, //月份
    'd+': Date.getDate(), //日
    'h+': Date.getHours(), //小时
    'm+': Date.getMinutes(), //分
    's+': Date.getSeconds(), //秒
    'q+': Math.floor((Date.getMonth() + 3) / 3), //季度
    S: Date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (Date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
  return fmt
}

export { findIndex, getUrlName, getFormateDate }
