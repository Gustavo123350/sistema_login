import { createRouter, createWebHistory } from 'vue-router'

import CreateUser from '../views/CreateUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'create',
      component: CreateUser
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Loginview.vue')
    },
    {
        path: '/users',
        name: 'users',
        component: () => import('../views/MenageUserListview.vue')
    }
  ]
})

export default router
