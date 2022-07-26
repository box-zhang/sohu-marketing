
<style lang="less" scoped>
.t-tabbar-center {
    background: @primary;
    color:@neutral-white-color;
    width:34px;
    height:34px;
    line-height: 34px;
    text-align: center;
    border-radius: @radius-normal-size;
    margin-top:5px;
}
.t-addarea-icon{
    color:@neutral-white-color;
    width:44px;
    height:44px;
    line-height: 44px;
    text-align: center;
    border-radius: 50%;
    font-size: 24px;
}
.t-addarea-icon0{
    background: @primary;
}
.t-addarea-icon1{
    background: @type-yellow-deeper-color;
}
.t-addarea-icon2{
    background: @type-violet-color;
}
.t-addarea-icon3{
    background: @type-blue-color;
}
.t-addarea-icon4{
    background: @type-green-color;
}
.t-addarea-icon5{
    background: @type-cyan-color;
}
.t-addarea-text{
    margin-top:6px;
    color:@neutral-text-color;
    font-size: @title-small-size;
}
</style>

<template>
  <div id="t-home">
    <!-- 底部选项卡 -->
    <van-tabbar v-model="active" :z-index="100">
      <van-tabbar-item v-for="(item,index) in tabbar" :key="item.text" :dot="item.dot" :info="item.info">
        <span>{{item.text}}</span>
        <van-icon slot="icon" :class-prefix="index!=2?'my-icon':'van-icon'" :class="{'t-tabbar-center':index==2}" :name="item.icon"/>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 内容区域,这里要替换成业务系统各自的组件,也可以使用router-view -->
    <div>
        <error :type="3" text="这是主页" height="400" v-if="active==0||oldActive==0"></error>
        <error :type="3" text="这是合同" height="400" v-if="active==1||oldActive==1"></error>
        <error :type="3" text="这是报表" height="400" v-if="active==3||oldActive==3"></error>
        <error :type="3" text="这是我的" height="400" v-if="active==4||oldActive==4"></error>
    </div>
    <!-- 底部弹出栅 -->
    <van-popup
        v-model="isAdd"
        position="bottom"
        :overlay-style="{ background: '#ffffff' }"
        >
        <van-grid :column-num="4" :border="false" clickable>
            <van-grid-item
                v-for="(item,index) in addData"
                :key="index"
                :to="item.link"
            >
                <van-icon :name="item.img" class="t-addarea-icon" :class="'t-addarea-icon'+index" class-prefix="my-icon"/>
                <span class="t-addarea-text">{{item.text}}</span>
            </van-grid-item>
        </van-grid>
        <van-row style="height:50px;">
            <van-col span="24" style="text-align:center">
                <van-icon name="close" size="35px" color="#808695" @click="closeDialog"/>
            </van-col>
        </van-row>
    </van-popup>
  </div>
</template>
 
<script>
import { Icon,Tabbar, TabbarItem,Popup,Grid, GridItem,Row, Col } from 'vant';
export default {
  data() {
    return {
      oldActive: -1,
      isAdd: false,
      active: 0,
      // 底部标签栏数据
      tabbar: [
        {
          text: "主页",
          icon: "zhuye"
        },
        {
          text: "合同",
          icon: "hetong",
          dot: true
        },
        {
          text: "",
          icon: "plus"
        },
        {
          text: "报表",
          icon: "baobiao",
          info:"5"
        },
        {
          text: "我的",
          icon:"yonghu"
        }
      ],
      // 底部弹出数据
      addData: [
        {
          img: "kehu",
          text: "客户",
          link: { name: "form" }
        },
        {
          img: "hetong",
          text: "合同",
          link: { name: "form" }
        },
        {
          img: "lianxiren",
          text: "联系人",
          link: { name: "form" }
        },
        {
          img: "huiyi",
          text: "会议",
          link: { name: "form" }
        },
        {
          img: "chucha",
          text: "出差",
          link: { name: "form" }
        },
        {
          img: "fapiao",
          text: "发票",
          link: { name: "form" }
        }
      ]
    };
  },
  components: {
      [Icon.name]:Icon,
      [Tabbar.name]:Tabbar,
      [TabbarItem.name]:TabbarItem,
      [Popup.name]:Popup,
      [Grid.name]:Grid,
      [GridItem.name]:GridItem,
      [Row.name]:Row,
      [Col.name]:Col
  },
  methods: {
    closeDialog() {
      this.isAdd = false;
    }
  },
  watch: {
    active(newValue, oldValue) {
      if (newValue == 2) {
        this.isAdd = true;
        this.oldActive = oldValue;
      } else {
        this.oldActive = -1;
      }
    },
    isAdd(newValue, oldValue) {
      if (!newValue) this.active = this.oldActive;
    }
  }
};
</script>