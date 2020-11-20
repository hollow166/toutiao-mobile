//文章评论相关模块封装
import http from '../utils/request'

/**
 * 获取文章相关评论和回复
 */
export const getComments = params=>{
    return http({
        method:'get',
        url:"/app/v1_0/comments",
        params
    })
}

/**
 * 对文章相关评论和回复点赞
 */
export const addCommentLike = target=>{
    return http({
        method:'post',
        url:" /app/v1_0/comment/likings",
        data:{
            target
        }
    })
}

/**
 * 对文章相关评论和回复取消点赞
 */
export const delCommentLike = commentId=>{
    return http({
        method:'delete',
        url:`/app/v1_0/comment/likings/${commentId}`,
    })
}


/**
 * 添加评论或评论回复
 */
export const addComment = data=>{
    return http({
        method:'post',
        url:'/app/v1_0/comments',
        data
    })
}