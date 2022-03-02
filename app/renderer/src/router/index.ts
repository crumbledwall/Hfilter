import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '../pages/Main.vue'
import Cert from '../pages/Cert.vue'
import Rule from '../pages/Rule.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/cert',
    name: 'Cert',
    component: Cert
  },
  {
    path: '/rule',
    name: 'Rule',
    component: Rule
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

