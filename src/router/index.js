import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/galleria',
      name: 'galleria',
      component: () => import('../views/GaleraView.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('../views/AboutUsView.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/Register',
      name: 'Register',
      component: () => import('../components/Register.vue')
    },
    {
    path: '/search-results',
    name: 'SearchResults',
    component: () => import('../components/SearchResults.vue'),
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('../views/Account.vue'),
    },
    {
      path: '/history',
      name: 'History',
      component: () => import('../views/HistoryView.vue'),
    },
    {
      path: '/forum',
      name: 'Forum',
      component: () => import('../views/ForumView.vue'),
    },
  ]
})

export default router
