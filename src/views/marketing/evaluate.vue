<template>
  <div class="evaluate">
    <div class="topdiv">
      <navBar :barName="barName"></navBar>
      <van-button type="primary"
                  size="small"
                  to="index">提交</van-button>
    </div>
    <div class="mt-bar">

    <div class="star">
      <van-rate v-model="value"
                :size="25"
                color="#FFD33F"
                void-icon="star"
                void-color="#ddd"
                allow-half />
      <p>请点击星星评分</p>
    </div>
    <div class="evaluate-form">
      <van-cell-group inset>
        <van-field v-model="message"
                   rows="10"
                   autosize
                   label="留言"
                   type="textarea"
                   maxlength="500"
                   placeholder="课程内容如何？学习有收获吗？快来评价一下课程吧！"
                   show-word-limit />
      </van-cell-group>
    </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/views/mkModule/navBar.vue";
import { ref } from 'vue';
export default {
  name: 'evaluate',
  components: {
    navBar
  },
  data() {
    return {
      active: "",
      value: "",
      barName: "发表评价",

    }
  },
  methods: {
    setup() {
      const value = ref(3);
      return { value };
    },
  },
  mounted() {
    this.setup()
  },

}
</script>

<style lang="less" scope>
.evaluate {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #F9F9F9;

  .star {
    padding: 20px 0;
    text-align: center;
    color: #AAAAAA;
    background: #fff;
  }

  .evaluate-form {
    margin: 30px 0;
    height: 900px
  }

  .van-field__label {
    width: auto
  }

  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-width: 0;
  }

  .topdiv {
    position: relative;

    .van-button {
      position: absolute;
      z-index: 2;
      top: 50%;
      right: 20px;
      margin-top: -14px;
      border-radius: 5px;
      background: #FFD33F;
      border: 1px solid #FFD33F;
      color: #333;
      font-weight: bolder;
      height: 28px;
      line-height: 28px;
      padding: 0 15px;
      font-size: 12px;
    }

    .van-button--disabled {
      background: #ddd;
      border: 1px solid #ddd;
      color: #bbb;
    }
  }
}
</style>