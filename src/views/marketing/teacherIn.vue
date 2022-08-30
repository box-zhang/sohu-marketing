<template>
  <div class="teacher-in">
    <navBar :bar="barMsg"></navBar>
    <div class="marketingdiv mt-bar">
      <div class=" teacher-ifo">
        <van-image
          fit="cover"
          width="120px"
          height="160px"
          position="center"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <div class="teacher-text">
          <h2>{{ teacherMsg.tName }}</h2>
          <div>{{ teacherMsg.tText }}</div>
          <div class="tag-box">
            <van-tag
              type="primary"
              v-for="(item, index) in teacherMsg.tTags"
              :key="index"
              >{{ item }}</van-tag
            >
          </div>
        </div>
      </div>
      <div class="teacher-course">
        <van-tabs v-model:active="activeName" scrollspy>
          <van-tab title="课程目录" name="kcml">
            <div class="course-list">
              <div
                class="course-item"
                v-for="(item, index) in showHandleList"
                :key="index"
              >
                <router-link :to="{ name: 'courseIn' }">
                  <van-icon name="play-circle" color="#FFD33F" />
                  <div class="course-text">
                    <h3>{{ item.cName }}</h3>
                    <div class="time-box">
                      <div class="time-long">
                        <van-icon name="clock-o" color="#aaa" />{{
                          item.cTimeLong
                        }}
                      </div>
                      <div class="time">
                        <van-icon name="clock-o" color="#aaa" />{{ item.cTime }}
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <p
                v-if="this.teacherMsg.courseList.length > 5"
                class="show-more"
                @click="showAll = !showAll"
              >
                {{ this.showAll ? '收起' : '展开更多' }}
                <van-icon
                  class="score-img"
                  :name="this.showAll ? 'arrow-up' : 'arrow-down'"
                  size="12"
                />
              </p>
            </div>
            <div class="mb-20">
              <h2>计划课程</h2>
              <p>马上推出某课程，敬请期待！</p>
            </div>
          </van-tab>
          <van-tab title="讲师评价" name="jspj">
            <h2>讲师评价</h2>
            <evaluateMsg></evaluateMsg>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import courseMsg from '@/views/mkModule/courseMsg.vue'
import evaluateMsg from '@/views/mkModule/evaluateMsg.vue'
import mkTitle from '@/views/mkModule/mTitle.vue'
import navBar from '@/views/mkModule/navBar.vue'
import Mock from 'mockjs'
export default {
  name: 'teacherIn',
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
        barName: '讲师详情',
        rightMsg: false,
      },
      teacherMsg: {},
      activeName: '',
      showAll: false,
    }
  },
  methods: {
    init() {
      const { teacherMsg } = Mock.mock({
        teacherMsg: {
          tId: '@increment',
          tImg: "@dataImage('120x160','png')",
          tName: '@cname()',
          tText: '@cword(3, 50)',
          'tTags|1-3': ['@cword(1, 5)'],
          'courseList|2-20': [
            {
              cId: '@increment',
              cName: '@cword(3, 15)',
              cTime: "@date('yyyy.MM.dd')",
              cTimeLong: '45分34秒',
            },
          ],
          // "@date('yyyy.MM.dd')"
        },
      })
      this.teacherMsg = teacherMsg
    },
  },
  mounted() {
    this.init()
  },
  // 使⽤computed对data进⾏处理：
  computed: {
    showHandleList() {
      if (this.showAll == false) {
        //收起状态-显示“展示”
        var showList = [] //定义⼀个空数组
        var showListLength = this.teacherMsg.courseList.length
        console.log(showListLength)
        if (showListLength > 5) {
          //控制显⽰前6个
          for (var i = 0; i < 5; i++) {
            showList.push(this.teacherMsg.courseList[i]) //将数组的前3条存放到showList数组中
          }
        } else {
          showList = this.teacherMsg.courseList //个数足够显示，不需要再截取
        }
        return showList //返回当前数组
      } else {
        // 展开状态-显示“收起”
        return this.teacherMsg.courseList
      }
    },
  },
}
</script>

<style lang="less" scoped>
.score-img {
  top: 2px;
  width: 16px;
  transition: all 0.3s;
}
.rotate-img {
  transform: rotate(180deg);
}

.teacher-in {
  .teacher-ifo {
    position: relative;
    margin: 20px 0;
  }
  h3 {
    color: #333;
  }
  .teacher-text {
    position: absolute;
    left: 130px;
    top: 0;

    h2 {
      margin-top: 0;
    }
  }

  .van-image {
    border-radius: 5px;
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
    margin: 0;
    padding: 20px 0;
    text-align: center;
  }

  .van-tabs--line .van-tabs__wrap {
    margin-bottom: 10px;
  }

  .van-tab {
    font-size: 18px;
  }
}
</style>
