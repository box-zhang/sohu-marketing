<!--
 * @Author: boxZhang
 * @Date: 2022-08-22 10:13:57
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-23 16:43:44
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\mkModule\evaluateMsg.vue
-->
<template>
  <div>
    <div class="evaluate mb-20">
      <span class="num">0.0</span>
      <van-rate
        v-model="value"
        :size="25"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
        allow-half
        readonly
      />
      <router-link to="/evaluate">
        <van-button type="primary" to="/" size="small" icon-position="right"
          >发表评价</van-button
        >
      </router-link>
    </div>
    <div class="evaluate-list mb-20">
      <h3>全部评价</h3>
      <p class="evaluate-no">暂无评价，快来发表你的想法！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'evaluateMsg',
}
</script>

<style lang="less" scope>
.evaluate {
  position: relative;

  .num {
    margin-right: 20px;
    font-size: 40px;
    font-weight: 600;
    color: #aaaaaa;
  }

  .van-rate {
    // position: absolute;
    // top: 50%;
    // left: 80px;
    // margin-top: -13px;
  }

  .van-button {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -18px;
    font-size: 16px;
    line-height: 24px;
    color: #efa11f;
    background-color: #fff7eb;
    border-color: #fff7eb;
  }
}

.evaluate-list {
  h3 {
    font-size: 16px;
  }

  .evaluate-no {
    padding: 50px;
    text-align: center;
    color: #aaa;
  }
}
</style>
