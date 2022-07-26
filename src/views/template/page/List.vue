<style lang="less">
.primary-tabs .van-tabs__line{
  bottom:20px;
}
</style>
<template>
    <div class="primary-tabs">
        <van-tabs swipeable :active=0 ref="fixedTab" :border="false" background="#2d8cf0" color="#ffffff" title-active-color="#ffffff" title-inactive-color="#ffffff" line-width="60">
           <van-tab title="普通列表">
               <list-data :top="44"/>
           </van-tab>
           <van-tab title="瀑布流">
               <card-data :top="44"/>
           </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { Tab, Tabs } from 'vant';
import ListData from '../../../components/template/ListData'
import CardData from '../../../components/template/CardData'
export default {
    data(){
        return {
        }
    },
    created(){
        //页面顶部位置
        this.$nextTick(()=>{
            this.$refs.fixedTab.$el.children[0].style.position="fixed";
            this.$refs.fixedTab.$el.children[0].style.top=this.$store.state.pageTopOffset+'px';
        })
    },
    mounted(){
    },
    methods:{
    },
    components:{
       'list-data':ListData,
       'card-data':CardData,
       [Tab.name]:Tab,
       [Tabs.name]:Tabs
    }
}
</script>
