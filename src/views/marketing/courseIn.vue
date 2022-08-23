<template>
  <div class="course-in">
    <navBar :bar="barMsg"></navBar>
    <div class="video-box mt-bar">
      <van-icon name="play-circle-o" size="2rem" color="white" />
    </div>
    <van-tabs v-model:active="active" scrollspy sticky>
      <van-tab
        v-for="item in courseDataMsg"
        :title="item.cardName"
        :key="item.cardId"
      >
        <div class="video-lr">
          <!-- <courseMsg :courseData="item.cardList"></courseMsg> -->
        </div>
      </van-tab>
    </van-tabs>
    <div class="marketingdiv">
      <!-- <courseMsg :courseData="courseDataMsg[0]"></courseMsg> -->
      <div class="course-msg mb-20">
        <h2>{{ courseDataMsg[0].courseName }}</h2>
        <p v-if="courseDataMsg[0].isShowIntroduce">
          {{ courseDataMsg[0].courseIntroduce }}
        </p>
        <div class="msg-r">
          <div class="msg text-hide" v-if="courseDataMsg[0].isShowUser">
            <van-icon name="user-circle-o" />
            <span class="">讲师</span>
            <span class="gray">{{
              courseDataMsg[0].courseTeacher.cTeacherName
            }}</span>
          </div>

          <div class="time text-hide">
            <van-icon v-if="courseDataMsg[0].isShowTime" name="clock-o" />
            <span class="gray" v-if="courseDataMsg[0].isShowTime">{{
              courseDataMsg[0].courseTime
            }}</span>
          </div>
        </div>
      </div>
      <h2>讲师介绍</h2>
      <div class="teacher-msg mb-20">
        <div class="teacher-head">
          <van-image
            round
            width="100%"
            height="100%"
            :src="courseDataMsg[0].courseTeacher.cTeacherImg"
          />
        </div>
        <h3>{{ courseDataMsg[0].courseTeacher.cTeacherName }}</h3>
        <p>{{ courseDataMsg[0].courseTeacher.cTeacherIntroduce }}</p>
      </div>
      <h2>课程资料</h2>
      <div class="course-file mb-20">
        <van-tag
          type="primary"
          size="medium"
          color="#FFF7EB"
          text-color="#EFA11F"
          >PDF</van-tag
        >
        <p class="text-hide">{{ courseDataMsg[0].courseName }}</p>
        <div class="share">
          <span class="st-icon-pandora">
            <van-icon name="share-o" color="#555555" />
          </span>
        </div>
      </div>
      <h2>课程评价</h2>
      <evaluateMsg></evaluateMsg>
    </div>
  </div>
</template>

<script>
import courseMsg from '@/views/mkModule/courseMsg.vue'
import evaluateMsg from '@/views/mkModule/evaluateMsg.vue'
import mkTitle from '@/views/mkModule/mTitle.vue'
import navBar from '@/views/mkModule/navBar.vue'
import Mock from 'mockjs'
import { ref } from 'vue'
export default {
  name: 'courseIn',
  components: {
    navBar,
    mkTitle,
    courseMsg,
    evaluateMsg,
  },
  data() {
    return {
      active: '',
      barMsg: {
        barName: '课程详情',
        rightMsg: false,
      },
      value: '',
      courseDataMsg: [],
    }
  },
  methods: {
    init() {
      const { courseMsg } = Mock.mock({
        // 精选讲师
        'courseMsg|3': [
          {
            cardId: '@increment',
            cardName: '@cword(4)',
            isShowTime: true,
            isShowUser: true,
            isShowIntroduce: true,
            isShowTag: false,
            isShowImg: false,
            courseId: '@increment',
            courseName: '@cword(3, 30)',
            courseIntroduce: '@cparagraph()',
            courseUrl: "@dataImage('120x80','png')",
            courseTeacher: {
              cTeacherName: '@cname()',
              cTeacherImg: "@dataImage('80x80','png')",
              cTeacherIntroduce: '@cparagraph()',
            },
            courseTime: "@date('yyyy.MM.dd')",
            courseTag: '@ctitle(10, 20)',
          },
        ],
      })
      this.courseDataMsg = courseMsg
    },
    setup() {
      const value = ref(2.5)
      return { value }
    },
  },
  mounted() {
    this.init(), this.setup()
  },
}
</script>

<style lang="less" scoped>
.course-in {
  .video-box {
    position: relative;
    width: 100%;
    height: 240px;
    background: #eee;
    text-align: center;

    .van-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1rem;
      margin-left: -1rem;
    }
    .van-image {
      border-radius: 5px;
    }
  }

  .course-msg {
    font-size: 14px;
    line-height: 20px;

    .msg-r {
      overflow: hidden;
    }

    h2 {
      font-size: 18px;
      line-height: 26px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .msg {
      float: left;
      text-align: left;
    }

    .time {
      float: right;
      text-align: right;
    }

    .msg,
    .time {
      position: relative;
      margin-bottom: 5px;
      padding-left: 16px;
      width: 42%;
      line-height: 18px;

      .van-icon {
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: 14px;
      }

      .van-icon-clock-o {
        right: 2.1rem;
      }

      span {
        margin: 0 5px;
      }
    }
  }

  .course-file {
    position: relative;
    padding: 0 35px 0 45px;

    .van-tag {
      position: absolute;
      left: 0;
      top: 0;
      padding: 1px 6px;
    }

    .share {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 18px;
    }
  }

  .teacher-msg {
    position: relative;
    padding-left: 70px;

    .teacher-head {
      position: absolute;
      left: 0;
      right: 0;
      width: 50px;
      height: 50px;
      border-radius: 50px;
      overflow: hidden;
    }

    h3 {
      margin: 5px 0;
    }
  }
}
</style>
