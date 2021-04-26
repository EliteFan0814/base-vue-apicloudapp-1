import { findIndex, getUrlName, getFormateDate } from './util'
// import { login } from '@/common/router.js'

// 打开某个窗口
function openWin(page, params, reload = false) {
  api.openWin({
    // api.openTabLayout({
    name: getUrlName(page),
    url: page,
    allowEdit: true,
    //useWKWebView: false,
    bgColor: 'rgba(0,0,0,1)',

    softInputMode: 'pan',
    pageParam: {
      data: params
    },
    animation: {
      type: 'fade',
      subType: 'from_right',
      duration: 300
    },
    reload
  })
}
// 打开某个页面框
function openFrame(page, params) {
  api.openFrame({
    name: getUrlName(page),
    url: page,
    pageParam: {
      data: params
    }
  })
}
function closeWin(page) {
  api.closeWin({
    name: getUrlName(page)
  })
}
// 切换需要登录才能打开的窗口
// function openCheckLoginWin(page, params) {
//   const db_user = $api.getStorage('user')
//   try {
//     if (db_user && db_user.mytoken && db_user.islogin) {
//       api.openWin({
//         name: getUrlName(page),
//         url: page,
//         pageParam: {
//           data: params
//         }
//       })
//     } else {
//       openWin(login, { msg: '请先登录' })
//     }
//   } catch (e) {
//     if (db_user && db_user.mytoken && db_user.islogin) {
//       api.openWin({
//         name: getUrlName(page),
//         url: page,
//         pageParam: {
//           data: params
//         }
//       })
//     } else {
//       openWin(login, { msg: '请先登录' })
//     }
//   }
// }

export { openFrame, openWin, closeWin }
