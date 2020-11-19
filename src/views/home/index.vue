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
      <div slot="nav-right" class='wap-nav-placeholder'></div>
      <div
        slot="nav-right"
        @click="isChannelEditShow = true"
        class="wap-nav-wrap"
      >
        <van-icon name="wap-nav"> </van-icon>
      </div>
    </van-tabs>
    <!---文章频道list-->

    <van-popup
      v-model="isChannelEditShow"
      position="top"
      closeable
      get-container="body"
      class="channel-edit-popup"
    >
        <channel-edit 
        :userChannel="ChannelsInfo"
          @closeChannelEditShow='isChannelEditShow = false'
          @isActiveChannel="active = $event"
          :isActive='active'
        ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "../../api/user";
import articleList from "../../components/article-list";
import channelEdit from '../../components/channel-edit'
import {mapState} from 'vuex'
import { getItem } from '../../utils/storage';
export default {
  name: "homeIndex",
  created() {
    this.getChannels();
  },
  components: {
    articleList,
    channelEdit
  },
  data() {
    return {
      active: 0,
      //用户频道列表数据
      ChannelsInfo: [],
      isChannelEditShow:false, //控制编辑频道的显示状态
    };
  },
  computed:{
    ...mapState([
      'user'
    ])
  },
  methods: {
    //加载频道数据
    async getChannels() {
      let channels = []
      if(this.user){
        //登陆了
        const { data } = await getUserChannels();
        channels = data.data.channels;
      }else{
        //没有登陆,判断是否有本地存储的频道列表数据
        const localChannels = getItem('user-channels')
        if(localChannels){
          channels = localChannels
        }else{
          //如果没有登录，也没有本地存储，那么就请求后台设置的默认推荐列表
          const { data } = await getUserChannels();
          channels = data.data.channels;
        }
      }
      this.ChannelsInfo = channels
      
    },
    //更新激活状态
    // updateActive(index){
    //   this.active = index
    // }
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
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line {
      width: 20px !important;
      height: 3px;
      background-color: #3692fa;
      margin-bottom: 6px;
    }
    .wap-nav-placeholder{
        width: 33px;
        flex-shrink: 0;
    }
  }
  .wap-nav-wrap {
        position: fixed;
        width: 33px;
        right: 0;
        height: 43px;
        background-color: #fff;
        opacity: .8;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon{
            font-size: 24px;
        }
       
    }
}
body {
  .channel-edit-popup {
    height: 100%;
  }
}
</style>