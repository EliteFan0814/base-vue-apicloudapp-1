<template>
  <div class="container">
    <div v-if="showPlayBefore" class="poster_img">
      <img src="@/static/image/icon/loading.gif" alt="">
    </div>
    <video class="video-wrap" id="videoAD" autoplay="autoplay" @play="onPlay" @ended="videoEnd">
      <source :src="advertiseUrl" type="video/mp4">
      您的浏览器不支持Video标签。
    </video>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
// import { loginForm } from '@/common/router.js'
import { openWin } from '@/common/openPage.js'
import request from '@/api/searchClass'

export default {
  components: {
    BaseButton
  },
  data() {
    return {
      showPlayBefore: true,
      localHost: $api.getStorage('ip'),
      advertiseUrl: api.pageParam.data.advertiseUrl,
      movieUrl: api.pageParam.data.info
    }
  },
  created() {
    var movie = this.movieUrl.split('/')
    var movieEcod = movie.map((o) => {
      return encodeURI(o)
    })
  },
  mounted() {
    api.addEventListener(
      {
        name: 'keyback'
      },
      (ret, err) => {
        this.$toast('无法跳过广告播放')
      }
    )
  },
  methods: {
    onPlay() {
      this.showPlayBefore = false
    },
    videoEnd() {
      //this.$toast.success('播放完毕')
      // 广告播放完毕
      api.sendEvent({
        name: 'videoAdEnd'
      })
      var movie = this.movieUrl.split('/')
      var movieEcod = movie.map((o) => {
        return encodeURIComponent(o)
      })
      api.openVideo({
        //  url: 'http://lantang.test.fxcloud.net/moviec/%E6%B5%B7%E5%BA%95%E5%B0%8F%E6%80%BB%E9%98%9F/2-1.mp4'
        url: this.localHost + movieEcod.join('/')
      })
      setTimeout(() => {
        api.closeWin()
      }, 1000 * 2)
    }
    // openLoginForm(role) {
    //   $api.setStorage('roleValue', role)
    //   openWin(loginForm, { role })
    // }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #000;
  font-family: PingFang-SC-Bold;
  padding: 0;
  .poster_img {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .video-wrap {
    // border: 1px solid red;
    width: 100%;
    height: 100vh;
  }
}
</style>