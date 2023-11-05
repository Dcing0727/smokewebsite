import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
//import NavBar from './components/nav-bar.vue'
//import LoginComponent from './components/LoginComponent.vue'







createApp(App)
  .use(router)
  .mount('#app')
