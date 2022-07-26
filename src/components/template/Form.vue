<template>
  <div class="form">
      <div v-for="(value,name,index) in formData.attributes" :key="index" :class="value.class">
        <!--作用域插槽-->
        <slot :name="name+'-before'" :item="value"></slot>
        <!-- 标题 -->
        <div v-if="isTitle(value)" :style="{marginTop:index!=0?'10px':'0'}" class="form-header van-hairline--bottom"><strong>{{value.label}}</strong></div>
        <!--选项型字段-->
        <van-field
          label-align="left"
          v-if="isSelected(value)"
          v-model="value.text"
          :class="computeClass(value)"
          :placeholder="value.disabled?'':value.placeholder"
          :label="value.label"
          :required="value.required"
          :readonly="true"
          :disabled="value.disabled"
          :right-icon="value.disabled?'':((isPickList(value)||isDateOrTime(value)||isThreeCascade(value))?'arrow-down':'search')"
          @click="clickField(value,name)"
          v-show="isShow(value)"
        >
          <!-- <img v-if="value.disabled" src="../../assets/images/lock.png" slot="left-icon" class="field-lock"/> -->
          <!-- <van-icon v-if="value.disabled" class-prefix="my-icon" name="suo" slot="left-icon"/> -->
          <!--插槽-->
          <template slot="right-icon">
            <slot :name="name+'-icon'"></slot>
          </template>
        </van-field>

        <!--文本型字段-->
        <van-field
          label-align="left"
          v-if="!isSelected(value)&&!isTitle(value)&&!isBool(value)"
          v-model="value.value"
          :placeholder="value.disabled?'':value.placeholder"
          :label="value.label"
          :required="value.required"
          :left-icon="value.lefticon"
          :readonly="value.readonly"
          :disabled="value.disabled"
          :type="value.type"
          :class="computeClass(value)"
          :autosize="value.autoSize"
          :rows="value.rows || 1"
          :maxlength="computeMaxLength(value)"
          @change="onChange(value)"
          v-show="isShow(value)"
          @focus="inputFocus(value)"
          @blur="inputBlur(value)"
        >
          <!-- <img v-if="value.disabled" src="../../assets/images/lock.png" slot="left-icon" class="field-lock"/> -->
          <!-- <van-icon v-if="value.disabled" class-prefix="my-icon" name="suo" slot="left-icon"/> -->
          <!--插槽-->
          <template slot="right-icon">
            <slot :name="name+'-icon'"></slot>
          </template>
        </van-field>
        <!-- 布尔字段 -->
        <van-switch-cell v-if="isBool(value)" v-model="value.value" :disabled="value.disabled" :title="value.label" 
          @change="onChange(value)"/>
        <!-- <van-cell v-if="value.disabled" :title="value.label" :value="isSelected(value)?value.text:value.value" /> -->
        <!--作用域插槽-->
        <slot :name="name+'-after'" :item="value"></slot>

        <!--picklist 弹出框-->
        <van-popup v-model="value.isShowPopup" position="bottom" v-if="isPickList(value)">
          <van-picker
            :title="value.label"
            v-bind:show-toolbar="true"
            v-bind:columns="value.dataList"
            cancel-button-text="清空"
            v-on:cancel="clearField(value)"
            v-on:confirm="pickListConfirm($event,value)"
            :ref="name"
            :loading="value.loading===true || value.loading==undefined?true:false"
          />
        </van-popup>

        <!--lookup 弹出框-->
        <van-popup
          v-model="value.isShowPopup"
          position="right"
          lock-scroll
          class="lookup-style"
          v-if="isLookUp(value)"
        >
          <lookup
            v-if="value.isShowLookup===false?false:true"
            @setLookupData="setLookUpData(arguments,value)"
            @confirm="lookUpDataConfirm($event,value)"
            :ref="name+'_Ref'"
          >
            <div :slot="$scopedSlots[name+'-content']?'content':''" slot-scope="slotProps" v-if="$scopedSlots[name+'-content']">
              <slot :name="name+'-content'" :item="slotProps.item"></slot>
            </div>
          </lookup>
        </van-popup>

        <!--n2n 弹出框-->
        <van-popup
          v-model="value.isShowPopup"
          position="right"
          lock-scroll
          class="lookup-style"
          v-if="isN2N(value)"
        >
          <lookup
            multil
            v-if="value.isShowLookup===false?false:true"
            @setLookupData="setN2NData(arguments,value)"
            @confirm="N2NDataConfirm(arguments,value)"
            :value="value"
            :ref="name+'_Ref'"
          >
            <div :slot="$scopedSlots[name+'-content']?'content':''" slot-scope="slotProps" v-if="$scopedSlots[name+'-content']">
              <slot :name="name+'-content'" :item="slotProps.item"></slot>
            </div>
          </lookup>
        </van-popup>

        <!--时间 弹出框-->
        <van-popup v-model="value.isShowPopup" position="bottom" v-if="isDateOrTime(value)">
          <van-datetime-picker
            v-model="value.formatValue"
            :type="value.type"
            :max-date="value.maxDate"
            :min-date="value.minDate"
            v-on:cancel="clearField(value)"
            v-on:confirm="dateTimeConfirm($event,value)"
            cancel-button-text="清空"
          />
        </van-popup>
        <!--区域弹出框-->
        <van-popup v-model="value.isShowPopup" position="bottom" v-if="isThreeCascade(value)">
          <van-picker
            :title="value.label"
            v-bind:show-toolbar="true"
            v-bind:columns="countryProvinceCityColumns"
            cancel-button-text="清空"
            v-on:change="changeThreeCascade"
            v-on:cancel="cancelThreeCascade(arguments,value)"
            v-on:confirm="confirmThreeCascade(arguments,value)"
          />
        </van-popup>
      </div>
      <div style="height:64px;width:100%;"></div>
      <!-- 按钮区域 -->
      <div class="form-footer">
        <!--插槽-->
        <slot name="footer"></slot>
        <van-button v-if="!$scopedSlots.footer" type="info" bottom-action @click="onSubmit" class="form-footer-btn">{{submitText}}</van-button>
      </div>
  </div> 
