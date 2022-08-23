<!--
 * @Author: boxZhang
 * @Date: 2022-08-22 10:13:57
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-23 15:36:45
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\mkModule\mTitle.vue
-->
<template>
  <van-row class="m-title">
    <van-col span="18">
      <h2>{{ info.title }}</h2>
    </van-col>
    <van-col span="6">
      <router-link :to="info.toUrl">
        <div class="st-icon-pandora m-more" v-if="info.isMore">
          更多 <span class="st-icon-pandora">></span>
        </div>
      </router-link>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: 'mkTitle',
  data() {
    return {
      info: this.data,
    }
  },
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
}
</script>

<style scoped lang="less">
.m-title {
  position: relative;

  .m-more {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -8px;
    color: #999;
  }
}
</style>
