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
    background: @neutral-white-color;
}
</style>

<template>
  <div class="temp-lookup">
      <div class="temp-intro">
          <div class="temp-intro-title">页面出错</div>
      </div>
      <div class="temp-area">
          <error :type="1" :height="height"></error>
      </div>
      <div class="temp-intro">
          <div class="temp-intro-title">网络异常，点击屏幕重试</div>
      </div>
      <div class="temp-area">
          <error :type="2" :height="height" @click-screen="clickScreen"></error>
      </div>
      <div class="temp-intro">
          <div class="temp-intro-title">无网络</div>
      </div>
      <div class="temp-area">
          <error :type="3" :height="height"></error>
      </div>
      <div class="temp-intro">
          <div class="temp-intro-title">自定义文字</div>
      </div>
      <div class="temp-area">
          <error :type="3" :height="height" :text="text"></error>
      </div>
      <div class="temp-intro">
          <div class="temp-intro-title">显示按钮</div>
      </div>
      <div class="temp-area">
          <error :type="3" :height="height" :text="textError" show-button button-text="点我重试" @click="reTry"></error>
      </div>
  </div>
</template>

<script>
export default {
  name: 'errorpage',
  data() {
    return {
        height:400,
        text:"这是自定义说明文字这是自定义说明文字这是自定义说明文字这是自定义说明文字",
        textError:"出错了,你可以点下面的按钮重试"
    };
  },
  created(){
  },
  methods:{
    reTry(){
        this.$hxe.showToast("你点了重试");
    },
    clickScreen(){
        this.$hxe.showToast("你点了屏幕");
    }
  }
}
</script>
