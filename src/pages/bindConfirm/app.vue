<template>
  <div class="container">
    <van-popup v-model="showPopup" round :close-on-click-overlay="true">
      <div class="popup-wrap">
        <div class="title">请先绑定IP地址和包厢号</div>
        <div class="btn-wrap flex-cc">
          <van-button ref="bindBtn" id="bindBtn" tabindex="0" class="btn focus" size="large" round block type="info"
            @click="goBind">
            立即绑定
          </van-button>
          <!-- <input ref="bindBtn" id="bindBtn" tabindex="0" class="focus" placeholder="的few发射点发生" type="text"> -->
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { setIP } from '@/common/router.js'
import { openWin } from '@/common/openPage.js'

export default {
  data() {
    return {
      showPopup: true
    }
  },
  created() {},
  mounted() {
    document.getElementById('bindBtn').focus()
    this.$refs.bindBtn.focus()
  },
  methods: {
    goBind() {
      openWin(setIP)
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
  .popup-wrap {
    padding: 2rem;
    border-radius: 1rem;
    overflow: hidden;
    .title {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }
}
</style>

