import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/home/home'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/home/home')
        },
      ]
    },
    {
      path: '/home',
      component: () => import('@/views/home/home'),
    },
  ]
})
export default router
