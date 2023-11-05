import { createRouter, createWebHashHistory } from 'vue-router'
import NavBar from './components/nav-bar.vue'
import LoginComponent from './components/LoginComponent.vue'

const routes = [
  { path: '/nav', component: NavBar },
  { path: '/login', component: LoginComponent }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
