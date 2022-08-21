<!--
 * @Author: boxZhang
 * @Date: 2022-08-18 16:44:07
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-19 15:10:19
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\marketing\marketing.vue
-->
<template>
  <div class="page">
    <div class="topdiv">
      <navBar :barName="barName"></navBar>
    </div>
    <div class="marketingdiv">
      <!-- 轮播 -->
      <van-swipe class="my-swipe"
                 :autoplay="5000"
                 indicator-color="white">
        <van-swipe-item v-for="item in marketingSwipeList">
          <img :src="item.imgUrl"
               :alt="item.title">
        </van-swipe-item>
      </van-swipe>
      <!-- 热点图标 -->
      <van-grid :column-num="5"
                :gutter="2"
                :border="false">
        <van-grid-item v-for="item in tabList"
                       :icon="item.iconUrl"
                       :text="item.title"
                       to="/" />
      </van-grid>
      <!-- 新人必学 -->
      <van-row class="hint">
        <van-col span="16">
          <div class="hint-img">
            <img src="@/assets/static/peixun/icon-new.png"
                 alt="">
          </div>
          <div class="hint-text">
            <h3>新人必学</h3>
            <p class="gray">完成新人必学三步走</p>
          </div>
        </van-col>
        <van-col span="8">
          <button>立即进入</button>
        </van-col>
      </van-row>
      <!-- 精选讲师 -->
      <div class="m-move-list">
        <mkTitle :data="teachersListMsg"></mkTitle>
        <van-swipe :loop="false"
                   :width="150"
                   :show-indicators="false">
          <van-swipe-item v-for="item in teachersListMsg.teachersLists"
                          :key="item.id">
            <div class="item-in">
              <van-image fit="cover"
                         round
                         position="center"
                         :src="item.userUrl" />
              <p class="name">{{ item.courseTeacher }}</p>
              <p class="introduce">{{ item.courseName }}</p>
              <div class="tag">
                <van-tag v-for="i in item.userTag"
                         type="primary">{{ i }}</van-tag>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 最新课程 -->
      <div class="course">
        <mkTitle :data="newCourseMsg"></mkTitle>
        <van-grid :border="false"
                  :column-num="2"
                  :gutter="8"
                  :center="false">
          <van-grid-item v-for="item in newCourseMsg.newCourseList"
                         :key="item.id">
            <van-image :src="item.courseImg" />
            <courseMsg :courseData="item"></courseMsg>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 大咖驾到 -->
      <div class="master">
        <mkTitle :data="masterMsg"></mkTitle>
        <van-grid direction="horizontal"
                  :column-num="1"
                  :border="false"
                  :center="false">
          <van-grid-item v-for="item in masterMsg"
                         :key="item.id">
            <van-row :gutter="10">
              <van-col span="8">
                <van-image :src="item.masterImg" />
              </van-col>
              <van-col span="16">
                <h3>{{ item.masterName }} · {{ item.masterTitle }}</h3>
                <p>{{ item.masterIfo }}</p>
                <van-tag type="primary">{{ item.masterTag }}</van-tag>
              </van-col>
            </van-row>
          </van-grid-item>
        </van-grid>
      </div>

    </div>
    <footerLine></footerLine>
  </div>
</template>

