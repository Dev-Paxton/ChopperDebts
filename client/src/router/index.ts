import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: "/transfers",
      name: "Transfers",
      component: () => import("../views/TransfersView.vue")
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue")
    }
  ]
})

export default router
