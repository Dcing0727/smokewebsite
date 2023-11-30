import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router' 


 import HighchartsVue from 'highcharts-vue';






createApp(App)
  .use(router)
  .use(HighchartsVue)
  .mount('#app')
