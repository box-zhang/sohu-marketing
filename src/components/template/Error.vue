<template>
  <div class="nodata-area" v-if="later" :style="{height:height+'px'}" @click="onClickScreen">
    <div class="nodata-item">
        <img :src="img1" v-if="type==1&&isOnNetWork">
        <img :src="img2" v-if="type==2&&isOnNetWork">
        <img :src="img3" v-if="type==3&&isOnNetWork">
        <div class="nodata-row">{{text||tipText}}</div>
        <div class="nodata-row" v-if="showButton">
            <van-button type="info" size="small" @click="onClick">{{buttonText}}</van-button>
        </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Row,Col,Button } from 'vant';
export default {
  data() {
    return {
      img1:require("../../assets/images/error1.png"),
      img2:require("../../assets/images/error2.png"),
      img3:require("../../assets/images/error3.png"),
      isOnNetWork:true,
      later:false,
      tipText:this.text
    };
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    //异常类型，可选值：1(无数据),2(网络出错),3(页面出错)
    type: {
      type: Number,
      default: 1
    },
    height:{
      type: Number,
      default: window.innerHeight-100
    },
    showButton:{
      type: Boolean,
      default: false
    },
    buttonText:{
      type: String,
      default: "重试"
    }
  },
  created(){
        if(this.type==1)
            this.tipText="页面出错了，您可以刷新重试";
        if(this.type==2)
            this.tipText="无网络，请检查网络设置！";
        if(this.type==3)
            this.tipText="请点击屏幕刷新网络";
    this.$hxe.getNetworkStatus().then(status=>{
        this.isOnNetWork=!(status=="unknown"||status=="none");
        this.later=true;
    })
  },
  methods:{
    onClick(){
        this.$emit('click');
    },
    onClickScreen(){
        this.$emit('click-screen');
    }
  },
  components:{
      [Row.name]:Row,
      [Col.name]:Col,
      [Button.name]:Button
  }
};
</script>
<style lang="less" scoped>
.nodata-area {
  width: 100%;
  color: @neutral-text-color;
  font-size: @title-normal-size;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    text-align: center;
    width: 240px;
  }
  .nodata-row{
      padding:@page-margin-size;
  }
}
</style>


