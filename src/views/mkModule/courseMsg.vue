<template>
  <div>
    {{ info }}
    <div :v-for="i in info">{{ i }}</div>
  </div>
  <!-- <van-row gutter="10" class="video-lr" :v-for="item in info">
    <router-link :to="{ name: 'courseIn' }">
      <van-col span="8">
        <van-image
          width="100%"
          fit="scale-down"
          position="cover"
          :src="item.courseUrl"
        />
      </van-col>
      <van-col span="16" class="course-msg">
        <div>
          <h3>{{ item.courseName }}</h3>
          <p v-if="item.isShowIntroduce">{{ item.courseIntroduce }}</p>
        </div>
        <div class="msg-b">
          <div class="msg-r">
            <div class="msg text-hide" v-if="item.isShowUser">
              <van-icon name="user-circle-o" />
              <span class="">讲师</span>
              <span class="gray">{{ item.courseTeacher }}</span>
            </div>

            <div class="time text-hide">
              <van-icon v-if="item.isShowTime" name="clock-o" />
              <span class="gray" v-if="item.isShowTime">{{
                item.courseTime
              }}</span>
            </div>
          </div>
        </div>
      </van-col>
    </router-link>
  </van-row> -->
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
      type: Array,
      default: [],
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
    font-size: 12px;
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
    font-size: 12px;
  }

  .msg,
  .time {
    position: relative;
    // margin-bottom: 5px;
    line-height: 18px;

    font-size: 12px;

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
