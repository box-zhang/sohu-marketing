<template>
  <div class="teacher-in">
    <div class="topdiv">
      <navBar :barName="barName"></navBar>
    </div>
    <div class="marketingdiv mt-bar">
      <van-row
        gutter="10"
        class="mtb-10"
        v-for="item in teacherMsg"
        :key="item.tId"
      >
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
      barName: '内部讲师',
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
            isShowTitle: false,
            isShowTags: true,
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
  .teacher-ifo {
    margin: 20px 0;
  }

  .teacher-item {
    position: relative;
    margin-bottom: 10px;

    .van-image {
      border-radius: 5px;
      overflow: hidden;
    }
  }

  .tag-box {
    margin: 20px 0;

    .van-tag {
      margin-right: 5px;
    }
  }

  .course-list {
    background: #f9f9f9;
    margin: 0 -0.426667rem;
    padding: 0 0.426667rem;
  }

  .course-item:last-child {
    border-bottom: 0;
  }

  .course-item {
    position: relative;
    border-bottom: 1px solid #eee;

    .course-text {
      padding-left: 26px;
      overflow: hidden;

      h3,
      .time-box {
        margin: 10px 0;
      }
    }

    .van-icon-play-circle {
      position: absolute;
      font-size: 14px;
      top: 13px;
      left: 8px;
    }

    .time-box {
      overflow: hidden;
      color: #aaa;

      .van-icon {
        position: absolute;
        top: 2px;
        left: 0;
        font-size: 12px;
        margin-right: 5px;
      }

      .time-long,
      .time {
        position: relative;
        padding-left: 16px;
      }

      .time-long {
        float: left;
      }

      .time {
        float: right;
      }
    }
  }

  .show-more {
    padding: 20px 0;
    text-align: center;
  }

  .van-tabs--line .van-tabs__wrap {
    margin-bottom: 10px;
  }

  .van-tab {
    font-size: 16px;
  }
}
</style>
