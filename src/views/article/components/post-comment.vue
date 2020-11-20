<template>
  <div class="post-comment">
    <van-field
      v-model="message"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button size="small" @click="onPost" :disabled="!message">发布</van-button>
  </div>
</template>

<script>
import {addComment} from '../../../api/comment'
export default {
  name: "postComment",
  props:{
      articleId:{
          type:[String, Object, Number],
          default:null
      },
      //文章id
      target:{
          type:[String, Object, Number],
          required:true
      }
  },
  data(){
      return{
          message:''//输入框内容
      }
  },
  methods: {
      async onPost(){
          const{data} = await addComment({
              target:this.target,
              content:this.message,
              art_id:this.articleId ? this.articleId.toString() : null//文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
              
          })
          this.$toast.success('发布成功')
          this.message = ''
          this.$emit('postSuccess',data.data.new_obj)
      }
  },
};
</script>

<style lang='less' scoped>
.post-comment{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px;
}
</style>