</template>

<script type="text/ecmascript-6">
import { Field,DatetimePicker,Picker,SwitchCell,Popup,Row,Col,Button,Cell } from 'vant';
import lookup from "./Lookup.vue";

export default {
  data() {
    return {
      userList: [],
      entityName: this.formData.entityName,
      countryProvinceCityColumns: [
        { values: [] },
        { values: [] },
        { values: [] }
      ],
      isShowCountryProvinceCityPopup: false,
      country: [],
      province: [],
      city: [],
      position: 0,
      isInputing: false
    };
  },
  components: {
    lookup,
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Picker.name]: Picker,
    [SwitchCell.name]: SwitchCell,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Cell.name]:Cell
  },
  created() {
    // this.dataDeal();
  },
  props: {
    formData: {
      type: Object,
      default: { attributes: [{ name: "new_name", value: "22", type: "text" }] }
    },
    submitText:{
      type: String,
      default: "保存"
    },
    isVerify:{
      type:Boolean,
      default:true
    }
  },
  methods: {
    clickField(obj, name) {
      if (obj.onClick && typeof obj.onClick == "function") {
        if (!obj.onClick(obj)) {
          return;
        }
      }
      // if(this.isN2N(obj)||this.isLookUp(obj)){
      //   if(this.$refs[name+"_Ref"])
      //   this.$refs[name+"_Ref"][0].onRefresh();
      // }
      if (obj && this.isSelected(obj) && obj.disabled != true) {
        obj.isShowPopup = !obj.isShowPopup;
        //联动显隐清除lookup数据
        obj.isShowLookup = true;
      }
      if (this.isPickList(obj)) {
        if (obj.dataList)
          obj.loading = false;
      }
      //加载国家省市
      if (this.isThreeCascade(obj)) {
        this.getThreeCascadeData(obj);
      }
    },
    clearField(value) {
      value.value = "";
      value.text = "";
      value.isShowPopup = false;
      if (value.onChange && typeof value.onChange == "function")
        value.onChange();
    },
    pickListConfirm(obj, value) {
      value.value = obj.value;
      value.text = obj.text;
      value.isShowPopup = false;
      if (value.onChange && typeof value.onChange == "function")
        value.onChange(obj, value);
    },
    isLookUp(obj) {
      return obj.type == "lookup";
    },
    isN2N(obj) {
      return obj.type == "n2n";
    },
    isBool(obj) {
      return obj.type == "bool";
    },
    isPickList(obj) {
      return obj.type == "picklist";
    },
    isSelected(obj) {
      return (
        this.isLookUp(obj) ||
        this.isN2N(obj) ||
        this.isPickList(obj) ||
        this.isDateOrTime(obj) ||
        this.isThreeCascade(obj)
      );
    },
    isTitle(obj){
      return obj.type == "title";
    },
    isDateOrTime(obj) {
      return obj.type == "date" || obj.type == "datetime";
    },
    isThreeCascade(obj) {
      return obj.type == "threeCascade";
    },
    //获取lookup数据
    setLookUpData(arg, value) {
      //arg参数数组说明，arg[0]搜索关键字，arg[1]页数，arg[2]返回数据回调方法
      //设置lookup数据
      if (value.getData && typeof value.getData == "function")
        value.getData(arg[0], arg[1], arg[2]);
      // //请求ajax,加载数据
      // this.$crm.getdata({
      //   showLoading: false,
      //   data: {
      //     Code: value.sqlCode,
      //     sqlParamenter: [
      //       ...(value.customPara || {}),
      //       { Name: "searchtext", Value: arg[0] },
      //       { Name: "currentpage", Value: arg[1] },
      //       { Name: "pagesize", Value: 20 }
      //     ]
      //   },
      //   success(data) {
      //     arg[2](data.Data);
      //   },
      //   catchFunc(e) {
      //     arg[2]([]);
      //   }
      // });
    },
    //选择lookup数据
    lookUpDataConfirm(obj, value) {
      value.isShowPopup = false;
      if (obj) {
        //联动显隐清除lookup数据
        if (value.value != obj.id && value.hideAttributeName) {
          this.formData.attributes[
            value.hideAttributeName
          ].isShowLookup = false;
        }
        value.text = obj.name || null;
        value.value = obj.id || null;

        if (value.onChange && typeof value.onChange == "function")
          value.onChange(obj, value);
      }
    },
    //获取n2n数据
    setN2NData(arg, value) {
      //arg参数数组说明，arg[0]搜索关键字，arg[1]页数，arg[2]返回数据回调方法
      //设置lookup数据
      if (value.getData && typeof value.getData == "function")
        value.getData(arg[0], arg[1], arg[2]);
    },
    //选择n2n数据
    N2NDataConfirm(arg, value) {
      value.isShowPopup = false;
      if (arg[0] instanceof Array) {
        value.list = arg[0];
        value.text = arg[1];
        if (value.onChange && typeof value.onChange == "function")
          value.onChange(arg[0], arg[1], value);
      }
    },
    //选择时间数据
    dateTimeConfirm(obj, value) {
      value.isShowPopup = false;
      value.formatValue = obj;
      if (value.type == "date") {
        value.value = this.$util.formatDate(obj, "yyyy-MM-dd");
        value.text = this.$util.formatDate(obj, "yyyy-MM-dd");
      }
      if (value.type == "datetime") {
        value.value = this.$util.formatDate(obj, "yyyy-MM-dd hh:mm");
        value.text = this.$util.formatDate(obj, "yyyy-MM-dd hh:mm");
      }
      if (value.onChange && typeof value.onChange == "function")
        value.onChange(obj, value);
    },
    //是否显示当前元素
    isShow(obj) {
      //默认显示
      if (typeof obj.isShow == "boolean") {
        return obj.isShow;
      } else {
        return true;
      }
    },
    getThreeCascadeData(value) {
      //已初始化
      if (this.country.length > 0) {
        return;
      }
      let _self = this;
      if (value.getData && typeof value.getData == "function")
        value.getData((country,province,city)=>{
            _self.country = country;
            _self.province = province;
            _self.city = city;
            _self.loadThreeCascadeColumns();
        });
    },
    //初始化国家、省、市列表
    loadThreeCascadeColumns() {
      //国家
      let col1 = this.country;
      let countryId = this.country[0].id;
      //省
      let col2 = this.province.filter(item => {
        return item.pid == countryId;
      });
      let provinceId = col2[0].id;
      //市
      let col3 = this.city.filter(item => {
        return item.pid == provinceId;
      });

      this.countryProvinceCityColumns = [
        {
          values: col1,
          defaultIndex: 0
        },
        {
          values: col2,
          defaultIndex: 0
        },
        {
          values: col3,
          defaultIndex: 0
        }
      ];

      //this.$forceUpdate();
    },
    //国家\省\市change
    changeThreeCascade(picker, values, type) {
      //type(0:修改国家，1:修改省，2:修改城市)
      if (type == 0) {
        //修改国家重新加载省
        let countryId = values[0].id;
        let col2 = this.province.filter(item => {
          return item.pid == countryId;
        });
        picker.setColumnValues(1, col2);
        let provinceId = col2[0].id;
        //修改国家重新加载城市
        let col3 = this.city.filter(item => {
          return item.pid == provinceId;
        });
        picker.setColumnValues(2, col3);
      }
      if (type == 1) {
        //修改省重新加载城市
        let provinceId = values[1].id;
        let col3 = this.city.filter(item => {
          return item.pid == provinceId;
        });
        picker.setColumnValues(2, col3);
      }
    },
    //国家\省\市cancel
    cancelThreeCascade(arg, item) {
      //国家赋值
      if (!this.formData.attributes[item.firstField]) {
        this.formData.attributes[item.firstField] = {};
        this.formData.attributes[item.firstField].isShow = false;
      }
      this.formData.attributes[item.firstField].value = "";
      this.formData.attributes[item.firstField].text = "";
      //省赋值
      if (!this.formData.attributes[item.secondField]) {
        this.formData.attributes[item.secondField] = {};
        this.formData.attributes[item.secondField].isShow = false;
      }
      this.formData.attributes[item.secondField].value = "";
      this.formData.attributes[item.secondField].text = "";
      //城市赋值
      if (!this.formData.attributes[item.thirdField]) {
        this.formData.attributes[item.thirdField] = {};
        this.formData.attributes[item.thirdField].isShow = false;
      }
      this.formData.attributes[item.thirdField].value = "";
      this.formData.attributes[item.thirdField].text = "";
      //国家\省\市赋值
      item.text = "";

      item.isShowPopup = false;
    },
    //国家\省\市confirm
    confirmThreeCascade(arg, item) {
      let obj = arg[0];
      let countryProvinceCityText = "";
      //国家赋值
      if (obj.length >= 1 && obj[0]) {
        if (!this.formData.attributes[item.firstField]) {
          this.formData.attributes[item.firstField] = {};
          this.formData.attributes[item.firstField].isShow = false;
        }
        this.formData.attributes[item.firstField].value = obj[0].id;
        this.formData.attributes[item.firstField].text = obj[0].text;
        countryProvinceCityText += obj[0].text + "\\";
      }
      //省赋值
      if (obj.length >= 2 && obj[1]) {
        if (!this.formData.attributes[item.secondField]) {
          this.formData.attributes[item.secondField] = {};
          this.formData.attributes[item.secondField].isShow = false;
        }
        this.formData.attributes[item.secondField].value = obj[1].id;
        this.formData.attributes[item.secondField].text = obj[1].text;
        countryProvinceCityText += obj[1].text + "\\";
      }
      //城市赋值
      if (obj.length >= 3 && obj[2]) {
        if (!this.formData.attributes[item.thirdField]) {
          this.formData.attributes[item.thirdField] = {};
          this.formData.attributes[item.thirdField].isShow = false;
        }
        this.formData.attributes[item.thirdField].value = obj[2].id;
        this.formData.attributes[item.thirdField].text = obj[2].text;
        countryProvinceCityText += obj[2].text;
      }
      //国家\省\市赋值
      item.text = countryProvinceCityText;

      item.isShowPopup = false;
    },
    //文本框onChange
    onChange(value) {
      if (value.onChange && typeof value.onChange == "function") {
        value.onChange(value);
      }
    },
    computeClass(value) {
      let classValue = "";
      if (value.advise) {
        classValue += "van-cell--advise";
      }
      if (value.type == "textarea" && value.doublerow) {
        classValue += " input-doublerow";
      }
      return classValue;
    },
    //文本框获取焦点事件,获取当前页面滚动位置
    inputFocus(value) {
      console.log("inputFocus:" + window.scrollY);
      this.position = window.scrollY;
      this.isInputing = true;

      // number型的数据特殊处理
      if(value.bakType == "number"){
        value.type = "number";
        // 去掉千分符
        if(value.value){
          let money = value.value + "";
          money = money.replace(/,/g, "");
          value.value = money;
        }
      }
    },
    //文本框失去焦点事件
    inputBlur(value) {
      let thisVue = this;
      this.isInputing = false;
      setTimeout(() => {
        if (!this.isInputing) window.scrollTo(0, thisVue.position);
      }, 100);
      // // number型的数据特殊处理
      // if(value.bakType == "number"){
      //   value.type = "text";
      //   // 增加千分符
      //   if(value.value){
      //     value.value = this.$util.formatMoney(value.value);
      //   }
      // }
    },
    //计算输入框可输入的最大长度
    computeMaxLength(value) {
      //如果有maxLength属性，返回maxLength
      //否则设置默认值
      if (value.maxLength) {
        //return value.maxLength;
      }
      //数值型
      else if (value.type == "number" || value.bakType == "number") {
        value.maxLength = 15;
      } else {
        value.maxLength = null;
      }
      return value.maxLength;
    },
    //封装提交数据
    getSubmitData(oldData = {}){
      const data=this.formData;
      return new Promise((resolve, reject) => {
          let submitData = {
              entityname: data.entityName,
              entityid: data.entityId,
              attributes: {},
              n2nlist: []
          };
          for (let item in data.attributes) {
              //普通属性
              if (data.attributes[item].type != "n2n" && data.attributes[item].type != "title" && data.attributes[item].type != "threeCascade") {
                  //比较
                  if (data.attributes[item].isSubmit != false) {
                      let value = data.attributes[item].value;
                      if(data.attributes[item].bakType == "number" && value){
                          value = value.replace(/,/g, "");
                      }
                      if (!oldData[item] || (oldData[item] && (oldData[item] instanceof Object ? oldData[item].value : oldData[item]) != value)) {
                          submitData.attributes[item] = value;
                      }
                  }
              }
              //多对多属性
              else if(data.attributes[item].type == "n2n") {
                  let n2nitem = {
                      entityname: data.attributes[item].entityname,
                      entitylist: [],
                      relationname: item
                  }
                  if (data.attributes[item].list instanceof Array) {
                      data.attributes[item].list.forEach(element => {
                          n2nitem.entitylist.push({ entityid: element.id });
                      });
                  }
                  submitData.n2nlist.push(n2nitem);
              }
          }
          resolve(submitData);
        })
    },
    //验证
    verifyForm(){
      const data=this.formData;
      return new Promise((resolve, reject) => {
          let errorMsg = "";
          for (let obj in data.attributes) {
            let attr=data.attributes[obj];
            if (attr.required) {
                if (attr.type == "n2n") {
                    if (!attr.list || attr.list.length == 0) {
                        errorMsg = attr.placeholder;
                        break;
                    }
                } else if (attr.type == "number" || attr.bakType == "number") {
                    let value = attr.value;
                    if(isNaN(value)){
                        value = value.replace(/,/g, "");
                    }
                    if (!value && value !== 0) {
                        errorMsg = attr.placeholder;
                        break;
                    }
                    if (!this.$util.validateNumber(value)) {
                        errorMsg = attr.label + "不合法";
                        break;
                    }
                }
                //三级级联
                else if (attr.type == "threeCascade") {
                    if (!attr.text && attr.text != "0") {
                        errorMsg = attr.placeholder;
                        break;
                    }
                }
                else if (attr.type != "title") {
                    if (!attr.value && attr.value != "0") {
                        errorMsg = attr.placeholder;
                        break;
                    }
                }
            }
          }
          if(errorMsg)
            reject(errorMsg);
          else
            resolve();
        })
    },
    //提交表单
    onSubmit(){
      if(this.isVerify){
        this.verifyForm().then(()=>{
          this.getSubmitData().then(data=>{
            this.$emit('onSubmit',data);
          });
        }).catch(error=>{
          this.$hxe.showToast(error);
        })
      }else{
        this.getSubmitData().then(data=>{
            this.$emit('onSubmit',data);
        });
      }
    },
    //清空表单数据 
    clearFormData(data) {
        data.entityId="";
        for (let item in data.attributes) {
            if (data.attributes[item].type != "n2n") {
                data.attributes[item].text="";
                data.attributes[item].value="";
                data.attributes[item].disabled=false;
            }
            else {
                data.attributes[item].text="";
                data.attributes[item].list=[];
                data.attributes[item].disabled=false;
            }
        }
        return data;
    },
    // //数据处理 
    // dataDeal(){
    //   for(let item in this.formData.attributes){
    //     // number型处理 
    //     if(this.formData.attributes[item].type == "number"){
    //       // 只处理没有备份过类型的数据 
    //       //   为了防止每次修改数据都被监听到
    //       if(!this.formData.attributes[item].bakType){
    //         // 备份原始类型
    //         this.formData.attributes[item].bakType = this.formData.attributes[item].type;
    //         this.formData.attributes[item].type = "text";
    //         // 增加千分符
    //         if(!isNaN(this.formData.attributes[item].value) && this.formData.attributes[item].value){
    //           this.formData.attributes[item].value = this.$util.formatMoney(this.formData.attributes[item].value);
    //         }
    //       }
    //     }
    //     // 表单第一次加载时，value是没有值的，但是这个时候bakType已经初始化
    //     //   当数据绑定时，会给value赋值，这个时候给被监听到的number类型数据加千分位
    //     else if(this.formData.attributes[item].bakType == "number" && !isNaN(this.formData.attributes[item].value) && this.formData.attributes[item].value){
    //       this.formData.attributes[item].value = this.$util.formatMoney(this.formData.attributes[item].value);
    //     }
    //   }
    // }
  },
  watch: {
    formData: {
      handler(){
        // this.dataDeal();
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.form-header {
    background: #fff;
    padding: 10px 10px 10px 20px;
    font-size: 14px;
    text-align: left;
    position: relative;
}
.form-header strong:before {
    content: "";
    background: @primary;
    width: 5px;
    height: 14px;
    position: absolute;
    border-radius: 2.5px;
    top: 13px;
    left: 10px;
}
.form-footer{
  left:0;
  right:0;
  padding:10px 14px;
  position:fixed;
  bottom:0;
  background: @neutral-background-color;
  .form-footer-btn{
    width:100%;
  }
}
.form .van-cell::after {
    position: absolute;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: -50%;
    top:-50%;
    left: 15px;
    border-bottom: 1px solid #dcdee2;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
}
</style>

