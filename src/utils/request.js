//请求模块
import axios from 'axios'
const http = axios.create({
    baseURL:"http://ttapi.research.itcast.cn/"
})

export default http