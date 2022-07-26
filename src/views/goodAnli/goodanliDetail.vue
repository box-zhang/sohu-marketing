<template>
	<div class="page">
		<!-- <van-nav-bar
		  :title="title"
		  left-text="返回"
		  left-arrow
		  fixed
		  placeholder
		  @click-left="onClickLeft">
		<template #right>
		    <van-icon :name="require('../../assets/static/project/icon_soucang_yidianzan.png')" size="20"/>
			<div style="width:10px;height:100%;"></div>
			<van-icon :name="require('../../assets/static/project/icon_upload.png')" size="20" @click="downFile()"/>
		</template>
		</van-nav-bar> -->
		<div v-if="responseobj&&responseobj!=null">
			<div class="iframe" v-if="responseobj.outUrl">
				<iframe width="100%" height="100%" :src="responseobj.outUrl"></iframe>
			</div>
			<div class="pdf" v-else-if="pdfSrc">
				<div class="iframe">
					<iframe width="100%" height="100%" :src="pdfSrc"></iframe>
				</div>
				<!-- <div class="arrow">
				    <span @click="changePdfPage(0)" class="turn" :class="{grey: currentPage==1}">上一页</span>
				    {{currentPage}} / {{pageCount}}
				    <span @click="changePdfPage(1)" class="turn" :class="{grey: currentPage==pageCount}">下一页</span>
				</div>
				<div class="pdf-box">
					<pdf
					  :src="pdfSrc"
					  :page="currentPage"
					  @num-pages="pageCount=$event"
					  @page-loaded="currentPage=$event"
					  @loaded="loadPdfHandler" >
					</pdf>
				</div> -->
			</div>
			<div class="newsdiv" v-else-if="responseobj.bodyImgUrl">
			    <div class="newsobj1">
			    	<div class="newname">{{title}}</div>
					<div class="block20"></div>
			    	<div class="timer">
			    		<van-image class="timerimage" width="14" height="14" fit="cover" :src="require('../../assets/static/home/icon_shijian.png')" />
			    		<div class="text">{{responseobj.dateTime}}</div>
			    	</div>
					<van-image class="image" width="343" fit="fill" :src="responseobj.bodyImgUrl" />
			    </div>
			</div>
			<div v-else></div>
			
		</div>
		
		
	</div>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: {
	pdf,
  },
  data() {
    return {
		dataobj:{},
		title:"文章详情",
		responseobj:null,//返回的数据
		currentPage: 0, // pdf文件页码
		pageCount: 0, // pdf文件总页数
		fileType: 'pdf', // 文件类型
		pdfSrc: '',// pdf文件地址https://tongsheng.cvtop100.com/img/testpdf.pdf
    };
  },
  created() {
	var _this = this
	console.log("触发一次")
	//触发钩子返回上一页，如果不触发，直接判断isback
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		//ios
		console.log("ios")
		window.addEventListener('pageshow', this.setisback)
	}
	if(_this.$store.state.isback||localStorage.getItem("isback")=="isback"){
	   localStorage.setItem("isback","")
	   var stobj = {
	   	isback:false
	   }
	   this.$store.commit({ type: 'setbackboolen', show: stobj });
	   this.$router.go(-1);//返回上一层
	   return false;
	}
	var dataobj = this.$route.query.dataobj
	if(dataobj){
		this.dataobj = JSON.parse(decodeURIComponent(dataobj))
		console.log(this.dataobj)
		this.getcasesbyid()
	}else{
	    this.$router.push({path: '/',query:{ ori:'no'}});
	}
  },
    beforeDestroy(){
	  try{
	  	console.log("去水印")
	  	this.$watermark.set("","")
	  }catch(e){
	  	console.log(e)
	  	//TODO handle the exception
	  }
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        window.removeEventListener('pageshow', this.setisback)
      }
    },
   methods: {
        //返回
        setisback(){
			var _this = this
           if(this.$store.state.isback||localStorage.getItem("isback")=="isback"){
              localStorage.setItem("isback","")
              var stobj = {
              	isback:false
              }
              this.$store.commit({ type: 'setbackboolen', show: stobj });
              this.$router.go(-1);//返回上一层
              return false;	
           }
        },	
	    // 获取案例详情
	    getcasesbyid : function(){
	    		var _this = this
	    		var params = {
	    			id:this.dataobj.uid
	    		}
	    	this.$http.post('casesModule/cases/getById',params)
	       .then(function (response) {
	           //数据处理
	    			  if(response.code==200){
	    					var responseobj =  response.data
	    					responseobj["dateTime"] = _this.$util.replaceT(responseobj.createDate)
	    					_this.title = responseobj.name
							_this.$hxe.setNavigationBar({
							    title: _this.title,
								backgroundColor: '#FFFFFF',
							    whiteTint: false,
							    pageTopOffset: false
							})
							//过滤所有空格
							if(responseobj.outUrl){
								responseobj.outUrl = responseobj.outUrl.replace(/ /g,'')
							}
							
	    					if(!responseobj.outUrl&&responseobj.fileUrl){
								_this.$hxe.setNavigationBar({
								    title: _this.title,
									backgroundColor: '#FFFFFF',
								    whiteTint: false,
								    pageTopOffset: false,
									rightButton: {
									    type:'image',
									    name:'upload',
									    handler:function(){
									        console.log("点了右边的按钮");
											_this.downFile()
									    }
									},
								})
	    						 // _this.UrlToBase64(responseobj)
								 var userinfo = localStorage.getItem("userinfo")
								 if(userinfo){
								 	userinfo = JSON.parse(userinfo)
								 	console.log("水印")
									_this.$watermark.set(userinfo.emplId,userinfo.emplName)
								 }
								 _this.pdfSrc = 'https://fileview.sohu-inc.com/op/embed.aspx?src='+encodeURIComponent(responseobj.fileUrl)
								 // _this.pdfSrc = 'https://fileviewtest.sohu-inc.com/op/embed.aspx?src='+responseobj.fileUrl
								 _this.responseobj = responseobj
	    					}else{
								//打开新页面
								if(responseobj.outUrl){
									localStorage.setItem("isback","isback")
									var stobj = {
										isback:true
									}
									_this.$store.commit({ type: 'setbackboolen', show: stobj });
									window.location.href = responseobj.outUrl
								}
								_this.responseobj = responseobj
	    					}
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
	    //将pdf转成base64
	    UrlToBase64 : function(responseobj){
	        var _this = this
	        var params = {
	        	localUrl:responseobj.fileUrl
	        }
	    	this.$http.post('UploadFileManager/UrlToBase64',params)
	       .then(function (response) {
	           //数据处理
	    			  if(response.code==200){
	    					_this.pdfSrc = pdf.createLoadingTask("data:application/pdf;base64," +response.data)
	    				   _this.responseobj = responseobj
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
		//下周文件
		downFile(){
			var _this = this
			var responseobj = this.responseobj
			if(!this.responseobj.fileUrl){
				this.$hxe.showModal({
				  title:"提示",
				  content:"此文件无法下载",
				  showCancel:false
				});
				return false;
			}
			var userinfo = localStorage.getItem("userinfo")
			if(userinfo){
				userinfo = JSON.parse(userinfo)
				var params = {
					email:userinfo.email,
					format:"PDF",
					localUrl:responseobj.fileUrl,
					text:userinfo.emplName+"("+userinfo.emplId+")",
					title:responseobj.name
				}
				this.$http.post('mark/sohuPdfAddWater',params)
				.then(function (response) {
				    //数据处理
					if(response.code==200){
						_this.$hxe.showModal({
						  title:"提示",
						  content:"下载成功，或文件已发送到您的邮箱",
						  showCancel:false
						});		    					
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
			}else{
				this.$hxe.showModal({
				  title:"提示",
				  content:"无用户信息，此文件无法下载",
				  showCancel:false
				});
			}
		},
	    // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
	    changePdfPage (val) {
	      // console.log(val)
	      if (val === 0 && this.currentPage > 1) {
	        this.currentPage--
	        // console.log(this.currentPage)
	      }
	      if (val === 1 && this.currentPage < this.pageCount) {
	        this.currentPage++
	        // console.log(this.currentPage)
	      }
	    },
		// pdf加载时
		loadPdfHandler (e) {
		  this.currentPage = 1 // 加载的时候先加载第一页
		},
			 
        onClickLeft() {
           this.$router.go(-1);//返回上一层
        },
	  
    },
  
};
</script>

<style scoped lang="less">
iframe{
    width: 100vw;
    height: 100vh;
    border: none;
}
</style>
