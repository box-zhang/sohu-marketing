
<template>
	<div class="page">
		<!-- <van-nav-bar
		  :title="dataobj.name"
		  left-text="返回"
		  left-arrow
		  fixed
		  placeholder
		  @click-left="onClickLeft">
		</van-nav-bar> -->
		<!-- 合作项目 -->
		<div class="anlidiv">
			<!-- <div class="title">全年优秀案例</div> -->
			<div class="anliobj" v-for="(item,index) in dataList" v-bind:key="index" @click="clickcasesDetail(index)">
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
		<div class="block20"></div>
		<div class="footer">--- 你已经看到我的底线了 ---</div>
		
	</div>
</template>

<script>
export default {
  components: {
	
  },
  data() {
    return {
		dataobj:{},
		dataList:[],
		currentPage:1,
		complete:false,//加载完成
		ifloading:false,//是否加载中
    };
  },
  created() {
	  var _this = this
  	  var dataobj = this.$route.query.dataobj
  	  if(dataobj){
  		 this.dataobj = JSON.parse(decodeURIComponent(dataobj))
  		 console.log(this.dataobj)
		 this.$hxe.setNavigationBar({
		     title: _this.dataobj.name,
			 backgroundColor: '#FFFFFF',
		     whiteTint: false,
		     pageTopOffset: false
		 })
  		 this.getCases()
		 window.addEventListener('scroll', this.Scrollbottom);
  	  }else{
  		this.$router.push({name: '/',params:{ ori:'no'}});
  	  }
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
	  // 全年优秀案例
	  getCases : function(){
	  		var _this = this
			if(this.complete||this.ifloading){
				return false
			}
			//锁
			this.ifloading = true
	  		var params = {
	  			pageSize:15,
	  			currentPage:this.currentPage
	  		}
			if(this.dataobj.youxiu){
				params["youxiu"] = this.dataobj.youxiu
			}
			if(localStorage.getItem("empId")){
				params["empId"] = localStorage.getItem("empId")
			}
			console.log(params)
	  	this.$http.post('casesModule/cases/getCases',params)
	     .then(function (response) {
	         //数据处理
	  			  if(response.code==200){
					    var dataList = _this.dataList
	  					var records = response.data.records
	  					var tags = []
						if(records.length>0){
							for(var i=0;i<records.length;i++){
							  	records[i]["dateTime"] = _this.$util.replaceT(records[i].createDate)
									try{
										var hangyeTags = [] //JSON.parse(records[i].hangyeTags)
										var chanpinTags = [] //JSON.parse(records[i].chanpinTags)
										var jiangxiangTags = JSON.parse(records[i].jiangxiangTags)
										var mudiTags = [] //JSON.parse(records[i].mudiTags)
										records[i]["tags"] = tags.concat(hangyeTags).concat(chanpinTags).concat(mudiTags).concat(jiangxiangTags) ;
									}catch(e){
										records[i]["tags"] = []
										//TODO handle the exception
									}
							}		
							_this.currentPage+=1
							var newlist = dataList.concat(records)
							_this.dataList = newlist
						}else{
						    _this.complete = true
						}
						_this.ifloading = false
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
      onClickLeft() {
		this.$router.go(-1);//返回上一层
      },
	  //跳转详情
	  clickcasesDetail(index){
	  		var dataobj = this.dataobj
	  		dataobj["uid"] = this.dataList[index].id
	  		this.$router.push({path: "/goodanliDetail",query:{ dataobj:encodeURIComponent(JSON.stringify(dataobj))}});
	  },
	  
    },
  
};
</script>

<style scoped lang="less">
.anlidiv{
	margin-top: 16px;
}
</style>

