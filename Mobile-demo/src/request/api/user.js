import request from "..";

//获取用户详情
export const getUserInfo=(id)=>{
    return request.get(`/user/detail?uid=${id}`)
}