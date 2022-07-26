<template>
	<div class="page">
		<!-- 导航栏 -->
		<!-- <van-nav-bar
		  :title="dataobj.name"
		  @click-left="onClickLeft"
		  fixed
		  placeholder
		  :border="false">
		  <template #left>
		      <van-icon :name="require('../../assets/static/anli/icon_fanhui.png')" size="20"/>
		    </template>
		  </van-nav-bar>
		</van-nav-bar> -->
		<div class="block20"></div>
		
		<!-- 演讲list -->
		<div class="speaklist">
			<div class="speakobj" v-for="(item,index) in dataList" v-bind:key="index" @click="clickziyuan(index)">
				<van-image width="40" height="21" fit="cover" :src="require('../../assets/static/speak/icon_pdf.png')" />
				<div class="speaktext">{{item.name}}</div>
			</div>
		</div>
		
		<div class="callphone" @click="callphone">
			<van-image width="68" height="68" fit="cover" :src="require('../../assets/static/speak/icon_kefu.png')" />
		</div>
		
	</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
		dataobj:{},
		dataList:[],
    };
  },
  created() {
	  var _this = this
	  var dataobj = this.$route.query.dataobj
	  if(dataobj){
	  	this.dataobj = JSON.parse(decodeURIComponent(dataobj))
	  	console.log(this.dataobj)
		_this.$hxe.setNavigationBar({
		    title: _this.dataobj.name,
			backgroundColor: '#FFFFFF',
		    whiteTint: false,
		    pageTopOffset: false
		})
	  	this.getZhichiFile()
	  }else{
	      this.$router.push({path: '/',query:{ ori:'no'}});
	  }
  },
   methods: {
	   // 支持方案文件
	   getZhichiFile : function(){
	   		var _this = this
	   		var params = {
	   			zhichiId:this.dataobj.uid,
	   			pageSize:888,
	   			currentPage:1
	   		}
			console.log(params)
	   	this.$http.post('zhichiModule/zhichi-file/getZhichiFile',params)
	      .then(function (response) {
	          //数据处理
	   			  if(response.code==200){
	   					var records = response.data.records
	   					_this.dataList = records
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
	   //点击资源栏目
	   clickziyuan(index){
	   		var obj = this.dataList[index]
	   		var dataobj = {
	   			id:obj.id,
	   		 	outType:0,
	   			name:obj.name,
	   			fileUrl: obj.fileUrl,
	   			outUrl: "",
				iffile:"yes"
	   		 }
	   		this.$router.push({path: "/ziyuanDetail",query:{ dataobj:encodeURIComponent(JSON.stringify(dataobj))}});
	   },
	   onClickLeft() {
	   		this.$router.go(-1);//返回上一层
	   },
	  //联系方式
	  callphone(){
		  var dataobj = this.dataobj
		  this.$router.push({path: "/callphone",query:{ dataobj:encodeURIComponent(JSON.stringify(dataobj))}});
	  },
	  
    },
  
};
</script>

<style scoped lang="less">
.speaklist{
	width: 343px;
	margin: 0 auto;
	.speakobj{
		width: 100%;
		padding: 8px 0;
		display: flex;
		align-items: center;
		.speaktext{
			margin-left: 12px;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
		}
	}
}
.callphone{
	width: 68px;
	height: 68px;
	position: fixed;
	bottom: 58px;
	right: 18px;
	z-index: 15;
}
</style>
