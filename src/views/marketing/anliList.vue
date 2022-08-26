<template>
  <div>
    <navBar :bar="barMsg"></navBar>
    <div class="marketingdiv mt-bar">
      <!-- {{ dataList }} -->
      <courseMsg :courseData="dataList"></courseMsg>
    </div>
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
        barName: '案例解析',
        rightMsg: false,
      },
      dataList: [],
    }
  },
  methods: {
    init() {
      const { watchList } = Mock.mock({
        'watchList|1': [
          {
            cardId: '@increment',
            cardName: '@cword(4)',
            'cardList|8-16': [
              {
                toUrlName: '',
                isShowTime: true,
                isShowUser: false,
                isShowTag: false,
                courseId: '@increment',
                courseName: '@cword(3, 30)',
                courseUrl: "@dataImage('120x80','png')",
                courseTeacher: '@cname()',
                courseTime: "@date('yyyy.MM.dd')",
              },
            ],
          },
        ],
      })
      this.dataList = watchList.cardList
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="less" scoped>
.van-image {
  border-radius: 5px;
  overflow: hidden;
}

.van-row {
  position: relative;
}

.van-sticky {
  margin-bottom: 15px;
}

.van-tabs__line {
  width: 30px;
}

.van-tab {
  font-size: 14px;
}

.video-lr {
  margin: 12px 0;

  .msg-r {
    // position: absolute;
    // bottom: 0;
    // overflow: hidden;
    // width: 78%;
  }
}

.video-msg .time {
  float: left !important;
}
</style>
