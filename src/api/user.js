//用户相关请求模块
import http from '../utils/request'


//登录注册
export const login = data=>{
    return http({
        method:'post',
        url:'/app/v1_0/authorizations',
        data
    })
}
//验证码的发送
export const sendSms = mobile=>{
    return http({
        method:'get',
        url:`/app/v1_0/sms/codes/${mobile}`,
    })
}

//获取用户登录信息
export const getCurrentUserInfo = ()=>{
    return http({
        method:"get",
        url:"/app/v1_0/user",
        // headers:{
        //     Authorization:`Bearer ${store.state.user.token}`
        // }
    })
}

//获取用户频道数据
export const getUserChannels = ()=>{
    return http({
        method:'get',
        url:'/app/v1_0/user/channels'
    })
}


//关注用户
export const addFollow =userId=>{
    return http({
        method:'post',
        url:'/app/v1_0/user/followings',
        data:{
            target:userId
        }
    })
}

//取消用户关注
export const delFollow = userId=>{
    return http({
        method:'DELETE',
        url:`/app/v1_0/user/followings/${userId}`
    })
}