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
    <div class="evaluate e-ed mb-20">
      <span class="num">5.0</span>
      <van-rate v-model="value"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#ffd21e"
                allow-half
                readonly />
      <router-link to="/evaluate">
        <van-button type="primary"
                    to="/"
                    size="small"
                    icon-position="right">发表评价</van-button>
      </router-link>
    </div>
    <div class="evaluate-list mb-20">
      <h3>全部评价</h3>
      <!-- <div v-for="item in evaluateList"
           :key="item.cardId">
        <van-row>
          <van-col span="16">
            <p>{{ item.cardName }}</p>
          </van-col>
          <van-col span="8">
            <van-rate v-model="value"
                      :size="15"
                      color="#ffd21e"
                      void-icon="star"
                      void-color="#ffd21e"
                      allow-half
                      readonly />
          </van-col>
        </van-row>
        <p></p>
        <p>{{ item.cardContent }}</p>
      </div> -->

      <p class="evaluate-no"
         v-if="true">暂无评价，快来发表你的想法！</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Mock from 'mockjs'
export default {
  name: 'evaluateMsg',
  data() {
    return {
      evaluateList
    }
  },
  methods: {
    init() {
      const { evaluateList } = Mock.mock({
        // 精选讲师
        'evaluateList|5-8': [
          {
            cardId: '@increment',
            cardName: '@cword(4)',
            cardName: '@cword(3, 30)',
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
  setup() {
    const value = ref(2.5)
    return { value }
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

  &.e-ed {
    .num {
      color: #FD7649
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
}
</style>
