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

const router = createRouter({
  history: createWebHashHistory(),
  routes : [
    { path: '/', 
      component: LoginComponent 
    },{
      path: '/statistics', 
      component: Statistics
    },{
      path: '/blog', 
      component: Blog
    },{
      path: '/record', 
      component: Record
    },{
      path: '/home', 
      component: Home
    },{
      path:'/img',
      component:Carousel
    },{
      path:'/kno',
      component:Knowledge
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
      ]
    },{
      path:'/side',
      component:Side
    },{
      path:'/week',
      component:Week
    },{
      path:'/month',
      component:Month
    },{
      path:'/annual',
      component:Annual
    },{
      path:'/drag',
      component:Drag
    },{
      path:'/spend',
      component: Spend
    }
   ]
 }
)

export default router
