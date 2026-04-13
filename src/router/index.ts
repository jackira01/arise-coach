import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PagoExitosoView from '@/views/PagoExitosoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/pago-exitoso', component: PagoExitosoView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
