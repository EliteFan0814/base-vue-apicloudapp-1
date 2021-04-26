<template>
  <div class="container">
    <div class="img-wrap">
      <div v-if="roomStatus == 0" class="hint">包厢暂未开启</div>
      <div v-if="roomStatus == -10" class="hint">包厢已超时</div>
      <img :src="advImgUrl" alt="">
    </div>
  </div>
</template>

<script>
import { getUrlName, MyGlobal } from '@/common/util.js'
import { bindConfirm, setIP, searchClass, search, app } from '@/common/router.js'
import { openWin, openFrame } from '@/common/openPage.js'
import { checkPermision } from '@/common/checkPermision.js'
import request from '@/api/searchClass'

export default {
  data() {
    return {
      advImgUrl: undefined,
      roomStatus: undefined,
      code: undefined
    }
  },
  created() {
    this.getInitInfo()
    this.getAdvImg()
  },
  methods: {
    // 获取初始数据
    getInitInfo() {
      this.roomStatus = api.pageParam.data.roomStatus
      if (this.roomStatus === 0) {
        this.code = 'ad_image'
      } else if (this.roomStatus === -10) {
        this.code = 'time_out_img'
      }
    },
    getAdvImg() {
      request
        .getAdvList(this.code)
        .then((res) => {
          this.advImgUrl = $api.getStorage('ip') + res.value.value
        })
        .catch((err) => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-image: url('../../static/image/index/bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .hint {
    padding: 0.5rem;
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
  }
  .img-wrap {
    position: relative;
    width: 100vw;
    height: 100vh;
    img {
      width: 100vw;
      height: 100vh;
    }
    .hint {
      color: #fff;
      opacity: 0.8;
      font-size: 1.5rem;
      top: 2rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>

