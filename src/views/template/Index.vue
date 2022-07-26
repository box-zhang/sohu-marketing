<style lang="less">
.temp-index{
  .van-collapse-item__title,.temp-cell{
    font-weight: 500;
    font-size: 16px;
    line-height: 40px;
    border-radius: 2px;
  }
  .van-collapse-item__content{
    padding:0;
  }
}
.temp-nav{
    padding:20px;
    color:@neutral-light-color;
    font-size: 13px;
    .temp-nav-title{
      color:@neutral-title-color;
      font-size: 30px;
      line-height: 1.8em;
    }
}
.temp-collapse{
  margin:@page-margin-size;
  font-size: @title-large-size;
}
</style>

<template>
  <div class="temp-index">
    <div class="temp-nav">
      <span class="temp-nav-title">Vue开发模版</span>
      <br>基于狐小e轻应用平台开发，Vue-cli3.0搭建
    </div>
    <van-collapse class="temp-collapse" :border="false" v-model="activeNames1">
      <van-cell class="temp-cell" title="内置图标" is-link :border="false" :to="{name:'icon'}">
        <van-icon class-prefix="my-icon" name="gengduo1" slot="right-icon" :size="26"/>
      </van-cell>
    </van-collapse>
    <van-collapse class="temp-collapse" :border="false" v-model="activeNames2">
      <van-collapse-item title="Vue组件" name="1">
        <van-icon class-prefix="my-icon" name="leibie" slot="right-icon" :size="26"/>
        <van-cell title="Vant组件库" is-link url="https://youzan.github.io/vant/mobile.html#/zh-CN/"/>
        <van-cell title="选择列表" is-link :to="{name:'lookup'}"/>
        <van-cell title="表单组件" is-link :to="{name:'form'}"/>
        <van-cell title="日历组件" is-link :to="{name:'calendar'}"/>
        <van-cell title="异常组件" is-link :to="{name:'error'}"/>
      </van-collapse-item>
    </van-collapse>
    <van-collapse class="temp-collapse" :border="false" v-model="activeNames3">
      <van-collapse-item title="示例页面" name="3">
        <van-icon class-prefix="my-icon" name="fuwuqi" slot="right-icon" :size="26"/>
        <van-cell title="主页页面" is-link :to="{name:'temphome'}"/>
        <van-cell title="列表页面" is-link :to="{name:'list'}"/>
        <van-cell title="搜索页面" is-link :to="{name:'search'}"/>
        <van-cell title="索引定位" is-link :to="{name:'indexbar'}"/>
        <van-cell title="表格页面" is-link :to="{name:'grid'}"/>
        <van-cell title="横屏显示" is-link :to="{name:'horizontal'}"/>
      </van-collapse-item>
    </van-collapse>
    <van-collapse class="temp-collapse" :border="false" v-model="activeNames4">
      <van-collapse-item title="狐小eAPI" name="4">
        <van-icon class-prefix="my-icon" name="gengduo" slot="right-icon" :size="26"/>
        <van-cell title="获取授权码" is-link @click="getCode"/>
        <van-cell title="显示等待提示符" is-link @click="showLoading"/>
        <van-cell title="显示消息提示框" is-link @click="showToast"/>
        <van-cell title="拨打电话" is-link @click="callPhone"/>
        <van-cell title="显示提示框" is-link @click="showModal"/>
        <van-cell title="显示操作菜单" is-link @click="showActionSheet"/>
        <van-cell title="获取基本信息" is-link @click="getInfo"/>
        <van-cell title="获取定位信息" is-link @click="getLocation"/>
        <van-cell title="获取网络状态" is-link @click="getNetworkStatus"/>
        <van-cell title="扫描二维码" is-link @click="scanQRCode"/>
        <van-cell title="获取照片" is-link @click="getPhoto"/>
        <van-cell title="显示审批页面" is-link @click="showApproval"/>
        <van-cell title="显示狐聊列表页面" is-link @click="showChatList"/>
        <van-cell title="显示狐聊聊天页面" is-link @click="showChat"/>
        <van-cell title="社会化分享" is-link @click="share"/>
        <van-cell title="搜索" is-link @click="search"/>
        <van-cell title="设置导航栏" is-link :to="{name:'nav'}"/>
        <van-cell title="获取网页内容顶部偏移量" is-link @click="getPageTopOffset"/>
        <van-cell title="调整异形屏网页底部缩进模式" is-link @click="adjustContentBottomInset"/>
        <van-cell title="退出轻应用" is-link @click="exit"/>
        <van-cell title="获取启动选项" is-link @click="getLaunchOptions"/>
      </van-collapse-item>
    </van-collapse>
    <div style="position:absolute;bottom:0;"></div>
  </div>
</template>

