//用于配置路由组件
import { createRouter, createWebHashHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import Statistics  from  '../components/smoking-statistics.vue';
import Record from  '../components/smoking-record.vue';
import Blog from '../components/blog-page.vue';
import Home from '../components/home-page.vue';
import Carousel from '../components/img-carousel.vue';
import Knowledge from '../components/knowledge-page.vue';


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
    }
  
  ]
  
})

export default router
