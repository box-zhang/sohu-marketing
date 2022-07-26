// this.$router.push({path: '/order/page1',query:{ id:'2'}});
// this.$router.push({name: '/order/page2',params:{ id:'6'}});
import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/template/Index.vue'
import home from './views/home/home.vue'
import anli from './views/anli/anli.vue'

Vue.use(Router)

const router = new Router({
	mode: '', //history 去掉url中的#
	base: '', // 注意更改你子项目名，这个对应你的 build.assetsPublicP
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: Index,
    //   meta: {
    //     //页面配置，主要用于标题栏，title必须有，backgroundColor和Button看页面需要，backgroundColor默认为全局配置的背景色
    //     title: "开发模版"
    //     // backgroundColor: "2d8cf0", 
    //     // rightButton: {
    //     //   type: 'image',
    //     //   name: 'search',
    //     //   handler: function () {
    //     //       console.log('点击了查询');
    //     //   }
    //     // },
    //   }
    // },
	{
	  path: '/',
	  name: 'home',
	  component: home,
	  meta: {
	    keepAlive: true,
		title:"首页"
	  }
	},
	{
	  path: '/newsPage',
	  name: 'newsPage',
	  component: () => import('./views/newsPage/newsPage.vue')
	},
	{
	  path: '/newsDetail',
	  name: 'newsDetail',
	  component: () => import('./views/newsPage/newsDetail.vue')
	},
	{
	  path: '/proPage',
	  name: 'proPage',
	  component: () => import('./views/project/proPage.vue')
	},
	{
	  path: '/proDetail',
	  name: 'proDetail',
	  component: () => import('./views/project/proDetail.vue')
	},
	{
	  path: '/ziyuanPage',
	  name: 'ziyuanPage',
	  component: () => import('./views/ziyuan/ziyuanPage.vue')
	},
	{
	  path: '/ziyuanDetail',
	  name: 'ziyuanDetail',
	  component: () => import('./views/ziyuan/ziyuanDetail.vue')
	},
	{
	  path: '/goodanliPage',
	  name: 'goodanliPage',
	  component: () => import('./views/goodAnli/goodanliPage.vue')
	},
	{
	  path: '/goodanliDetail',
	  name: 'goodanliDetail',
	  component: () => import('./views/goodAnli/goodanliDetail.vue')
	},
	{
	  path: '/anli',
	  name: 'anli',
	  component: anli,
	  meta: {
	    keepAlive: true
	  }
	},
	{
	  path: '/yxanliku',
	  name: 'yxanliku',
	  component: () => import('./views/yxanliku/yxanliku.vue')
	},
	{
	  path: '/speak',
	  name: 'speak',
	  component: () => import('./views/speak/speak.vue')
	},
	{
	  path: '/callphone',
	  name: 'callphone',
	  component: () => import('./views/speak/callphone.vue')
	},
    {
      path: '/icon',
      name: 'icon',
      component: () => import('./views/template/icon/Icon.vue'),
      meta:{
        title:"图标"
      }
    },
    {
      path: '/lookup',
      name: 'lookup',
      component: () => import('./views/template/assembly/LookupPage.vue'),
      meta:{
        title:"选择组件"
      }
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('./views/template/assembly/FormPage.vue'),
      meta:{
        title:"表单组件"
      }
    },
    {
      path: '/baseform',
      name: 'baseform',
      component: () => import('./views/template/assembly/form/BaseForm.vue'),
      meta:{
        title:"基础表单"
      }
    },
    {
      path: '/complexform',
      name: 'complexform',
      component: () => import('./views/template/assembly/form/ComplexForm.vue'),
      meta:{
        title:"复杂表单"
      }
    },
    {
      path: '/buttonform',
      name: 'buttonform',
      component: () => import('./views/template/assembly/form/ButtonForm.vue'),
      meta:{
        title:"自定义按钮表单"
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('./views/template/assembly/CalendarPage.vue'),
      meta:{
        title:"日历组件"
      }
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('./views/template/assembly/ErrorPage.vue'),
      meta:{
        title:"异常组件"
      }
    },
    {
      path: '/nav',
      name: 'nav',
      component: () => import('./views/template/hxe/NavigationBar.vue'),
      meta:{
        title:"设置标题栏"
      }
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/template/page/List.vue'),
      meta:{
        title:"列表",
        rightButton: {
            type: 'image',
            name: 'search',
            handler: function () {
                Vue.prototype.$hxe.showToast("这里要跳转查询页面");
            }
        }
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/template/page/Search.vue'),
      meta:{
        title:"搜索"
      }
    },
    {
      path: '/indexbar',
      name: 'indexbar',
      component: () => import('./views/template/page/IndexBar.vue'),
      meta:{
        title:"索引定位"
      }
    },
    {
      path: '/horizontal',
      name: 'horizontal',
      component: () => import('./views/template/page/Horizontal.vue'),
      meta:{
        title:"横屏显示"
      }
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('./views/template/page/Grid.vue'),
      meta:{
        title:"表格"
      }
    },
    {
      path: '/temphome',
      name: 'temphome',
      component: () => import('./views/template/page/TempHome.vue'),
      meta:{
        title:"主页"
      }
    }
  ]
})

//跳转前方法
router.beforeEach((to, from, next) => {
	console.log("跳转前方法")
	next(true)
  // let isContinue = true;
  // //特殊情况，在lookup页面点击新建时，不关闭popup，直接跳转
  // if(!to.query.fromlookup){
  //   //判断页面是否存在lookup型popup显示，如果有，则先关闭popup
  //   if (from.matched[0]) {
  //     let components = from.matched[0].instances.default;
  //     let eachPopup = (comp) => {
  //       comp.$children.forEach(item => {
  //         if (item.$el.className && item.$el.className.indexOf("lookup-style") > -1 && isContinue) {
  //           if (item.value === true) {
  //             item.close();
  //             isContinue = false;
  //             next(false);
  //             return false;
  //           }
  //         }
  //         if (item.$el.className && item.$el.className.indexOf("van-cell") == -1 && item.$children.length > 0 && isContinue)
  //           eachPopup(item);
  //       });
  //     };
  //     if (components.$children.length > 0)
  //       eachPopup(components);
  //   }
  // }
  // if (isContinue) {
  //   let continueFunc=function(){
  //     next();
  //     Vue.prototype.$hxe.setNavigationBar(to.meta);
  //   }
  //   continueFunc();
  //   //这里做页面埋点记录
  //   if(Vue.prototype.$config.pageLogUrl){
  //     Vue.prototype.$http.post(Vue.prototype.$config.pageLogUrl,{
  //               CurrentPageUrl: to.name,
  //               PrePageUrl:from.name,
  //               Param:to.fullPath,
  //               Name:to.name
  //             }
  //       )
  //   }
  // }
});

export default router;