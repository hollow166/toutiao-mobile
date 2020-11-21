<template>
  <div class="comment-reply">
    <!-- 头部信息 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon name="cross" slot="left" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <!-- 头部信息 -->

    <!-- 当前评论项 -->
    <comment-item :comment="comment"></comment-item>
    <!-- 当前评论项 -->

    <!-- 评论回复 -->
    <van-cell title="所有回复"></van-cell>
    <comment-list :source="comment.com_id" type="c" :list='commnetList'></comment-list>
    <!-- 评论回复 -->
    <!-- 文章底部区域 -->
    <div class="comment-container">
      <van-button
        class="coomment-btn"
        type="default"
        round
        size="small"
        @click="isReplyShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 发布评论弹出层 -->
    <van-popup v-model="isReplyShow" position="bottom">
      <post-comment :target="comment.com_id" :articleId="articleId" @postSuccess='onPostSuccess'> </post-comment>
    </van-popup>
    <!-- 发布评论弹出层 -->
  </div>
</template>

<script>
import commentItem from "../components/comment-item";
import commentList from "../components/comment-list";
import postComment from '../components/post-comment'

export default {
  name: "commentReply",
  props: {
    comment: {
      type: Object,
      required: true,
    },
    articleId:{
        type:[Number,String,Object],
        required:true
    },
  },
  created(){
    
  },
  data() {
    return {
        isReplyShow:false,
        commentList:[]//评论的回复列表
       
    };
  },
  components: {
    commentItem,
    commentList,
    postComment
  },
  methods:{
    onPostSuccess(comment){
        //将发布成功的评论放到评论列表的顶部
        this.commentList.unshift(comment)
        //关闭发复评论弹出层
        this.isReplyShow = false
        //更新评论的回复数量
        this.comment.reply_count++
        
    }
  }
};
</script>

<style lang='less' scoped>
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
    width: 200px;
  }
}
</style>