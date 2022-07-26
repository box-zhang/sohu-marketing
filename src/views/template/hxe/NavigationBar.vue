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
.nav-icon{
    background: @neutral-light-color;
    img{
        width:40px;
        height:40px;
        margin:10px;
    }
}
</style>

<template>
  <div class="temp-lookup">
      <div class="temp-intro">
          <div class="temp-intro-title">设置标题栏</div>
      </div>
      <div class="temp-area">
        <van-cell title="设置标题文本" is-link @click="setTitle"/>
        <van-cell title="设置标题栏背景色" is-link @click="setColor"/>
        <van-cell title="设置透明标题栏" is-link @click="setTransparent" :border="false"/>
        <van-collapse v-model="activeNames">
            <van-collapse-item name="1" :border="false" title="设置标题栏左侧按钮">
                <div class="nav-icon">
                    <img v-for="(value,key,index) in img.navIcon" :key="index" :src="'data:image/png;base64,'+value" @click="setLeftButton(key)"/>
                </div>
            </van-collapse-item>
            <van-collapse-item title="设置标题栏右侧按钮" name="2" :border="false">
                <div class="nav-icon">
                    <img v-for="(value,key,index) in img.navIcon" :key="index" :src="'data:image/png;base64,'+value" @click="setRightButton(key)"/>
                </div>
            </van-collapse-item>
        </van-collapse>
        <van-cell title="设置返回事件" is-link @click="setBackButtonHandler"/>
      </div>
  </div>
</template>

<script>
import img from '../../../common/img';
import { Cell,Collapse, CollapseItem,Icon } from 'vant';
export default {
  data() {
    return {
        count:1,
        color:"2d8cf0",
        activeNames:[1],
        img:img
    };
  },
  created(){
      window._thisVue=this;
  },
  methods:{
      setTitle(){
        this.count++;
        this.$hxe.setNavigationBar({
            title: '自定义标题'+this.count
        })
      },
      setColor(){
        this.color=this.color=="2d8cf0"?"19be6b":"2d8cf0";
        this.$hxe.setNavigationBar({
            title: '自定义标题'+this.count,
            backgroundColor: this.color
        })
      },
      setTransparent(){
        this.$hxe.setNavigationBar({
            backgroundColor: "00000000"
        })
      },
      setLeftButton(name){
        this.$hxe.setNavigationBar({
            title: '自定义标题'+this.count,
            leftButton: {
                type:'image',
                name:name,
                handler:function(){
                    _thisVue.$hxe.showToast("点了左边的按钮");
                }
            }
        })
      },
      setRightButton(name){
        this.$hxe.setNavigationBar({
            title: '自定义标题'+this.count,
            rightButton: {
                type:'image',
                name:name,
                handler:function(){
                    _thisVue.$hxe.showToast("点了右边的按钮");
                }
            }
        })
      },
      setBackButtonHandler(){
        this.$hxe.setNavigationBar({
            title: '自定义标题'+this.count,
            backButtonHandler: function () {
                _thisVue.$hxe.showToast("点击了返回按钮");
                _thisVue.$router.go(-1);
            }
        })
      },
  },
  components:{
      [Cell.name]:Cell,
      [Collapse.name]:Collapse,
      [CollapseItem.name]:CollapseItem,
      [Icon.name]:Icon
  }
}
</script>
