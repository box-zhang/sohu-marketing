<!--
 * @Author: boxZhang
 * @Date: 2022-08-22 10:13:57
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-24 16:03:46
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\mkModule\evaluateMsg.vue
-->
<template>
  <div>
    <div class="evaluate e-ed mb-20">
      <span class="num">4.0</span>
      <van-rate
        v-model="valueAll"
        :size="25"
        color="#ffd21e"
        void-icon="star"
        void-color="#eee"
        allow-half
        readonly
      />
      <router-link to="/evaluate">
        <van-button
          type="primary"
          size="small"
          icon-position="right"
          disabled
          v-if="false"
          >已评价</van-button
        >
        <van-button
          type="primary"
          size="small"
          icon-position="right"
          v-if="true"
          >发表评价</van-button
        >
      </router-link>
    </div>
    <div class="evaluate-list mb-20">
      <h3>全部评价</h3>
      <div v-for="item in evaluateList" :key="item.cardId" class="e-item">
        <van-row>
          <van-col span="16">
            <p class="e-name">{{ item.cardName }}</p>
          </van-col>
          <van-col span="8">
            <van-rate
              v-model="valueItem"
              :size="15"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
              allow-half
              readonly
            />
          </van-col>
        </van-row>
        <p class="e-time">{{ item.cardTime }}</p>
        <p class="e-content">{{ item.cardContent }}</p>
      </div>

      <p class="evaluate-no" v-if="false">暂无评价，快来发表你的想法！</p>
    </div>
    <footerLine></footerLine>
  </div>
</template>

<script>
import footerLine from '@/views/mkModule/footerLine.vue'
import Mock from 'mockjs'
// import { ref } from 'vue'
export default {
  name: 'evaluateMsg',
  data() {
    return {
      valueAll: 4,
      valueItem: 4,
      evaluateList: [],
    }
  },
  components: {
    footerLine,
  },
  methods: {
    init() {
      const { evaluateList } = Mock.mock({
        // 精选讲师
        'evaluateList|5-8': [
          {
            cardId: '@increment',
            cardName: '@cword(4)',
            cardContent: '@cparagraph()',
            cardTime: "@date('yyyy.MM.dd')",
          },
        ],
      })
      this.evaluateList = evaluateList
    },
  },
  mounted() {
    this.init()
  },
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

  .van-button--disabled {
    background-color: transparent;
    border-color: transparent;
  }

  &.e-ed {
    .num {
      color: #fd7649;
    }
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

  .e-item {
    padding: 5px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }

  .e-content {
    margin: 5px 0;
  }

  .e-name,
  .e-time {
    margin: 0;
  }

  .e-name {
    font-weight: bold;
    font-size: 14px;
  }

  .e-time {
    color: #999;
  }
}
</style>
