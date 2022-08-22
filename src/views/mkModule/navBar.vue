<!--
 * @Author: boxZhang
 * @Date: 2022-08-22 10:13:57
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-22 17:00:12
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\mkModule\navBar.vue
-->
<template>
  <!-- 导航栏 -->
  <van-nav-bar
    :title="info"
    left-arrow
    @click-left="onClickLeft"
    :border="false"
    fixed="true"
  />
  <!-- 导航栏 end -->
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      info: this.barName,
    }
  },
  props: {
    barName: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1) //返回上一层
    },
  },
}
</script>

<style scope lang="less">
.van-nav-bar .van-nav-bar__title {
  font-size: 16px;
}
</style>
