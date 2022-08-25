<!--
 * @Author: boxZhang
 * @Date: 2022-08-22 10:13:56
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-25 10:19:55
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\marketing\masterTeacher.vue
-->
<template>
  <div class="teacher-in">
    <navBar :bar="barMsg"></navBar>
    <div class="marketingdiv mt-bar">
      <van-row
        gutter="10"
        class="mtb-10"
        v-for="item in teacherMsg"
        :key="item.tId"
      >
        <router-link :to="{ name: 'teacherIn' }">
          <van-col span="8">
            <van-image
              fit="cover"
              width="100%"
              position="center"
              :src="item.tImg"
            />
          </van-col>
          <van-col span="16">
            <teacherMsg :courseData="item"> </teacherMsg>
          </van-col>
        </router-link>
      </van-row>
    </div>
    <footerLine></footerLine>
  </div>
</template>

<script>
import evaluateMsg from '@/views/mkModule/evaluateMsg.vue'
import footerLine from '@/views/mkModule/footerLine.vue'
import mkTitle from '@/views/mkModule/mTitle.vue'
import navBar from '@/views/mkModule/navBar.vue'
import teacherMsg from '@/views/mkModule/teacherMsg.vue'
import Mock from 'mockjs'
export default {
  name: 'teacherList',
  components: {
    navBar,
    mkTitle,
    teacherMsg,
    evaluateMsg,
    footerLine,
  },
  data() {
    return {
      active: '',
      barMsg: {
        barName: '大咖驾到',
        rightMsg: false,
      },
      teacherMsg: {},
      activeName: '',
    }
  },
  methods: {
    init() {
      const { teacherMsg } = Mock.mock({
        'teacherMsg|1-12': [
          {
            tId: '@increment',
            tImg: "@dataImage('120x160','png')",
            tName: '@cname()',
            tText: '@cword(3, 50)',
            tTitle: '@cword(8, 20)',
            isShowTitle: true,
            isShowTags: false,
            'tTags|1-3': ['@cword(1, 5)'],
            'courseList|2-10': [
              {
                cId: '@increment',
                cName: '@cword(3, 15)',
                cTime: "@date('yyyy.MM.dd')",
                cTimeLong: '45分34秒',
              },
            ],
            // "@date('yyyy.MM.dd')"
          },
        ],
      })
      this.teacherMsg = teacherMsg
      console.log(teacherMsg)
    },
  },
  mounted() {
    this.init()
  },
  setup() {
    const activeName = ref('kcml')
    return { activeName }
  },
}
</script>

<style lang="less">
.teacher-in {
  .van-image {
    border-radius: 5px;
    overflow: hidden;
  }
}
</style>
