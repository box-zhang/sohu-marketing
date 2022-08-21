<template>
  <van-row class="m-title">
    <van-col span="18">
      <h2>{{ info.title }}
      </h2>
    </van-col>
    <van-col span="6">
      <div class="st-icon-pandora m-more"
           v-if="info.isMore">更多 <span class="st-icon-pandora">></span></div>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: 'mkTitle',
  data() {
    return {
      info: this.data
    }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },


}
</script>

<style  lang="less" scope="">
.m-title {
  position: relative;

  .m-more {
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -8px;
    color: #999
  }
}
</style>