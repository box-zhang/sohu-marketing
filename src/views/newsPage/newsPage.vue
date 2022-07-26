<template>
	<div class="page">
		<!-- <van-nav-bar
		  :title="dataobj.name"
		  left-text="返回"
		  left-arrow
		  fixed
		  placeholder
		  @click-left="onClickLeft"
		/> -->
		<!-- 热点新闻 -->
		<div class="newsdiv">
			<!-- <div class="title">热点新闻</div> -->
			<div v-for="(item,index) in dataList" v-bind:key="index" @click="clickDetail(index)">
			    <div class="newsobj1" v-if="index==0&&item.status==3&&item.bigImagesUrl">
			    	<div class="newname">{{item.name}}</div>
			    	<van-image class="leftimage" fit="cover" :src="item.bigImagesUrl" />
			    	<div class="timer">
			    		<van-image class="timerimage" fit="cover" :src="require('../../assets/static/home/icon_shijian.png')" />
			    		<div class="text">{{item.dateTime}}</div>
			    	</div>
			    </div>
			    <div class="newsobj" v-else>
			    	<div class="namediv">
			    		<div class="name">{{item.name}}</div>
			    		<div class="timer">
			    			<van-image class="timerimage" fit="cover" :src="require('../../assets/static/home/icon_shijian.png')" />
			    			<div class="text">{{item.dateTime}}</div>
			    		</div>
			    	</div>
			    	<van-image class="imageright" fit="cover" :src="item.imagesUrl" />
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
		 window.addEventListener('scroll', this.Scrollbottom);
		 this.getIndexArticle()
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
				this.getIndexArticle()
	   	    }
	   	},
	   // 获取菜文章
	   getIndexArticle : function(){
	   		var _this = this
			if(this.complete||this.ifloading){
				return false
			}
			//锁
			this.ifloading = true
	   		var params = {
	   			indexTypeId:this.dataobj.id,
	   			pageSize:15,
	   			currentPage:this.currentPage
	   		}
	   	this.$http.post('indexModule/index-article/getIndexArticle',params)
	      .then(function (response) {
	          //数据处理
	   			  if(response.code==200){
					  var dataList = _this.dataList
					  var records = response.data.records
					  if(records.length>0){
					  	    for(var i=0;i<records.length;i++){
					  	    	records[i]["dateTime"] = _this.$util.replaceT(records[i].createDate)
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
	  clickDetail(index){
		 var dataobj = this.dataobj
		 dataobj["articleId"] = this.dataList[index].id
		 this.$router.push({path: "/newsDetail",query:{ dataobj:encodeURIComponent(JSON.stringify(dataobj))}});
	  },
	  
    },
  
};
</script>

<style scoped lang="less">

</style>

