<template>
  <div class="tab-wrap">
    <div class="tab-wrap-item" :class="{'active': active == index}" v-for="(item, index) in tabs" :key="index"
      @click="tabClick(item, index)">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      active: 0
    }
  },
  methods: {
    tabClick(item, index) {
      if (item.noUse) {
        this.$toast(item.noUse)
      } else {
        this.active = index
        this.$emit('tabClick', item.value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-wrap {
  overflow-x: scroll;
  box-sizing: border-box;
  padding: 0.1rem 0 0;
  display: flex;
  color: #9ca8be;
  font-size: 1.5rem;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  .tab-wrap-item {
    text-align: center;
    min-width: 20%;
    margin-left: 1.15rem;
  }
  // &-item {
  //   &:nth-child(n + 2) {
  //     margin-left: 1.15rem;
  //   }
  // }
  .active {
    color: #333;
    font-weight: bolder;
    color: #4385ff;
    // &::after {
    //   display: block;
    //   content: "";
    //   width: 2rem;
    //   height: 1rem;
    //   border-radius: 50%;
    //   border: 1px solid #4385ff;
    //   border-top: none;
    //   border-left: none;
    //   border-right: none;
    //   margin: 0 auto;
    //   margin-top: -0.5rem;
    // }
    &::after {
      display: block;
      content: '';
      width: 90%;
      border: 2px solid #4385ff;
      border-top: none;
      border-left: none;
      border-right: none;
      margin: 0 auto;
      margin-top: 0.5rem;
    }
  }
}
</style>


