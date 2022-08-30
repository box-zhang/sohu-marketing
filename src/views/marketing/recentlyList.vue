<template>
  <div>
    <navBar :bar="barMsg"></navBar>
    <div class="marketingdiv mt-bar">
      <courseMsg :courseData="watchList"></courseMsg>
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
        barName: '最近观看',
        rightMsg: false,
      },
      watchList: [],
    }
  },
  methods: {
    init() {
      const { watchList } = Mock.mock({
        // 精选讲师
        'watchList|8-18': [
          {
            toUrlName: '',
            isShowTime: false,
            isShowUser: false,
            isShowTags: false,
            isShowProgress: true,
            courseId: '@increment',
            courseName: '@cword(3, 30)',
            courseImg: "@dataImage('120x80','png')",
            courseInUrl: 'courseIn',
            courseTeacher: '@cname()',
            courseTime: "@date('yyyy.MM.dd')",
            progressWatched: '@integer(0, 100)',
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

<style scoped lang="less">
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
    position: absolute;
    bottom: 0;
    overflow: hidden;
    width: 78%;
  }
}
</style>
