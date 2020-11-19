<template>
  <div class="channel-edit">
    <van-cell center :border='false'>
      <div slot='title' class='channel-title'>我的频道</div>
      <van-button type="danger" plain round size="mini" @click="isEdit = !isEdit" >{{isEdit ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
        <van-grid-item v-for="(channel,index) in userChannel" 
        :key="index"  
        :text="channel.name"
        class="grid-item "
        :class="{'channelActive': index === isActive}"
        :icon='isEdit && index!==0 ? "clear" : "" '
        @click="onUserChannelClick(channel,index)"
          />
    </van-grid>
    <van-cell center :border='false'>
      <div slot='title' class='channel-title'>频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
        <van-grid-item 
        v-for="(reChannel,index) in recommendChannels" 
        :key="index"  :text="reChannel.name" 
        class="grid-item" 
        @click='addChannel(reChannel)'
        />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {getAllChannels,addUserChannels,delUserChannels} from '../api/channels'
import { setItem } from '../utils/storage';
export default {
  name: "channelEdit",
  created(){
    this.loadAllChannels()
  },
  props:{
      userChannel:{
          type:Array,
          required:true
      },
      isActive:{
        type:Number,
        required:true
      }
  },
  data(){
    return{
      allChannels:[],
      isEdit:false
    }
  },
  computed:{
    //推荐列表
    recommendChannels(){
      return this.allChannels.filter(channels=>{
        //判断channel 是否属于用户频道
        return ! this.userChannel.find(userChannel=>{
          //判断channel 是否属于用户频道
          return userChannel.id == channels.id
        })
      })
    },
    ...mapState([
      'user'
    ])

  },
  methods:{
    //获取所有频道数据
    async loadAllChannels(){
      const {data}  = await getAllChannels()
      this.allChannels = data.data.channels 
    },
    //增加用户频道
    async addChannel(channel){
      this.userChannel.push(channel)
      //todo:数据持久化
      if(this.user){
        //登录了，数据存储到线上
        await addUserChannels({
          channels:[
            {
              id:channel.id,
              seq:this.userChannel.length
            }
          ]
        })
      }else{
        //没有登录，数据存储到本地
        setItem('user-channels',this.userChannel)
      }
    },

    onUserChannelClick(channel,index){
      //编辑状态删除item
      if(this.isEdit&&index!==0){
        this.delChannel(channel,index)
      }else{
        this.switchChannel(index)
      }
      //非编辑，切换频道
    },
    //删除频道
    async delChannel(channel,index){
      //如果删除的的是当前激活频道之前的频道
      if(index <= this.isActive){
        this.$emit("isActiveChannel",this.isActive-1)
      }
      this.userChannel.splice(index,1)
      //todo:数据持久化
        if(this.user){
        //登录了，数据存储到线上
        await  delUserChannels (channel.id)
      }else{
        //没有登录，数据存储到本地
        setItem('user-channels',this.userChannel)
      }
    },
    //切换频道
    switchChannel(index){
      //关闭弹出层
      this.$emit('closeChannelEditShow')
      //更新频道激活
      this.$emit('isActiveChannel',index)
    }

  }
};
</script>

<style lang='less' scoped>
.channel-edit {
  padding-top: 54px;
  .channel-title{
      font-size: 16px;
      color: rgb(20, 20, 20);
  }
  .grid-item{
      width: 80px;
      height: 43px;
      /deep/.van-grid-item__content{
          background-color: #f4f5f6;
          .van-grid-item__text{
              margin-top: 0;
              font-size: 14px;
              color:rgb(65, 87, 128);
          }
          
      }
      /deep/.van-grid-item__icon{
            position: absolute;
            right: -7px;
            top: -7px;
            font-size: 16px;
            color:gray;
      }
      
  }
  .channelActive{
    /deep/.van-grid-item__text{
       color: yellowgreen !important;
    }
   
  }
}
</style>