<script>
import mkTitle from "@/views/mkModule/mTitle.vue";
import courseMsg from "@/views/mkModule/courseMsg.vue";
import navBar from "@/views/mkModule/navBar.vue";
import footerLine from "@/views/mkModule/footerLine.vue";
import Mock from "mockjs";
export default {
  name: 'marketing',
  components: {
    mkTitle, courseMsg, navBar, footerLine
  },
  data() {
    return {
      active: "",
      barName: "培训",
      marketingSwipeList: [
        {
          title: "图片1",
          imgUrl: require('@/assets/static/peixun/nav-icon1.png')
        },
        {
          title: "图片2",
          imgUrl: require('@/assets/static/peixun/nav-icon2.png')
        },
        {
          title: "图片3",
          imgUrl: require('@/assets/static/peixun/nav-icon3.png')
        }
      ],
      tabList: [
        {
          title: "业务培训",
          iconUrl: require('@/assets/static/peixun/nav-icon1.png')
        },
        {
          title: "销售技巧",
          iconUrl: require('@/assets/static/peixun/nav-icon2.png')
        },
        {
          title: "案例解析",
          iconUrl: require('@/assets/static/peixun/nav-icon3.png')
        },
        {
          title: "内部讲师",
          iconUrl: require('@/assets/static/peixun/nav-icon4.png')
        },
        {
          title: "大咖驾到",
          iconUrl: require('@/assets/static/peixun/nav-icon5.png')
        }
      ],
      teachersListMsg: {
        title: '精选讲师',
        isMore: true,
        toUrl: '',
        teachersLists: []
      },
      newCourseMsg: {
        title: '最新课程',
        isMore: false,
        toUrl: '',
        newCourseList: []
      },
      masterMsg: {
        title: '大咖驾到',
        isMore: true,
        toUrl: '',
        masterMsgList: []
      }
    }
  },
  methods: {
    init() {
      const { teachersList, newCourseList, masterMsg } = Mock.mock({
        // 精选讲师
        "teachersList|4": [{
          isShowTime: false,
          isShowUser: true,
          isShowTag: false,
          id: "@increment",
          courseTeacher: "@cname()",
          userUrl: "@dataImage('60x60','png')",
          courseName: "@cword(3, 10)",
          "userTag|1-2": [
            "@cword(1, 3)"
          ]
        }],
        // 最新课程 newCourseList
        "newCourseList|4": [
          {
            isShowTime: false,
            isShowUser: true,
            isShowTag: false,
            id: "@increment",
            courseName: "@ctitle()",
            courseImg: "@dataImage('200x120','png')",
            courseTeacher: "@cname()"
          }
        ],
        // 大师驾到 masterMsg
        "masterMsg|3": [
          {
            isShowTime: false,
            isShowUser: true,
            isShowTag: false,
            id: "@increment",
            masterImg: "@dataImage('100x140','png')",
            masterName: "@cname()",
            masterTitle: "@cword(3, 10)",
            masterTag: "@cword(5, 8)",
            masterIfo: "@cparagraph(1, 3)"
          }
        ]
      });
      this.teachersListMsg.teachersLists = teachersList;
      this.newCourseMsg.newCourseList = newCourseList;
      this.masterMsg = masterMsg;
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="less">
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
  background: #FFF8DF;
  border-radius: 10px;

  .hint-img {
    position: absolute;
    top: 50%;
    left: 15px;
    margin-top: -21px;
    width: 42px;

    img {
      width: 100%
    }
  }

  .hint-text {
    padding-left: 54px;
  }

  button {
    position: absolute;
    right: 15px;
    top: 50%;
    margin-top: -15px;
    padding: 0 5px;
    font-weight: 600;
    color: #EFA11F;
    line-height: 28px;
    font-size: 16px;
    background: #FFF8DE;
    border-radius: 3px;
    border: 1px solid #EFA11F;
  }

  h3,
  p {
    margin: 2px 0
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
    }

    &.introduce {
      color: #777
    }
  }

  .van-swipe {
    overflow: initial
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
  }

  .van-tag {
    margin: 0 2px;
    padding: 3px 6px;
    border-radius: 4px;
    color: #EFA11F;
    font-weight: bold;
    background-color: #FFF7EB;
    letter-spacing: -1px;
  }

  .tag {
    margin: 10px 0
  }
}


.course,
.master {

  h3,
  p {
    width: 100%;
    text-align: left
  }

  h3 {

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.course {
  .van-image {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }

  .video-msg .msg {
    width: 100%
  }

  .video-msg h3 {
    margin: 5px
  }

  .video-msg .msg-b {
    position: relative;
    width: 100%;
  }

  .van-grid {
    padding-left: 0 !important;
    margin-right: -8px
  }

  .van-grid-item__content {
    padding: 0;
  }
}

.master {
  .van-row {
    width: 100%
  }

  .van-grid-item {
    margin-bottom: 10px;
  }

  .van-image {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }

  h3 {
    margin: 0
  }

  .van-tag {
    margin-top: 15px;
    color: #777;
    background: #F3F3F3;
  }

  .van-grid-item__content {
    padding: 0
  }
}

.hint,
.m-move-list,
.course,
.master {
  margin: 10px 0;
}

.gray {
  color: #aaa
}
</style>
