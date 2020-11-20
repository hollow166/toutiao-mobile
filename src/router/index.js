import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    component:()=>import('../views/layout/index.vue'),
    children:[
      {
        //默认子路由
        path:'',
        name:"home",
        component:()=>import('../views/home/index.vue')
      },
      {
        //问答路由
        path:'/qa',
        name:'question',
        component:()=>import('../views/question/index.vue')
      },
      {
        //视频路由
        path:'/video',
        name:'video',
        component:()=>import('../views/video/index.vue')
      },
      {
        //我的路由
        path:'/mine',
        name:'mine',
        component:()=>import('../views/mine/index.vue')
      },
    ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login/index.vue')
  },
  {
    path:'/search',
    name:'search',
    component:()=>import('../views/search/index.vue')
  },
  {
    path:"/article/:articleId",
    name:"article",
    component:()=>import('../views/article/index.vue'),
    props:true
  }
];

const router = new VueRouter({
  routes
});

export default router;