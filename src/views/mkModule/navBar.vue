<!--
 * @Author: boxZhang
 * @Date: 2022-08-22 10:13:57
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-23 11:34:40
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\mkModule\navBar.vue
-->
<template>
  <!-- 导航栏 -->
  <div class="topdiv">
    <van-nav-bar
      :title="info.barName"
      left-arrow
      @click-left="onClickLeft"
      :border="false"
      fixed="true"
    >
      <template #right>
        <div class="icon" :v-if="info.rightMsg">
          <router-link :to="info.rightMsg.barRightUrl">
            <span>{{ info.rightMsg.barRightText }}</span>
            <img :src="info.rightMsg.barRightIcon" alt="" />
          </router-link>
        </div>
      </template>
    </van-nav-bar>
  </div>
  <!-- 导航栏 end -->
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      info: this.bar,
    }
  },
  props: {
    bar: {
      type: Object,
      default: {},
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
.topdiv {
  position: relative;
  z-index: 999;
  .van-nav-bar .van-nav-bar__title {
    font-size: 16px;
  }
  .icon {
    position: absolute;
    z-index: 1;
    top: 50%;
    right: 18px;
    margin-top: -10px;
    width: 20px;
    height: 20px;
    font-size: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
