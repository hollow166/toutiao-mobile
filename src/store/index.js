import Vue from "vue";
import Vuex from "vuex";
import {setItem,getItem} from '../utils/storage'

Vue.use(Vuex);
const userKey = 'toutiao-user'
export default new Vuex.Store({
  state: {
    user:getItem(userKey),//当前用户的登录状态（token)
  },
  mutations: {
    setUser(state,data){
      state.user = data
      //为了页面刷新数据丢失，我们还需要把数据放在本地存储中，这仅仅是为了持久化数据
     setItem(userKey,state.user)
    },
 
  },
  actions: {},
  modules: {}
});
