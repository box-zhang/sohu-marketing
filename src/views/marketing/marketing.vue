<!--
 * @Author: boxZhang
 * @Date: 2022-08-18 16:44:07
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-30 10:08:33
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\marketing\marketing.vue
-->
<template>
  <div class="page">
    <div class="topdiv">
      <navBar :bar="barMsg"> </navBar>
    </div>
    <div class="marketingdiv mt-bar">
      <!-- 轮播 -->
      <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white">
        <van-swipe-item v-for="item in marketingSwipeList">
          <img :src="item.imgUrl" :alt="item.title" />
        </van-swipe-item>
      </van-swipe>
      <!-- 5个快捷入口 图标 -->
      <van-grid :column-num="5" :gutter="2" :border="false">
        <van-grid-item
          v-for="item in tabList"
          :icon="item.iconUrl"
          :text="item.title"
          :to="{ name: item.router }"
        />
      </van-grid>
      <!-- 新人必学 -->
      <van-row class="hint">
        <van-col span="16">
          <div class="hint-img">
            <img src="@/assets/static/peixun/icon_xinrenbixue@2x.png" alt="" />
          </div>
          <div class="hint-text">
            <h3>新人必学</h3>
            <p class="gray">完成新人必学三步走</p>
          </div>
        </van-col>
        <van-col span="8">
          <router-link :to="{ name: 'learnStep' }"
            ><button>立即进入</button></router-link
          >
        </van-col>
      </van-row>
      <!-- 精选讲师 -->
      <div class="m-move-list">
        <mkTitle :data="teachersListMsg"></mkTitle>
        <van-swipe :loop="false" :width="150" :show-indicators="false">
          <van-swipe-item
            v-for="item in teachersListMsg.teachersLists"
            :key="item.id"
          >
            <router-link :to="{ name: 'teacherIn' }">
              <div class="item-in">
                <van-image
                  fit="cover"
                  round
                  position="center"
                  :src="item.userUrl"
                />
                <p class="name">{{ item.courseTeacher }}</p>
                <p class="introduce">{{ item.courseName }}</p>
                <div class="tag">
                  <van-tag v-for="i in item.userTag" type="primary">{{
                    i
                  }}</van-tag>
                </div>
              </div>
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 最新课程 -->
      <div class="course">
        <mkTitle :data="newCourseMsg"></mkTitle>
        <van-grid
          :border="false"
          :column-num="2"
          :gutter="8"
          :center="false"
          class="show-tb"
        >
          <!-- <courseMsg :courseData="newCourseMsg.newCourseList"></courseMsg> -->
          <van-grid-item
            v-for="item in newCourseMsg.newCourseList"
            :key="item.courseId"
          >
            <router-link :to="{ name: 'courseIn' }">
              <van-image :src="item.courseImg" />

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
              <!-- <courseMsg :courseData="item"></courseMsg> -->
            </router-link>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 大咖驾到 -->
      <div class="master">
        <mkTitle :data="masterMsg"></mkTitle>

        <router-link :to="{ name: 'teacherIn' }">
          <van-row :gutter="10" v-for="item in masterMsg" :key="item.id">
            <van-col span="8"> <van-image :src="item.masterImg" /> </van-col>
            <van-col span="16">
              <h3>{{ item.masterName }} · {{ item.masterTitle }}</h3>
              <p>{{ item.masterIfo }}</p>
              <van-tag type="primary">{{ item.masterTag }}</van-tag>
            </van-col>
          </van-row>
        </router-link>
      </div>
    </div>
    <footerLine></footerLine>
  </div>
</template>

