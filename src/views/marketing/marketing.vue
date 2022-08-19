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
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <div class="block20"></div>
    <div class="footer">--- 你已经看到我的底线了 ---</div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar.vue'
import { Swipe, SwipeItem } from 'vant'
export default {
  name: 'marketing',
  components: {
    tabbar,
  },
  data() {
    return {
      Swipe,
      SwipeItem,
    }
  },
}
</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
