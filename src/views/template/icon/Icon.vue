<style lang="less">
.icon-area{
    display: inline-block;
    width:25%;
    height:70px;
    text-align: center;
    padding:10px 0;
    span{
        font-size:@text-help-size;
    }
}
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
</style>

<template>
  <div class="temp-icon">
      <div class="temp-intro">
          <div class="temp-intro-title">Vant组件库图标</div>
          以下为Vant组件库图标，更多图标及使用请参考<a href="https://youzan.github.io/vant/#/zh-CN/icon">Vant图标</a>
      </div>
      <div class="temp-area">
        <div v-for="(item) in iconList1" :key="item.class" class="icon-area">
            <van-icon :name="item.class" :size="32"/>
            <br />
            <span>{{item.name}}</span>
        </div>
      </div>
      <div class="temp-intro">
          <div class="temp-intro-title">模版封装图标</div>
          以下为开发模版封装的内置图标
      </div>
      <div class="temp-area">
        <div v-for="(item) in iconList2" :key="item.class" class="icon-area">
            <van-icon class-prefix="my-icon" :name="item.class" :size="32"/>
            <br />
            <span>{{item.name}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  name: 'icon',
  data() {
    return {
      iconList1:[
        {
          name: "success",
          class: "success"
        },
        {
          name: "plus",
          class: "plus"
        },
        {
          name: "cross",
          class: "cross"
        },
        {
          name: "fail",
          class: "fail"
        },
        {
          name: "arrow",
          class: "arrow"
        },
        {
          name: "arrow-left",
          class: "arrow-left"
        },
        {
          name: "arrow-up",
          class: "arrow-up"
        },
        {
          name: "arrow-down",
          class: "arrow-down"
        }
      ],
      iconList2: [
        {
          name: "电脑",
          class: "diannao"
        },
        {
          name: "报表",
          class: "baobiao"
        },
        {
          name: "打印",
          class: "dayin"
        },
        {
          name: "财务",
          class: "caiwu"
        },
        {
          name: "编辑",
          class: "bianji"
        },
        {
          name: "订单",
          class: "dingdan"
        },
        {
          name: "电话",
          class: "dianhua"
        },
        {
          name: "发票",
          class: "fapiao"
        },
        {
          name: "工作",
          class: "gongzuo"
        },
        {
          name: "二维码",
          class: "erweima"
        },
        {
          name: "联系人",
          class: "lianxiren"
        },
        {
          name: "服务器",
          class: "fuwuqi"
        },
        {
          name: "盖章",
          class: "gaizhang"
        },
        {
          name: "更多",
          class: "gengduo"
        },
        {
          name: "合同",
          class: "hetong"
        },
        {
          name: "分享",
          class: "fenxiang"
        },
        {
          name: "上传",
          class: "shangchuan"
        },
        {
          name: "合作",
          class: "hezuo"
        },
        {
          name: "会议",
          class: "huiyi"
        },
        {
          name: "快递",
          class: "kuaidi"
        },
        {
          name: "闹钟",
          class: "naozhong"
        },
        {
          name: "排名",
          class: "paiming"
        },
        {
          name: "位置",
          class: "weizhi"
        },
        {
          name: "类别",
          class: "leibie"
        },
        {
          name: "漏斗",
          class: "loudou"
        },
        {
          name: "客户",
          class: "kehu"
        },
        {
          name: "安全",
          class: "anquan"
        },
        {
          name: "收入",
          class: "shouru"
        },
        {
          name: "礼品",
          class: "lipin"
        },
        {
          name: "审核",
          class: "shenhe"
        },
        {
          name: "文件",
          class: "wenjian"
        },
        {
          name: "手机",
          class: "shouji"
        },
        {
          name: "用户",
          class: "yonghu"
        },
        {
          name: "收藏",
          class: "shoucang"
        },
        {
          name: "退出",
          class: "tuichu"
        },
        {
          name: "设置",
          class: "shezhi"
        },
        {
          name: "预览",
          class: "yulan"
        },
        {
          name: "资产",
          class: "zichan"
        },
        {
          name: "下载",
          class: "xiazai"
        },
        {
          name: "语音",
          class: "yuyin"
        },
        {
          name: "支出",
          class: "zhichu"
        },
        {
          name: "设置2",
          class: "shezhi1"
        },
        {
          name: "借阅",
          class: "jieyue"
        },
        {
          name: "日历",
          class: "rili"
        },
        {
          name: "出差",
          class: "chucha"
        },
        {
          name: "主页",
          class: "zhuye"
        },
        {
          name: "搜索",
          class: "sousuo"
        },
        {
          name: "付款",
          class: "fukuan"
        },
        {
          name: "邮件",
          class: "youjian"
        },
        {
          name: "喜欢",
          class: "xihuan"
        },
        {
          name: "消息",
          class: "xiaoxi"
        },
        {
          name: "下单",
          class: "xiadan"
        },
        {
          name: "扫一扫",
          class: "saoyisao"
        },
        {
          name: "帮助",
          class: "bangzhu"
        },
        {
          name: "更多2",
          class: "gengduo1"
        },
        {
          name: "垃圾筒",
          class: "lajitong"
        },
        {
          name: "编辑、评论",
          class: "bianjipinglun"
        },
        {
          name: "上传",
          class: "shangchuan1"
        },
        {
          name: "下载",
          class: "xiazai1"
        },
        {
          name: "文件夹",
          class: "wenjianjia"
        },
        {
          name: "录像",
          class: "luxiang"
        },
        {
          name: "组织群组",
          class: "zuzhiqunzu"
        },
        {
          name: "消息、评论",
          class: "xiaoxipinglun"
        },
        {
          name: "置顶中",
          class: "zhidingzhong"
        },
        {
          name: "暂停",
          class: "zanting"
        },
        {
          name: "中文",
          class: "zhongwen"
        },
        {
          name: "英文",
          class: "yingwen"
        },
        {
          name: "新建",
          class: "xinjian"
        },
        {
          name: "相机",
          class: "xiangji"
        },
        {
          name: "喜欢、点赞",
          class: "xihuandianzan"
        },
        {
          name: "无线",
          class: "wuxian"
        },
        {
          name: "文字",
          class: "wenzi"
        },
        {
          name: "购物车",
          class: "gouwuche"
        },
        {
          name: "审批",
          class: "shenpi"
        },
        {
          name: "添加图片",
          class: "tianjiatupian"
        },
        {
          name: "添加、发布",
          class: "tianjiafabu"
        },
        {
          name: "停止",
          class: "tingzhi"
        },
        {
          name: "缩小",
          class: "suoxiao"
        },
        {
          name: "全屏",
          class: "quanping"
        },
        {
          name: "取消置顶",
          class: "quxiaozhiding"
        },
        {
          name: "列表样式",
          class: "liebiaoyangshi"
        },
        {
          name: "礼物",
          class: "liwu"
        },
        {
          name: "铃声",
          class: "lingsheng"
        },
        {
          name: "蓝牙",
          class: "lanya"
        },
        {
          name: "垃圾箱",
          class: "lajixiang"
        },
        {
          name: "控件选中",
          class: "kongjianxuanzhong"
        },
        {
          name: "控件未选中",
          class: "kongjianweixuanzhong"
        },
        {
          name: "客服",
          class: "kefu"
        },
        {
          name: "可见",
          class: "kejian"
        },
        {
          name: "功能软件",
          class: "gongnengruanjian"
        },
        {
          name: "功能区",
          class: "gongnengqu"
        },
        {
          name: "附件",
          class: "fujian"
        },
        {
          name: "放大",
          class: "fangda"
        },
        {
          name: "分享",
          class: "fenxiang1"
        },
        {
          name: "二维码",
          class: "erweima1"
        },
        {
          name: "定位",
          class: "dingwei"
        },
        {
          name: "不可见",
          class: "bukejian"
        },
        {
          name: "发送",
          class: "fasong"
        },
        {
          name: "阿里",
          class: "ali"
        },
        {
          name: "备注、警告",
          class: "beizhujinggao"
        },
        {
          name: "点星",
          class: "dianxing"
        },
        {
          name: "播放",
          class: "bofang"
        }
      ]
    };
  },
  created(){
  },
  components:{
      [Icon.name]:Icon
  }
}
</script>
