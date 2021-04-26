<template>
  <div class="nolist">
    <img src="@/static/image/icon/nolist.png" />
    <div>{{text}}</div>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '暂无信息'
    }
  }
}
</script>
<style lang='scss' scoped>
.nolist {
  width: 100%;
  text-align: center;
  margin: 10rem auto 0;
  img {
    width: 15rem;
    height: auto;
  }
  div {
    margin-top: 0.2rem;
    font-size: 1.3rem;
    color: #ccc;
  }
}
</style>
