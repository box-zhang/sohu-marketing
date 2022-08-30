<!--
 * @Author: boxZhang
 * @Date: 2022-08-24 10:06:52
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-30 10:15:50
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\marketing\newUserLearn.vue
-->
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
        barName: '新人必学',
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
            isShowTime: true,
            isShowUser: false,
            isShowTags: false,
            isShowProgress: false,
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

<style lang="less" scoped>
.course-msg .msg-r .time {
  float: left !important;
}
</style>
