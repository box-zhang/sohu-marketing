

<style scoped>
.con{
  overflow: scroll;
  position: relative;
}
.parent{
  transform:rotate(90deg);
  font-size: 13px;
  position:absolute;
  left:0;
  top:0;
}
/* .rd-table{
  transform-origin: 50% 0%;
  transform:rotate(90deg) translate(50%,-50%);
} */
.rd-table td {
  margin: 0;
  text-align: center;
  border-bottom: 1px solid #e8eaec;
  border-right: 1px solid #e8eaec;
  font-size: 12px;
  padding:5px;
}
.rd-table-thead td {
  background: #f8f8f9;
  font-weight: bold;
  font-size: 13px;
}
</style>

<template>
<div class="con" :style="{width:width+'px',height:height+'px'}"  ref="condiv">
  <div class="over" :style="{width:tbHeight+'px',height:tbWidth+'px'}"></div>
<div class="parent" :style="{transform:'rotate(90deg) translateY(-'+tbHeight+'px)',transformOrigin: '0% 0%'}">
    <table class="rd-table" cellspacing="0" cellpadding="0" style="width:1110px" ref="table">
      <tr class="rd-table-thead">
        <td style="width:150px;">合同编号</td>
        <td style="width:100px;">类型</td>
        <td style="width:140px;">状态</td>
        <td style="width:200px;">创建时间</td>
        <td style="width:100px;">创建人</td>
        <td style="width:120px;">地区</td>
        <td style="width:200px;">客户</td>
        <td style="width:300px;">说明</td>
      </tr>
      <tr v-for="(item,index) in listData" :key="index">
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
  </div>
</template>
<script>
import data from '../../../assets/template/data.js';
export default {
  data() {
    return {
      listData: data.contractData,
      width:window.screen.availWidth,
      height:window.screen.availHeight,
      tbWidth:1110,
      tbHeight:0
    };
  },
  created() {
    this.$nextTick(function(){
        this.tbHeight=this.$refs.table.offsetHeight<this.height?this.height:this.$refs.table.offsetHeight;
        this.$nextTick(function(){this.$refs.condiv.scrollLeft=this.tbHeight;});        
    })
  },
  methods: {
  }
};
</script>

