<template>
  <div class="container">
    <div class="option-list">
      <div class="top-title">
        {{agentName||'设备暂未绑定'}}(包厢号：{{roomName||'暂无'}})
      </div>
      <div class="option-wrap">
        <div class="left focus" tabindex="0" id="focusMovie" @click="openMovieClass">
          <div class="info-wrap">
            <div class="img-wrap">
              <img src="@/static/image/index/hot.png" alt="">
            </div>
            <div class="text han">最热电影</div>
            <div class="text en">movie</div>
          </div>
        </div>
        <div class="right">
          <div class="top focus" tabindex="0" @click="openAppList('Drama')">
            <div class="info-wrap">
              <div class="img-wrap">
                <img src="@/static/image/index/line.png" class="line" alt="">
              </div>
              <div class="text han">追剧</div>
              <div class="text en">teleplay</div>
              <div class="btm-img">
                <img src="@/static/image/index/curve.png" class="curve" alt="">
              </div>
            </div>
          </div>
          <div class="bottom" tabindex="0">
            <div class="live item focus" tabindex="0" @click="openAppList('Live')">
              <div class="content">
                <div class="img-wrap">
                  <img src="@/static/image/index/live.png" alt="">
                </div>
                <span>直 播</span>
              </div>
            </div>
            <div class="music item focus" tabindex="0" @click="openAppList('Music')">
              <div class="content">
                <div class="img-wrap">
                  <img src="@/static/image/index/music.png" alt="">
                </div>
                <span>音 乐</span>
              </div>
            </div>
            <div class="mall item focus" tabindex="0" @click="openPay">
              <div class="content">
                <div class="img-wrap">
                  <img src="@/static/image/index/mall.png" alt="">
                </div>
                <span>商 品</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUrlName, MyGlobal } from '@/common/util.js'
import { setIP, searchClass, app, payImg } from '@/common/router.js'
import { openWin, closeWin, openFrame } from '@/common/openPage.js'
import request from '@/api/searchClass'

