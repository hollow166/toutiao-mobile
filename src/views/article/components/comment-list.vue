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
            type:'a',
            source:this.source,
            offset:this.offset,
            limit:this.limit
        })
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