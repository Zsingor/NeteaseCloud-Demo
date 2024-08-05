import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/home/index.vue'
import ItemMusic from '@/views/itemMusic/index.vue'


export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/itemMusic',
        name: 'ItemMusic',
        component: ItemMusic
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
