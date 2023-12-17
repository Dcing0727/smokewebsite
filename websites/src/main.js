import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router' 
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import HighchartsVue from 'highcharts-vue';
//import NavBar from './components/nav-bar.vue'
//import LoginComponent from './components/LoginComponent.vue'

// 导航守卫，用于验证用户是否登录
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (to.meta.requiresAuth) {
    // 如果目标路由需要身份验证
    if (isAuthenticated) {
      // 用户已登录，继续导航
      next();
    } else {
      // 用户未登录，重定向到登录页面
      next('/');
      alert('请登录');
    }
  } else {
    // 目标路由不需要身份验证，直接导航
    next();
  }
});






createApp(App)
  .use(router)
  .use(HighchartsVue)
  .use(ElementPlus)
  .mount('#app')