export default {
  data() {
    return {
      agentName: '暂无信息',
      roomName: '暂无信息',
      statusTimer: undefined,
      showPopup: false,
      popup: true,
      value: 0,
      err: '',
      params: {} //tab切换传递的page参数,每次使用后会清空
    }
  },
  created() {
    // $api.setStorage('ip', null)
    // const appUtils = api.require('appUtils')
    // appUtils.checkFloadPermission({}, function (ret, err) {
    //   alert(JSON.stringify(ret))
    // })
    this.getUUID()
    this.keepAppAlive()
    this.loopCheckStatus()
    api.addEventListener(
      {
        name: 'viewappear'
      },
      () => {
        this.$checkBindAsync()
        this.agentName = $api.getStorage('agentName')
        this.roomName = $api.getStorage('roomName')
      }
    )
    api.addEventListener(
      {
        name: 'bindIpSuccess'
      },
      () => {
        this.keepAppAlive()
      }
    )
  },
  mounted() {
    document.getElementById('focusMovie').focus()
    api.addEventListener({
      name: 'keyback'
    })
  },
  // updated() {
  //   let focusMovie = document.getElementById('focusMovie')
  //   focusMovie.focus()
  // },
  methods: {
    // 存储uuid
    getUUID() {
      if (!$api.getStorage('uuid')) {
        $api.setStorage('uuid', api.deviceId)
      }
      // 保持应用在后台存活
      //  else {
      //   let moduleCheckAccess = api.require('moduleCheckAccess')
      //   var param = { host: 'http://lantang.test.fxcloud.net/api/MovieRoom/GetRoomByDeviceId', userID: api.deviceId }
      //   moduleCheckAccess.startActivity(param)
      // }
    },
    // 保持应用在后台存活
    keepAppAlive() {
      let moduleCheckAccess = api.require('moduleCheckAccess')
      let localHost = $api.getStorage('ip')
      var param = { host: `${localHost}/api/MovieRoom/GetRoomByDeviceId`, userID: api.deviceId }
      moduleCheckAccess.startActivity(param)
    },
    // 检查绑定信息
    async checkBindStatus() {
      try {
        // 如果ip地址找不到则重设ip
        if (!$api.getStorage('ip')) {
          return false
        }
        // 如果配置信息不正确则重设ip
        const res = await request.checkBind($api.getStorage('uuid'))
        if (!res.value.bindStatus) {
          return false
        }
        return true
      } catch (err) {
        return false
      }
    },
    // 打开电影列表
    async openMovieClass() {
      const res = await this.checkBindStatus()
      if (res) {
        openWin(searchClass)
      } else {
        openWin(setIP)
      }
    },
    // 打开支付
    async openPay() {
      const res = await this.checkBindStatus()
      if (res) {
        openWin(payImg)
      } else {
        openWin(setIP)
      }
    },
    // 打开其他列表
    async openAppList(type) {
      const res = await this.checkBindStatus()
      if (res) {
        openWin(app, { type })
      } else {
        openWin(setIP)
      }
    },
    // 轮询查看包厢状态
    loopCheckStatus() {
      clearInterval(this.statusTimer)
      this.statusTimer = setInterval(() => {
        this.$checkBindAsync().then((res) => {
          // alert(JSON.stringify(res))
          this.agentName = $api.getStorage('agentName')
          this.roomName = $api.getStorage('roomName')
        })
      }, 1000 * 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #fff;
  background-image: url('../../static/image/index/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .focus {
    box-sizing: border-box;
    border-radius: 1.2rem;
    transition: all 0.4s;
    border: 5px solid transparent;
    box-shadow: none;
    &:focus {
      border: 5px solid #ffe1a1 !important;
      outline: none !important;
      box-shadow: 0px 0px 16px 3px rgba(255, 225, 161, 0.8);
    }
  }
  .option-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    .top-title {
      color: #fff;
      font-size: 1.5rem;
      padding-bottom: 2rem;
    }
    .option-wrap {
      width: 100%;
      display: flex;
      .left {
        border-radius: 1rem;
        background: url('../../static/image/index/movie.png') no-repeat;
        background-size: 100% 100%;
        width: 25rem;
        height: 25rem;
      }
      .right {
        display: flex;
        flex-direction: column;
        .top {
          width: 36rem;
          height: 12.5rem;
          background: url('../../static/image/index/tv-play.png') no-repeat;
          background-size: 100% 100%;
        }
        .bottom {
          display: flex;
          align-items: center;
          .item {
            width: 12rem;
            height: 12.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 1rem;
            line-height: 1rem;
            letter-spacing: 0rem;
            color: #ffffff;
            .content {
              display: flex;
              flex-direction: column;
              align-items: center;
              .img-wrap {
                width: 5rem;
                height: 5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                  max-width: 5rem;
                  max-height: 5rem;
                }
              }
            }
          }
          .live {
            background: url('../../static/image/index/live-bg.png') no-repeat;
            background-size: 100% 100%;
          }
          .music {
            background: url('../../static/image/index/music-bg.png') no-repeat;
            background-size: 100% 100%;
          }
          .mall {
            background: url('../../static/image/index/mall-bg.png') no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
    .info-wrap {
      color: #fff;
      margin: 1.63rem 0 0 1.63rem;
      .img-wrap {
        img {
          width: 3rem;
          display: block;
        }
        .line {
          width: 1rem;
          display: block;
        }
      }
      .han {
        font-size: 2.25rem;
        letter-spacing: 0rem;
        font-weight: bold;
      }
      .en {
        font-size: 1.5rem;
        letter-spacing: 0rem;
        text-transform: uppercase;
        font-weight: bold;
      }
      .btm-img {
        .curve {
          width: 2.47rem;
        }
      }
    }
  }
}
</style>

