import request from "..";

//获取歌曲的歌词数据
export const getMusicLyric=(id)=>{
    return request.get(`/lyric?id=${id}`)
}