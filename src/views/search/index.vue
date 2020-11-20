<template>
  <div class="search">
    <form action="/">
      <!-- 搜索栏 -->
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        show-action
        @focus="isResultShow = false"
      />

      <!-- /搜索栏 -->
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchText="searchText"></search-result>
    <!-- /搜索结果 -->
    <!-- 联想建议 -->
    <search-suggest-info
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></search-suggest-info>
    <!-- /联想建议 -->

    <!-- 历史记录 -->
    <search-history 
      v-else 
      :historyList='historyList'
      @search="onSearch"
      @del-all-history='historyList = $event'
     > </search-history>
    <!-- /历史记录 -->
  </div>
</template>

<script>
import searchSuggestInfo from "./components/search-suggest-info.vue";
import searchHistory from "./components/search-history.vue";
import searchResult from "./components/search-result.vue";
import { getItem, setItem} from '../../utils/storage';
// import {getSearchHistory} from '../../api/search'
import { mapState } from 'vuex';

export default {
  name: "search",
  components: {
    searchSuggestInfo,
    searchHistory,
    searchResult,
  },
  created(){
      this.loadHistory()
  },
  data() {
    return {
      searchText: "",
      isResultShow: false,
      historyList:[],
    };
  },
  watch:{
    //只要监视到historyList的变化，那么就进行本地存储
    historyList(){
      setItem('user-history',this.historyList)
    }
  },
  computed:{
      ...mapState([
          'user'
      ])
  },
  methods: {
    onSearch(searchText) {
      //将输入框设置为你要搜索的文本
      this.searchText = searchText;
      //记录搜索历史记录
      //判断列表中是否存在相同的历史记录
      const index = this.historyList.indexOf(searchText);
      if (index !== -1) {
        //删除重复项
        this.historyList.splice(index, 1);
      }
      this.historyList.unshift(searchText);
      //如果用户已登录，那么调用api获取历史记录
      //如果没有登录，那么存储到localstorage中
      // setItem('user-history',this.historyList)
      this.isResultShow = true;
    },
    //加载后台历史数据
    async loadHistory(){
        const localHistory = getItem('user-history') || []
        // if(this.user){
        //     const{data} = await getSearchHistory()
        //     const history = data.data.keywords
        //     var allHistory = [...new Set([
        //         ...localHistory,
        //         ...history
        //     ])]
        // }
        this.historyList = localHistory
        
       
    },
  },
};
</script>

<style lang='less' scoped>
</style>