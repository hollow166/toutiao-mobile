//请求模块
import axios from 'axios'
import store from '../store'
import JSONbig from 'json-bigint'
import {Toast} from 'vant'
import router from '../router/index'

const refreshTokenReq = axios.create({
  baseURL:'/api'
})
const http = axios.create({
    baseURL:"/api",
    transformResponse:[function(data){
      try{
        return JSONbig.parse(data)
      }catch(err){
        // console.log('转换失败',err)
        return data
      }
    }],
    
})

//请求拦截器
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    const {user} = store.state
    //如果用户已登录，统一给接口设置登录信息
    if(user){
        config.headers.Authorization=`Bearer ${user.token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });



  //响应拦截器
  http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response.status
    if(status === 400){
      Toast.fail('客户端请求参数异常')
    }else if(status === 401){
      const {user} = store.state
      if(!user|| !user.token){
         return redirectLogin()
      }
      try{
        const {data} = await refreshTokenReq({
          method:'put',
          url:'/app/v1_0/authorizations',
          headers:{
            Authorization:`Bearer ${user.refresh_token}`
          }
        })
        user.token = data.data.token 
        store.commit('setUser',user)
        return http(error.config)
      }catch{
        redirectLogin()
      }
    }else if(status === 403){
      Toast.fail('没有权限操作')
    }else if(status === 500){
      Toast.fail('服务端异常，请稍后重试')
    }
    return Promise.reject(error);
  });

  function redirectLogin(){
    router.replace('/login')
  }

export default http