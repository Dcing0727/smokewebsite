
//用于配置路由组件
import { createRouter, createWebHashHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import Statistics  from   '../components/smoking-statistics.vue';

const routes = [
  { path: '/', 
    component: LoginComponent 
  },{
    path: '/statistics', 
    component: Statistics
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
