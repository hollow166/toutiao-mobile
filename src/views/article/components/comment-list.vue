<template>
  <div class="comment-lsit">
    <van-cell>全部评论</van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >

        <comment-item 
            v-for="(comment,index) in list"
            :key="index"
            :comment='comment'
            @reply-comment="$emit('reply-click',$event)"
        ></comment-item>
    </van-list>
  </div>
</template>

<script>
import commentItem from './comment-item'
import {getComments} from '../../../api/comment'
export default {
  name: "commentList",
  props:{
      source:{
          type:[String,Number,Object],
          required:true
      },
      //获取文章评论 使用 a
      //获取评论 使用 c
      type:{
        type:String,
        default:'a'
      },
      list:{
          type:Array,
          default:()=>[]
      }
  },
  components:{
      commentItem
  },
   data() {
    return {
    //   list: [],
      loading: false,
      finished: false,
      offset:null,
      limit:10
    };
  },
  methods: {
      //加载文章评论
    async onLoad() {
        //1.
        const{data}= await getComments({
            type:this.type,
            source:this.source.toString(),
            offset:this.offset,
            limit:this.limit
        })
        //获取到评论的数量并通过$emit触发update-total-count事件来传给父组件
        this.$emit('update-total-count',data.data.total_count)
        //2.
        const{results} = data.data
        this.list.push(...results)
        //3.
        this.loading =false

        //4.
        if(results.length){
            this.offset = data.data.last_id
        }else{
            this.finished = true
        }
    },
  },
};
</script>

<style lang='less' scoped>
</style>