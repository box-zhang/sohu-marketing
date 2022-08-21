<template>
	<div class="page">
		<div class="topdiv">
			<!-- 导航栏 -->
			<van-nav-bar
			  title="案例"
		  left-text=""
		  left-arrow
		  @click-left="onClickLeft"
			  :border="false">
			  </van-nav-bar>
		</div>
		<!-- 菜单 -->
		<div class="bardiv">
			<div class="barobj" v-for="(item,index) in barlist" v-bind:key="index" @click="clickbaritem(item.url)">
				<van-image class="image" fit="cover" :src="item.icon" />
				<div class="titlename">
					<div class="name">{{item.name}}</div>
					<div class="desc">{{item.desc}}</div>
				</div>
			</div>
		</div>
		<!-- 经典案例推荐 -->
		<div class="anlidiv">
			<div class="title">经典案例推荐
			 <!--  <div class="moretext" @click="clickmoreanli()">更多</div>
			   <img class="rightgo" src="../../assets/static/anli/icon_gengduo.png" @click="clickmoreanli()"> -->
			</div>
			<div class="anliobj" v-for="(item,index) in anliList" v-bind:key="index" @click="clickcasesDetail(index)">
				<van-image class="image" fit="cover" :src="item.imagesUrl" />
				<div class="namediv">
					<div>
						<div class="name">{{item.name}}</div>
						<div class="tagsdiv">
							<van-tag  v-for="(tagsitem,tagsindex) in item.tags" :key="tagsindex" class="tags" color="#FFF7EB" text-color="#EFA11F">
								{{tagsitem}}
							</van-tag>
						</div>
					</div>
					<div class="timer">
						<van-image class="timerimage" width="14" height="14" fit="cover" :src="require('../../assets/static/home/icon_shijian.png')" />
						<div class="text">{{item.dateTime}}</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 支持 -->
		<div class="surport">
			<van-tabs v-model="surportindex" animated swipeable line-width="0px" line-height="0px" @change="changezhichTpye">
			  <van-tab v-for="(item,index) in surportlist" v-bind:key="index">
				<div :class="surportindex==index?'tab-title hover':'tab-title'" slot="title">{{item.name}}</div>
				<div class="tab-content" v-for="(item1,index1) in item.list" v-bind:key="index1">
					<div class="leftcon">
						<div class="titlename">{{item1.name}}</div>
						<div class="condesc">{{item1.describes}}</div>
					</div>
					<div class="check" @click="checkzhichi(index,index1)">查看</div>
				</div>
			  </van-tab>
			</van-tabs>
		</div>
		
		<div class="block20"></div>
		
		<div class="footer">--- 你已经看到我的底线了 ---</div>
		<!-- 底部标签导航 -->
		<!-- <tabbar></tabbar> -->
		
	</div>
</template>

