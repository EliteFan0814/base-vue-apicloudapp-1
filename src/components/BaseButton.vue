<template>
  <div @click="handleClick" tabindex="0" class="button" :class="[isPushing?'is-pushing':'',isRefuse?'is-refuse':'']">
    {{name}}
  </div>
</template>

<script>
//  name 按钮名字
// isPushing 判断请求是否正在处理中

export default {
  props: {
    name: {
      type: String,
      default: '按钮'
    },
    isRefuse: {
      type: Boolean,
      default: false
    },
    isPushing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      if (!this.isPushing) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  background-color: #43434D;
  border-radius: 1.45rem;
  font-size: 0.94rem;
  line-height: 1.35rem;
  letter-spacing: 0rem;
  color: #ffffff;
  padding: 0.3rem 1.35rem;
  text-align: center;
  transition: all 0.4s;
  white-space: nowrap;
  &:focus {
    outline: none  !important;
    background-color: #4f37fa;
    box-shadow: 0rem 0rem 1rem 0.1rem rgba(255, 255, 255, 0.8);
  }
}
.is-refuse {
  background-color: #ff4343;
}
.is-pushing {
  background-color: #d0d0d0;
  color: #fff;
}
</style>