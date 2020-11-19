<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" animation-duration='400'>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
            v-for='(article,index) in articlesList'
            :key='index'
            :article='article'
        ></article-item>
        <!-- <van-cell
          v-for="(article, index) in articlesList"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "../api/articles";
import articleItem from '../components/common/article-item'
export default {
  name: "articleList",
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  components:{
      articleItem
  },
  data() {
    return {
      articlesList: [], //文章数据列表
      loading: false, //控制加载中的loading状态
      finished: false, //控制加载结束状态
      timeStamp: null, //获取下一页数据时间戳
      isRefreshLoading: false, //下拉刷新的loading状态
      refreshText: "",
    };
  },
  methods: {
    async onLoad() {
      //1.请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, //频道id
        timestamp: this.timeStamp || Date.now(),
        with_top: 1,
      });
      const { results } = data.data;
      //2.将数据放到list数组中
      this.articlesList.push(...results);
      //3.设置本次加载状态结束，它才可以判断是否需要加载下一次，否则将会永久停在这里
      this.loading = false;
      //4.数据全部加载完成
      if (results.length) {
        //更新下一页数据
        this.timeStamp = data.data.pre_timestamp;
      } else {
        //没有数据不在加载了
        this.finished = true;
      }
    },
    async onRefresh() {
      //下来刷新，组件会展示自己的loading状态
      //1.获取文章数据
      const { data } = await getArticles({
        channel_id: this.channel.id, //频道id
        timestamp: Date.now(),
        with_top: 1,
      });
      const { results } = data.data;
      //2.把数据往列表往顶部追加
      this.articlesList.unshift(...data.data.results);
      //3.关闭刷新的loading状态
      this.refreshText = `更新了${results.length}条数据`;
      this.$toast(this.refreshText);
      this.isRefreshLoading = false;
    },
  },
};
</script>

<style lang='less' scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}

</style>