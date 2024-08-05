import { createApp } from 'vue'
import App from './App.vue'

import 'amfe-flexible'  //引入px向rem转换
import '@/styles/index.less'    //引入全局样式

import router from './router'//引入路由
import pinia from './stores' //引入pinia


const app = createApp(App)

app.use(router)
app.use(pinia)

app.mount('#app')
