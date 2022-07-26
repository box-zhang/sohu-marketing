<style lang="less" scoped>
.custom-list{
  span{
    font-size: @text-help-size;
    color:@neutral-light-color;
  }
}
</style>

<template>
  <div class="temp-form">
    <form-com :form-data="formData" @onSubmit="onSubmit" ref="form">
      <!-- 选修课程插槽 -->
      <div slot="new_course-content" slot-scope="slotProps" class="custom-list">{{slotProps.item.name}}<br /><span>{{slotProps.item.count}}人已报名</span></div>
      <!-- 底部按钮插槽 -->
      <div slot="footer">
        <van-row type="flex" justify="space-between">
          <van-col span="11">
            <van-button type="info" bottom-action @click="onOk" style="width:100%;">提交</van-button>
          </van-col>
          <van-col span="2">
          </van-col>
          <van-col span="11">
            <van-button type="default" bottom-action @click="onCancel" style="width:100%;">取消</van-button>
          </van-col>
        </van-row>
      </div>
    </form-com>
  </div>
</template>

<script>
import { Row,Col,Button } from 'vant';
import Form from '../../../../components/template/Form.vue';
import data from '../../../../assets/template/data.js';
export default {
  name: 'buttonform',
  data() {
    return {
      formData:{
                entityName:"student",
                entityId:"",
                attributes:{
                    title1:{
                        type:"title",
                        label:"基本信息"
                    },
                    new_grade_r1:{
                        label: "年级",
                        placeholder: "请选择年级",
                        value: "",
                        text: "",
                        type: "lookup",
                        isShowPopup: false,
                        required: true,
                        disabled: false,
                        isShow: true,
                        hideAttributeName:"new_class_r1",
                        onChange(obj){
                            currentVue.updateGrade(obj);
                        },
                        getData(searchText,currentPage,callBack){
                          //异步加载数据
                          setTimeout(() => {
                            let pagesize=20;
                            let array=data.gradeData.filter((item,index)=>{
                                return index>=(currentPage-1)*pagesize && index<(currentPage*pagesize) && (item.name.indexOf(searchText)>-1||!searchText)
                            })
                            callBack(array);
                          }, 500);
                        }
                    },
                    new_class_r1:{
                        label: "班级",
                        placeholder: "请选择班级",
                        value: "",
                        text: "",
                        type: "lookup",
                        isShowPopup: false,
                        required: true,
                        disabled: false,
                        isShow: true,
                        onChange(obj){
                            console.log(obj);
                        },
                        getData(searchText,currentPage,callBack){
                          //异步加载数据
                          setTimeout(() => {
                            let pagesize=20;
                            let array=data.classData.filter((item,index)=>{
                                return item.gid==currentVue.formData.attributes.new_grade_r1.value;
                            }).filter((item,index)=>{
                                return index>=(currentPage-1)*pagesize && index<(currentPage*pagesize) && (item.name.indexOf(searchText)>-1||!searchText);
                            })
                            callBack(array);
                          }, 500);
                        },
                        onClick(obj){
                          if(!currentVue.formData.attributes.new_grade_r1.value){
                            currentVue.$hxe.showToast("请先选择年级");
                            return false;
                          }else{
                            return true;
                          }
                        }
                    },
                    new_name:{
                        value: "",
                        type: "text",
                        autoSize: true,
                        readonly: false,
                        required: true,
                        label: "姓名",
                        maxLength:4,
                        placeholder: "请输入姓名"
                    },
                    new_number:{
                        value: "",
                        type: "number",
                        autoSize: true,
                        readonly: false,
                        required: true,
                        label: "学号",
                        maxLength:12,
                        placeholder: "请输入学号"
                    },
                    new_sex:{
                        label: "性别",
                        placeholder: "请选择性别",
                        text: "",
                        value: "",
                        isShowPopup: false,
                        type: "picklist",
                        readonly: true,
                        required: true,
                        dataList:[
                          {
                            text:"男",
                            value:"1"
                          },
                          {
                            text:"女",
                            value:"2"
                          }
                        ],
                        onChange(obj){
                            console.log(obj);
                        }
                    },
                    new_starttime: {
                        value: "",
                        text: "",
                        type: "date",
                        readonly: false,
                        required: true,
                        label: "入学时间",
                        formatValue: new Date(),
                        isShowPopup: false,
                        placeholder: "请选择入学时间"
                    },
                    area:{
                        type:"threeCascade",
                        label:"籍贯",
                        readonly:true,
                        isShowPopup:false,
                        required: true,
                        placeholder:"请选择国家/省/市",
                        isSubmit:false,
                        firstField:"new_country_r1",
                        secondField:"new_province_r1",
                        thirdField:"new_city_r1",
                        getData(callBack){
                          callBack(data.countryData,data.provinceData,data.cityData);
                        }
                    },
                    new_course: {
                        label: "选修课程",
                        placeholder: "请选择选修课程",
                        readonly:true,
                        value: "",
                        type: "n2n",
                        isShowPopup: false,
                        entityname:"systemuser",
                        getData(searchText,currentPage,callBack){
                          //异步加载数据
                          setTimeout(() => {
                            let pagesize=20;
                            let array=data.courseData.filter((item,index)=>{
                                return index>=(currentPage-1)*pagesize && index<(currentPage*pagesize) && (item.name.indexOf(searchText)>-1||!searchText)
                            })
                            callBack(array);
                          }, 500);
                        }
                    },
                    title2:{
                        type:"title",
                        label:"转学信息"
                    },
                    new_istransfer:{
                        value: false,
                        type: "bool",
                        readonly: false,
                        required: false,
                        label: "是否转学生",
                        onChange(obj){
                          if(!obj.value){
                            currentVue.formData.attributes.new_transferschool.value="";
                            currentVue.formData.attributes.new_transferdesc.value="";
                          }
                          currentVue.formData.attributes.new_transferschool.isShow=obj.value;
                          currentVue.formData.attributes.new_transferdesc.isShow=obj.value;
                        }
                    },
                    new_transferschool:{
                        value: "",
                        type: "text",
                        readonly: false,
                        required: false,
                        isShow: false,
                        label: "原学校",
                        placeholder: "请输入原学校"
                    },
                    new_transferdesc:{
                        value: "",
                        type: "textarea",
                        readonly: false,
                        required: false,
                        isShow: false,
                        label: "转学说明",
                        placeholder: "请输入转学说明"
                    }
                }
            }
    };
  },
  created(){
    window.currentVue=this;
  },
  methods:{
    updateGrade(obj){
      currentVue.formData.attributes.new_class_r1.value="";
      currentVue.formData.attributes.new_class_r1.text="";
    },
    onSubmit(data){
      console.log("data",data);
      this.$refs.form.getSubmitData().then(data=>{
        console.log("getSubmitData",data);
      })
    },
    onOk(){
      this.$refs.form.VerifyForm().then(data=>{
        console.log("验证成功");
      }).catch(data=>{
        console.log("验证失败",data);
      });
      this.$refs.form.getSubmitData().then(data=>{
        console.log("getSubmitData",data);
      });
    },
    onCancel(){
      this.$hxe.showToast("你点了取消");
    }
  },
  components:{
    "form-com":Form,
    [Row.name]:Row,
    [Col.name]:Col,
    [Button.name]:Button
  }
}
</script>
