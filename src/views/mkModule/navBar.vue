<template>
  <!-- 导航栏 -->
  <van-nav-bar :title="info"
               left-arrow
               @click-left="onClickLeft"
               :border="false" />
  <!-- 导航栏 end -->
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
      info: this.barName
    }
  },
  props: {
    barName: {
      type: String,
      default: ""
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);//返回上一层
    }
  }

}
</script>

<style scope lang="less">
.van-nav-bar .van-nav-bar__title {
  font-size: 18px;
}
</style>