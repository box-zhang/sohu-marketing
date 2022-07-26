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
		  </van-nav-bar> -->
		<div class="block20"></div>
		
		<div class="flexdiv">
			<van-image width="30" height="30" fit="cover" :src="require('../../assets/static/speak/icon_xingming.png')" />
			<div class="text1">{{dataobj.kfName}}</div>
		</div>
		<div class="flexdiv">
			<van-image width="30" height="30" fit="cover" :src="require('../../assets/static/speak/icon_dianhua.png')" />
			<div class="text1">{{dataobj.kfPhone}}</div>
			<div class="btn" @click="callphone(dataobj.kfPhone)">立即拨号</div>
		</div>
		<div class="flexdiv">
			<van-image width="30" height="30" fit="cover" :src="require('../../assets/static/speak/icon_youxiang.png')" />
			<div class="text1">{{dataobj.kfEmall}}</div>
		</div>
		
	</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
		dataobj:{
			// kfName:"王达人",
			// phone:"15112931664",
			// email:"hexu58@qq.com"
		},
    };
  },
  created() {
	  var _this = this
	  var dataobj = this.$route.query.dataobj
	  if(dataobj){
	  	this.dataobj = JSON.parse(decodeURIComponent(dataobj))
		this.$hxe.setNavigationBar({
		    title: _this.dataobj.name,
			backgroundColor: '#FFFFFF',
		    whiteTint: false,
		    pageTopOffset: false
		})
	  	console.log(this.dataobj)
	  }else{
	      this.$router.push({path: '/',query:{ ori:'no'}});
	  }
  },
   methods: {
	   onClickLeft() {
	   		this.$router.go(-1);//返回上一层
	   },
	  //联系方式
	  callphone(phone){
		this.$hxe.callPhone(phone);
	  },
	  
    },
  
};
</script>

<style scoped lang="less">
.page{
	width: 100%;
	height: 100vh;
	background-color: #FFFFFF;
	.flexdiv{
		width: 333px;
		padding: 0 10px;
		margin: 18px auto 0;
		height: 46px;
		background: #F9F9F9;
		border-radius: 3px;
		display: flex;
		align-items: center;
		.text1{
			flex: 1;
			margin-left: 8px;
			font-size: 16px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		.btn{
			margin-left: auto;
			width: 64px;
			height: 30px;
			border-radius: 3px;
			border: 1px solid #EFA11F;
			line-height: 30px;
			text-align: center;
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #EFA11F;
		}
	}
}
</style>
