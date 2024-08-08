import router from "./index.js"
import { useUserInfoStore, useMusicPlayStore } from '@/stores/music'

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    const userStore = useUserInfoStore()
    const playStore = useMusicPlayStore()
    if (to.path === "/login") {
        playStore.isFooterShow = false
    }
    else {
        playStore.isFooterShow = true
    }
    if (to.path === "/userInfo") {
        if (userStore.isLogin) {
            next()
        } else {
            next('/login')
        }
    }
    else {
        next()
    }
});