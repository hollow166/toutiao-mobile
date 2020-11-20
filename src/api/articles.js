//文章相关请求封装

import http from '../utils/request'

//获取文章列表
export const getArticles = params=>{
    return http({
        method:'get',
        url:'/app/v1_1/articles',
        params
    })
}

//获取文章详情
export const getArticleInfo = article_id=>{
    return http({
        method:'get',
        url:`/app/v1_0/articles/${article_id}`
    })
}


//添加文章收藏
export const addCollection = article_id=>{
    return http({
        method:'post',
        url:'/app/v1_0/article/collections',
        data:{
            target:article_id
        }
    })
}

//取消文章收藏
export const delCollection = article_id=>{
    return http({
        method:'delete',
        url:`/app/v1_0/article/collections/${article_id}`
    })
}


//添加文章点赞
export const addLike = article_id=>{
    return http({
        method:'post',
        url:'/app/v1_0/article/likings',
        data:{
            target:article_id
        }
    })
}


//取消文章点赞
export const delLike = article_id=>{
    return http({
        method:'delete',
        url:`/app/v1_0/article/likings/${article_id}`
    })
}


