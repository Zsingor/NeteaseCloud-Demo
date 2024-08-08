import request from "..";

//获取二维码的key
export const getKey=()=>{
    return request.get("/login/qr/key")
}

//获取二维码的base64的url
export const getBase64=(key)=>{
    return request.get(`/login/qr/create?qrimg=true&key=${key}`)
}

//获取二维码扫描状态
export const getStatus=(key,timestamp)=>{
    return request.get(`/login/qr/check?key=${key}&timestamp=${timestamp}`)
}

//游客登录
export const anonimousLogin=()=>{
    return request.get("/register/anonimous")
}

//退出登录
export const logout=()=>{
    return request.get("/logout")
}