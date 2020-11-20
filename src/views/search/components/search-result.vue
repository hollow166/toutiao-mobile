<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(result,index) in list" :key="index" :title="result.title" />
    </van-list>
  </div>
</template>

<script>
import {getSearchResult} from '../../../api/search'
export default {
  name: "search-reault",
  props:{
      searchText:{
          type:String,
          required:true
      }
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],//搜索结果列表
      page:1,//页码
      perPage:10,//每页的大小
      q:""//搜索关键词
    };
  },
  methods: {
    async onLoad() {
        //1.请求数据
     const{data} = await getSearchResult({page:this.page,per_page:this.perPage,q:this.searchText})
     //2.将数据添加到搜索结果列表
     this.list.push(...data.data.results)
     //3.更改加载状态
     this.loading = false
     //4.判断是否还有数据
     if(data.data.results.length){
         this.page++
     }else{
         this.finished = true
     }
    },
  },
};
</script>

<style lang='less' scoped>
.search-result{
    position: fixed;
    left: 0;
    right: 0;
    top:54px;
    bottom: 0;
    overflow-y:auto ;
}
</style>