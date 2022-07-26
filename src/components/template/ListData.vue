
<style lang="less" scoped>
.t-list-filter{
    position:fixed;
    z-index:98;
    width:100%;
    background:#fff;
    .t-list-filter-type{
        margin:@page-margin-size;
        .t-list-filter-title{
            font-size: @title-small-size;
            color:@neutral-light-color;
        }
        .t-list-filter-item:not(:first-of-type){
            margin:10px;
        }
        .t-list-filter-item{
            display: inline-block;
            border:1px solid @neutral-border-color;
            font-size: @title-small-size;
            color:@neutral-title-color;
            padding:4px 10px;
            margin:10px 10px 10px 0;
            border-radius: @radius-small-size;
        }
        .t-list-filter-selected{
            background: @primary;
            color:@neutral-white-color;
            border:1px solid @primary;
        }
    }
}
.t-list-con{
    padding-top:50px;
    .t-list-item{
        display: flex;
        padding:10px @page-margin-size;
        background: @neutral-white-color;
        .t-list-item-img{
            padding-right:@page-margin-size;
            img{
                width:50px;
                height:50px;
                border-radius: @radius-small-size;
            }
        }
        .t-list-item-con{
            flex-grow:1;
            line-height: 1.4em;
            color:@neutral-light-color;
            .t-list-item-title{
                line-height: 1.8em;
                font-size: @title-large-size;
                color:@neutral-title-color;
            }
            .t-list-item-rt{
                font-size: @text-help-size;
                width:100%;
                text-align: right;
            }
            .t-list-item-tag{
                display: inline-block;
                position: relative;
                font-size: 10px;
                padding:2px;
                line-height: 1em;
                border-radius: @radius-small-size;
            }
            .t-list-item-tag:not(:first-of-type){
                margin-left:6px;
            }
            .t-list-item-tag-yellow{
                border:1px solid @type-yellow-deeper-color;
                color:@type-yellow-deeper-color;
            }
            .t-list-item-tag-violet{
                border:1px solid @type-violet-color;
                color:@type-violet-color;
            }
            .t-list-item-tag-blue{
                border:1px solid @type-blue-color;
                color:@type-blue-color;
            }
            .t-list-item-text{
                font-size: @text-con-size;
                color:@neutral-text-color;
            }
            .t-list-item-lb{
                font-size: @text-con-size;
                color:@neutral-text-color;
            }
            .t-list-item-rb{
                font-size: @text-help-size;
                width:100%;
                text-align: right;
            }
        }
    }
    .t-list-item-withmargin{
        margin:10px @page-margin-size;
        border-radius: @radius-normal-size;
    }
}
</style>
<template>
    <div class="t-list-area" :style="{minHeight:winHeight+'px'}">
        <div class="t-list-filter" :style="{top:($store.state.pageTopOffset+top)+'px'}">
          <van-dropdown-menu style="text-align:left;">
            <van-dropdown-item title-class="t-list-dropdown-item" v-model="showImg" :options="showImgList" />
            <van-dropdown-item title-class="t-list-dropdown-item" v-model="showMargin" :options="showMarginList" />
            <van-dropdown-item title-class="t-list-dropdown-item" v-model="orderby" :options="orderbyList" />
            <van-dropdown-item title-class="t-list-dropdown-item" title="筛选" ref="item">
                <van-switch-cell v-model="switch1" title="我团队的" />
                <van-switch-cell v-model="switch2" title="框架合同" />
                <div class="t-list-filter-type">
                    <div class="t-list-filter-title">合同状态</div>
                    <a class="t-list-filter-item" 
                        v-for="item in statusList" 
                        :key="item.name" 
                        @click="Check(1,item.value)" 
                        :class="statusStr.indexOf(item.value)>-1?'t-list-filter-selected':''">
                        {{item.name}}
                    </a>
                </div>
                <div class="t-list-filter-type">
                    <div class="t-list-filter-title">合同地区</div>
                    <a class="t-list-filter-item" 
                        v-for="item in areaList" 
                        :key="item.name" 
                        @click="Check(2,item.value)" 
                        :class="areaStr.indexOf(item.value)>-1?'t-list-filter-selected':''">
                        {{item.name}}
                    </a>
                </div>
                <van-button block type="info" @click="onConfirm">确认</van-button>
            </van-dropdown-item>
          </van-dropdown-menu>
        </div>
        <div class="t-list-con">
            <!-- 有图片无边距 -->
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <div slot="pulling" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>下拉刷新</div>
                <div slot="loosing" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>松开立即刷新</div>
                <div slot="loading" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>加载中...</div>
                <van-list v-if="showImg&&!showMargin"
                        v-model="loading"
                        :finished="finished"
                        @load="getData"
                        finished-text="没有更多了"
                        class="vant-list">
                    <div slot="loading" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>加载中...</div>
                    <div v-for="(item,index) in list" :key="index" class="t-list-item van-hairline--bottom">
                        <div class="t-list-item-img">
                            <img :src="require(`../../assets/images/temp${item.img}.png`)"/>
                        </div>
                        <div class="t-list-item-con">
                        <van-row>
                            <van-col span="18"><div class="t-list-item-title">{{item.name}}</div></van-col>
                            <van-col span="6"><div class="t-list-item-rt">{{item.status}}</div></van-col>
                        </van-row>
                        <van-row>
                            <van-col span="24">
                                <div class="t-list-item-tag" :class="'t-list-item-tag-'+(item.type=='框架合同'?'yellow':'violet')">{{item.type}}</div>
                                <div class="t-list-item-tag t-list-item-tag-blue">{{item.area}}</div>
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col span="24"><div class="t-list-item-text">{{item.account}}</div></van-col>
                        </van-row>
                        <van-row>
                            <van-col span="16"><div class="t-list-item-lb">{{item.owner}}</div></van-col>
                            <van-col span="8"><div class="t-list-item-rb">{{item.createdon}}</div></van-col>
                        </van-row>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
            <!-- 有图片有边距 -->
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <div slot="pulling" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>下拉刷新</div>
                <div slot="loosing" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>松开立即刷新</div>
                <div slot="loading" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>加载中...</div>
            <van-list v-if="showImg&&showMargin"
                      v-model="loading"
                      :finished="finished"
                      @load="getData"
                      finished-text="没有更多了"
                      class="vant-list">
                    <div slot="loading" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>加载中...</div>
                      <div v-for="(item,index) in list" :key="index" class="t-list-item t-list-item-withmargin">
                        <div class="t-list-item-img">
                            <img :src="require(`../../assets/images/temp${item.img}.png`)"/>
                        </div>
                        <div class="t-list-item-con">
                        <van-row>
                            <van-col span="18"><div class="t-list-item-title">{{item.name}}</div></van-col>
                            <van-col span="6"><div class="t-list-item-rt">{{item.status}}</div></van-col>
                        </van-row>
                        <van-row>
                            <van-col span="24">
                                <div class="t-list-item-tag" :class="'t-list-item-tag-'+(item.type=='框架合同'?'yellow':'violet')">{{item.type}}</div>
                                <div class="t-list-item-tag t-list-item-tag-blue">{{item.area}}</div>
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col span="24"><div class="t-list-item-text">{{item.account}}</div></van-col>
                        </van-row>
                        <van-row>
                            <van-col span="16"><div class="t-list-item-lb">{{item.owner}}</div></van-col>
                            <van-col span="8"><div class="t-list-item-rb">{{item.createdon}}</div></van-col>
                        </van-row>
                        </div>
                    </div>
            </van-list>
            </van-pull-refresh>
            <!-- 无图片无边距 -->
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <div slot="pulling" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>下拉刷新</div>
                <div slot="loosing" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>松开立即刷新</div>
                <div slot="loading" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>加载中...</div>
            <van-list v-if="!showImg&&!showMargin"
                      v-model="loading"
                      :finished="finished"
                      @load="getData"
                      finished-text="没有更多了"
                      class="vant-list">
                    <div slot="loading" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>加载中...</div>
                 <div v-for="(item,index) in list" :key="index" class="t-list-item van-hairline--bottom">
                        <div class="t-list-item-con">
                        <van-row>
                            <van-col span="18"><div class="t-list-item-title">{{item.name}}</div></van-col>
                            <van-col span="6"><div class="t-list-item-rt">{{item.status}}</div></van-col>
                        </van-row>
                        <van-row>
                            <van-col span="24">
                                <div class="t-list-item-tag" :class="'t-list-item-tag-'+(item.type=='框架合同'?'yellow':'violet')">{{item.type}}</div>
                                <div class="t-list-item-tag t-list-item-tag-blue">{{item.area}}</div>
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col span="24"><div class="t-list-item-text">{{item.account}}</div></van-col>
                        </van-row>
                        <van-row>
                            <van-col span="16"><div class="t-list-item-lb">{{item.owner}}</div></van-col>
                            <van-col span="8"><div class="t-list-item-rb">{{item.createdon}}</div></van-col>
                        </van-row>
                        </div>
                    </div>      
            </van-list>
            </van-pull-refresh>
            <!-- 无图片有边距 -->
            <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <div slot="pulling" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>下拉刷新</div>
                <div slot="loosing" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>松开立即刷新</div>
                <div slot="loading" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>加载中...</div>
            <van-list v-if="!showImg&&showMargin"
                      v-model="loading"
                      :finished="finished"
                      @load="getData"
                      finished-text="没有更多了"
                      class="vant-list">
                    <div slot="loading" class="t-pull-load-area"><img src="../../assets/images/load.gif"/>加载中...</div>
                      <div v-for="(item,index) in list" :key="index" class="t-list-item t-list-item-withmargin">
                        <div class="t-list-item-con">
                        <van-row>
                            <van-col span="18"><div class="t-list-item-title">{{item.name}}</div></van-col>
                            <van-col span="6"><div class="t-list-item-rt">{{item.status}}</div></van-col>
                        </van-row>
                        <van-row>
                            <van-col span="24">
                                <div class="t-list-item-tag" :class="'t-list-item-tag-'+(item.type=='框架合同'?'yellow':'violet')">{{item.type}}</div>
                                <div class="t-list-item-tag t-list-item-tag-blue">{{item.area}}</div>
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col span="24"><div class="t-list-item-text">{{item.account}}</div></van-col>
                        </van-row>
                        <van-row>
                            <van-col span="16"><div class="t-list-item-lb">{{item.owner}}</div></van-col>
                            <van-col span="8"><div class="t-list-item-rb">{{item.createdon}}</div></van-col>
                        </van-row>
                        </div>
                    </div>
            </van-list>
            </van-pull-refresh>
            <!-- <crm-nodata v-show="isTipNoData" :height="tipNoDataHeight" /> -->
        </div>
    </div>
