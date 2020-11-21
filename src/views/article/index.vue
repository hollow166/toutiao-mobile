<template>
  <div class="article">
    <!--导航栏-->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <div class="article-wrap">
      <!--文章标题及内容-->
      <h1 class="title">{{ articleInfo.title }}</h1>
      <van-cell center class="user-info">
        <div slot="title" class="name">{{ articleInfo.aut_name }}</div>
        <van-image
          class="avatar"
          slot="icon"
          round
          size="small"
          :src="articleInfo.aut_photo"
        />
        <div slot="label" class="pubdate">
          {{ articleInfo.pubdate | relativeTime }}
        </div>
        <van-button
          :loading="isFollowLoading"
          :type="articleInfo.is_followed ? 'default' : 'info'"
          round
          size="small"
          class="follow-btn"
          :icon="articleInfo.is_followed ? '' : 'plus'"
          @click="onFollowed"
        >
          {{ articleInfo.is_followed ? "已关注" : "关注" }}
        </van-button>
      </van-cell>
      <div
        class="markdown-body"
        v-html="articleInfo.content"
        ref="articleInfo-content"
      ></div>
      <!--文章评论列表-->
      <comment-list 
        :source="articleId" 
        :list="commentsLsit" 
        @update-total-count="totalCommentCount = $event "
        @reply-click="onReplyClick"
      ></comment-list>
      <!--文章评论列表-->
    </div>
    <!--文章底部区域-->
    <div class="comment-container">
      <van-button class="coomment-btn" type="default" round size="small" @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="totalCommentCount" color="#777"> </van-icon>
      <van-icon
        :name="articleInfo.is_collected ? 'star' : 'star-o'"
        :color="articleInfo.is_collected ? 'yellow' : '#777'"
        @click="onCollect"
        :loading="isCollectLoading"
      >
      </van-icon>
      <van-icon
        :name="articleInfo.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="articleInfo.attitude === 1 ? 'red' : '#777'"
        @click="onLike"
      >
      </van-icon>
      <van-icon name="share" color="#777"> </van-icon>
    </div>
    <!--发布评论-->
    <div>
      <van-popup
        v-model="isPostShow"
        position="bottom"
      >
        <post-comment :target='articleId' @postSuccess='onPostSuccess'></post-comment>
      </van-popup>
    </div>
    <!--发布评论-->

    <!-- 评论回复 -->
    <div>
      <van-popup
        v-model="isCommentShow"
        position="bottom"
      >
        <comment-reply 
          :comment="commentReply"
          @close="isCommentShow = false"
          v-if=" isCommentShow"
          :articleId="articleId"
         ></comment-reply>
      </van-popup>
    </div>
    <!-- 评论回复 -->

  </div>
</template>

<script>
import commentList from "../article/components/comment-list.vue";
import "../article/github-markdown.css";
import { ImagePreview } from "vant";
import { getArticleInfo } from "../../api/articles";
import { delFollow, addFollow } from "../../api/user";
import postComment from '../article/components/post-comment'
import commentReply from '../article/components/comment_-reply'
import {
  addCollection,
  delCollection,
  addLike,
  delLike,
} from "../../api/articles";

export default {
  name: "articleIndex",
  props: {
    articleId: {
      type: [String, Object, Number],
      required: true,
    },
  },
  components: {
    commentList,
    postComment,
    commentReply,

  },
  created() {
    this.loadArticleInfo();
  },
  data() {
    return {
      articleInfo: {}, //文章对象数据
      isFollowLoading: false, //控制按钮加载状态
      isCollectLoading: false,
      isPostShow:false,//弹出层的控制
      isCommentShow:false,//评论回复弹出层的回复
      commentsLsit:[],//文章评论列表数组
      totalCommentCount:0,//评论的总数
      commentReply:{}
    };
  },
  methods: {
    //获取文章详情通过article_id
    async loadArticleInfo() {
      const { data } = await getArticleInfo(this.articleId);
      this.articleInfo = data.data;
      this.$nextTick(() => {
        this.handlePerviewImage();
      });
    },
    //图片处理
    handlePerviewImage() {
      //1.在文章中获取到dom容器
      const articleContent = this.$refs["articleInfo-content"];
      //   console.log(articleContent)
      //2.得到所有的的img标签
      //this.$nextTick 是vue中提供的一个方法，数据修改影响视图更新，但是Dom 数据不是立即的
      // 所以在数据改变要立即修改被数据改变影响的视图Dom,需要调用this.$nextTick()方法中
      const imgs = articleContent.querySelectorAll("img");
      const imgPaths = [];
      //3.循环img标签，添加点击事件
      imgs.forEach((img, index) => {
        imgPaths.push(img.src);
        img.onclick = () => {
          //4.在事件处理函数中调用imagePreview()预览
          ImagePreview({
            images: imgPaths,

            startPosition: index,
          });
        };
      });
    },
    //更新用户关注状态
    async onFollowed() {
      this.isFollowLoading = true;
      if (this.articleInfo.is_followed) {
        //用户关注状态下点击 取消关注
        const { data } = await delFollow(this.articleInfo.aut_id);
        console.log(data);
      } else {
        const { data } = await addFollow(this.articleInfo.aut_id);
        console.log(data);
      }
      this.articleInfo.is_followed = !this.articleInfo.is_followed;
      this.isFollowLoading = false;
    },
    //取消和添加收藏文章的事件监听
    async onCollect() {
      this.isCollectLoading = true;
      if (this.articleInfo.is_collect) {
        //取消收藏
        await delCollection(this.articleInfo.art_id);
      } else {
        //添加收藏
        await addCollection(this.articleInfo.art_id);
      }
      this.articleInfo.is_collected = !this.articleInfo.is_collected;
      this.isCollectLoading = false;
      this.$toast.success(
        `${this.articleInfo.is_collected ? "" : "取消"}收藏成功`
      );
    },
    //监听文章的点赞状态
    async onLike() {
      this.$toast.loading({
        message: "操作中···",
        forbidClick: true,
      });
      if (this.articleInfo.attitude === 1) {
        //取消文章点赞
        this.articleInfo.attitude = -1;
        await delLike(this.articleId);
      } else {
        //添加文章点赞
        this.articleInfo.attitude = 1;
        await addLike(this.articleId);
      }
      this.$toast.success(
        `${this.articleInfo.attitude === 1 ? "" : "取消"} 点赞成功`
      );
    },

    //监听评论发表成功的事件
    onPostSuccess(comment){
        this.commentsLsit.unshift(comment)
        this.totalCommentCount++
        this.isPostShow = false
    },

    //监听评论列表项里的回复按钮点击事件
    onReplyClick(comment){
      this.isCommentShow = true
      // console.log(comment)
      this.commentReply = comment
    }
  },
};
</script>

<style lang='less' scoped>
.article {
  .title {
    color: #3a3a3a;
    padding: 14px;
    font-size: 20px;
    background-color: #fff;
    margin: 0;
  }
  .user-info {
    .name {
      font-size: 12px;
      color: #333;
    }
    .pubdate {
      font-size: 11px;
      color: #b4b4b4;
    }
    .avatar {
      margin-right: 8px;
      width: 35px;
      height: 35px;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
    }
  }
}
ul {
  list-style: unset;
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
  list-style: unset;
}
.comment-container {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .coomment-btn {
    width: 150px;
  }
}
.article-wrap {
  position: fixed;
  left: 0;
  top: 46px;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}
</style>