<template>
  <div class="page">
    <!-- 导航栏 -->
    <!-- <van-nav-bar
		  title="SOHU营销+"
		  :border="false"
		  fixed
		  placeholder
		  @click-right="onClickRight">
		<template #right>
		    <van-icon :name="require('../../assets/static/home/icon_wode.png')" size="20"/>
		 </template>
		</van-nav-bar> -->
    <div class="block20"></div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in bannerList" :key="index">
        <van-image
          fit="cover"
          :src="item.imageUrl"
          class="swipeimg"
          @click="clickbanner(index)"
        ></van-image>
      </van-swipe-item>
    </van-swipe>
    <div class="block20"></div>
    <!-- 菜单栏目 -->
    <van-swipe
      style="padding-bottom: 18px;"
      indicator-color="#333333"
      @change="swipeTab"
      :loop="false"
    >
      <van-swipe-item
        v-for="(fitem, findex) in barlist"
        :key="findex"
        class="tabswipe"
      >
        <van-grid :border="false" icon-size="43px" class="munediv">
          <van-grid-item
            v-for="(item, index) in fitem"
            v-bind:key="index"
            :icon="item.imagesUrl"
            :text="item.name"
            @click="clickbaritem(index)"
          />
        </van-grid>
      </van-swipe-item>
    </van-swipe>
    <div class="block20" v-if="barlist.length > 1"></div>
    <!-- 资源 -->
    <div class="ziyuandiv" v-if="ziyuanbar.length > 0">
      <div class="title">资源</div>
      <div class="zytop">
        <div
          class="left"
          :style="'background-image: url(' + ziyuanbar[0].imagesUrl + ');'"
          @click="clickziyuan(0)"
        >
          <div class="title1">{{ ziyuanbar[0].name }}</div>
          <div class="title2">{{ ziyuanbar[0].describes }}</div>
        </div>
        <div class="right" v-if="ziyuanbar.length > 1">
          <div
            class="right1"
            v-if="ziyuanbar.length > 1"
            :style="'background-image: url(' + ziyuanbar[1].imagesUrl + ');'"
            @click="clickziyuan(1)"
          >
            <div class="title1">{{ ziyuanbar[1].name }}</div>
            <div class="title2">{{ ziyuanbar[1].describes }}</div>
          </div>
          <div
            class="right2"
            v-if="ziyuanbar.length > 2"
            :style="'background-image: url(' + ziyuanbar[2].imagesUrl + ');'"
            @click="clickziyuan(2)"
          >
            <div class="title1">{{ ziyuanbar[2].name }}</div>
            <div class="title2">{{ ziyuanbar[2].describes }}</div>
          </div>
        </div>
      </div>
      <div class="zybottom">
        <div
          class="bottom1"
          v-for="(item, index) in ziyuanbar"
          :key="index"
          v-if="index > 2"
          :style="'background-image: url(' + item.imagesUrl + ');'"
          @click="clickziyuan(index)"
        >
          <div class="title1">{{ item.name }}</div>
          <div class="title2">{{ item.describes }}</div>
        </div>
      </div>
    </div>

    <div class="block24"></div>

    <!-- 热点新闻 -->
    <div class="newsdiv">
      <div class="title">热点新闻</div>
      <div
        v-for="(item, index) in newsList"
        v-bind:key="index"
        @click="clickDetail(index)"
      >
        <div
          class="newsobj1"
          v-if="index == 0 && item.status == 3 && item.bigImagesUrl"
        >
          <div class="newname">{{ item.name }}</div>
          <van-image class="leftimage" fit="cover" :src="item.bigImagesUrl" />
          <div class="timer">
            <van-image
              class="timerimage"
              fit="cover"
              :src="require('../../assets/static/home/icon_shijian.png')"
            />
            <div class="text">{{ item.dateTime }}</div>
          </div>
        </div>
        <div class="newsobj" v-else>
          <div class="namediv">
            <div class="name">{{ item.name }}</div>
            <div class="timer">
              <van-image
                class="timerimage"
                fit="cover"
                :src="require('../../assets/static/home/icon_shijian.png')"
              />
              <div class="text">{{ item.dateTime }}</div>
            </div>
          </div>
          <van-image class="imageright" fit="cover" :src="item.imagesUrl" />
        </div>
      </div>
    </div>

    <!-- 优秀案例推荐 -->
    <div class="anlidiv">
      <div class="title">优秀案例推荐</div>
      <div
        class="anliobj"
        v-for="(item, index) in anliList"
        v-bind:key="index"
        @click="clickcasesDetail(index)"
      >
        <van-image class="image" fit="cover" :src="item.imagesUrl" />
        <div class="namediv">
          <div>
            <div class="name">{{ item.name }}</div>
            <div class="tagsdiv">
              <van-tag
                v-for="(tagsitem, tagsindex) in item.tags"
                :key="tagsindex"
                class="tags"
                color="#FFF7EB"
                text-color="#EFA11F"
              >
                {{ tagsitem }}
              </van-tag>
            </div>
          </div>
          <div class="timer">
            <van-image
              class="timerimage"
              fit="cover"
              :src="require('../../assets/static/home/icon_shijian.png')"
            />
            <div class="text">{{ item.dateTime }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">--- 你已经看到我的底线了 ---</div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      bannerList: [],
      barlistindex: 0, //菜单四个为一组
      barlist: [],
      newsList: [],
      anliList: [],
      ziyuanbar: [],
    }
  },
  created() {
    // window.document.title = "SOHU营销+"
    this.$hxe.setNavigationBar({
      title: 'SOHU营销+',
      backgroundColor: '#FFFFFF',
      whiteTint: false,
      pageTopOffset: false,
    })
    //登录
    this.getCode()
    //请求轮播图
    this.GetWheelByType()
    this.getIndexType()
    this.getIndexnews()
    this.getCases()
    this.getIndexZiyuanType()
  },
  methods: {
    //菜单栏
    swipeTab(index) {
      console.log(index)
      this.barlistindex = index
    },
    //登录
    getCode() {
      var _this = this
      this.$hxe
        .getCode()
        .then((data) => {
          console.log('获取code授权码，信息返回：')
          console.log(data)
          var params = {
            code: data,
          }
          this.$http
            .post('userMassage/getSouhuOpenId', params)
            .then(function(response) {
              //数据处理{"status":"1","dataObject":{"emplId":"115435","email":"jihe@sohu-inc.com","emplName":"何霁","openid":"315cde4f21216500"},"info":"成功"}
              if (response.code == 200) {
                //处理用户信息
                if (response.data.dataObject) {
                  localStorage.setItem('empId', response.data.dataObject.emplId)
                  localStorage.setItem(
                    'userinfo',
                    JSON.stringify(response.data.dataObject)
                  )
                } else {
                  localStorage.setItem('empId', '')
                  localStorage.setItem('userinfo', '')
                  _this.$hxe.showModal({
                    title: '提示',
                    content: '用户信息获取失败',
                    showCancel: false,
                  })
                }
              } else {
                localStorage.setItem('empId', '')
                localStorage.setItem('userinfo', '')
                // var obj = {
                // 		emplName:"王小白",
                // 		emplId:"115889"
                // }
                // localStorage.setItem("userinfo",JSON.stringify(obj))
                _this.$hxe.showModal({
                  title: '请求失败',
                  content: response.message,
                  showCancel: false,
                })
              }
            })
            .catch(function(error) {
              console.log(error)
            })
        })
        .catch((data) => {
          console.log('非搜狐小e环境，没有code信息返回：')
          console.log(data)
        })
    },
    // 获取轮播图
    GetWheelByType: function() {
      var _this = this
      var params = {
        type: 1,
        pageSize: 10,
        currentPage: 1,
      }
      this.$http
        .post('xcx-wheel/GetWheelByType', params)
        .then(function(response) {
          console.log(response)
          //数据处理
          if (response.code == 200) {
            _this.bannerList = response.data.records
          } else {
            _this.$hxe.showModal({
              title: '请求失败',
              content: response.message,
              showCancel: false,
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 获取菜单分了哦
    getIndexType: function() {
      var _this = this
      var params = {
        //outType:1,//0,类型 0文章 1优秀案例
        pageSize: 88,
        currentPage: 1,
      }
      this.$http
        .post('indexModule/index-type/getIndexType', params)
        .then(function(response) {
          //数据处理
          if (response.code == 200) {
            var records = response.data.records
            let arrLength = records.length // 数组长度
            let num = 4 // 每页显示 4 条
            let index = 0
            for (let i = 0; i < arrLength; i++) {
              if (i % num === 0 && i !== 0) {
                // 可以被 4 整除
                _this.barlist.push(records.slice(index, i))
                index = i
              }
              if (i + 1 === arrLength) {
                _this.barlist.push(records.slice(index, i + 1))
              }
            }
          } else {
            _this.$hxe.showModal({
              title: '请求失败',
              content: response.message,
              showCancel: false,
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 资源菜单
    getIndexZiyuanType: function() {
      var _this = this
      var params = {
        //outType:1,//0 直接打开文件 1跳转列表
        pageSize: 88,
        currentPage: 1,
      }
      this.$http
        .post('zhiyuanModule/index-ziyuan-type/getIndexZiyuanType', params)
        .then(function(response) {
          //数据处理
          if (response.code == 200) {
            _this.ziyuanbar = response.data.records
          } else {
            _this.$hxe.showModal({
              title: '请求失败',
              content: response.message,
              showCancel: false,
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 热点新闻
    getIndexnews: function() {
      var _this = this
      var params = {
        indexTypeId: 1,
        pageSize: 3,
        currentPage: 1,
      }
      this.$http
        .post('indexModule/index-article/getIndexArticle', params)
        .then(function(response) {
          //数据处理
          if (response.code == 200) {
            var records = response.data.records
            for (var i = 0; i < records.length; i++) {
              records[i]['dateTime'] = _this.$util.replaceT(
                records[i].createDate
              )
            }
            _this.newsList = records
          } else {
            _this.$hxe.showModal({
              title: '请求失败',
              content: response.message,
              showCancel: false,
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //跳转详情
    clickDetail(index) {
      var dataobj = {
        id: 1,
        name: '热点新闻',
      }
      dataobj['articleId'] = this.newsList[index].id
      this.$router.push({
        path: '/newsDetail',
        query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
      })
    },
    // 全年优秀案例
    getCases: function() {
      var _this = this
      var params = {
        youxiu: 1, //"youxiu": 优秀案例 0不是 1是
        pageSize: 88888,
        currentPage: 1,
        indexStatus: 1,
      }
      if (localStorage.getItem('empId')) {
        params['empId'] = localStorage.getItem('empId')
      }
      this.$http
        .post('casesModule/cases/getCases', params)
        .then(function(response) {
          //数据处理
          if (response.code == 200) {
            var records = response.data.records
            var tags = []
            for (var i = 0; i < records.length; i++) {
              records[i]['dateTime'] = _this.$util.replaceT(
                records[i].createDate
              )
              try {
                var hangyeTags = [] //JSON.parse(records[i].hangyeTags)
                var chanpinTags = [] //JSON.parse(records[i].chanpinTags)
                var jiangxiangTags = JSON.parse(records[i].jiangxiangTags)
                var mudiTags = [] //JSON.parse(records[i].mudiTags)
                records[i]['tags'] = tags
                  .concat(hangyeTags)
                  .concat(chanpinTags)
                  .concat(mudiTags)
                  .concat(jiangxiangTags)
              } catch (e) {
                records[i]['tags'] = []
                //TODO handle the exception
              }
            }
            _this.anliList = records
          } else {
            _this.$hxe.showModal({
              title: '请求失败',
              content: response.message,
              showCancel: false,
            })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //跳转详情
    clickcasesDetail(index) {
      var dataobj = {
        id: 1,
        outType: 0,
        youxiu: 1,
        name: '优秀案例详情',
      }
      dataobj['uid'] = this.anliList[index].id
      this.$router.push({
        path: '/goodanliDetail',
        query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
      })
    },
    //返回按键
    onClickLeft() {
      this.$hxe.showToast('返回')
    },
    onClickRight() {
      this.$hxe.showToast('个人中心')
    },
    //点击资源栏目
    clickziyuan(index) {
      var obj = this.ziyuanbar[index]
      var dataobj = {
        id: obj.id,
        name: obj.name,
        fileUrl: obj.fileUrl,
        outUrl: obj.outUrl,
      }
      //过滤所有空格
      if (obj.outUrl) {
        obj.outUrl = obj.outUrl.replace(/ /g, '')
        if (obj.outUrl == 'wait') {
          this.$hxe.showToast('敬请期待')
          return false
        }
      }
      //"outType": 0 直接打开文件 1跳转列表
      if (obj.outType == 0) {
        dataobj['iffile'] = 'yes'
        this.$router.push({
          path: '/ziyuanDetail',
          query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
        })
      } else {
        dataobj['iffile'] = 'no'
        this.$router.push({
          path: '/ziyuanPage',
          query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
        })
      }
    },
    //点击菜单
    clickbaritem(index) {
      var obj = this.barlist[this.barlistindex][index]
      var dataobj = {
        id: obj.id,
        name: obj.name,
      }
      //"outType": 0,类型 0文章 1优秀案例 2跳转外链
      if (obj.outType == 0) {
        //firstBigImage首行数据大图 0是 1否,
        if (obj.name.indexOf('新闻') > -1) {
          this.$router.push({
            path: '/newsPage',
            query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
          })
        } else {
          this.$router.push({
            path: '/proPage',
            query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
          })
        }
        // this.$router.push({path: '/order/page1',query:{ id:'2'}});
        // this.$router.push({name: '/order/page2',params:{ id:'6'}});
      } else if (obj.outType == 1) {
        dataobj['youxiu'] = 1
        this.$router.push({
          path: '/goodanliPage',
          query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
        })
      } else {
        if (obj.outUrl) {
          window.location.href = obj.outUrl
        } else {
          this.$hxe.showToast('请设置跳转链接')
        }
      }
    },
    //跳转轮播图
    clickbanner(index) {
      var _this = this
      var obj = this.bannerList[index]
      console.log(obj)
      //outType==1,跳转跳转本程序页面,2是跳转外链
      if (obj.redirectUrl) {
        if (obj.outType == 1) {
          if (obj.redirectUrl == 'newsDetail') {
            const id = this.getQueryString(obj.dataobj, 'id')
            const name = this.getQueryString(obj.dataobj, 'name')
            const dataobj = {
              articleId: Number(id),
              name: name,
            }
            console.log(dataobj)
            this.$router.push({
              path: '/newsDetail',
              query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
            })
          } else if (obj.redirectUrl == 'speak') {
            const uid = this.getQueryString(obj.dataobj, 'uid')
            const name = this.getQueryString(obj.dataobj, 'name')
            const kfName = this.getQueryString(obj.dataobj, 'kfName')
            const kfPhone = this.getQueryString(obj.dataobj, 'kfPhone')
            const kfEmall = this.getQueryString(obj.dataobj, 'kfEmall')
            const dataobj = {
              name: name,
              uid: Number(uid),
              kfName: kfName,
              kfPhone: kfPhone,
              kfEmall: kfEmall,
            }
            console.log(dataobj)
            this.$router.push({
              path: '/speak',
              query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
            })
          } else if (obj.redirectUrl == 'anliDetail') {
            const id = this.getQueryString(obj.dataobj, 'id')
            const name = this.getQueryString(obj.dataobj, 'name')
            const dataobj = {
              uid: Number(id),
              name: name,
            }
            this.$router.push({
              path: '/goodanliDetail',
              query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
            })
          } else if (obj.redirectUrl == 'ziyuan') {
            const id = this.getQueryString(obj.dataobj, 'id')
            var params = {
              id: id,
            }
            console.log(params)
            this.$http
              .post('/zhiyuanModule/index-ziyuan-type/getById', params)
              .then(function(response) {
                //数据处理
                if (response.code == 200) {
                  const dataobj = {
                    id: response.data.id,
                    name: response.data.name,
                    fileUrl: response.data.fileUrl,
                    outUrl: response.data.outUrl,
                  }
                  //"outType": 0 直接打开文件 1跳转列表
                  if (response.data.outType == 0) {
                    dataobj['iffile'] = 'yes'
                    _this.$router.push({
                      path: '/ziyuanDetail',
                      query: {
                        dataobj: encodeURIComponent(JSON.stringify(dataobj)),
                      },
                    })
                  } else {
                    dataobj['iffile'] = 'no'
                    _this.$router.push({
                      path: '/ziyuanPage',
                      query: {
                        dataobj: encodeURIComponent(JSON.stringify(dataobj)),
                      },
                    })
                  }
                } else {
                  _this.$hxe.showModal({
                    title: '请求失败',
                    content: response.message,
                    showCancel: false,
                  })
                }
              })
              .catch(function(error) {
                console.log(error)
              })
          } else if (obj.redirectUrl == 'openpdf') {
            const fileUrl = this.getQueryString(obj.dataobj, 'fileUrl')
            const name = this.getQueryString(obj.dataobj, 'name')
            const dataobj = {
              fileUrl: fileUrl,
              name: name,
              iffile: 'yes',
            }
            _this.$router.push({
              path: '/ziyuanDetail',
              query: { dataobj: encodeURIComponent(JSON.stringify(dataobj)) },
            })
          } else {
          }
        } else if (obj.outType == 2) {
          //2是跳转外链
          window.location.href = obj.redirectUrl
        } else {
        }
      } else {
        this.$hxe.showToast('请设置跳转链接')
      }
    },
    //获取参数
    getQueryString(dataobj, name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = dataobj.match(reg)
      if (r != null) {
        return unescape(r[2])
      } else {
        return null
      }
    },
  },
}
</script>

<style scoped lang="less">
/deep/ .van-grid-item__text {
  font-size: 13px;
}
/deep/ .van-grid-item__content {
  padding: 16px 0;
}
.my-swipe {
  width: 343px;
  height: 139px;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 auto;
  .swipeimg {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.tabswipe {
  color: #fff;
  font-size: 22px;
  line-height: normal;
  text-align: center;
  background-color: #ffffff;
}
.munediv {
  width: 368px;
  margin: 0 auto;
}
</style>
