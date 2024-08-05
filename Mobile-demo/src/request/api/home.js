import request from "..";

//获取轮播图数据
export const getBanner=()=>{
    return request.get("/banner?type=2")
}

//获取推荐歌单
export const getMusicList=(num)=>{
    return request.get("/personalized?limit="+num)
}