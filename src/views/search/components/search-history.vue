<template>
    <div class='search-history'>
        <van-cell title='搜索历史'>
            <div v-if='isDeleteShow'><!--//如果是prop数据都不能赋值 如 prop = [] xxx=xxx,所以要通过父组件去修改-->
                <span @click='$emit("del-all-history",[])'>全部删除</span>
                &nbsp;&nbsp;
                <span @click="isDeleteShow = false">完成</span>
            </div>
            <van-icon 
                v-else 
                name='delete'
                @click="isDeleteShow = true"
            ></van-icon> 
        </van-cell>
        <van-cell :title='history' v-for='(history,index) in historyList' :key='index' @click="onDelete(history,index)" >
            <van-icon 
                name='close'
                v-show="isDeleteShow" 
                ></van-icon>
        </van-cell>
    </div>
</template>

<script>
// import { setItem } from '../../../utils/storage'
export default {
    name:"searchHistory",
    props:{
        historyList:{
            type:Array,
            required:true
        }
    },
    data(){
        return{
            isDeleteShow:false
        }
    },
    methods:{
        onDelete(history,index){
            if(this.isDeleteShow){
                this.historyList.splice(index,1)
                //持久化处理
                //1.修改本地存储操作
                // setItem('user-history',this.historyList)
                //2.调用api接口删除历史记录
                //无论是否登录，都把数据持久化到本地，如果登录，则删除线上历史记录，没登陆则删除本地存储
            }else{
                this.$emit('search',history)
            }
        }
    }
}
</script>

<style lang='less' scoped>

</style>