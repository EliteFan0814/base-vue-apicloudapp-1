import Vue from 'vue'
import CryptoJS from 'crypto-js'
// import pages from './pages'
import { getUrlName } from '@/common/util.js'
// import { openWin } from '@/common/openPage.js'
// import { login } from '@/common/router.js'

let key = ''

// let baseUrl = process.env.VUE_APP_BASE_URL
// let baseUrl = $api.getStorage('ip')
// 封装请求头信息
let beforeReqest = (method, params, url) => {
  let dbUser = $api.getStorage('user') || {}
  var time = new Date().getTime()
  var random = Math.random()
  var uri = url.split('?')
  var headers = {
    apiversion: '1.2',
    random: random,
    time,
    sign: CryptoJS.MD5(time + uri[0].toLowerCase() + random).toString()
  }

  if (dbUser.mytoken && dbUser.islogin) {
    headers.Authorization = 'Bearer ' + dbUser.mytoken
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMmQ4Yjk1OGZhNmU0M2Q5YmZlNDZiZTliNmUzMDUwMiIsInVzZXJpZCI6IjEyZDhiOTU4ZmE2ZTQzZDliZmU0NmJlOWI2ZTMwNTAyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy91c2VyZGF0YSI6IjYiLCJyb2xlIjoiVGVhY2hlciIsIm5iZiI6MTYwNTE2Nzc0MywiZXhwIjoxNjA1NzcyNTQzLCJpYXQiOjE2MDUxNjc3NDN9.ZNL6bB4WEYCzjaOfFSwR2P8Yt9nUmC99LtWUa5n75f4'
  }
  if (params) {
    params = Object.assign({}, params)
    for (let key in params) {
      if (typeof params[key] === 'boolean') {
        params[key] = params[key].toString()
      }
    }
  }
  let options = {
    method,
    cache: false,
    timeout: 30,
    dataType: 'json',
    headers: headers,
    data: { values: params }
  }
  if (method === 'file') {
    options.method = 'post'
    options.data = { files: params }
  }
  if (method === 'postjson') {
    options.method = 'post'
    options.data = { body: JSON.stringify(params) }
    options.headers['Content-Type'] = 'application/json'
  }
  return options
}
// 处理请求错误信息
let reqError = (err) => {
  // if (err.statusCode === 401) {
  //   $api.setStorage('user', { islogin: false })
  //   api.toast({ msg: '您的账号已过期，请重新登录' })
  //   setTimeout(() => {
  //     openLoginFrame(login)
  //   }, 1000)
  // } else
  if (err.statusCode === 403) {
    api.toast({ msg: '权限不足' })
  } else {
    if (err.body.success === false) {
      api.toast({ msg: err.body.message })
      return err
    } else {
      api.toast({ msg: err.body || '请求错误' })
    }
  }
}
// 处理请求获取的数据
let resultHelper = (ret, err, resolve, reject) => {
  api.hideProgress()
  if (err) console.log(JSON.stringify(err))
  if (ret) {
    if (!ret.success) {
      reqError(ret)
      reject(ret)
    } else {
      resolve(ret)
    }
  } else {
    reqError(err)
    reject(err)
  }
}
// 封装请求
const request = {
  get(url, params, show) {
    if (show) api.showProgress()
    return new Promise((resolve, reject) => {
      api.ajax(
        {
          url: $api.getStorage('ip') + url,
          ...beforeReqest('get', params, url)
        },
        (ret, err) => {
          resultHelper(ret, err, resolve, reject)
        }
      )
    })
  },
  post(url, params, show) {
    if (show) api.showProgress()
    return new Promise((resolve, reject) => {
      api.ajax(
        {
          url: $api.getStorage('ip') + url,
          ...beforeReqest('post', params, url)
        },
        (ret, err) => {
          resultHelper(ret, err, resolve, reject)
        }
      )
    })
  },
  postJSON(url, params, show) {
    if (show) api.showProgress()
    return new Promise((resolve, reject) => {
      api.ajax(
        {
          url: $api.getStorage('ip') + url,
          ...beforeReqest('postjson', params, url)
        },
        (ret, err) => {
          resultHelper(ret, err, resolve, reject)
        }
      )
    })
  },
  upload(url, params, show) {
    if (show) api.showProgress()
    return new Promise((resolve, reject) => {
      api.ajax(
        {
          url: $api.getStorage('ip') + url,
          ...beforeReqest('file', params, url)
        },
        (ret, err) => {
          resultHelper(ret, err, resolve, reject)
        }
      )
    })
  }
}

// 打开登录的frame
// const openLoginFrame = function() {
//   api.openFrame({
//     name: getUrlName(login),
//     url: login,
//     reload: true,
//     bgColor: '#fff',
//     rect: {
//       x: 0,
//       y: 0,
//       w: api.winWidth,
//       h: api.winHeight
//     }
//   })
// }

Vue.prototype.$http = request

export default request
