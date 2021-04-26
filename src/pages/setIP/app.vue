<template>
  <div class="container">
    <div class="content-wrap flex-cc">
      <div class="form-wrap flex-dc">
        <div class="title">请先绑定IP地址和包厢号</div>
        <div class="form">
          <div class="input-wrap flex">
            <div class="name">IP地址：</div>
            <div class="input"><input v-model="ip" tabindex="0" class="focus" placeholder="请输入IP地址" type="text"></div>
          </div>
          <div class="input-wrap flex">
            <div class="name">端口号：</div>
            <div class="input"><input v-model="port" tabindex="0" class="focus" placeholder="请输入端口号" type="text"></div>
          </div>
          <div class="input-wrap flex">
            <div class="name">包厢号：</div>
            <div class="input"><input v-model="roomId" tabindex="0" class="focus" placeholder="请输入包厢号" type="text">
            </div>
          </div>
          <div class="btn-wrap flex-cc">
            <van-button tabindex="0" class="btn focus" :disabled="!ip||!roomId" size="large" round block type="warning"
              @click="clear">清空重置
            </van-button>
            <van-button tabindex="0" class="btn focus" :loading="isPushing" loading-text="绑定中" size="large" round block
              type="info" @click="handleBind">立即绑定
            </van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { openWin, openFrame } from '@/common/openPage.js'
import request from '@/api/searchClass'
export default {
  data() {
    return {
      ip: '192.168.0.1',
      port: 8199,
      roomId: 7,
      isPushing: false,
      deviceId: $api.getStorage('uuid')
    }
  },
  created() {},
  methods: {
    clear() {
      this.ip = undefined
      this.port = 8199
      this.roomId = undefined
    },
    handleBind() {
      // const tempIp = 'http://' + this.ip + ':' + this.port
      const tempIp = 'http://' + 'lantang.test.fxcloud.net' + ':' + 80
      $api.setStorage('ip', tempIp)
      this.isPushing = true
      if (!this.ip) {
        this.isPushing = false
        return api.toast({ msg: '请输入ip地址' })
      }
      if (!this.port) {
        this.isPushing = false
        return api.toast({ msg: '请输入端口号' })
      }
      if (!this.roomId) {
        this.isPushing = false
        return api.toast({ msg: '请输入包厢号' })
      }
      request
        .bindDevice(this.deviceId, this.roomId)
        .then((res) => {
          // 绑定成功，存储IP地址
          this.isPushing = false
          // 发送绑定成功事件
          api.sendEvent({
            name: 'bindIpSuccess'
          })
          api.closeWin()
        })
        .catch((err) => {
          // api.toast({ msg: '绑定失败，请确认IP和端口号设置正确！' })
          this.isPushing = false
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow: hidden;
  font-family: PingFang-SC-Bold;
  padding: 0;

  background-image: url('../../static/image/index/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .omit-1 {
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
  }
  .content-wrap {
    // border: 1px solid red;
    height: 70vh;
    box-sizing: border-box;
    padding: 2rem;
    .focus {
      box-sizing: border-box;
      transition: all 0.4s;
      box-shadow: none;
      outline: 1px solid transparent;
      &:focus {
        // outline: 1px solid #4f37fa;
        outline: 1px solid transparent;
        box-shadow: 0px 0px 20px 4px rgba(255, 255, 255, 0.8);
        border-image-source: linear-gradient(90deg, #ffffff 100%);
        border-image-slice: 1;
      }
    }
    .text-focus {
      // transition: all 0.1s;
      // outline: none !important;
      font-weight: bold;
      font-size: 1.41rem;
      text-shadow: 0px 0px 5px #fff;
      // &:focus {
      // }
    }
    .item-focus {
      box-sizing: border-box;
      transition: all 0.4s;
      box-shadow: none;
      outline: 1px solid transparent;
      &:focus {
        .img-wrap {
          outline: 1px solid #4f37fa;
          box-shadow: 0px 0px 20px 4px rgba(255, 255, 255, 0.8);
          border-image-source: linear-gradient(90deg, #ffffff 100%);
          border-image-slice: 1;
        }
        .name {
          font-weight: 400;
          text-shadow: 0px 0px 1px #fff;
        }
      }
    }
    .form-wrap {
      color: #fff;
      .title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      .form {
        .input-wrap {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          .input {
            // border: 1px solid red;
            width: 18rem;
          }
          input {
            width: 100%;
            border-radius: 1.2rem;
            color: #000;
            font-size: 1.2rem;
            padding: 0.5rem;
          }
        }
        .btn-wrap {
          justify-content: space-around;
          // border: 1px solid red;
          padding: 1rem 3rem;
          .btn {
            height: 2.5rem;
            width: 40%;
          }
        }
      }
    }
  }
}
.flex {
  display: flex;
  align-items: center;
}
.flex-cc {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-dc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.omit-1 {
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
</style>