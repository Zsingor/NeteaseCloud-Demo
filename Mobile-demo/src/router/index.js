import { createRouter, createWebHistory } from 'vue-router'
import { useUserInfoStore } from '@/stores/music'
import Home from '@/views/home/index.vue'
import ItemMusic from '@/views/itemMusic/index.vue'
import Search from '@/views/search/index.vue'
import Login from '@/views/login/index.vue'
import UserInfo from '@/views/userInfo/index.vue'

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/home',
        redirect:'/'
    },
    {
        path: '/itemMusic',
        name: 'ItemMusic',
        component: ItemMusic
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/userInfo',
        name: 'UserInfo',
        // beforeEnter: (to, from, next) => {
        //     const userStore = useUserInfoStore()
        //     if (userStore.isLogin) {
        //         next()
        //     } else {
        //         next('/login')
        //     }
        // },
        component: UserInfo
    },
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
