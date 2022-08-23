<template>
  <div id="app">
    <keep-alive>
      <!-- 第一次进入刷新 -->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 每次进入刷新 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 底部标签导航 -->
    <tabbar v-if="fishowtab" :tabbarValue="tabbarTempValue"></tabbar>
    <!-- 全局ActionSheet对象,用于在非狐小e环境 -->
    <van-action-sheet
      :value="show"
      @input="setShowActionSheet($event)"
      :actions="actions"
      @select="onSelect"
      :title="title"
      close-on-click-action
    />
  </div>
</template>
<script>
import { ActionSheet } from 'vant'
export default {
  data() {
    return {
      fishowtab: false,
      tabbarTempValue: 0,
    }
  },
  created() {
    console.log('版本号：2.0.0')
    console.log(this.$route)
    this.showdaohang(this.$route.name)
    //异形屏网页内容底部缩进
    if (this.$config.adjustContentBottomInset) {
      this.$hxe
        .adjustContentBottomInset(this.$config.adjustContentBottomInset)
        .catch((error) => {
          console.log(error)
        })
    }
  },
  /**
   * 监听同一个路径，不同参数的刷新
   */
  watch: {
    // 方法1
    $route(to, from) {
      //监听路由是否变化
      console.log(to)
      console.log(from)
      this.showdaohang(to.name)
    },
  },
  methods: {
    //判断路由是不是需要底部导航
    showdaohang(name) {
      console.log('点击了' + name)
      var arr = ['home', 'anli', 'marketing']
      if (arr.indexOf(name) > -1) {
        this.fishowtab = true
        if (name == 'home') {
          this.$hxe.setNavigationBar({
            title: '搜狐营销+',
            backgroundColor: '#FFFFFF',
            whiteTint: false,
            pageTopOffset: false,
          })
          this.tabbarTempValue = 0
        } else if (name == 'anli') {
          this.$hxe.setNavigationBar({
            title: '案例',
            backgroundColor: '#FFD33F',
            whiteTint: true,
            pageTopOffset: false,
          })
          this.tabbarTempValue = 1
        } else if (name == 'marketing') {
          this.$hxe.setNavigationBar({
            title: '培训',
            backgroundColor: '#FFD33F',
            whiteTint: true,
            pageTopOffset: false,
          })
          this.tabbarTempValue = 2
        }
      } else {
        this.fishowtab = false
      }
    },
    setShowActionSheet(obj) {
      this.$store.commit({ type: 'setActionSheet', show: obj })
    },
    onSelect(item, index) {
      if (
        window.onSelectActionSheet &&
        typeof window.onSelectActionSheet == 'function'
      )
        window.onSelectActionSheet(item, index)
    },
  },
  components: {
    [ActionSheet.name]: ActionSheet,
  },
  computed: {
    show() {
      return this.$store.state.isShowActionSheet
    },
    actions() {
      return this.$store.state.actionSheetMenus
    },
    title() {
      return this.$store.state.actionSheetTitle
    },
  },
}
</script>

