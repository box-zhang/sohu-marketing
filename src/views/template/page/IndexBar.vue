<style lang="less">
.t-list-item{
        display: flex;
        padding:10px @page-margin-size;
        background: @neutral-white-color;
        .t-list-item-img{
            height:50px;
            padding-right:@page-margin-size;
            img{
                width:50px;
                border-radius: @radius-small-size;
            }
        }
        .t-list-item-con{
            flex-grow:1;
            line-height: 1.4em;
            color:@neutral-light-color;
            .t-list-item-title{
                line-height: 1.8em;
                font-size: @title-large-size;
                color:@neutral-title-color;
            }
            .t-list-item-text{
                font-size: @title-normal-size;
                color:@neutral-text-color;
            }
        }
    }
</style>
<template>
    <div class="t-indexbar">
        <van-index-bar :index-list="indexData" highlight-color="#2b85e4" @select="onSelect">
            <div v-for="(item,index) in listData" :key="index">
                <van-index-anchor  :index="item.index" />
                <div v-for="(contact,contactIndex) in item.data" :key="contactIndex" class="t-list-item van-hairline--bottom">
                        <div class="t-list-item-img">
                            <img :src="require(`../../../assets/images/temp${contactIndex%2+1}.png`)"/>
                        </div>
                        <div class="t-list-item-con">
                        <van-row>
                            <van-col span="24"><div class="t-list-item-title">{{contact.name}}</div></van-col>
                        </van-row>
                        <van-row>
                            <van-col span="24">
                            <van-col span="24"><div class="t-list-item-text">{{contact.account}}</div></van-col>
                            </van-col>
                        </van-row>
                        </div>
                    </div>
            </div>
        </van-index-bar>
    </div>
</template>
<script>
import data from '../../../assets/template/data.js';
import { IndexBar, IndexAnchor, Row, Col } from 'vant';
export default {
    data(){
        return {
            indexData:[],
            listData:data.indexBarData
        }
    },
    created(){
        this.indexData=this.listData.map((item,index)=>{
            return item.index;
        })
    },
    mounted(){
    },
    methods:{
        onSelect(item){
            // this.$toast({
            //     type:'html',
            //     duration: 500,       // 持续展示 toast
            //     message: `<div style='height:80px;line-height:80px;width:60px;text-align:center;font-size:24px;'>${item}</div>`
            // });
        }
    },
    components:{
       [IndexBar.name]:IndexBar,
       [IndexAnchor.name]:IndexAnchor,
       [Row.name]:Row,
       [Col.name]:Col
    }
}
</script>
