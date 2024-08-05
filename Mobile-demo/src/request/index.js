import axios from "axios";

//创建一个新的axios对象
const request = axios.create({
    baseURL:"http://localhost:3000", //后端的ip地址
    timeout: 6000 //响应时间
})

// request拦截器
// 可以在请求发送前对请求做一些处理
request.interceptors.request.use(request => {
    return request;
}, error => {
    console.log('request error' + error)
    return Promise.reject(error)
})

//response拦截器
request.interceptors.response.use(response => {
    let result = response.data
    return result
})

export default request