<script>
import courseMsg from '@/views/mkModule/courseMsg.vue'
import footerLine from '@/views/mkModule/footerLine.vue'
import mkTitle from '@/views/mkModule/mTitle.vue'
import navBar from '@/views/mkModule/navBar.vue'
import Mock from 'mockjs'
export default {
  name: 'marketing',
  components: {
    mkTitle,
    courseMsg,
    navBar,
    footerLine,
  },
  data() {
    return {
      active: '',
      barMsg: {
        barName: '培训',
        rightMsg: {
          barRightText: '最近观看',
          barRightIcon: require('@/assets/static/peixun/icon_time@2x.png'),
          barRightUrlName: 'recentlyList',
        },
      },
      marketingSwipeList: [
        {
          title: '图片1',
          imgUrl: require('@/assets/static/peixun/nav-icon1.png'),
        },
        {
          title: '图片2',
          imgUrl: require('@/assets/static/peixun/nav-icon2.png'),
        },
        {
          title: '图片3',
          imgUrl: require('@/assets/static/peixun/nav-icon3.png'),
        },
      ],
      tabList: [
        {
          title: '业务培训',
          iconUrl: require('@/assets/static/peixun/icon_yewupeixun@2x.png'),
          router: 'bTraining',
        },
        {
          title: '销售技巧',
          iconUrl: require('@/assets/static/peixun/icon_xiaoshoujiqiao@2x.png'),
          router: 'sales',
        },
        {
          title: '案例解析',
          iconUrl: require('@/assets/static/peixun/icon_anlijiexi@2x.png'),
          router: 'anliList',
        },
        {
          title: '内部讲师',
          iconUrl: require('@/assets/static/peixun/icon_neibujiangshi@2x.png'),
          router: 'teacherList',
        },
        {
          title: '大咖驾到',
          iconUrl: require('@/assets/static/peixun/icon_dakajiadao@2x.png'),
          router: 'masters',
        },
      ],
      teachersListMsg: {
        title: '精选讲师',
        isMore: true,
        toUrlName: 'teacherList',
        teachersLists: [],
      },
      newCourseMsg: {
        title: '最新课程',
        isMore: false,
        toUrlName: '',
        newCourseList: [],
      },
      masterMsg: {
        title: '大咖驾到',
        isMore: true,
        toUrlName: 'masters',
        masterMsgList: [],
      },
    }
  },
  methods: {
    init() {
      const { teachersList, newCourseList, masterMsg } = Mock.mock({
        // 精选讲师
        'teachersList|4': [
          {
            isShowTime: false,
            isShowUser: true,
            isShowTag: false,
            id: '@increment',
            courseTeacher: '@cname()',
            userUrl: "@dataImage('60x60','png')",
            courseName: '@cword(3, 10)',
            'userTag|1-2': ['@cword(1, 3)'],
          },
        ],
        // 最新课程 newCourseList
        'newCourseList|4': [
          {
            toUrlName: '',
            isShowTime: true,
            isShowUser: true,
            isShowTag: false,
            courseId: '@increment',
            courseName: '@cword(3, 30)',
            courseImg: "@dataImage('120x80','png')",
            courseInUrl: 'courseIn',
            courseTeacher: '@cname()',
            courseTime: "@date('yyyy.MM.dd')",
            // isShowTime: false,
            // isShowUser: true,
            // isShowTag: false,
            // id: '@increment',
            // courseName: '@ctitle()',
            // courseImg: "@dataImage('200x120','png')",
            // courseTeacher: '@cname()',
          },
        ],
        // 大师驾到 masterMsg
        'masterMsg|3': [
          {
            isShowTime: false,
            isShowUser: true,
            isShowTag: false,
            id: '@increment',
            masterImg: "@dataImage('100x140','png')",
            masterName: '@cname()',
            masterTitle: '@cword(3, 10)',
            masterTag: '@cword(5, 8)',
            masterIfo: '@cparagraph(1, 3)',
          },
        ],
      })
      this.teachersListMsg.teachersLists = teachersList
      this.newCourseMsg.newCourseList = newCourseList
      this.masterMsg = masterMsg
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="less" scoped="">
.marketingdiv {
  a {
    display: block;
  }
  a h2,
  a h3 {
    color: #333;
  }

  a p,
  a div {
    color: #666;
  }
}

.my-swipe {
  margin-top: 2px;
  border-radius: 5px;

  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}

.hint {
  position: relative;
  padding: 10px;
  background: #fff8df;
  border-radius: 5px;

  .hint-img {
    position: absolute;
    top: 50%;
    left: 15px;
    margin-top: -21px;
    width: 42px;
    img {
      width: 100%;
    }
  }

  .hint-text {
    padding-left: 62px;
  }

  button {
    float: right;
    margin-top: 5px;
    padding: 0 5px;
    font-weight: 600;
    color: #efa11f;
    line-height: 28px;
    font-size: 14px;
    background: #fff8de;
    border-radius: 3px;
    border: 1px solid #efa11f;
  }

  h3,
  p {
    margin: 2px 0;
  }
}

.m-move-list {
  p {
    margin: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    &.name {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }

    &.introduce {
      color: #777;
    }
  }
  .van-swipe {
    overflow: initial;
  }

  .van-swipe-item {
    text-align: center;
    &:first-child {
      margin-left: -7px;
    }

    &:last-child {
      margin-right: -7px;
    }

    .item-in {
      margin: 0 7px;
      padding: 20px 5px;
      box-shadow: 0px 6px 15px 0px rgba(193, 193, 193, 0.29);
      border-radius: 10px;
    }
    a:active .item-in {
      box-shadow: 0px 6px 15px 0px rgba(193, 193, 193, 0.8);
    }
  }

  .van-tag {
    margin: 0 2px;
    padding: 3px 6px;
    border-radius: 4px;
    color: #efa11f;
    font-weight: bold;
    background-color: #fff7eb;
    letter-spacing: -1px;
  }

  .tag {
    margin: 10px 0;
  }
}

.course,
.master {
  h3,
  p {
    width: 100%;
    text-align: left;
  }

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .van-image {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
}

.course {
  .msg-b {
    position: relative;
    width: 100%;
    span {
      margin: 0 3px;
    }
  }
  h3 {
    margin: 5px;
  }
  .msg .time {
    display: inline;
  }

  .time {
    float: right;
  }

  .msg {
    float: left;
  }

  .van-grid {
    padding-left: 0 !important;
    margin-right: -8px;
  }
  .course-msg {
    padding: 0 5px;
  }

  .show-tb {
    .van-row {
      margin: 6px 0;
    }

    .msg-b {
      position: relative;
    }
  }
  .van-grid-item {
    margin-bottom: 10px;
  }
  /deep/ .van-grid-item__content {
    padding: 0;
  }
}
.master {
  .van-row {
    margin-bottom: 10px;
  }
  h3 {
    margin: 0;
  }

  .van-tag {
    margin-top: 15px;
    color: #777;
    background: #f3f3f3;
  }
}

// .hint,
.m-move-list,
.course,
.master {
  margin: 10px 0;
}

.gray {
  color: #aaa;
}
</style>
