import { createApp } from 'vue'
import App from './App.vue'
import NavBar from './components/nav-bar.vue'
import LoginComponent from './components/LoginComponent.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/nav', component: NavBar },
  { path: '/Login', component: LoginComponent }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app')
