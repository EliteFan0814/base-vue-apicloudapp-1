<template>
  <div class="dropdown">
    <van-dropdown-menu active-color="#4385ff">
      <van-dropdown-item @change="handleChange" v-model="value" :options="option" />
    </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  props: {
    // 下拉列表
    option: {
      type: Array,
      default: []
    },
    // 默认选择值
    defaultValue: '',
    type: '',
  },
  data() {
    return {
      value: '',
    }
  },
  watch: {
    defaultValue(val) {
      console.log(this.defaultValue);
      this.value = this.defaultValue;
    }
  },
  created() {
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value, this.type)
    }
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  ::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
  }
  ::v-deep .van-dropdown-menu__title {
    padding: 0 16px 0 5px;
  }
  ::v-deep .van-dropdown-menu__title::after {
    right: 6px;
    border-color: transparent transparent #000 #000;
  }
  ::v-deep .van-dropdown-menu__title--active::after {
    border-color: transparent transparent #4385ff #4385ff;
  }
}
</style>