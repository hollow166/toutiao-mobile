/**
 * 搜索的相关接口封装
 */

 import http from '../utils/request'

/**
 * 获取联想建议
 */
export const getSearchSuggestInfo = q =>{
    return http({
        method:'get',
        url:'/app/v1_0/suggestion',
        params:{
            q//联想搜索关键词
        }
    })
}

/**
 * 获取搜索结果
 */
export const getSearchResult = params =>{
    return http({
        method:'get',
        url:'/app/v1_0/search',
        params
    })
}


/**
 * 获取用户搜索历史
 */
export const getSearchHistory = () =>{
    return http({
        method:'get',
        url:'/app/v1_0/search/histories',
    })
}