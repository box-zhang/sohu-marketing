<style lang="less" scoped>
.temp-intro{
    padding:@page-margin-size 0;
    margin:0 @page-margin-size;
    color:@neutral-light-color;
    font-size: @title-normal-size;
    .temp-intro-title{
        font-size: @title-large-size;
        color:@neutral-title-color;
        padding:10px 0;
    }
    a{
        color:@link-normal-color;
    }
}
.temp-area{
    margin:0 @page-margin-size;
    .temp-area-con{
        font-size: @title-normal-size;
        color:@neutral-light-color;
        margin-bottom:@page-margin-size;
    }
}
</style>

<template>
  <div class="temp-form">
      <div class="temp-intro">
          <div class="temp-intro-title">基础表单</div>
          包含基础的输入控件，和保存按钮
      </div>
      <div class="temp-area">
        <van-button type="info" :to="{name:'baseform'}">基础表单</van-button>
      </div>
      <div class="temp-intro">
          <div class="temp-intro-title">复杂表单</div>
          包含选择组件，国家省市三级联动，开关组件
      </div>
      <div class="temp-area">
        <van-button type="info" :to="{name:'complexform'}">复杂表单</van-button>
      </div>
      <div class="temp-intro">
          <div class="temp-intro-title">自定义按钮表单</div>
          自定义底部按钮
      </div>
      <div class="temp-area">
        <van-button type="info" :to="{name:'buttonform'}">自定义按钮表单</van-button>
      </div>
  </div>
</template>

<script>
import { Button } from 'vant';
export default {
  name: 'formpage',
  data() {
    return {
    };
  },
  methods:{
  },
  components:{
    [Button.name]:Button
  }
}
</script>
