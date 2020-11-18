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