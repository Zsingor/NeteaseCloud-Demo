import { createApp } from 'vue'
import App from './App.vue'

import 'amfe-flexible'  //引入px向rem转换
import '@/styles/index.less'    //引入全局样式

import router from '@/router'//引入路由
import "@/router/permission"//引入路由守卫
import pinia from '@/stores' //引入pinia
import Vue3Marquee from 'vue3-marquee'//引入跑马灯


const app = createApp(App)

//声明全局使用的baseurl
app.config.globalProperties.$baseUrl=import.meta.env.VITE_BASE_API;

app.use(pinia)
app.use(router)

app.use(Vue3Marquee)

app.mount('#app')
