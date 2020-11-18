<template>
  <div class="mine">
    <van-cell-group class="myInfo" v-if='user'>
      <van-cell
        center
        class="baseInfo"
        :border="false"
      >
        <van-image
          width="50"
          height="50"
          slot="icon"
          fit="cover"
          class="avatar"
          round
          :src="currentUserInfo.photo"
        />
        <div slot="title" class="name">{{currentUserInfo.name}}</div>
        <van-button size="small" round class="update-btn">编辑资料</van-button>
      </van-cell>
      <van-grid :border="false" class="dataInfo">
        <van-grid-item class="dataInfo-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUserInfo.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="dataInfo-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUserInfo.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="dataInfo-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUserInfo.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="dataInfo-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{currentUserInfo.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div  v-else class='not-login'>
        <div class='mobile' @click="$router.push('/login')"><i class='toutiao toutiao-shouji'></i></div>
        <div class='text'>登录 / 注册</div>
    </div>

    <van-grid :column-num="2" class="nav-grid mb-4">
      <van-grid-item
        icon-prefix="toutiao"
        icon="shoucang"
        text="收藏"
        class="nav-grid-item"
      >
      </van-grid-item>
      <van-grid-item
        icon-prefix="toutiao"
        icon="lishi"
        text="历史"
        class="nav-grid-item"
      >
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell title="小爱同学" is-link to="/" class='mb-4' />
    <van-cell title="退出登录" class='logout-cell' v-if='user' @click='onLogout'/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {getCurrentUserInfo}from '../../api/user'
export default {
  name: "mineIndex",
  created(){
    this.loadCurrentUser()
  },
  data(){
      return{
        currentUserInfo:{}
      }
  },
  methods:{
    //用户退出
    onLogout(){
      //提示用户是否退出
      this.$dialog.confirm({
        title:'退出',
        message:'确认退出吗？'
      }).then(()=>{
        //清楚登录状态(token)
        this.$store.commit('setUser',null)
      }).catch(()=>{

      })
    },
    //获取当前用户信息
    async loadCurrentUser(){
      const{data} = await getCurrentUserInfo()
      this.currentUserInfo = data.data
    }
  },
  computed: {
      ...mapState([
          'user'
      ])
  },

};
</script>

<style lang='less' scoped>
.mine {
  .myInfo {
    background-color: gray;
    .baseInfo {
      background-color: unset;
      height: 115px;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        color: #fff;
        font-size: 15px;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        line-height: 16px;
        color: #666;
      }
    }
    .dataInfo {
      .dataInfo-item {
        height: 65px;
        color: #fff;
        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count {
            font-size: 18px;
          }
          .text {
            font-size: 11px;
          }
        }
      }
    }
    /deep/.van-grid-item__content {
      background-color: unset;
    }
  }
  /deep/.nav-grid {
    .nav-grid-item {
      height: 70px;
      .toutiao {
        font-size: 22px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      .van-grid-item__text{
          font-size: 14px;
          color: #333;
      }
    }
  }
  .logout-cell{
      text-align: center;
      color: #d86262;
  }
  .mb-4{
      margin-bottom: 4px;
  }
  .not-login{
      height: 180px;
      background-color: gray;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile{
          height: 66px;
          width: 66px;
          background-color: #fff;
          line-height: 66px;
          text-align: center;
          border-radius: 50%;
          .toutiao{
              font-size: 55px;
              color: grey;
          }
      }
      .text{
          color: #fff;
          font-size: 14px;
      }

  }
}
</style>