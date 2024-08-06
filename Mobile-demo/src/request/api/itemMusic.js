import request from "..";

//获取歌单详情页数据
export const getMusicItemDetails=(id)=>{
    return request.get(`/playlist/detail?id=${id}`)
}

//获取歌单的所有歌曲
export const getMusicItemList=(data)=>{
    return request.get(`/playlist/track/all?id=${data.id}&limit=${data.limit}&offset=${data.offset}`)
}