<script>
import { Collapse, CollapseItem, Cell, CellGroup, Icon } from 'vant';
export default {
  name: "index",
  data() {
    return {
      activeNames1: [],
      activeNames2: [],
      activeNames3: [],
      activeNames4: [],
      isAdjust:false
    };
  },
  created() {},
  methods:{
    getCode(){
      this.$hxe.getCode().then(data=>{
        this.$hxe.showToast(data);
      }).catch(data=>{
        this.$hxe.showToast(data);
      });
    },
    showLoading(){
      //也可以向下面一样只传文本，但是需要手动调用this.$hxe.hideLoading()来关闭
      //this.$hxe.showLoading("加载中");
      this.$hxe.showLoading({title:"加载中",duration:2});
    },
    showToast(){
      this.$hxe.showToast("这是提示信息");
    },
    callPhone(){
      this.$hxe.callPhone("10086");
    },
    showModal(){
      this.$hxe.showModal({
        title:"提示",
        content:"你确定要点击确定按钮吗？",
        showCancel:true
      }).then(()=>{
        this.$hxe.showToast("你点击了确定");
      }).catch(()=>{
        this.$hxe.showToast("你点击了取消");
      });
    },
    showActionSheet(){
      this.$hxe.showActionSheet({
        title: '菜单标题',
        content: '菜单内容',
        menus: [{
            text: '选项A'
        }, {
            text: '选项B'
        }, {
            text: '删除',
            style: 'destructive'
        }, {
            text: '取消',
            style: 'cancel'
        }]
      }).then((index)=>{
        this.$hxe.showToast(`你点击了第${index}个`);
      }).catch(()=>{
        this.$hxe.showToast("出错了");
      });
    },
    getInfo(){
      this.$hxe.getInfo().then(data=>{
        this.$hxe.showToast(data.platform);
      });
    },
    getLocation(){
      this.$hxe.getLocation().then(data=>{
        this.$hxe.showToast(`经度：${data.longitude}，纬度：${data.latitude}`);
      }).catch(data=>{
        this.$hxe.showToast(data);
      });
    },
    getNetworkStatus(){
      this.$hxe.getNetworkStatus().then(data=>{
        this.$hxe.showToast(data);
      }).catch(data=>{
        this.$hxe.showToast(data);
      });
    },
    scanQRCode(){
      //狐小e环境下参数不生效，非狐小e环境下，会在then方法中直接返回参数值
      this.$hxe.scanQRCode("这是传入的参数字符串，这个参数在狐小e环境下参数不生效，非狐小e环境下直接返回该参数").then(data=>{
        this.$hxe.showToast(data);
      }).catch(data=>{
        this.$hxe.showToast(data);
      });
    },
    getPhoto(){
      this.$hxe.getPhoto({
        encode: 'jpeg',
        quality: 50,
        source: 'custom',
        allowEdit: true,
        correctOrientation: true
      }).then(data=>{
        this.$hxe.showToast(data);
      }).catch(data=>{
        this.$hxe.showToast(data);
      });
    },
    showApproval(){
      this.$hxe.showApproval({SN: '12345'}).then(data=>{
        this.$hxe.showToast(data);
      }).catch(data=>{
        this.$hxe.showToast(data);
      });
    },
    showChatList(){
      this.$hxe.showChatList({
        type: 'text',
        content: '消息内容'
        }).then(data=>{
        this.$hxe.showToast(data);
      }).catch(data=>{
        this.$hxe.showToast(data);
      });
    },
    showChat(){
      this.$hxe.showChat({
        group: false,
        target: '212416'
        }).then(data=>{
        this.$hxe.showToast(data);
      }).catch(data=>{
        this.$hxe.showToast(data);
      });
    },
    share(){
      this.$hxe.share({
        type: 'web',
        content: {
            title: '分享标题',
            description: '分享描述',
            web: 'http://www.sohu.com'
        }
        }).then(data=>{
        this.$hxe.showToast(data);
      }).catch(data=>{
        this.$hxe.showToast(data);
      });
    },
    search(){
      this.$hxe.search({
        keyword: '王'
        }).then(data=>{
        this.$hxe.showToast(JSON.stringify(data));
      }).catch(data=>{
        this.$hxe.showToast(data);
      });
    },
    getPageTopOffset(){
      this.$hxe.getPageTopOffset().then(data=>{
        this.$hxe.showToast("网页内容顶部偏移量："+data);
      });
    },
    adjustContentBottomInset(){
      this.isAdjust=!this.isAdjust;
      this.$hxe.adjustContentBottomInset(this.isAdjust).then(data=>{
        this.$hxe.showToast(data);
      });
    },
    exit(){
      this.$hxe.exit();
    },
    getLaunchOptions(){
      this.$hxe.getLaunchOptions((result)=>{
        console.log(result);
      });
    }
  },
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon
  }
};
</script>
