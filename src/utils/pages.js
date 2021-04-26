// /* 页面操作组件 封装页面打开方法 */
// // 打开frame
// let basePath = process.env.NODE_ENV === 'production' ? '..' : '';

// let openFrame = (name, url, withBottom) => {
//   // 全屏 frame
//   let rectFull = {
//     x: 0,
//     y: 0,
//     w: pages.appWidth || api.winWidth,
//     h: pages.appHeight || api.winHeight
//   };
//   // 带底部菜单Frame
//   let rectWithBottom = {
//     x: 0,
//     y: 0,
//     w: pages.appWidth || api.winWidth,
//     h: (pages.appHeight || api.winHeight) - 50

//   };

//   api.bringFrameToFront({
//     from: name
//   });
//   api.openFrame({

//     name: name,
//     url: basePath + url,
//     bounces: withBottom,
//     rect: withBottom ? rectWithBottom : rectFull,
//     overScrollMode: 'never'

//   });
// };

// let openWindow = (name, url, param) => {
//   api.openWin({
//     name: name,
//     url: basePath + url,
//     bounces: false,

//     animation: {
//       type: 'none', // 动画类型（详见动画类型常量）
//       subType: 'from_right', // 动画子类型（详见动画子类型常量）
//       duration: 300 // 动画过渡时间，默认300毫秒
//     },
//     pageParam: param || {}
//   });
// };
// let closeWindow = (name) => {
//   api.closeToWin({
//     name
//   });
// };
// let closeCurWindow = () => {
//   api.closeWin();
// };
// let pages = {
//   closeWin: closeCurWindow,
//   appWidth: 0,
//   appHeight: 0,
//   home: {
//     name: 'home',
//     url: '/index/index.html',
//     open (param) {
//       closeWindow('root');
//       openWindow(this.name, this.url, param);
//     }
//   },
//   userIndex: {
//     name: 'userIndex',
//     url: '/user/index.html',
//     open (param) {
//       closeWindow('root');
//       api.sendEvent({
//         name: 'infoUpdate'
//       });
//       openFrame(this.name, this.url, true);
//     },
//     close () {
//       api.closeFrame({
//         name: this.name
//       });
//     }
//   },
//   login: {
//     name: 'login',
//     url: '/user/login.html',
//     open (param) {
//       if (param.isFrame) {
//         openFrame(this.name, this.url);
//       } else {
//         openWindow(this.name, this.url);
//       }
//     }

//   },
//   register: {
//     name: 'register',
//     url: '/user/register.html',
//     open (param) {
//       openWindow(this.name, this.url);
//     }
//   },
//   forgetPwd: {
//     name: 'forgetPwd',
//     url: '/user/forget-pwd.html',
//     open (param) {
//       openWindow(this.name, this.url);
//     }
//   },
//   modifyPwd: {
//     name: 'modifyPwd',
//     url: '/user/modify-pwd.html',
//     open (param) {
//       openWindow(this.name, this.url);
//     }
//   },
//   accountIndex: {
//     name: 'accountIndex',
//     url: '/account/index.html',
//     open () {
//       api.sendEvent({
//         name: 'infoUpdate'
//       });
//       closeWindow('root');
//       openFrame(this.name, this.url, true);
//     },
//     close () {
//       api.closeFrame({
//         name: this.name
//       });
//     }
//   },
//   accountSettleList: {
//     name: 'accountSettleList',
//     url: '/account/settled-list.html',
//     open () {
//       openWindow(this.name, this.url, true);
//     }
//   },
//   accountOut: {
//     name: 'accountOut',
//     url: '/account/out.html',
//     open () {
//       openWindow(this.name, this.url, true);
//     }
//   },
//   accountOutList: {
//     name: 'accountOutList',
//     url: '/account/out-list.html',
//     open () {
//       openWindow(this.name, this.url, true);
//     }
//   },
//   userOrderIndex: {
//     name: 'userOrderIndex',
//     url: '/userOrder/index.html',
//     open (param) {
//       closeWindow('root');
//       openFrame(this.name, this.url, true);
//     },
//     close () {
//       api.closeFrame({
//         name: this.name
//       });
//     }
//   },
//   userBaseEditor: {
//     name: 'userBaseEditor',
//     url: '/user/base-editor.html',
//     open (param) {
//       openWindow(this.name, this.url);
//     }
//   },
//   commentList: {
//     name: 'commentList',
//     url: '/user/comment-list.html',
//     open (param) {
//       openWindow(this.name, this.url);
//     }
//   },
//   goodsList: {
//     name: 'goodsList',
//     url: '/user/goods-list.html',
//     open (param) {
//       openWindow(this.name, this.url);
//     }
//   },
//   goodsInfo: {
//     name: 'goodsInfo',
//     url: '/user/goods-info.html',
//     open (param) {
//       openWindow(this.name, this.url, param);
//     }
//   },
//   notice: {
//     name: 'notice',
//     url: '/notice/index.html',
//     open (param) {
//       openWindow(this.name, this.url);
//     }
//   },
//   noticeDetail: {
//     name: 'noticeDetail',
//     url: '/notice/detail.html',
//     open (param) {
//       openWindow(this.name, this.url, param);
//     }
//   },
//   protocol: {
//     name: 'protocol',
//     url: '/user/protocol.html',
//     open (param) {
//       openWindow(this.name, this.url);
//     }
//   },
//   userPropertyEditor: {
//     name: 'userPropertyEditor',
//     url: '/user/property-editor.html',
//     open (param) {
//       openWindow(this.name, this.url, param);
//     }
//   },
//   purchaseOrderIndex: {
//     name: 'purchaseOrderIndex',
//     url: '/purchaseOrder/index.html',
//     open (param) {
//       closeWindow('root');
//       openFrame(this.name, this.url, true);
//     },
//     close () {
//       api.closeFrame({
//         name: this.name
//       });
//     }
//   },
//   complaintAdd: {
//     name: 'complaintAdd',
//     url: '/complaint/add.html',
//     open (param) {
//       openWindow(this.name, this.url, param);
//     }
//   },
//   complaintList: {
//     name: 'complaintList',
//     url: '/complaint/list.html',
//     open (param) {
//       openWindow(this.name, this.url, param);
//     }
//   },
//   chatForm: {
//     name: 'chatForm',
//     url: '/chat/chatForm.html',
//     open (param) {
//       openWindow(this.name, this.url, param);
//     }
//   },
//   chatList: {
//     name: 'chatList',
//     url: '/chat/chatList.html',
//     open (param) {
//       openWindow(this.name, this.url, param);
//     }
//   },
//   freePostage: {
//     name: 'freePostage',
//     url: '/user/free-postage.html',
//     open (param) {
//       openWindow(this.name, this.url, param);
//     }
//   }
// };

// export default pages;
