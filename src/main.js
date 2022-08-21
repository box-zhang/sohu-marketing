import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'
import './assets/css/template.css'
import util from './common/util.js'
import hxeapi from './common/hxeapi.js'
import config from './common/config.js'
import custom from './common/components.js'
import http from './common/http.js'
import watermark from './common/watermark.js'
const Mock = require('mockjs');

Vue.prototype.$watermark = watermark
    // import Vconsole from 'vconsole';
    // new Vconsole();
import tabbar from './components/tabbar.vue';
Vue.component('tabbar', tabbar)
import { NavBar, Icon, Swipe, SwipeItem, Grid, GridItem, Tabbar, TabbarItem, Image as VanImage, Tag, Tab, Tabs, Collapse, CollapseItem, Col, Row, Rate, Button, Field, CellGroup, Step, Steps } from 'vant';

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
    .use(Col).use(Row).use(Rate).use(Button).use(Field).use(CellGroup).use(Step).use(Steps);


//全局配置项
Vue.prototype.$config = config
    //请求封装
Vue.prototype.$http = http
Vue.prototype.$http.defaults.baseURL = Vue.prototype.$config_env.VUE_APP_HOST;

//截取标题九个字
Vue.prototype.$titleName = function(titlename) {
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