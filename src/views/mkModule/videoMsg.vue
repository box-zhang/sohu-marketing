<template>
  <div class="video-msg">
    <van-row>
      <van-col span="24">
        <h3>{{ info.courseName }}</h3>
      </van-col>
    </van-row>
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
              v-if="info.isShowTime">{{ info.courseTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'videoMsg',
  data() {
    return {
      info: this.videoData
    }
  },
  props: {
    videoData: {
      type: Object,
      default: {}
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

<style lang="less" scope="">
.video-msg {
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
  }

  .time {
    float: right;
  }

  .msg,
  .time {
    position: relative;
    margin-bottom: 5px;
    padding-left: 16px;
    width: 42%;
    text-align: left;
    line-height: 18px;

    .van-icon {
      position: absolute;
      top: 2px;
      left: 5px;
      font-size: 14px;
    }

    span {
      margin: 0 5px
    }

  }
}
</style>