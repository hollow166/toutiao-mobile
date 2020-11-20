<template>
    <div class='search-suggest'>
        <van-cell 
            icon='search'
            v-for="(suggest,index) in suggestLsit"
            :key='index'
            @click="$emit('search',suggest)"
        >
        <div slot='title' v-html='highLight(suggest)'></div>
        </van-cell>
    </div>
</template>

<script>
import {getSearchSuggestInfo} from '../../../api/search'
//函数防抖
import {debounce} from 'lodash'
export default {
    name:'searchSuggest',
    props:{
        searchText:{
            type:String,
            required:true
        }
    },
    data(){
        return{
            suggestLsit:[],//联想数据列表
            htmlStr:"hello <span style='color:red'>world</span>"

        }
    },
    watch:{
        //监听searchText的变化g
        searchText:{
            handler:debounce(async function(){
                const{data} = await getSearchSuggestInfo(this.searchText)
                this.suggestLsit = data.data.options
            },200),
            // async handler(){
            //     const{data} = await getSearchSuggestInfo(this.searchText)
            //     this.suggestLsit = data.data.options
            // },
            immediate:true //立即触发一次
        }
    },
    methods:{
        highLight(suggest){
            const reg = new RegExp(this.searchText,'gi')
            return suggest.replace(reg,`<span style='color:red'>${this.searchText}</span>`)
        }
    }
}
</script>

<style lang='less' scoped>

</style>