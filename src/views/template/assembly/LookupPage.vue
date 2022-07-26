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
.van-button{
    height:36px;
    line-height: 36px;
}
.custom-list{
  i{
    display:inline-block;
    background: @primary;
    border-radius: 50%;
    width:20px;
    height:20px;
    line-height: 20px;
    text-align: center;
    color:@neutral-white-color;
    margin-right:.5em;
  }
  span{
    font-size: @text-help-size;
    color:@neutral-light-color;
  }
}
</style>

<template>
  <div class="temp-lookup">
      <div class="temp-intro">
          <div class="temp-intro-title">单选列表</div>
          世界上最好的开发语言是什么？
      </div>
      <div class="temp-area">
        <div class="temp-area-con">你的选择：{{result1}}</div>
        <van-button type="info" @click="ClickChoose1">选择</van-button>
      </div>
      <div class="temp-intro">
          <div class="temp-intro-title">多选列表</div>
          世界上最好的开发语言有哪些？
      </div>
      <div class="temp-area">
        <div class="temp-area-con">你的选择：{{result2.text}}</div>
        <van-button type="info" @click="ClickChoose2">选择</van-button>
      </div>
      <div class="temp-intro">
          <div class="temp-intro-title">自定义内容</div>
          世界上最好的开发语言有哪些？
      </div>
      <div class="temp-area">
        <div class="temp-area-con">你的选择：{{result3.text}}</div>
        <van-button type="info" @click="ClickChoose3">内容1</van-button>&nbsp;&nbsp;
        <van-button type="info" @click="ClickChoose4">内容2</van-button>
      </div>
      <!-- 单选列表 -->
      <van-popup
          v-model="isShow1"
          position="right"
          lock-scroll
          class="lookup-style"
      >
        <lookup
              v-if="isShow1"
              @setLookupData="setLookUpData1(arguments)"
              @confirm="lookUpDataConfirm1($event)"
            ></lookup>
      </van-popup>
      <!-- 多选列表 -->
      <van-popup
          v-model="isShow2"
          position="right"
          lock-scroll
          class="lookup-style"
      >
        <lookup
              v-if="isShow2"
              @setLookupData="setLookUpData2(arguments)"
              @confirm="lookUpDataConfirm2(arguments)"
              multil
              :value="result2"
            ></lookup>
      </van-popup>
      <!-- 自定义列表1 -->
      <van-popup
          v-model="isShow3"
          position="right"
          lock-scroll
          class="lookup-style"
      >
        <lookup
              v-if="isShow3"
              @setLookupData="setLookUpData3(arguments)"
              @confirm="lookUpDataConfirm3(arguments)"
              multil
              :value="result3"
            >
            <div slot="content" slot-scope="slotProps" class="custom-list"><i>{{slotProps.item.name.substr(0,1).toUpperCase()}}</i>{{slotProps.item.name}}</div>
            </lookup>
      </van-popup>
      <!-- 自定义列表2 -->
      <van-popup
          v-model="isShow4"
          position="right"
          lock-scroll
          class="lookup-style"
      >
        <lookup
              v-if="isShow4"
              @setLookupData="setLookUpData3(arguments)"
              @confirm="lookUpDataConfirm3(arguments)"
              multil
              :value="result3"
            >
            <div slot="content" slot-scope="slotProps" class="custom-list">{{slotProps.item.name}}<br /><span>{{slotProps.item.name}}的简单说明</span></div>
            </lookup>
      </van-popup>
  </div>
</template>

<script>
import { Button,Popup } from 'vant';
import Lookup from '../../../components/template/Lookup.vue';
import data from '../../../assets/template/data.js';
export default {
  name: 'lookuppage',
  data() {
    return {
        result1:'',
        isShow1:false,
        result2:{
          text:"",
          list:[]
          },
        isShow2:false,
        result3:{
          text:"",
          list:[]
          },
        isShow3:false,
        isShow4:false
    };
  },
  created(){
  },
  methods:{
    ClickChoose1(){
        this.isShow1=true;
    },
    ClickChoose2(){
        this.isShow2=true;
    },
    ClickChoose3(){
        this.isShow3=true;
    },
    ClickChoose4(){
        this.isShow4=true;
    },
    //获取lookup数据
    setLookUpData1(arg) {
      //异步加载数据
      setTimeout(() => {
        let pagesize=20;
        let array=data.lookupSingleData.filter((item,index)=>{
            return index>=(arg[1]-1)*pagesize && index<(arg[1]*pagesize) && (item.name.indexOf(arg[0])>-1||!arg[0])
        })
        arg[2](array);
      }, 500);
    },
    //选择lookup数据
    lookUpDataConfirm1(obj) {
      this.isShow1 = false;
      if (obj) {
        this.result1 = obj.name || "";
      }
    },
    //获取lookup数据
    setLookUpData2(arg) {
      //异步加载数据
      setTimeout(() => {
        let pagesize=20;
        let array=data.lookupSingleData.filter((item,index)=>{
            return index>=(arg[1]-1)*pagesize && index<(arg[1]*pagesize) && (item.name.indexOf(arg[0])>-1||!arg[0])
        })
        arg[2](array);
      }, 500);
    },
    //选择lookup数据
    lookUpDataConfirm2(obj) {
      this.isShow2 = false;
      if (obj[0] instanceof Array) {
        this.result2.list = obj[0];
        this.result2.text = obj[1];
      }
    },
    //获取lookup数据
    setLookUpData3(arg) {
      //异步加载数据
      setTimeout(() => {
        let pagesize=20;
        let array=data.lookupSingleData.filter((item,index)=>{
            return index>=(arg[1]-1)*pagesize && index<(arg[1]*pagesize) && (item.name.indexOf(arg[0])>-1||!arg[0])
        })
        arg[2](array);
      }, 500);
    },
    //选择lookup数据
    lookUpDataConfirm3(obj) {
      this.isShow3 = false;
      this.isShow4 = false;
      if (obj[0] instanceof Array) {
        this.result3.list = obj[0];
        this.result3.text = obj[1];
      }
    }
  },
  components:{
      [Button.name]: Button,
      [Popup.name]: Popup,
      "lookup": Lookup
  }
}
</script>
