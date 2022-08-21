<template>
  <div>
    <div class="evaluate mb-20">
      <span class="num">0.0</span>
      <van-rate v-model="value"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                allow-half
                readonly />
      <van-button type="primary"
                  to="/"
                  size="small"
                  icon-position="right">发表评价</van-button>
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
    color: #AAAAAA;
  }

  .van-rate {
    position: absolute;
    top: 50%;
    left: 80px;
    margin-top: -13px
  }

  .van-button {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -18px;
    font-size: 16px;
    line-height: 24px;
    color: #EFA11F;
    background-color: #FFF7EB;
    border-color: #FFF7EB
  }
}

.evaluate-list {
  h3 {
    font-size: 16px
  }

  .evaluate-no {
    padding: 50px;
    text-align: center;
    color: #aaa
  }

}
</style>