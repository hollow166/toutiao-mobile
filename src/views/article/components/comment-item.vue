<template>
  <van-cell class="comment-item">
    <van-image
      class="avatar"
      slot="icon"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title">
      <div class="title-wrap">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="like-wrap">
          <van-icon
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            class="like-icon"
            @click="onCommentLike"
            :class="{ liked: comment.is_liking }"
          ></van-icon>
          <span class="like-count">{{ comment.like_count }}</span>
        </div>
      </div>
      <div class="content">{{ comment.content }}</div>
      <div>
        <span class="pubdate">{{
          comment.pubdate | datetime("YYYY-MM-DD HH:mm")
        }}</span>
        <van-button round size="mini" class="replay-btn" @click="$emit('reply-comment',comment)"
          >{{ comment.reply_count }} 回复</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { delCommentLike } from '../../../api/comment';
export default {
  name: "commentItem",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    async onCommentLike() {
      this.$toast.loading({
        message: "点赞中···",
        forbidClick: true,
      });
      const commentId = this.comment.com_id.toString();
      if (this.comment.is_liking) {
        //取消点赞
        await delCommentLike(commentId);
        
        this.comment.like_count--;
      } else {
        //添加点赞
        // await addCommentLike(commentId)
        this.comment.like_count++;
      }
      this.comment.is_liking = !this.comment.is_liking;
      this.$toast.success(`${this.comment.is_liking ? "" : "取消"}点赞成功`);
    },
  },
};
</script>

<style lang='less' scoped>
.comment-item {
  .avatar {
    width: 35px;
    height: 35px;
    margin: 13px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    .name {
      font-size: 14px;
      color: #406599;
    }
    .like-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .content {
    font-size: 16px;
    color: #222;
  }
  .pubdate {
    font-size: 10px;
    margin-right: 10px;
  }
  .like-icon.liked {
    color: #ff69b4;
  }
}
</style>