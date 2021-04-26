/* 页面基类 */
import Vue from 'vue'
import './filters'
import './api'
import './request'
import moment from 'moment'
import { Toast, Dialog, PullRefresh } from 'vant'
import './fastclick'
// import 'vant/lib/index.css';
import '../style/index.scss'
import defaultPics from './pic-base64'
import pages from './pages'
import InfiniteLoading from 'vue-infinite-loading'
import './vant.js'
import { v4 as uuidv4 } from 'uuid'
import request from '../api/searchClass'
import { openWin, closeWin } from '@/common/openPage.js'
import { advertisement, overTime, movieInfo } from '@/common/router.js'

Vue.use(Toast)
  .use(Dialog)
  .use(PullRefresh)
// import VCalendar from 'v-calendar'
// Vue.use(VCalendar, {
//   componentPrefix: 'vc' // Use <vc-calendar /> instead of <v-calendar />
// })

// import vDatePicker from 'v-calendar/lib/components/date-picker.umd'
// Vue.component('v-date-picker', vDatePicker)

import Calendar from 'vue-mobile-calendar'
Vue.use(Calendar)

Vue.use(InfiniteLoading)
Vue.prototype.$moment = moment

Vue.prototype.$pages = pages
Vue.prototype.$defaultPics = defaultPics
Vue.prototype.$uuidv4 = uuidv4
// 从图库获取图片
Vue.prototype.$getPic = function() {
  return new Promise((resolve, reject) => {
    api.getPicture(
      {
        sourceType: 'library',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 70
        // targetWidth: 1920,
        // targetHeight: 1080
      },
      (ret, err) => {
        if (err) {
          api.toast({
            msg: '获取图片失败',
            duration: 2000,
            location: 'bottom'
          })
        } else {
          if (ret.data) {
            resolve(ret)
          } else {
            api.toast({
              msg: '未选择图片',
              duration: 2000,
              location: 'bottom'
            })
          }
        }
      }
    )
  })
}
// 从相机拍照
Vue.prototype.$getCamera = function() {
  return new Promise((resolve, reject) => {
    api.getPicture(
      {
        sourceType: 'camera',
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: true,
        quality: 70
        // targetWidth: 1920,
        // targetHeight: 1080
      },
      (ret, err) => {
        if (err) {
          api.toast({
            msg: '打开相机失败',
            duration: 2000,
            location: 'bottom'
          })
        } else {
          if (ret.data) {
            resolve(ret)
          } else {
            api.toast({
              msg: '未选择图片',
              duration: 2000,
              location: 'bottom'
            })
          }
        }
      }
    )
  })
}
// 封装 promise 检查是否获取系统权限 例如 checkSystemAccess('camera', '相机')
// custom 为自定义提示内容
Vue.prototype.$checkSystemAccess = function(accessValue, accessName, custom = false) {
  return new Promise((resolve, reject) => {
    const resultList = api.hasPermission({
      list: [accessValue]
    })
    const granted = resultList[0].granted
    if (granted) {
      // 已授权，可以继续下一步操作
      resolve(true)
    } else {
      let msg = `应用需要您的授权才能访问${accessName}`
      if (custom) {
        msg = custom
      }
      api.confirm(
        {
          msg: msg,
          buttons: ['取消', '去设置']
        },
        function(ret) {
          // 点击去设置
          if (ret.buttonIndex == 2) {
            api.requestPermission(
              {
                list: [accessValue]
              },
              function(res) {
                if (res.list[0].granted) {
                  resolve(true)
                } else {
                  resolve(false)
                }
              }
            )
          }
        }
      )
    }
  })
}
Vue.prototype.$checkSystemAccessMulti = function(accessArr, accessName) {
  return new Promise((resolve, reject) => {
    const resultList = api.hasPermission({
      list: accessArr
    })
    const granted = resultList[0].granted
    if (granted) {
      // 已授权，可以继续下一步操作
      resolve(true)
    } else {
      api.confirm(
        {
          msg: `应用需要您的授权才能访问${accessName}`,
          buttons: ['取消', '去设置']
        },
        function(ret) {
          // 点击去设置
          if (ret.buttonIndex == 2) {
            api.requestPermission(
              {
                list: accessArr
              },
              function(res) {
                if (res.list[0].granted) {
                  resolve(true)
                } else {
                  resolve(false)
                }
              }
            )
          }
        }
      )
    }
  })
}
Vue.prototype.$fileUpload = async function(files) {
  try {
    let result = await this.$http.upload('/api/Feils/UploadFiles?isPublic=true', { files }, true)
    return result
  } catch (ex) {
    return null
  }
}
Vue.prototype.$checkBindAsync = async function() {
  if ($api.getStorage('ip') && $api.getStorage('uuid')) {
    try {
      const windowList = api.windows()
      // 获取当前 window 名字
      const nowWindowName = windowList.pop().name
      const res = await request.checkBind($api.getStorage('uuid'))
      $api.setStorage('agentName', res.value.merchantName || '暂无信息')
      $api.setStorage('roomName', res.value.name || '暂无信息')
      if (res.value.currentStatus === 0) {
        //包厢空闲
        if (!nowWindowName.includes('advertisement')) {
          // closeWin(movieInfo)
          // closeWin(overTime)
          openWin(advertisement, { roomStatus: res.value.currentStatus }, true)
        }
      } else if (res.value.currentStatus === -10) {
        //包厢超时
        if (!nowWindowName.includes('overTime')) {
          // closeWin(movieInfo)
          // closeWin(advertisement)
          openWin(overTime, { roomStatus: res.value.currentStatus }, true)
        }
      } else if (res.value.currentRuleType === 'Vod') {
        // 点播状态
        if (!nowWindowName.includes('movieInfo') && !nowWindowName.includes('playing')) {
          // closeWin(advertisement)
          // closeWin(overTime)
          openWin(movieInfo, { id: res.value.currentMovie }, true)
        } else {
          // closeWin(overTime)
          // closeWin(advertisement)
        }
      } else {
        // closeWin(overTime)
        // closeWin(advertisement)
      }
    } catch (err) {}
  }
}
Vue.config.productionTip = false
export default function(options, cb) {
  console.log(window.navigator.platform)
  if (window.navigator.platform == 'Win32') {
    var vue = new Vue(options)
    // 需要时返回构建好的vue对象,通过回调方式;
    if (typeof cb === 'function') {
      cb(vue)
    }
  }
  window.apiready = function() {
    pages.appWidth = api.winWidth
    pages.appHeight = api.winHeight
    // ios click event 300ms
    if (api.systemType === 'ios') {
      FastClick.attach(document.body)
    }
    var vue = new Vue(options)
    // 需要时返回构建好的vue对象,通过回调方式;
    if (typeof cb === 'function') {
      cb(vue)
    }
  }
}
