/*
 * @Author: boxZhang
 * @Date: 2022-08-22 10:13:56
 * @LastEditors: boxZhang
 * @LastEditTime: 2022-08-29 14:51:06
 * @Description: 好好做人，谨慎敲码
 * @FilePath: \workspace\sohu_project\sohu-marketing\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import './assets/css/template.css'
import './assets/iconfont/iconfont.css'
import custom from './common/components.js'
import config from './common/config.js'
import http from './common/http.js'
import hxeapi from './common/hxeapi.js'
import util from './common/util.js'
import watermark from './common/watermark.js'
import router from './router'
import store from './store'
const Mock = require('mockjs');
// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')


Vue.prototype.$watermark = watermark
// import Vconsole from 'vconsole';
// new Vconsole();
import {
  Button, CellGroup, Col, Collapse, CollapseItem, Field, Grid, GridItem, Icon, Image as VanImage,
  List, NavBar, Progress, Rate, Row, Step, Steps, Swipe, SwipeItem, Tab, Tabbar, TabbarItem, Tabs, Tag, Toast
} from 'vant'
import tabbar from './components/tabbar.vue'
Vue.component('tabbar', tabbar)

import 'lib-flexible/flexible'

Vue.use(custom);
Vue.config.productionTip = false
Vue.prototype.$config_env = process.env
Vue.prototype.$util = util
Vue.prototype.$hxe = hxeapi

Vue.use(NavBar).use(Icon).use(Swipe)
  .use(SwipeItem).use(Grid).use(GridItem)
  .use(Tabbar).use(TabbarItem).use(VanImage)
  .use(Tag).use(Tab).use(Tabs).use(Collapse).use(CollapseItem)
  .use(Col).use(Row).use(Rate).use(Button).use(Field).use(CellGroup)
  .use(Step).use(Steps).use(List).use(Toast).use(Progress);

// Vue.use(VideoPlayer);

//全局配置项
Vue.prototype.$config = config
//请求封装
Vue.prototype.$http = http
Vue.prototype.$http.defaults.baseURL = Vue.prototype.$config_env.VUE_APP_HOST;

//截取标题九个字
Vue.prototype.$titleName = function (titlename) {
  return new Promise((resolve, reject) => {
    var that = this
    var name = (titlename && titlename.length > 9 ? titlename.substring(0, 9) : titlename)
    // console.log(name)
    resolve(name)
  })
}

// 切换页面滚动回顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
  // 或
  // window.scroll(0, 0);
});

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default app;