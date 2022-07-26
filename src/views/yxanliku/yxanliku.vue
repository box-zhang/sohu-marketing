<template>
	<div class="page">
		<div class="topdiv">
			<!-- 导航栏 -->
			<!-- <van-nav-bar
			  title="搜狐营销案例库"
			  @click-left="onClickLeft"
			  :border="false">
			  <template #left>
			      <van-icon :name="require('../../assets/static/anli/icon_fanhui.png')" size="20"/>
			    </template>
			  </van-nav-bar> -->
		</div>
		<!-- 菜单 -->
		<div :class="isshowbar?'anlikubar showmorebar':'anlikubar'">
			<div class="anlibgbai" v-if="!isshowbar"></div>
			<div class="barline"></div>
			<div class="barlist" v-if="!isshowbar">
				<div :class="index==barindex&&isshowbar?'barobj barhover':'barobj'" v-for="(item,index) in barlist" v-bind:key="index" @click="clickbaritem(index)">
					<div class="anlikutext">
						<div class="xianname">{{item.typeindex==0?item.name:item.typelist[item.typeindex].name}}</div>
						<!-- <div v-if="index!=barindex">{{item.name}}</div> -->
					</div>
					<van-image class="anliimg" fit="cover" :src="index==barindex&&isshowbar?item.hovericon:item.icon" />
				</div>
			</div>
			<div class="barlist showbarlist" v-if="isshowbar">
				<div :class="index==barindex&&isshowbar?'barobj barhover':'barobj'" v-for="(item,index) in barlist" v-bind:key="index" @click="clickbaritem(index)">
					<div class="anlikutext">
						<div class="xianname">{{item.typeindex==0?item.name:item.typelist[item.typeindex].name}}</div>
						<!-- <div v-if="index!=barindex">{{item.name}}</div> -->
					</div>
					<van-image class="anliimg" fit="cover" :src="index==barindex&&isshowbar?item.hovericon:item.icon" />
				</div>
			</div>
			<div class="typediv" v-if="isshowbar">
				<div class="typetitle">全部栏目</div>
				<div class="typelist">
					<div :class="index==barlist[barindex].typeindex?'typehover typeobj':'typeobj'" v-for="(item,index) in typelist" v-bind:key="index"
					@click="clicktype(index)">
						{{item.name}}
					</div>
				</div>
			</div>
		</div>
		
		<!-- 搜狐营销案例库 -->
		<div class="anlidiv">
			<div class="anliobj" v-for="(item,index) in anliList" v-bind:key="index" @click="clickcasesDetail(index)">
				<van-image class="image" width="129" height="97" fit="cover" :src="item.imagesUrl" />
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
		
		<!-- 遮罩 -->
		<div class="zhezhao" v-if="ishowzhezhao" @click="closeishowzhezhao"></div>
		<div class="block20"></div>
		
		<div class="footer">--- 你已经看到我的底线了 ---</div>
		
	</div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
        barlist:[
            {
				type:0,
                icon:require("../../assets/static/anli/icon_zhankai_down.png"),
				hovericon:require("../../assets/static/anli/icon_zhankai.png"),
                name:"投放行业",
                url:"",
				typelist:[],
				typeindex:0,//当前选择的菜单栏目下标
            },
            {
				type:1,
            	icon:require("../../assets/static/anli/icon_zhankai_down.png"),
            	hovericon:require("../../assets/static/anli/icon_zhankai.png"),
            	name:"投放产品",
            	url:"",
				typelist:[],
				typeindex:0,//当前选择的菜单栏目下标
            },
			{
				type:2,
				icon:require("../../assets/static/anli/icon_zhankai_down.png"),
				hovericon:require("../../assets/static/anli/icon_zhankai.png"),
				name:"投放目的",
				url:"",
				typelist:[],
				typeindex:0,//当前选择的菜单栏目下标
			},
			{
				type:3,
				icon:require("../../assets/static/anli/icon_zhankai_down.png"),
				hovericon:require("../../assets/static/anli/icon_zhankai.png"),
				name:"所获奖项",
				url:"",
				typelist:[],
				typeindex:0,//当前选择的菜单栏目下标
			}
        ],
		barindex:0,//当前选择的菜单下标
		typelist:[],
		isshowbar:false,//展开
		anliList:[],
		currentPage:1,
		pageSize:10,
		complete:false,
		ishowzhezhao:false,//遮罩
		hangyeTags:"",
		chanpinTags:"",
		mudiTags:"",
		jiangxiangTags:"",
		lockloading:false,//锁
    };
  },
  created() {
	  this.$hxe.setNavigationBar({
	    title: "搜狐营销案例库",
	  	backgroundColor: '#FFCB1D',
	    whiteTint: true,
	    pageTopOffset: false
	  })
	  for(var i=0;i<this.barlist.length;i++){
		 this.getCasesType(i)
	  }
	   window.addEventListener('scroll', this.Scrollbottom);
	   this.getCases()
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
	   			this.getCases()
	   	    }
	   	},
	   //案例库标签
	   getCasesType : function(index){
	   		var _this = this
	   		var params = {
	   			type:this.barlist[index].type,
	   			pageSize:88,
	   			currentPage:1
	   		}
	   	this.$http.post('casesTypeModule/casesType-type/getCasesType',params)
	      .then(function (response) {
	          //数据处理
	   			  if(response.code==200){
	   					var records = response.data.records
						var obj = {
							id:0,
							name:'全部',
							type:_this.barlist[index].type
						}
						records.unshift(obj)
						if(index==0){
							_this.typelist = records
						}
	   					_this.barlist[index].typelist = records
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
	   //案例
	   getCases : function(){
	   		var _this = this
			if(this.complete||this.lockloading){
				console.log("锁")
				return false
			}
			this.lockloading = true
	   		var params = {
	   			hangyeTags:this.hangyeTags,
				chanpinTags:this.chanpinTags,
				mudiTags:this.mudiTags,
				jiangxiangTags:this.jiangxiangTags,
	   			pageSize:10,
	   			currentPage:_this.currentPage
	   		}
			if(localStorage.getItem("empId")){
				params["empId"] = localStorage.getItem("empId")
			}
			console.log(params)
	   	this.$http.post('casesModule/cases/getCases',params)
	      .then(function (response) {
	          //数据处理
	   			  if(response.code==200){
	   					var records = response.data.records
						var anliList = _this.anliList
	   					var tags = []
						if(records.length>0){
							for(var i=0;i<records.length;i++){
							  	records[i]["dateTime"] = _this.$util.replaceT(records[i].createDate)
									try{
										var hangyeTags = [] //JSON.parse(records[i].hangyeTags)
										var chanpinTags = []//JSON.parse(records[i].chanpinTags)
										var jiangxiangTags = []//JSON.parse(records[i].jiangxiangTags)
										var mudiTags = []//JSON.parse(records[i].mudiTags)
										records[i]["tags"] = tags.concat(hangyeTags).concat(chanpinTags).concat(mudiTags).concat(jiangxiangTags) ;
									}catch(e){
										records[i]["tags"] = []
										//TODO handle the exception
									}
							}
							_this.currentPage+=1
							var newlist = anliList.concat(records)
							_this.anliList = newlist
						}else{
						    _this.complete = true
						}
	   					//解锁
						_this.lockloading = false
						_this.isshowbar = false
						_this.ishowzhezhao = false
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
	   		 	name:"搜狐营销案例库"
	   		}
	   		dataobj["uid"] = this.anliList[index].id
	   		this.$router.push({path: "/goodanliDetail",query:{ dataobj:encodeURIComponent(JSON.stringify(dataobj))}});
	   },
	   onClickLeft() {
	   		this.$router.go(-1);//返回上一层
	   },
	  //点击菜单
	  clickbaritem(index){
		  //设置不是刚刚进来了
		if(index==this.barindex){
			if(this.isshowbar){
				this.isshowbar = false
				this.ishowzhezhao = false
			}else{
				this.typelist = this.barlist[index].typelist
				this.isshowbar = true
				this.ishowzhezhao = true
			}
			
		}else{
			this.barindex = index
			this.typelist = this.barlist[index].typelist
			this.isshowbar = true
			this.ishowzhezhao = true
		}
	  },
	  //点击菜单里面的栏目
	  clicktype(index){
		if(index==0){
			if(this.barindex==0){
				this.hangyeTags = ""
			}
			if(this.barindex==1){
				this.chanpinTags = ""
			}
			if(this.barindex==2){
				this.mudiTags = ""
			}
			if(this.barindex==3){
				this.jiangxiangTags = ""
			}
			this.barlist[this.barindex].typeindex  = index
			this.complete = false
			this.currentPage = 1
			this.anliList = []
			this.getCases()
			return false;
		}
		this.barlist[this.barindex].typeindex  = index
		if(this.barindex==0){
			this.hangyeTags = this.barlist[this.barindex].typelist[index].name
		}
		if(this.barindex==1){
			this.chanpinTags = this.barlist[this.barindex].typelist[index].name
		}
		if(this.barindex==2){
			this.mudiTags = this.barlist[this.barindex].typelist[index].name
		}
		if(this.barindex==3){
			this.jiangxiangTags = this.barlist[this.barindex].typelist[index].name
		}
		this.complete = false
		this.currentPage = 1
		this.anliList = []
		this.getCases()
		
	  },
	  //关闭弹窗
	  closeishowzhezhao(){
		 this.isshowbar = false
		 this.ishowzhezhao = false 
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
	background-image: url(../../assets/static/anli/beijing_anliku.png);
	background-repeat: no-repeat;
	background-size: cover;
	position: relative;
	z-index: 18;
}
.anlikubar{
	position: relative;
	z-index: 18;
	width: 100%;
	height: 74px;
	margin: -38px auto 0;
	border-radius: 5px;
	// background-color: #FFFFFF;
	.anlibgbai{
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		left: 50%;
		margin-left: -187.6px;
		width: 375px;
		height: 74px;
		background-image: url(../../assets/static/anli/anlibgbai.png);
		background-repeat: no-repeat;
		background-size: cover;
	}
	.barline{
		width: 100%;
		height: 14.5px;
	}
	.barlist{
		width: 345px;
		margin: 0 auto;
		text-align: center;
		height: 45px;
		overflow-x: scroll;
		white-space: nowrap;
		overflow-y:hidden;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 2;
	}
	.showbarlist{
		border-radius: 3px 3px 0 0;
		background-color: #FFFFFF;
	}
	.barobj{
		width: 65px;
		margin-left: 18px;
		height: 100%;
		display: flex;
		align-items: center;
		.anlikutext{
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		.anliimg{
			width: 12px;
			height: 12px;
			margin-left: 5px;
		}
	}
	.barhover{
		.anlikutext{
			color: #EFA11F;
		}
	}
	.typediv{
		transition: height 2s; 
		width: 345px;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 0 0 3px 3px;
		padding-bottom: 8px;
		.typetitle{
			padding-top: 5px;
			margin-left: 16px;
			font-size: 16px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #333333;
		}
		.typelist{
			width: 329px;
	        margin-left: 8px;
			margin-top: 16px;
			display: flex;
			flex-wrap: wrap;
			.typeobj{
				margin-left: 8px;
				margin-bottom: 12px;
				width: 72px;
				height: 30px;
				background: #F9F9F9;
				border-radius: 3px;
				text-align: center;
				overflow: hidden;
				font-size: 12px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #777777;
				line-height: 30px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.typehover{
				background: #FFD33F;
				color: #333333;
				font-weight: bold;
			}
		}
	}
	.xianname{
		width: 52px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
.showmorebar{
	height: auto;
	padding-bottom: 18px;
}
.anlidiv{
	margin-top: 0px !important;
}
</style>
