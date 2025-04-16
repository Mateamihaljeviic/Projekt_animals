import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: () => import('../views/LogIn.vue') },
    { path: '/species', component: () => import('../views/Species.vue') },
    { path: '/gallery', component: () => import('../views/Gallery.vue') },
    { path: '/videos', component: () => import('../views/Videos.vue') }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;
