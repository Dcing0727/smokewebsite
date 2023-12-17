import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router' 
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import HighchartsVue from 'highcharts-vue';
import axios from 'axios';
//import NavBar from './components/nav-bar.vue'
//import LoginComponent from './components/LoginComponent.vue'

// 导航守卫，用于验证用户是否登录
// 在全局变量中添加标记
// 在全局变量中添加标记
let tokenVerified = false;

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (to.meta.requiresAuth) {
    // 如果目标路由需要身份验证
    if (isAuthenticated && !tokenVerified) {
      try {
        // 验证JWT令牌
        const response = await axios.get('http://localhost:3000/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data && response.data.success) {
          console.log('令牌正确');
          // 令牌有效，标记为已验证，继续导航
          console.log(response.data)
          tokenVerified = true;
          next('/statistics');
        } else {
          // 令牌无效，清除本地存储中的 token，重定向到登录页面
          console.log('令牌失败');
          localStorage.removeItem('token');
          tokenVerified = false; // 添加这一行
          next('/');
          alert('请登录');
        }
      } catch (error) {
        // 请求失败，令牌无效，清除本地存储中的 token，重定向到登录页面
        console.error('令牌验证失败', error);
        localStorage.removeItem('token');
        tokenVerified = false; 
        next('/');
        alert('请登录');
      }
    } else if (!isAuthenticated) {
      // 用户未登录，清除本地存储中的 token，重定向到登录页面
      localStorage.removeItem('token');
      tokenVerified = false; // 添加这一行
      next('/');
      alert('token为空请登录');
    } else {
      // 已经验证过，继续导航
      alert('已经验证过token，继续导航');
      next();
    }
  } else {
    // 目标路由不需要身份验证，直接导航
    if (to.meta.requiresAuth && tokenVerified) {
      // 当从需要身份验证的路由导航离开时重置 tokenVerified
      tokenVerified = false;
    }
    next();
  }
});








createApp(App)
  .use(router)
  .use(HighchartsVue)
  .use(ElementPlus)
  .mount('#app')