<style lang="less">
html {
  overflow-x: hidden;
}
body {
  background-color: #ffffff !important;
  overflow-x: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.van-tabbar-item--active {
  font-weight: bold;
}

.page {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.block20 {
  width: 100%;
  height: 10px;
}

.block30 {
  width: 100%;
  height: 20px;
}

.block24 {
  width: 100%;
  height: 24px;
}

.zhezhao {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 16;
  background: rgba(0, 0, 0, 0.7);
}

.footer {
  width: 100%;
  text-align: center;
  height: 58px;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #aaaaaa;
  line-height: 58px;
}

iframe {
  width: 100vw !important;
  height: 100vh !important;
  border: none;
}

// .van-ellipsis{
// 	color: #333333;
// }
// .van-nav-bar .van-icon{
// 	color: #333333;
// }
// .van-nav-bar__text{
// 	color: #333333;
// }
// .van-nav-bar__title{
// 	color: #333333;
// }
.ziyuandiv {
  width: 343px;
  margin: 0 auto;

  .title {
    // height: 56px;
    // line-height: 56px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
  }

  .zytop {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;

    .left {
      width: 146px;
      height: 146px;
      // background-image: url(assets/static/home/icon_souhubaipishu.png);
      background-repeat: no-repeat;
      background-size: cover;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .right1 {
        width: 185px;
        height: 67px;
        // background-image: url(assets/static/home/icon_dingjiipxiangmu.png);
        background-repeat: no-repeat;
        background-size: cover;
      }

      .right2 {
        width: 185px;
        height: 67px;
        // background-image: url(assets/static/home/icon_pindaoyuanchuangip.png);
        background-repeat: no-repeat;
        background-size: cover;
      }
    }

    .title1 {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      margin-left: 12px;
      margin-top: 12px;
    }

    .title2 {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #aaaaaa;
      margin-left: 12px;
      margin-top: 3px;
    }
  }

  .zybottom {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .title1 {
      font-size: 13px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      margin-left: 12px;
      margin-top: 10px;
    }

    .title2 {
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #aaaaaa;
      margin-left: 12px;
      margin-top: 3px;
    }

    .bottom1 {
      width: 107px;
      height: 68px;
      margin-top: 10px;
      // background-image: url(assets/static/home/icon_youshibaogao.png);
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}

.newsdiv {
  width: 343px;
  margin: 0 auto;

  // margin-top: 20px;
  .title {
    // height: 36px;
    // line-height: 36px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
  }

  .newsobj1 {
    padding-top: 10px;

    .newname {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 22px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .leftimage {
      width: 343px !important;
      height: 193px !important;
      border-radius: 5px;
      margin-top: 10px;
      overflow: hidden;
    }

    .timer {
      margin-top: 5px;
      display: flex;
      align-items: center;

      .text {
        margin-left: 5px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #aaaaaa;
      }
    }
  }

  .newsobj {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .namediv {
      width: 216px;
      height: 72px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .timer {
        display: flex;
        align-items: center;

        .text {
          margin-left: 5px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #aaaaaa;
        }
      }
    }

    .imageright {
      width: 125px !important;
      height: 78px !important;
      border-radius: 5px;
      overflow: hidden;
    }
  }

  .timerimage {
    width: 14px !important;
    height: 14px !important;
  }
}

.anlidiv {
  width: 343px;
  margin: 0 auto;
  margin-top: 30px;

  .title {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    height: 26px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;

    .moretext {
      margin-left: auto;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #aaaaaa;
    }

    .rightgo {
      margin-left: 5px;
      width: 6px;
      height: 9px;
    }
  }

  .anliobj1 {
    margin-bottom: 16px;

    .newname {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      line-height: 22px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .leftimage {
      width: 343px !important;
      height: 193px !important;
      border-radius: 5px;
      margin-top: 10px;
      overflow: hidden;
    }

    .timer {
      margin-top: 5px;
      display: flex;
      align-items: center;

      .text {
        margin-left: 5px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #aaaaaa;
      }
    }

    .timerimage {
      width: 14px !important;
      height: 14px !important;
    }
  }

  .anliobj {
    margin-bottom: 16px;
    display: flex;
    // align-items: center;
    justify-content: space-between;

    .namediv {
      margin-left: 10px;
      flex: 1;
      min-height: 78px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .desc {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #aaaaaa;
        line-height: 17px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .tagsdiv {
        margin-top: 3px;
      }

      .tags {
        padding: 0 5px;
        background-color: #fff7eb;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
        font-size: 10px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #efa11f;
        border-radius: 2px;
      }

      .timer {
        display: flex;
        align-items: center;

        .text {
          margin-left: 5px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #aaaaaa;
        }
      }
    }

    // .image {
    // 	width: 125px !important;
    // 	height: 78px !important;
    // 	border-radius: 5px;
    // 	overflow: hidden;
    // }
    .image {
      width: 129px !important;
      height: 97px !important;
      border-radius: 5px;
      overflow: hidden;
    }

    .imagepro {
      width: 125px !important;
      height: 78px !important;
      border-radius: 5px;
      overflow: hidden;
    }

    .timerimage {
      width: 14px !important;
      height: 14px !important;
    }
  }
}

// 案例
.bardiv {
  width: 375px;
  height: 110px;
  margin: -55px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(assets/static/anli/anli_kapian.png);
  background-repeat: no-repeat;
  background-size: cover;

  .barobj {
    width: 170px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .image {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      overflow: hidden;
    }

    .titlename {
      margin-left: 5px;

      .name {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #333333;
      }

      .desc {
        margin-top: 3px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #aaaaaa;
      }
    }
  }
}

// pdf
.arrow {
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pdf-box {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  font-size: 0.28rem;

  span {
    width: 100%;
  }
}

.marketingdiv {
  width: 343px;
  margin: 0 auto;

  .van-tag {
    padding: 2px 3px;
  }
}

.text-hide {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.van-nav-bar .van-icon {
  color: #666;
  font-size: 20px;
  font-weight: blod;
}

.van-tag--primary {
  background-color: #fff7eb;
  color: #efa11f;
}

.van-tabs__line {
  background-color: #ffd33f;
}

.mb-20 {
  margin-bottom: 20px;
}
.mtb-10 {
  margin: 10px 0;
}
// .van-image {
//   border-radius: 5px;
//   overflow: hidden;
// }
.mt-bar {
  margin-top: 42px;
  padding-top: 1px;
}
</style>
