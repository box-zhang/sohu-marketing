<template>
  <div>
    <navBar :barName="barName"></navBar>
    <van-tabs v-model:active="active"
              sticky class="mt-bar">
      <div class="marketingdiv">
        <van-tab v-for="item in businessTrainingMsg"
                 :title="item.cardName"
                 :key="item.cardId">
          <van-row gutter="10"
                   class="video-lr"
                   v-for="item in item.cardList">
            <van-col span="8">
              <van-image width="100%"
                         fit="scale-down"
                         position="cover"
                         :src="item.courseUrl" />
            </van-col>
            <van-col span="16">
              <courseMsg :courseData="item"></courseMsg>
            </van-col>
          </van-row>
        </van-tab>
      </div>
    </van-tabs>
    <footerLine></footerLine>
  </div>
</template>

<script>
import Mock from "mockjs";
import courseMsg from "@/views/mkModule/courseMsg.vue";
import navBar from "@/views/mkModule/navBar.vue";
import footerLine from "@/views/mkModule/footerLine.vue";
export default {
  name: 'businessTraining',
  components: {
    courseMsg, navBar, footerLine
  },
  data() {
    return {
      active: "",
      barName: "业务培训",
      businessTrainingMsg: []
    }
  },
  methods: {
    init() {
      const { businessTraining } = Mock.mock({
        // 精选讲师
        "businessTraining|4": [{
          cardId: "@increment",
          cardName: "@cword(4)",
          "cardList|8-16": [{
            isShowTime: true,
            isShowUser: true,
            isShowTag: false,
            courseId: "@increment",
            courseName: "@cword(3, 30)",
            courseUrl: "@dataImage('120x80','png')",
            courseTeacher: "@cname()",
            courseTime: "@date('yyyy.MM.dd')"
          }]

        }],
      });
      this.businessTrainingMsg = businessTraining;
    }
  },
  mounted() {
    this.init()
  },
}
</script>

<style  lang="less">
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
  width: 30px
}

.van-tab {
  font-size: 14px
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