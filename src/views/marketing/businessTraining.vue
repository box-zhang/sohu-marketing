<template>
  <div>
    <navBar :bar="barMsg"></navBar>
    <van-tabs v-model="active" sticky class="mt-bar">
      <div class="marketingdiv">
        <van-tab
          v-for="item in businessTrainingMsg"
          :title="item.cardName"
          :key="item.cardId"
        >
          <courseMsg :courseData="item.cardList"></courseMsg>
        </van-tab>
      </div>
    </van-tabs>
    <footerLine></footerLine>
  </div>
</template>

<script>
import courseMsg from '@/views/mkModule/courseMsg.vue'
import footerLine from '@/views/mkModule/footerLine.vue'
import navBar from '@/views/mkModule/navBar.vue'
import Mock from 'mockjs'
export default {
  name: 'businessTraining',
  components: {
    courseMsg,
    navBar,
    footerLine,
  },
  data() {
    return {
      active: '',
      barMsg: {
        barName: '业务培训',
        rightMsg: false,
      },
      businessTrainingMsg: [],
    }
  },
  methods: {
    init() {
      const { businessTraining } = Mock.mock({
        // 精选讲师
        'businessTraining|4': [
          {
            cardId: '@increment',
            cardName: '@cword(4)',
            'cardList|8-16': [
              {
                toUrlName: '',
                isShowTime: true,
                isShowUser: true,
                isShowTag: false,
                courseId: '@increment',
                courseName: '@cword(3, 30)',
                courseImg: "@dataImage('120x80','png')",
                courseInUrl: 'courseIn',
                courseTeacher: '@cname()',
                courseTime: "@date('yyyy.MM.dd')",
              },
            ],
          },
        ],
      })
      this.businessTrainingMsg = businessTraining
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="less" scoped="">
.van-sticky {
  margin-bottom: 15px;
  box-shadow: 0px 6px 32px 0px rgba(193, 193, 193, 0.16);
}

.van-tabs__line {
  width: 30px;
}

.van-tab {
  font-size: 14px;
}
</style>
