<template>
  <div class="course-msg">
    <van-row>
      <van-col span="24">
        <h3>{{ info.courseName }}</h3>
        <p v-if="info.isShowIntroduce">{{ info.courseIntroduce }}</p>
      </van-col>
    </van-row>
    <van-row class="msg-b">
      <van-col span="24">
        <div class="msg-r">
          <div class="msg text-hide"
               v-if="info.isShowUser">
            <van-icon name="user-circle-o" />
            <span class="">讲师</span>
            <span class="gray">{{ info.courseTeacher }}</span>
          </div>

          <div class="time text-hide">
            <van-icon v-if="info.isShowTime"
                      name="clock-o" />
            <span class="gray"
                  v-if="info.isShowTime">{{
                      info.courseTime
                  }}</span>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'videoMsg',
  data() {
    return {
      info: this.courseData,
    }
  },
  props: {
    courseData: {
      type: Object,
      default: {},
    },
    // isShowTime: {
    //   type: String,
    //   default: ""
    // },
    // isShowUser: {
    //   type: String,
    //   default: ""
    // },
  },
}
</script>

<style scoped lang="less">
.course-msg {
  .msg-b {
    position: absolute;
    overflow: hidden;
    bottom: 3px;
    width: 66.66666667%;
  }

  .msg-r {
    overflow: hidden;
  }

  h3 {
    margin: 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .msg {
    float: left;
    padding-left: 10px;
    text-align: left;
  }

  .time {
    float: right;
    padding-left: 10px;
    text-align: right;
  }

  .msg,
  .time {
    position: relative;
    // margin-bottom: 5px;
    line-height: 18px;

    .van-icon {
      position: absolute;
      top: 2px;
      left: 0;
      font-size: 13px;
    }

    span {
      margin: 0 5px;
    }
  }
}
</style>
