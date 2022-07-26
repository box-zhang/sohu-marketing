

<style lang="less" scoped>
.t-grid {
  font-size: @title-small-size;
  .t-table {
    width: 1110px;
    td {
      margin: 0;
      text-align: center;
      padding: 10px 4px;
      color: @neutral-title-color;
    }
    td:first-child {
      position: sticky;
      left: 0;
      z-index: 8;
    }
    td:first-child::after {
      width: 10px;
      display: block;
      position: absolute;
      top: -3px;
      bottom: -3px;
      right: 0;
      content: "";
      box-shadow: 3px 0 6px -4px @neutral-light-color;
    }
    .t-table-thead td {
      position: sticky;
      top: 0;
      z-index: 98;
      color: @neutral-light-color;
      border-bottom: 0.5px solid @neutral-border-color;
    }
    .t-table-thead td:first-child {
      z-index: 9;
    }
    .t-tr-even td {
      background: @neutral-background-color;
    }
    tr:not(.t-tr-even) td {
      background: @neutral-white-color;
    }
  }
}
</style>

<template>
  <div class="t-grid">
    <table class="t-table" cellspacing="0" cellpadding="0">
      <tr class="t-table-thead">
        <td v-for="(item,index) in tableHead" :key="index" :style="{width:item.width+'px',zIndex:(index==0?'99':'98')}" @click="orderby(item.field)">
            {{item.name}}<van-icon v-if="orderbyName==item.field" :name="'arrow-'+(orderbyDesc?'down':'up')"/>
        </td>
      </tr>
      <tr v-for="(item,index) in listData" :key="index" :class="{'t-tr-even':index%2==1}">
        <td>{{item.name}}</td>
        <td>{{item.type}}</td>
        <td>{{item.status}}</td>
        <td>{{item.createdon}}</td>
        <td>{{item.owner}}</td>
        <td>{{item.area}}</td>
        <td>{{item.account}}</td>
        <td>这是合同{{item.name}}的说明</td>
      </tr>
    </table>
  </div>
</template>
<script>
import data from "../../../assets/template/data.js";
import { Icon } from 'vant';
export default {
  data() {
    return {
      tableHead:[
          {name:"合同编号",field:"name",width:150},
          {name:"类型",field:"type",width:100},
          {name:"状态",field:"status",width:140},
          {name:"创建时间",field:"createdon",width:200},
          {name:"创建人",field:"owner",width:100},
          {name:"地区",field:"area",width:120},
          {name:"客户",field:"account",width:200},
          {name:"说明",field:"desc",width:300}
      ],
      listData: data.contractData,
      orderbyName:"name",
      orderbyDesc:true
    };
  },
  created() {},
  methods: {
      orderby(name){
          if(this.orderbyName==name){
              this.orderbyDesc=!this.orderbyDesc;
          }else{
              this.orderbyName=name;
              this.orderbyDesc=true;
          }
      }
  },
  components:{
      [Icon.name]:Icon
  }
};
</script>

