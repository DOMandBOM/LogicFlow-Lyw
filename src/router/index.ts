import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/custom-vue-logic-flow',
      name: 'customVueLogicFlow',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CustomVueLogicFlow/index.vue'),
    },
    {
      path: '/logic-flow',
      name: 'logicFlow',
      component: () => import('../views/LogicFlow/index.vue'),
    },
  ],
})

export default router
