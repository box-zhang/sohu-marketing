<template>
  <div>
    <navBar :bar="barMsg"></navBar>
    <div class="mt-bar">
      <van-tabs v-model:active="active"
                sticky>
        <div class="marketingdiv">
          <van-tab v-for="item in salesMsg"
                   :title="item.cardName"
                   :key="item.cardId">
            <router-link to="/courseIn">
              <van-row gutter="10"
                       class="video-lr"
                       v-for="itemI in item.cardList">
                <van-col span="8">
                  <van-image width="100%"
                             fit="scale-down"
                             position="cover"
                             :src="itemI.courseUrl" />
                </van-col>
                <van-col span="16">
                  <courseMsg :courseData="itemI"></courseMsg>
                </van-col>
              </van-row>
            </router-link>
          </van-tab>
        </div>
      </van-tabs>
    </div>

    <footerLine></footerLine>
  </div>
</template>

<script>
import courseMsg from '@/views/mkModule/courseMsg.vue'
import footerLine from '@/views/mkModule/footerLine.vue'
import navBar from '@/views/mkModule/navBar.vue'
import Mock from 'mockjs'
export default {
  name: 'businessTraining',
  components: {
    courseMsg,
    navBar,
    footerLine,
  },
  data() {
    return {
      active: '',
      barMsg: {
        barName: '销售技巧',
        rightMsg: false,
      },
      salesMsg: [],
    }
  },
  methods: {
    init() {
      const { salesMsg } = Mock.mock({
        // 精选讲师
        'salesMsg|3': [
          {
            cardId: '@increment',
            cardName: '@cword(4,5)',
            'cardList|8-16': [
              {
                isShowTime: false,
                isShowUser: true,
                courseId: '@increment',
                courseName: '@cword(3, 30)',
                courseUrl: "@dataImage('120x80','png')",
                courseTeacher: '@cname()',
                courseTime: "@date('yyyy.MM.dd')",
              },
            ],
          },
        ],
      })
      this.salesMsg = salesMsg
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="less" scoped>
.van-image {
  border-radius: 5px;
  overflow: hidden;
}

.van-row {
  position: relative;
}

.van-sticky {
  margin-bottom: 15px;
  box-shadow: 0px 6px 32px 0px rgba(193, 193, 193, 0.16);
}

.van-tabs__line {
  width: 30px;
}

.van-tab {
  font-size: 14px;
}

.video-lr {
  margin: 12px 0;

  .msg-r {
    // position: absolute;
    // bottom: 0;
    // overflow: hidden;
    // width: 78%;
  }
}
</style>
