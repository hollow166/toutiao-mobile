//文章相关请求封装

import http from '../utils/request'

//获取文章列表
export const getArticles = params=>{
    return http({
        methos:'get',
        url:'/app/v1_1/articles',
        params
    })
}
