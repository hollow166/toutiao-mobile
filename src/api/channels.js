/**
 * 频道相关的接口封装
 */
import http from '../utils/request'
/**
 * 获取所有频道列表
 */
export const getAllChannels = ()=>{
    return http({
        method:'get',
        url:"app/v1_0/channels"
    })
}

/**
 * 添加用户频道列表
 */
export const addUserChannels = data=>{
    return http({
        method:'PATCH',
        url:"app/v1_0/user/channels",
        data
    })
}


/**
 * 删除指定用户频道列表
 */
export const delUserChannels = channelId=>{
    return http({
        method:'DELETE',
        url: `/app/v1_0/user/channels/${channelId}`
    })
}