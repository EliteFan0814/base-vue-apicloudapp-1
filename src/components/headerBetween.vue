<template>
  <div>
    <div class="header-wrap" :style="{'background': bgColor}">
      <div class="left flex" :style="{'color': color, 'margin-left': leftType ? '-0.5rem' : ''}" @click="leftClick">
        <van-icon name="arrow-left" v-if="leftType" />
        {{leftText}}
      </div>

      <div class="right" @click="rightClick">{{rightText}}</div>
    </div>
    <div v-if="useHeight" class="height"></div>
  </div>
</template>

<script>
export default {
  props: {
    leftText: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#333'
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    leftType: {
      type: Boolean,
      default: false,
    },
    rightText: {
      type: String,
      default: ''
    },
    useHeight: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    leftClick() {
      if (!this.leftType) return;
      api.closeWin();
      this.$emit('leftClick')
    },
    rightClick() {
      this.$emit('rightClick')
    },
  }
}

</script>

<style lang="scss" scoped>
.header-wrap {
  // border: 1px solid red;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  height: 60px;
  padding: 50px 1.5rem 15px;
  line-height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  .left {
    // border: 1px solid red;
    padding: 8px 0;
    font-size: 1.8rem;
    font-weight: bold;
  }
  .right {
    color: #42434c;
    font-size: 1.4rem;
  }
}

.height {
  height: 60px;
}
</style>



