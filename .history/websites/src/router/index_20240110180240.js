//用于配置路由组件
import { createRouter, createWebHashHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import Statistics  from  '../components/smoking-statistics.vue';
import Record from  '../components/smoking-record.vue';
import Blog from '../components/blog-page.vue';
import Home from '../components/home-page.vue';
import Carousel from '../components/img-carousel.vue';
import Knowledge from '../components/knowledge-page.vue';
import User from '../components/user-statistics.vue';
import Side from '../components/side-bar.vue';
import Week from '../components/weekly-statistics.vue';
import User_info from '../components/user-information.vue';
import User_collect from '../components/user-collection.vue';
import Month from '../components/monthly-statistics.vue';
import Annual from '../components/annual-statistics.vue';
import Drag from '../components/Drop-downMenu.vue';
import Spend from '../components/Spending-statistics.vue';
import Scroll from '../components/scroll-selector.vue';
import Count from '../components/smoking-count.vue';
import Daily from '../components/daily-records.vue';                                                          
import Background from '../components/background-vue.vue';
import Button from '../components/button-usecase.vue';
import Calendar from '../components/calendar-usecase.vue';
import BlogDetail from '../components/BlogDetail';

const router = createRouter({
  history: createWebHashHistory(),
  routes : [
    { path: '/', 
      component: LoginComponent 
    },{
      path: '/statistics', 
      component: Statistics,
      meta: { requiresAuth: true }, // 表示需要身份验证
    },{
      path: '/blog', 
      component: Blog,
      meta: { requiresAuth: true }
    },{
      path: '/record', 
      component: Record,
      meta: { requiresAuth: true }
    },{
      path: '/home', 
      component: Home,
      meta: { requiresAuth: true }
    },{
      path:'/img',
      component:Carousel,
      meta: { requiresAuth: true }
    },{
      path:'/kno',
      component:Knowledge,
      meta: { requiresAuth: true }
    },{
      path:'/us',
      component:User,
      children: [
        {
        path: 'user-statistics',
        name: '个人中心',
        children:[
          {
            path: 'user_info',
            name: '个人简介',
            component:User_info
          },
        
      
          {
            path: 'user_collect',
            name: '我的合集',
            component:User_collect
          }
        ]
        }
      ],
      meta: { requiresAuth: true }
    },{
      path:'/side',
      component:Side,
      meta: { requiresAuth: true }
    },{
      path:'/week',
      component:Week,
      meta: { requiresAuth: true }
    },{
      path:'/month',
      component:Month,
      meta: { requiresAuth: true }
    },{
      path:'/annual',
      component:Annual,
      meta: { requiresAuth: true }
    },{
      path:'/drag',
      component:Drag,
      meta: { requiresAuth: true }
    },{
      path:'/spend',
      component: Spend,
      meta: { requiresAuth: true }
    },{
      path:'/scroll',
      component: Scroll,
      meta: { requiresAuth: true }
    },{
      path:'/count',
      component: Count,
      meta: { requiresAuth: true }
    },{
      path:'/daily',
      component: Daily,
      meta: { requiresAuth: true }
    },{
      path:'/background',
      component: Background,
      meta: { requiresAuth: true }
    },{
      path:'/btn',
      component: Button,
      meta: { requiresAuth: true }
    },{
      path:'/calendar',
      component: Calendar,
      meta: { requiresAuth: true }
    },{
      path: '/blog/:blogId',
      name: 'BlogDetail',
      component: BlogDetail
    }
   ]
 }
)

export default router