<script>
import tabbar from '@/components/tabbar.vue'
export default {
  name: "home",
  components: {
	tabbar,
  },
  data() {
    return {
        barlist:[
            {
                icon:require("../../assets/static/anli/icon_souhuyingxiaoanliku.png"),
                name:"搜狐营销案例库",
				desc:"营销案例汇总",
                url:"yxanliku",
            },
            {
            	icon:require("../../assets/static/anli/icon_souhuhezuokehu.png"),
            	name:"搜狐合作客户",
				desc:"已合作客户",
                url:"partner",
            }
        ],
		anliList:[],
		surportlist:[],
		surportindex:0,
		partnerobj:{},//合作客户
    };
  },
  created() {
	  // window.document.title = "SOHU营销+"
	  this.getCases()
	  this.getZhichiType()
	  this.getpartnerById()
	  window.addEventListener('scroll', this.Scrollbottom);
  },
  destroyed() {
    window.removeEventListener('scroll', this.Scrollbottom)//页面离开后销毁监听事件
  },
   methods: {
	   Scrollbottom () {
	   		let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	   		let clientHeight = document.documentElement.clientHeight;
	   		let scrollHeight = document.documentElement.scrollHeight;
	   		if (scrollTop + clientHeight >= scrollHeight) {
	   		    console.log("滚动到底部了")
				if(this.surportlist.length>0){
					this.getZhichi()
				}
	   			
	   	    }
	   	},
		//支持栏目滑动出发
		changezhichTpye(e){
			// console.log(e)
			this.surportindex = e
			this.getZhichi()
		},
	   // 支持菜单
	   getZhichiType : function(){
	   		var _this = this
	   		var params = {
	   			outType:1,//0 直接打开文件 1跳转列表
	   			pageSize:88,
	   			currentPage:1
	   		}
	   	this.$http.post('zhichiModule/zhichi-type/getZhichiType',params)
	      .then(function (response) {
	          //数据处理
	   			  if(response.code==200){
					  var records = response.data.records
					  var list = []
					  for(var i= 0;i<records.length;i++){
						 var obj = {
							id:records[i].id,
				            name:records[i].name,
				            currentPage:1,
				            pageSize:10,
				            complete:false,
							loading:false,
				            list:[]
				        }
						list.push(obj)
					  }
	   				  _this.surportlist = list
					  // 支持内容列表
					  _this.getZhichi()
	   			  }else{
	   				  _this.$hxe.showModal({
	   				    title:"请求失败",
	   				    content:response.message,
	   				    showCancel:false
	   				  });
	   			  }
	       })
	      .catch(function (error) {
	          console.log(error);
	      });
	   },
	   // 支持内容列表
	   getZhichi : function(){
	   		var _this = this
			// console.log(this.surportindex);
			if(this.surportlist[this.surportindex].complete||this.surportlist[this.surportindex].loading){
				console.log("已经加载全部");
				return false;
			}
			//锁
			_this.surportlist[_this.surportindex].loading = true
	   		var params = {
	   			zhichiTypeId:this.surportlist[this.surportindex].id,
	   			pageSize:10,
	   			currentPage:this.surportlist[this.surportindex].currentPage
	   		}
	   	this.$http.post('zhichiModule/zhichi/getZhichi',params)
	      .then(function (response) {
	          //数据处理
	   			  if(response.code==200){
	   					var dataList = _this.surportlist[_this.surportindex].list
	   					var records = response.data.records
	   					if(records.length>0){
	   						// for(var i=0;i<records.length;i++){
	   						//     records[i]["dateTime"] = _this.$util.replaceT(records[i].createDate)
	   						// }
	   						_this.surportlist[_this.surportindex].currentPage+=1
	   						var newlist = dataList.concat(records)
	   						_this.surportlist[_this.surportindex].list = newlist
							console.log(_this.surportlist[_this.surportindex].list)
	   					}else{
	   						_this.surportlist[_this.surportindex].complete = true
	   					}
						//锁
						_this.surportlist[_this.surportindex].loading = false
	   			  }else{
	   				  _this.$hxe.showModal({
	   				    title:"请求失败",
	   				    content:response.message,
	   				    showCancel:false
	   				  });
	   			  }
	       })
	      .catch(function (error) {
	          console.log(error);
	      });
	   },
	   //查看支持
	   checkzhichi(index,index1){
		   var obj = this.surportlist[index].list[index1]
		   var dataobj = {
		   	  name:obj.name,
		   	  uid:obj.id,
			  kfName:obj.kfName,
			  kfPhone:obj.kfPhone,
			  kfEmall:obj.kfEmall
		   }
		   console.log(dataobj)
		   this.$router.push({path: "/speak",query:{ dataobj:encodeURIComponent(JSON.stringify(dataobj))}});
	   },
	   //经典优秀案例
	   getCases : function(){
	   		var _this = this
	   		var params = {
	   			//youxiu:0,//"youxiu": 优秀案例 0不是 1是
	   			pageSize:6,
	   			currentPage:1,
	   		}
			if(localStorage.getItem("empId")){
				params["empId"] = localStorage.getItem("empId")
			}
	   	this.$http.post('casesModule/cases/getCases',params)
	      .then(function (response) {
	          //数据处理
	   			  if(response.code==200){
	   					var records = response.data.records
	   						var tags = []
	   					for(var i=0;i<records.length;i++){
	   					  	records[i]["dateTime"] = _this.$util.replaceT(records[i].createDate)
	   							try{
	   								var hangyeTags = [] //JSON.parse(records[i].hangyeTags)
	   								var chanpinTags = [] //JSON.parse(records[i].chanpinTags)
	   								var jiangxiangTags = [] //JSON.parse(records[i].jiangxiangTags)
	   								var mudiTags = [] //JSON.parse(records[i].mudiTags)
	   								records[i]["tags"] = tags.concat(hangyeTags).concat(chanpinTags).concat(mudiTags).concat(jiangxiangTags) ;
	   							}catch(e){
	   								records[i]["tags"] = []
	   								//TODO handle the exception
	   							}
	   					}
	   					_this.anliList = records
	   			  }else{
	   				  _this.$hxe.showModal({
	   				    title:"请求失败",
	   				    content:response.message,
	   				    showCancel:false
	   				  });
	   			  }
	       })
	      .catch(function (error) {
	          console.log(error);
	      });
	   },
	   //合作客户
	   getpartnerById: function(){
	   		var _this = this
	   		var params = {
	   			id:1
	   		}
	   	this.$http.post('partnerModule/my-partner/getById',params)
	      .then(function (response) {
	          //数据处理
	   			  if(response.code==200){
	   					_this.partnerobj = response.data
	   			  }else{
	   				  _this.$hxe.showModal({
	   				    title:"请求失败",
	   				    content:response.message,
	   				    showCancel:false
	   				  });
	   			  }
	       })
	      .catch(function (error) {
	          console.log(error);
	      });
	   },
	   //跳转详情
	   clickcasesDetail(index){
	   		var dataobj = {
	   		 	id:1,
	   		 	outType:0,
	   		    //youxiu:0,
	   		 	firstBigImage:0,
	   		 	name:"经典案例推荐"
	   		}
	   		dataobj["uid"] = this.anliList[index].id
	   		this.$router.push({path: "/goodanliDetail",query:{ dataobj:encodeURIComponent(JSON.stringify(dataobj))}});
	   },
	   //更多经典案例
	   clickmoreanli(){
	   		var dataobj = {
	   			name:"经典案例推荐",
				//youxiu:0,
	   		}
	   		this.$router.push({path: "/goodanliPage",query:{ dataobj:encodeURIComponent(JSON.stringify(dataobj))}});
	   },
	  //点击菜单
	  clickbaritem(url){
		 if(url){
			if(url=='partner'){	
				if(this.partnerobj.outUrl){
					window.location.href = obj.outUrl;
					return false;
				}
				if(this.partnerobj.imagesUrl){
					var dataobj = {
						id:this.partnerobj.id,
					 	outType:0,
						name:this.partnerobj.name,
						fileUrl: this.partnerobj.imagesUrl,
						outUrl: this.partnerobj.outUrl,
					 }
					 dataobj["iffile"] = "yes"
					 this.$router.push({path: "/ziyuanDetail",query:{ dataobj:encodeURIComponent(JSON.stringify(dataobj))}});
				}
			}else{
			    this.$router.push({name: url,params:{ ori:'anli'}});
			}
		 }else{
			this.$hxe.showToast("请设置跳转路径"); 
		 }
	  },
	  
    },
  
};
</script>

<style scoped lang="less">
/deep/ .van-nav-bar{
	background-color:transparent !important;
}
/deep/ .van-nav-bar__title{
	color: #333333;
	font-size: 18px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
}
/deep/ .van-tab{
	flex: none;
	padding: 0px;
	margin-right: 20px;
}
.topdiv{
	width: 100%;
	height: 108px;
	background-image: url(../../assets/static/anli/anli_beijing.png);
	background-repeat: no-repeat;
	background-size: cover;
}
.anlidiv{
	margin-top: 5px !important;
	.title{
		height: auto;
		margin-bottom: 16px;
	}
}
.surport{
	width: 343px;
	margin: 18px auto 0;
	.tab-title{
		font-size: 14px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
	}
	.hover{
		font-size: 18px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #333333;
	}
	.tab-content{
		padding: 12px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #EEEEEE;
		.leftcon{
			flex: 1;
			margin-right: 15px;
			.titlename{
				font-size: 14px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
			}
			.condesc{
				margin-top: 3px;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #AAAAAA;
			}
		}
		.check{
			width: 62px;
			height: 30px;
			background: #FFF7EB;
			border-radius: 3px;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #EFA11F;
			line-height: 30px;
			text-align: center;
		}
	}
}
</style>
