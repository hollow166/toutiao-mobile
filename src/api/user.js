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

export const sendSms = mobile=>{
    return http({
        method:'get',
        url:`/app/v1_0/sms/codes/${mobile}`,
    })
}