<template>
  <div class="home">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        type="info"
        icon="search"
        round
        class="search-btn"
        size="small"
        >搜索
      </van-button>
    </van-nav-bar>
    <!--导航栏-->

    <!---文章频道list-->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab :title="item.name" v-for="item in ChannelsInfo" :key="item.id">
        <!---文章列表组件-->
        <article-list :channel="item"></article-list>
      </van-tab>
    </van-tabs>
    <!---文章频道list-->
  </div>
</template>

<script>
import { getUserChannels } from "../../api/user";
import articleList from "../../components/article-list";
export default {
  name: "homeIndex",
  created() {
    this.getChannels();
  },
  components: {
    articleList,
  },
  data() {
    return {
      active: 0,
      //用户频道列表数据
      ChannelsInfo: [],
    };
  },
  methods: {
    //加载频道数据
    async getChannels() {
      const { data } = await getUserChannels();
      this.ChannelsInfo = data.data.channels;
    },
  },
};
</script>

<style lang='less' scoped>
.home {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    border: none;
    background-color: #5babfb;
    .van-button__text {
      font-size: 14px;
    }
    .van-icon {
      font-size: 16px;
    }
  }
  .channel-tabs {
      /deep/ .van-tab {
        border-right: 1px solid #ccc;
        border-bottom:1px solid #edeff3;
      }
      /deep/.van-tabs__line{
          width: 20px !important;
          height: 3px;
          background-color:#3692fa;
          margin-bottom:6px;

      }
    }
}
</style>