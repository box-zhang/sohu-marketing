<template>
  <div class="evaluate">
    <navBar :bar="barMsg">
      <template v-slot:submitStar>
        <van-button type="primary" size="small" to="/courseIn">提交</van-button>
      </template>
    </navBar>
    <!-- <div class="topdiv">
      <navBar :barName="barName"></navBar>
      <van-button type="primary" size="small" to="index">提交</van-button>
    </div> -->
    <div class="mt-bar">
      <div class="star">
        <van-rate
          v-model="value"
          @change="onChange"
          :count="5"
          :size="25"
          color="#FFD33F"
          void-icon="star"
          void-color="#ddd"
          allow-half
        />
        <p>{{ valueText }}</p>
      </div>
      <div class="evaluate-form">
        <van-cell-group inset>
          <van-field
            v-model="message"
            rows="6"
            autosize
            label="留言"
            type="textarea"
            maxlength="500"
            placeholder="课程内容如何？学习有收获吗？快来评价一下课程吧！"
            show-word-limit
          />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/views/mkModule/navBar.vue'

export default {
  name: 'evaluate',
  components: {
    navBar,
  },
  data() {
    return {
      active: '',
      value: 0,
      valueMsg: [
        {
          vNum: 1,
          vText: '1分',
        },
        {
          vNum: 1.5,
          vText: '1.5分',
        },
        {
          vNum: 2,
          vText: '2分',
        },
        {
          vNum: 2.5,
          vText: '2.5分',
        },
        {
          vNum: 3,
          vText: '3分',
        },
        {
          vNum: 3.5,
          vText: '3.5分',
        },
        {
          vNum: 4,
          vText: '4分',
        },
        {
          vNum: 4.5,
          vText: '4.5分',
        },
        {
          vNum: 5,
          vText: '5分',
        },
      ],
      valueText: '请点击星星进行评分',
      message: '',
      barMsg: {
        barName: '发表评价',
        rightMsg: false,
      },
    }
  },
  methods: {
    onChange(value) {
      // Toast('当前值：' + value)
      for (var i = 0; i < this.valueMsg.length; i++) {
        console.log(this.valueMsg[i])
        if (value == this.valueMsg[i].vNum) {
          this.valueText = this.valueMsg[i].vText =
            '您打出的分数为：' + this.valueMsg[i].vNum + '分'
          return this.valueText
          console.log(this.valueText)
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.evaluate {
  // position: fixed;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  background: #f9f9f9;

  .star {
    padding: 20px 0;
    text-align: center;
    color: #aaaaaa;
    background: #fff;
  }

  .evaluate-form {
    margin: 5px 0;
    height: 1000px;
  }

  .van-field__label {
    width: 2.2rem;
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
      background: #ffd33f;
      border: 1px solid #ffd33f;
      color: #333;
      font-weight: bolder;
      // height: 28px;
      // line-height: 28px;
      padding: 0 15px;
      font-size: 12px;
      min-width: 80px;
    }

    .van-button--disabled {
      background: #ddd;
      border: 1px solid #ddd;
      color: #bbb;
    }
  }
}
</style>
