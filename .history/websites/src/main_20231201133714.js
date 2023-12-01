import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router' 
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import HighchartsVue from 'highcharts-vue';
//import NavBar from './components/nav-bar.vue'
//import LoginComponent from './components/LoginComponent.vue'











createApp(App)
  .use(router)
  .use(HighchartsVue)
  .use(ElementPlus)
  .mount('#app')
