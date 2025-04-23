import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/custom-vue-logic-flow',
      name: 'customVueLogicFlow',
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
