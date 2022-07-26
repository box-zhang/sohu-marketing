import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //模版自带state，请勿修改
    pageTopOffset:0,
    isShowActionSheet: false,
    actionSheetTitle: "",
    actionSheetMenus:[],
	isback:false,//是否需要返回，
  },
  mutations: {
	setbackboolen(state,n) {
	    state.isback = n.isback
	},
    setActionSheet (state,n) {
      state.isShowActionSheet=n.show
    },
    setActionSheetTitle (state,n) {
      state.actionSheetTitle=n.title
    },
    setActionSheetMenus (state,n) {
      state.actionSheetMenus=n.menus
    },
    setPageTopOffset (state,n) {
      state.pageTopOffset=n.pageTopOffset
    }
  },
  actions: {

  }
})
