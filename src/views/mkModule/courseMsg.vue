<template>
  <div>
    <!-- {{ courseData }} -->
    <van-row gutter="10" class="item-lr" v-for="item in info">
      <router-link :to="{ name: item.courseInUrl }">
        <van-col span="8">
          <van-image
            width="100%"
            fit="scale-down"
            position="cover"
            :src="item.courseImg"
          />
        </van-col>
        <van-col span="16" class="course-msg">
          <div>
            <h3>{{ item.courseName }}</h3>
            <p v-if="item.isShowIntroduce">{{ item.courseIntroduce }}</p>
          </div>
          <div class="progress-box" v-if="item.isShowProgress">
            <van-progress
              :percentage="item.progressWatched"
              stroke-width="5"
              show-pivot="true"
            />
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
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'courseMsg',
  data() {
    return {
      info: [],
    }
  },
  props: {
    courseData: {
      type: Array,
      default: [],
    },
  },
  watch: {
    courseData: {
      handler(val) {
        this.info = val
      },
      immediate: true,
    },
  },
}
</script>

<style scoped="" lang="less">
.van-image {
  border-radius: 5px;
  overflow: hidden;
}
.progress-box {
  margin: 20px 0;
}
.van-row {
  position: relative;
}

.course-msg {
  .msg-b {
    position: absolute;
    overflow: hidden;
    bottom: 3px;
    width: 66.66666667%;
    color: #999;
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
    color: #333;
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
.item-lr {
  margin: 12px 0;
}
</style>
