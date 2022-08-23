<template>
  <div>
    <navBar :bar="barMsg"></navBar>
    <div class="marketingdiv mt-bar">
      <!-- 新人必学 -->
      <van-row class="hint">
        <van-col span="16">
          <div class="hint-img">
            <img src="@/assets/static/peixun/icon_xinrenkehceng@2x.png"
                 alt="" />
          </div>
          <div class="hint-text">
            <h3>新人课程</h3>
            <p class="gray">完成自学</p>
          </div>
        </van-col>
        <van-col span="8">
          <router-link to="/learn"><button>立即进入</button></router-link>
        </van-col>
      </van-row>
      <div class="block20"></div>
      <h2>新人必学三步走</h2>
      <van-steps direction="vertical">
        <van-step>
          <h3>第一步：完成新人课程</h3>
          <p class="step-hint">
            <span class="color333">
              <van-icon name="warning-o"
                        color="#666" />提示
            </span>
            请合理规划时间完成新人课程
          </p>
        </van-step>
        <van-step>
          <h3>第二步：理论考试</h3>
          <p class="step-hint">
            <span class="color333">
              <van-icon name="warning-o"
                        color="#666" />提示
            </span>
            完成新人必学课程后将在线上进行考试
          </p>
        </van-step>
        <van-step>
          <h3>第三步：新人天考核</h3>
          <p class="step-hint">
            <span class="color333">
              <van-icon name="warning-o"
                        color="#666" />提示
            </span>
            理论考试完成后将在线下进行新人提案考核
          </p>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
import navBar from '@/views/mkModule/navBar.vue'
export default {
  name: 'marketing',
  components: {
    navBar,
  },
  data() {
    return {
      active: '',
      barMsg: {
        barName: '新人必学',
        rightMsg: false,
      },
    }
  },
}
</script>

<style lang="less" scope>
.step-hint {
  position: relative;
  padding: 10px 10px 10px 34px;
  background: #f9f9f9;
  color: #999;

  .van-icon-warning-o {
    position: absolute;
    top: 11px;
    left: 15px;
    font-size: 14px;
  }
}

.van-step__circle,
.van-icon-checked::before {
  display: block;
  width: 7px;
  height: 7px;
  background-color: #ffd33f;
  border-radius: 50%;
  content: '';
}

.van-step__icon--active,
.van-step__title--active {
  color: #999;
}

.van-step__icon,
.van-step__title {
  margin-top: -15px;
}

.van-steps h3 {
  color: #333;
}

.color333 {
  color: #333;
}

.van-step--vertical:not(:last-child)::after {
  border: 0;
}

.hint {
  background: #f6f6f6;

}
</style>
