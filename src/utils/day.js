//dayjs的相关配置
import Vue from 'vue'
import dayjs from 'dayjs'

//配置使用中文语言包
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

//配置使用处理相对时间
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)


Vue.filter('relativeTime',value=>{
    return dayjs(value).from(dayjs())
})



