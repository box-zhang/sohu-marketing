<!--
 * @Author: boxZhang
 * @Date: 2022-08-22 10:13:57
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-25 10:31:53
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\mkModule\mTitle.vue
-->
<template>
  <van-row class="m-title">
    <van-col span="18">
      <h2>{{ info.title }}</h2>
    </van-col>
    <van-col span="6">
      <router-link :to="{ name: info.toUrlName }">
        <div class="m-more" v-if="info.isMore">
          更多
          <span class="m-more-icon"
            ><img src="@/assets/static/peixun/icon_fanhui@3x.png" alt=""
          /></span>
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
    padding-right: 10px;

    .m-more-icon {
      display: inline-block;
      width: 5px;

      img {
        width: 100%;
      }
    }
  }
}
</style>
