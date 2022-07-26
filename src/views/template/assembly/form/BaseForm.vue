<style lang="less" scoped>
</style>

<template>
  <div class="temp-form">
    <form-com :form-data="formData" @onSubmit="onSubmit" ref="form">
    </form-com>
  </div>
</template>

<script>
import Form from '../../../../components/template/Form.vue';
export default {
  name: 'baseform',
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
                    }
                }
            }
    };
  },
  created(){
  },
  methods:{
    onSubmit(data){
      console.log("data",data);
      this.$refs.form.getSubmitData().then(data=>{
        console.log("getSubmitData",data);
      })
    }
  },
  components:{
    "form-com":Form
  }
}
</script>
