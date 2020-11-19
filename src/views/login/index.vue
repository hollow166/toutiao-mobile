<template>
  <div class="login">
    <!--导航栏-->
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <!--登录表单-->
    <van-form @submit="onlogin" :show-error='false' :show-error-message='false' @failed='onFailed' validate-first ref='login-form'>
      <van-cell-group>
        <van-field
          v-model="userInfo.mobile"
          icon-prefix="toutiao"
          left-icon="shouji"
          placeholder="请输入手机号"
          name='mobile'
          :rules="formRules.mobile"
        />
        <van-field
          v-model="userInfo.code"
          icon-prefix="toutiao"
          left-icon="yanzhengma"
          placeholder="请输入验证码"
          name='code'
          :rules="formRules.code"
        >
          <template #button>
          <van-count-down 
            :time="1000*60" 
            format='ss s'
            v-if='isShowDate'
            @finish='isShowDate = false'
          />
            <van-button size="mini" round class="send-btn" @click.prevent="onSend" v-else :loading='isSendSmsLoading'>发送验证码</van-button>
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" type="info" block>登录</van-button>
        </div>
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "../../api/user";
export default {
  name: "loginIndex",
  data() {
    return {
      //登录用户信息
      userInfo: {
        mobile: "",
        code: "",
      },
      //表单验证规则
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机格式错误" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      isShowDate:false,
      isSendSmsLoading:false
    };
  },
  methods: {
    //用户登录
    async onlogin() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
      });
      try {
        const {data} = await login(this.userInfo);
        this.$toast.success("登录成功");
        this.$store.commit('setUser',data.data)
        this.$router.back()
      } catch (err) {
        console.log(err);
        this.$toast.success("登录失败，手机号或验证码错误");
      }
    },
    onFailed(error){
        if(error.errors[0]){
            this.$toast({
                message:error.errors[0].message,
                position:'top'
            })
        }
    },
    //发送验证码
    async onSend(){
        try{
            //校验手机号码
            await this.$refs['login-form'].validate('mobile')
            //展示loading 的加载状态，防止用户多次请求
            this.isSendSmsLoading = true
            //验证通过，获取验证码
            await sendSms(this.userInfo.mobile)
            this.isShowDate = true
        }catch(err){
            let message = ''
            //发送验证码失败的错误
            if(err&&err.response&&err.response.status === 429){
                message = '发送消息太频繁了，请稍后重试'
            }else if(err.name === 'mobile'){
                //表单验证失败的错误
                message = err.message
            }else{
                //未知错误
                message = '发送失败，请稍后重试'
            }
            this.$toast({
                message,
                position:'top'
            })
        }
        this.isSendSmsLoading = false

    }
  },
};
</script>

<style lang='less' scoped>
.login-btn-wrap {
  padding: 26px 16px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
    .van-button__text {
      font-size: 15px;
    }
  }
}
.login {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
}
</style>