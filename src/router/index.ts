import { createRouter, createWebHistory } from 'vue-router'
import BlogList from '@/views/BlogList.vue'
import BlogDetail from '@/views/BlogDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'BlogList',
      component: BlogList,
    },
    {
      path: '/blog/:id',
      name: 'BlogDetail',
      component: BlogDetail,
    },
  ],
})

export default router
