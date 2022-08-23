<!--
 * @Author: boxZhang
 * @Date: 2022-08-22 16:28:32
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-22 16:54:24
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\views\mkModule\teacherMsg.vue
-->
<template>
  <div class="teacher-text">
    <h2>{{ info.tName }}</h2>
    <div>{{ info.tText }}</div>
    <div class="tag-box"
         v-if="info.isShowTitle">
      <van-tag type="primary"
               class="gray">{{ info.tTitle }}</van-tag>
    </div>
    <div class="tag-box"
         v-if="info.isShowTags">
      <van-tag type="primary"
               v-for="(item, index) in info.tTags"
               :key="index">{{ item }}</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  name: 'teacherMsg',
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
  },
}
</script>

<style scoped lang="less">
.teacher-text {
  h2 {
    margin-top: 0;
  }

  .gray {
    margin: 20px 0;
    padding: 3px 6px;
    background: #f3f3f3;
    color: #777;
    line-height: 16px;
  }

  .tag-box {
    margin: 20px 0;
  }

}
</style>
