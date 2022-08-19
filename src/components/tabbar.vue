<template>
  <div class="tabbar">
    <!--  /:before-change="beforechange" -->
    <van-tabbar
      v-model="tabbarTempValue"
      @change="onChange"
      active-color="#333333"
      inactive-color="#777777"
      :placeholder="true"
    >
      <van-tabbar-item replace to="/">
        <span>首页</span>
        <template #icon="props">
          <img :src="tabbarTempValue == 0 ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/anli">
        <span>案例</span>
        <template #icon="props">
          <img :src="tabbarTempValue == 1 ? icon1.active : icon1.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/marketing">
        <span>培训</span>
        <template #icon="props">
          <img :src="tabbarTempValue == 2 ? icon2.active : icon2.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: {
    tabbarValue: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tabbarTempValue: 0,
      icon: {
        active: require('../assets/static/home/icon_shouye_yixuanzhong.png'),
        inactive: require('../assets/static/anli/icon_shouye_weixuanzhong.png'),
      },
      icon1: {
        active: require('../assets/static/anli/icon_anli_xuanzhong.png'),
        inactive: require('../assets/static/home/icon_anli_weixuanzhong.png'),
      },
      icon2: {
        active: require('../assets/static/peixun/icon_peixun_xuanzhong.png'),
        inactive: require('../assets/static/home/icon_peixun_weixuanzhong.png'),
      },
    }
  },
  created() {
    this.tabbarTempValue = this.tabbarValue
    console.log(this.tabbarTempValue)
  },
  methods: {
    beforechange(index) {
      if (index == 2) {
        this.$hxe.showToast('敬请期待')
        return false
      } else {
        return true
      }
    },
    onChange(index) {
      console.log('点击了下标：' + index)
      // if (index == 2) {
      //   return false
      // }
      // this.$hxe.showToast(+index);
      this.tabbarTempValue = parseInt(index)
      console.log('下标：' + this.tabbarTempValue)
    },
  },
}
</script>
