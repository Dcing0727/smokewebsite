import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router' 
//import NavBar from './components/nav-bar.vue'
//import LoginComponent from './components/LoginComponent.vue'
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 确保也导入了样式文件

Vue.use(ElementUI);






createApp(App)
  .use(router)
  .mount('#app')
