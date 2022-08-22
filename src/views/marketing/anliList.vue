<template>
  <div>
    <navBar :barName="barName"></navBar>
    <div class="marketingdiv mt-bar">
      <van-row gutter="10" class="video-lr" v-for="item in watchList">
        <van-col span="8">
          <van-image
            width="100%"
            fit="cover"
            position="center"
            :src="item.courseUrl"
          />
        </van-col>
        <van-col span="16">
          <courseMsg :courseData="item"></courseMsg>
        </van-col>
      </van-row>
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
      barName: '案例解析',
      watchList: [],
    }
  },
  methods: {
    init() {
      const { watchList } = Mock.mock({
        // 精选讲师
        'watchList|8-18': [
          {
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
      })
      this.watchList = watchList
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="less">
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
