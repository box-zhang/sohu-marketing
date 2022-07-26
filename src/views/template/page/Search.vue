<style lang="less" scoped>
.t-search{
    padding-top:54px;
    .t-search-top{
        position:fixed;
        top:0;
        z-index: 99;
        left:0;
        right:0;
    }
}

.t-search-his{
    margin:@page-margin-size;
    .t-search-his-title{
        font-size: @title-large-size;
        color:@neutral-title-color;
    }
    .t-search-his-item{ 
        margin-top:10px;
        span{
            display:inline-block;
            height:30px;
            padding:0 15px;
            background: #e8eaec;
            line-height: 30px;
            color:@neutral-title-color;
            font-size: 11px;
            border-radius: 15px;
            margin:4px;
        }
    }
}
</style>
<template>
  <div class="t-search">
    <form action="/">
    <van-search
      ref="search"
      v-model="searchText"
      :placeholder="searchTip"
      show-action
      @search="onSearch"
      class="t-search-top"
      @cancel="onCancel"
      background="#f8f8f9"
    >
    </van-search>
    </form>
    <div class="t-search-his" v-if="!isSearching">
        <van-row>
            <van-col span="20"><div class="t-search-his-title">搜索历史</div></van-col>
            <van-col span="4" style="text-align: right;"><van-icon class-prefix="my-icon" name="lajitong" :size="18" @click="onClearHistory"/></van-col>
        </van-row>
        <div class="t-search-his-item">
            <span v-for="(item,index) in searchHistory" :key="index" @click="onClickHistory(item)">{{item}}</span>
        </div>
    </div>
    <div class="t-search-result" v-if="isSearching">
        <van-tabs class="t-search-result-tab" swipeable :active=0 ref="fixedTab" :border="false" color="#2d8cf0" line-width="40">
            <van-tab v-for="(item,index) in searchType" :title="item.name" :key="index">
                <list-data :top="98"/>
            </van-tab>
        </van-tabs>
    </div>
  </div>
</template>

<script>
import ListData from '../../../components/template/ListData'
import { Search,Icon,Row,Col,Tabs,Tab } from 'vant';
export default {
  name: "Search",
  data() {
    return {
      searchText: "",
      searchTip: "输入关键字进行搜索",
      isSearching:false,
      searchHistory:[],
      searchType:[
          {name:"客户"},
          {name:"订单"},
          {name:"合同"},
          {name:"联系人"},
          {name:"工单"},
          {name:"资料"}
      ]
    };
  },
  created(){
      let history=localStorage.getItem("searchHistory");
      if(history){
          this.searchHistory=history.split(",");
      }
  },
  methods: {
    onSearch() {
        this.searchText=this.searchText.trim();
        let index = this.searchHistory.indexOf(this.searchText); 
        if (index > -1) { 
            this.searchHistory.splice(index, 1); 
        } 
        this.searchHistory.unshift(this.searchText);
        localStorage.setItem("searchHistory", this.searchHistory.slice(0,10).join(','));
        this.isSearching=true;
        //页面顶部位置
        this.$nextTick(()=>{
            this.$refs.fixedTab.$el.children[0].style.position="fixed";
            this.$refs.fixedTab.$el.children[0].style.top=(this.$store.state.pageTopOffset+54)+'px';
        })
    },
    onCancel(){
        this.isSearching=false;
    },
    onClearHistory(){
        this.searchHistory=[];
        localStorage.setItem("searchHistory", this.searchHistory.join(','));
    },
    onClickHistory(item){
        this.searchText=item;
        this.onSearch();
    },
    replaceSearchText(text) {
      let titleString = text;
      if (this.searchText && this.searchText.length > 0 && text != null) {
        // 匹配关键字正则
        let replaceReg = new RegExp(this.searchText, "g");
        // 高亮替换v-html值
        let replaceString =
          "<span class='search-text' style='color:#2185ff'>" +
          this.searchText +
          "</span>";
        // 开始替换
        titleString = titleString.replace(replaceReg, replaceString);
      }
      return titleString;
    }
  },
  computed: {
  },
  watch: {
  },
  components:{
      'list-data':ListData,
      [Search.name]:Search,
      [Icon.name]:Icon,
      [Row.name]:Row,
      [Col.name]:Col,
      [Tabs.name]:Tabs,
      [Tab.name]:Tab
  }
};
</script>
