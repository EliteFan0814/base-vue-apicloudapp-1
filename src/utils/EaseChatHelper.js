
if (!$api) { require('./api'); }

function EaseChatHelper (userType) {
  let easeChat = api.require('easeChat');

  this.easeChat = easeChat;

  // 获取登录状态 IM账号缓存

  let imAccount = $api.getStorage('imId');
  let curAccount = $api.getStorage('curAccount');
  // 私有方法登录
  let login = function (imId, userType) {
    easeChat.login({
      username: imId,
      password: `${imId}@${userType}`,
      autoLogin: true
    }, function (ret, err) {
      if (ret && ret.status) {
        console.log('IM登录成功');
        // 触发IM登录成功事件 Login页面监听
        api.sendEvent({
          name: 'imSuccess'
        });
        $api.setStorage('imLogin', true);
        $api.setStorage('imAccount', imId);
        $api.setStorage('curAccount', imId);
        api.toast({
          msg: 'IM已链接',
          duration: 1000,
          location: 'bottom'
        });
      } else {
        if (err.code === 200) {
          reLogin();
          console.log('注销重新登录IM');
        } else if (err.code === 204) {
          console.log('IM未注册');
          reg(imId, userType);
        } else {

        }
      }
    });
  };
  var reg = function (imId, userType) {
    easeChat.easeRegister({
      username: imId,
      password: `${imId}@${userType}`
    }, (ret, err) => {
      if (ret && ret.status) {
        console.log('IM注册成功');
        login(imId, userType);
      } else {
        if (err.code === 203) {
          console.log('IM已注册');
          login(imId, userType);
        } else {
          console.log('IM注册失败' + JSON.stringify(err));
          api.toast({
            msg: 'IM服务出错',
            duration: 2000,
            location: 'bottom'
          });
        }
      }
    });
  };
  let reLogin = function (imId) {
    easeChat.logout((ret, err) => {
      if (ret.status) {
        login(imId, userType);
      } else {
        console.log('IM登出出错');
        console.log(JSON.stringify(err));
      }
    });
  };

  this.logout = function () {
    easeChat.logout((ret, err) => {
      // stopWatchUnread();
      if (ret.status) {
        $api.rmStorage('imLogin');
        console.log('IM已登出');
      } else {
        console.log('IM登出出错');
        console.log(JSON.stringify(err));
      }
    });
  };
  // 初始化登录后调用初始化链接环信服务
  this.init = function (imId) {
    if (!imId) {
      api.sendEvent({
        name: 'imFail'
      });
      return api.toast({
        msg: '登录IM失败，IMid 参数错误',
        duration: 2000,
        location: 'bottom'
      });
    }
    imAccount = imId;

    if (!loginStatus()) {
      if (imAccount !== curAccount) {
        reg(imAccount, userType);
      } else {
        login(imAccount, userType);
      }
    } else {
      if (imAccount !== curAccount) {
        reg(imAccount, userType);
      } else {
        api.sendEvent({
          name: 'imSuccess'
        });
      }
    }
  };

  // 获取未读监听器的Interval 返回值
  // let unReadTimer = 0;
  // 开去未读监听 每10秒钟 主动拉取会话列表 触发 receiveUnRead 事件
  // this.watchUnRead = function () {
  //   clearInterval(unReadTimer);
  //   unReadTimer = setInterval(() => {
  //     checkUnRead();
  //   }, 10000);
  // };
  this.refreshUnRead = function () {
    checkUnRead();
  };
  let checkUnRead = function () {
    easeChat.getAllConversations(ret => {
      let unRead = 0;
      if (ret.conversations.length > 0) {
        // 统计未读数量
        const unList = ret.conversations;
        for (var i = 0; i < unList.length; i++) {
          if (unList[i].unreadMessagesCount > 0) {
            unRead = unList[i].unreadMessagesCount + unRead;
          }
        }
      }
      api.sendEvent({
        name: 'receiveUnRead',
        extra: { unRead }
      });
    });
  };
  // 终止未读监听
  // let stopWatchUnread = function () {
  //   clearInterval(unReadTimer);
  // };
  // 获取会话  回调返回会话体 参考https://docs.apicloud.com/Client-API/Open-SDK/easeChat#conversationInfo
  this.getConversations = function (cb) {
    easeChat.getAllConversations(ret => {
      if (ret.conversations.length > 0) {
        cb(ret.conversations);
      } else {
        cb(null);
      }
    });
  };
  this.startMsgListen = function () {
    if (loginStatus()) {
      easeChat.addMessageListener({
        name: 'receive'
      }, function (ret) {
        checkUnRead();
        if (ret.conversations && ret.conversations.length > 0) {
          api.sendEvent({
            name: 'newConversions',
            extra: { conversations: ret.conversations }
          });
        }
        if (ret.messages && ret.messages.length > 0) {
          api.sendEvent({
            name: 'newConversions',
            extra: { conversations: ret.conversations }
          });
          api.sendEvent({
            name: 'newMessage',
            extra: { messages: ret.messages }
          });
        }
      });
    }
  };
  let loginStatus = function () {
    return !!$api.getStorage('imLogin');
  };
  this.isLogin = function () {
    return loginStatus();
  };
  this.startOtherLoginListen = function () {
    easeChat.addAccountListener((ret) => {
      if (ret.eventType === 'otherLogin') {
        api.sendEvent({
          name: 'imLogout'
        });
      }
    });
  };
  this.removeConversation = function (id, cb) {
    easeChat.markAllMessagesAsRead({
      conversationId: id,
      type: 'chat'
    }, function (ret, err) {
      console.log('删除前标记已读');
    });
    easeChat.deleteConversation({
      conversationId: id,
      isDeleteMessages: false
    }, function (ret) {
      cb(ret);
    });
  };
  this.markConversationRead = function (id, cb) {
    easeChat.markAllMessagesAsRead({
      conversationId: id,
      type: 'chat'
    }, function (ret, err) {
      cb(ret);
    });
  };
  this.loadConversationMessage = function (id, lastId, pageSize, cb) {
    easeChat.loadMessageFromDB({
      conversationId: id,
      type: 'chat',
      startMsgId: lastId,
      pageSize
    }, function (ret) {
      if (ret.messages && ret.messages.length > 0) {
        cb(ret.messages);
      } else {
        cb(null);
      }
    });
  };
  this.sendText = function (to, text, cb) {
    easeChat.sendText({
      conversationId: to,
      chatType: 'chat',
      text,
      from: curAccount,
      to,
      ext: {}
    }, (ret, err) => {
      if (ret.status) {
        msgSuccess(ret.message);
        cb(ret.message);
      } else {
        console.log('IM发送消息出错');
        console.log(JSON.stringify(err));
        cb(null);
      }
    });
  };
  var msgSuccess = function (message) {
    api.sendEvent({
      name: 'messageSendSuccess',
      extra: { message }
    });
  };
  this.sendImg = function (to, path, cb) {
    easeChat.sendImage({
      conversationId: '',
      chatType: 'chat',
      path,
      displayName: Math.random().toString(),
      from: curAccount,
      to,
      ext: {}
    }, (ret, err) => {
      if (ret.status) {
        msgSuccess(ret.message);
        cb(ret.message);
      } else {
        console.log('IM发送消息出错');
        console.log(JSON.stringify(err));
        cb(null);
      }
    });
  };
  this.sendOrder = function (to, { orderInfo, orderType }, cb) {
    easeChat.sendText({
      conversationId: '',
      chatType: 'chat',
      text: '订单信息',
      from: curAccount,
      to,
      ext: { orderInfo, orderType }
    }, (ret, err) => {
      if (ret.status) {
        msgSuccess(ret.message);
        cb(ret.message);
      } else {
        console.log('IM发送消息出错');
        console.log(JSON.stringify(err));
        cb(null);
      }
    });
  };

  return this;
}
export default EaseChatHelper;