</template>
<script>
import { DropdownMenu, DropdownItem,SwitchCell,Button,List,Row,Col,PullRefresh } from 'vant';
import data from '../../assets/template/data.js';
export default {
  data() {
    return {
      winHeight:0,
      showImg: true,
      showImgList:[
        { text: '显示图片', value: true },
        { text: '不显示图片', value: false }
        ],
      showMargin: false,
      showMarginList: [
                { text:"无边距", value:false },
                { text:"有边距", value:true }
      ],
      orderby: "createdondesc",
      orderbyList: [
                { text:"创建时间倒序", value:"createdondesc" },
                { text:"创建时间升序", value:"createdonasc" },
                { text:"金额降序", value:"moneydesc" },
                { text:"金额升序", value:"moneyasc" }
      ],
      pageindex: 1,
      pagesize: 10,
      loading: false,
      finished: false,
      refreshing:false,
      switch1:false,
      switch2:false,
      statusStr:"",
      statusList:[
          {name:"新建",value:"新建"},
          {name:"已审批",value:"已审批"},
          {name:"已签署",value:"已签署"}
      ],
      areaStr:"",
      areaList:[
          {name:"北京",value:"北京"},
          {name:"上海",value:"上海"},
          {name:"广州",value:"广州"}
      ],
      list:[]
    };
  },
  created() {
    this.winHeight=window.innerHeight-45-this.$store.state.pageTopOffset;
  },
  props: {
    top: {
      type: Number,
      default: 0
    }
  },
  methods: {
      getData(isRefresh){
        //异步加载数据
        setTimeout(() => {
            if(isRefresh)
                this.list=[];
            let array=data.contractData.filter((item,index)=>{
                return (this.switch2?item.type=="框架合同":true)
                &&(this.statusStr.indexOf(item.status)>-1||this.statusStr=="")
                &&(this.switch1?item.owner=="王鹏伟":true)
                &&(this.areaStr.indexOf(item.area)>-1||this.statusStr=="");
            }).filter((item,index)=>{
                return index>=(this.pageindex-1)*this.pagesize && index<(this.pageindex*this.pagesize);
            })
            this.loading=false;
            this.pageindex++;
            this.refreshing=false;
            this.list=this.list.concat(array);
            this.finished=array.length==0;
        }, 500);
      },
      Check(type,name){
        if(type==1)
        {
          if(this.statusStr.indexOf(name)>-1){
              this.statusStr=this.statusStr.replace(name+";","");
          }else{
              this.statusStr=this.statusStr+name+";";
          }
        }
        if(type==2)
        {
          if(this.areaStr.indexOf(name)>-1){
              this.areaStr=this.areaStr.replace(name+";","");
          }else{
              this.areaStr=this.areaStr+name+";";
          }
        }
      },
      onConfirm(){
          this.$refs.item.toggle();
          this.onRefresh();
      },
      onRefresh(){
          this.pageindex=1;
          this.getData(1);
      }
  },
  watch:{
    orderby(){
      this.onRefresh();
    }
  },
  computed:{
  },
  components:{
    [DropdownMenu.name]:DropdownMenu,
    [DropdownItem.name]:DropdownItem,
    [SwitchCell.name]:SwitchCell,
    [Button.name]:Button,
    [List.name]:List,
    [Row.name]:Row,
    [Col.name]:Col,
    [PullRefresh.name]:PullRefresh
  }
};
</script>

