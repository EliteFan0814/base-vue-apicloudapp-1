<template>
  <div class="container">
    <div class="qr-wrap">
      <div v-for="(item,index) in payList" :key="index" class="qr-item">
        <div class="img-wrap">
          <img :src="item.value" alt="">
        </div>
        <span>{{item.remark}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/api/searchClass'

export default {
  data() {
    return {
      payList: undefined
    }
  },
  created() {
    this.getPayImg()
  },
  methods: {
    getPayImg() {
      request
        .getPayImg()
        .then((res) => {
          res.value.map((item) => {
            item.value = $api.getStorage('ip') + item.value
          })
          this.payList = res.value
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
  .qr-wrap {
    // border: 1px solid yellow;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .qr-item {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 2rem;
      .img-wrap {
        position: relative;
        width: 50%;
        height: 0;
        padding-bottom: 50%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

