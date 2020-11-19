//请求模块
import axios from 'axios'
import store from '../store'
const http = axios.create({
    baseURL:"/api"
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

export default http