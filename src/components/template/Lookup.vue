<template>
  <div style="height:100%;" :class="multil?'lookupMultil':'lookupSingle'">
    <van-panel ref="myLookup" style="height:100%;">
      <div slot="header"  :style="{paddingTop:$store.state.pageTopOffset+'px'}">
        <form action onsubmit="return false">
          <van-search
            v-model="searchText"
            placeholder="请输入一个关键词"
            show-action
            @search="onRefresh(3)"
            slot="right"
          >
            <div slot="action" @click="onClear">清除</div>
          </van-search>
        </form>
      </div>
      <div slot="default">
        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh(2)" :disabled="refreshDisabled">
          <van-list
            v-model="isLoading"
            :finished="isFinished"
            :finished-text="finishedText"
            @load="search('',1)"
            :immediate-check="true"
            :offset=100
            :style="{minHeight:(minHeight-114)+'px'}"
          >
            <!-- <error v-show="isShowNodata"/> -->
            <van-checkbox-group v-model="selectList">
              <van-cell
                v-for="(item,index) in lookupData.dataList"
                :id="item.id"
                :key="index"
                :clickable="true"
                :name="item"
                @click="selected(item,index)"
              >
                <van-checkbox :name="item" ref="checkboxes" v-if="multil">
                  {{$scopedSlots.content?"":item.name}}
                  <!--作用域插槽-->
                  <slot name="content" :item="item"></slot>
                </van-checkbox>
                <span v-else>
                  {{$scopedSlots.content?"":item.name}}
                  <!--作用域插槽-->
                  <slot name="content" :item="item"></slot>
                </span>
              </van-cell>
            </van-checkbox-group>
          </van-list>
        </van-pull-refresh>
      </div>
      <div slot="footer" v-if="multil">
        <van-row type="flex" class="van-btn" justify="space-between">
          <van-col span="24">
            <van-button type="info" bottom-action @click="onOk" style="width:100%;">确定</van-button>
          </van-col>
        </van-row>
      </div>
    </van-panel>
  </div>
</template>

<script>
import { Button,Panel,List,PullRefresh,Checkbox, CheckboxGroup,Search,Row,Col,Cell } from 'vant';
export default {
  name: "lookup",
  data() {
    return {
      searchText: "",
      scrollState: true, //是否可以滑动
      indexScrollTop: 0,
      isRefresh: false,
      refreshDisabled:true,
      isLoading: false,
      isFinished: false,
      selectList: [],
      minHeight: window.innerHeight,
      lookupData: {
        dataList: [],
        page: {
          index: 1
        }
      },
      isSelfNew:true,
      loadingIndex:[0,0,0]
    };
  },
  props: {
    multil: {
      type: Boolean,
      default: false
    },
    split: {
      type: String,
      default: ";"
    },
    value:{
      type:Object,
      default:function(){return {}}
    }
  },
  components: {
    [Button.name]:Button,
    [Panel.name]:Panel,
    [List.name]:List,
    [PullRefresh.name]:PullRefresh,
    [Checkbox.name]:Checkbox,
    [CheckboxGroup.name]:CheckboxGroup,
    [Search.name]:Search,
    [Row.name]:Row,
    [Col.name]:Col,
    [Cell.name]:Cell
  },
  computed: {
    finishedText() {
      return this.lookupData.dataList.length > 0 ? "没有更多了" : "";
    },
    isShowNodata() {
      return (
        !this.isRefresh &&
        !this.isLoading &&
        this.lookupData.dataList.length == 0
      );
    }
  },
  created(){
    this.$nextTick(()=>{
      this.$refs.myLookup.children[1].style.top=(this.$store.state.pageTopOffset+54)+'px';
    })
  },
  methods: {
    //加载顺序权重  搜索>刷新>加载更多
    search(type,index) {
      //当load时判断是否正在刷新
      if(index==1){
            if(this.isRefresh){
              this.isLoading=false;
              return;
            }
      }

      this.loadingIndex[index-1]=index;
      //console.log("search"+this.lookupData.page.index);
      if (type == "refrsesh") {
        if(!this.isLoading){   //当正在加载更多时,不显示下拉刷新loading
          this.isRefresh = true;
        }
        this.lookupData.page.index = 1;
        this.lookupData.dataList = [];
        this.selectList=[];
      }
      this.value.list=this.value.list || [];
      //搜索,加载数据
      this.$emit(
        "setLookupData",
        this.searchText.trim(),
        this.lookupData.page.index++,
        data => {
          if(Math.max(...this.loadingIndex)<=index){
              this.isLoading = false;
              this.isRefresh = false;
              
              //加载已选择项
              if(this.lookupData.page.index==2){
                  this.value.list.forEach(x=>{
                     this.lookupData.dataList.push(x)
                     this.selectList.push(x);
                  });
                  
              }
              
              //设置数据
              if (data && data instanceof Array){
                    data.map((v, k) => {
                      //过滤已选择
                      if(this.value.list.filter(x=>{
                          if(typeof x.id =="string"){
                              return x.id.toLowerCase()==v.id.toLowerCase();
                          }
                         return x.id==v.id;
                      }).length==0){
                        this.lookupData.dataList.push(v);
                      }
                    });
                  this.isFinished=data.length<20;
              }
              
          }
          this.loadingIndex[index-1]=0;
          this.refreshDisabled=false;
        }
      );
    },
    selected(obj, index) {
      if (this.multil) {
        this.$refs.checkboxes[index].toggle();
      } else {
        //选中事件
        if (obj) {
          this.$emit("confirm", obj);
        }
      }
    },
    onOk() {
      let newArray = [];
      this.selectList.forEach(x => {
        let len =
          newArray.filter(n => {
            return x.id == n.id;
          }).length > 0;
        if (!len) {
          newArray.push(x);
        }
      });

      let names = newArray
        .map((obj, index) => {
          return obj.name;
        })
        .join(this.split);
      this.$emit("confirm", newArray, names);
    },
    onRefresh(index) {
      // 防止频繁搜索,导致数据加载重复
      // if(index==3){
      //   if(this.isLoading || this.isRefresh){
      //     return;
      //   }
      // }
      
      this.search("refrsesh",index);
    },
    onClear() {
      this.selectList = [];
      if (this.multil) {
        this.$emit("confirm", [], "");
      } else {
        this.$emit("confirm", {});
      }
    }
  },
  watch:{
    searchText(newValue, oldValue){
      if(newValue!=oldValue&&newValue=="")
        this.onRefresh(3);
    }
  }
};
</script>

<style>
.lookup-style {
  left: 0;
  height: 100%;
}
.lookup-style .van-panel__content {
    position: absolute;
    left: 0;
    right: 0;
    overflow: scroll;
}
.lookup-style .van-panel__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.lookupSingle .van-panel__content {
    bottom: 0;
}
.lookupMultil .van-panel__content {
    bottom: 70px;
}
</style>



