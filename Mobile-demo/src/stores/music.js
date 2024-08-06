import { defineStore } from "pinia"
import { getMusicLyric } from "@/request/api/musicDetail.js"

export const useItemMusicStore = defineStore('itemDetail', {
    // defineStore('userInfo',{})  userInfo就是这个仓库的名称name
    state: () => ({
        //歌单的详情页的数据
        playlist: {},
        //歌单的歌曲列表
        itemlist: [],
    }),
    persist: {
        key: 'itemDetail', //存储名称
        storage: localStorage, // 存储方式 sessionStorage/localStorage
        paths: null, //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
    },
})

export const useMusicPlayStore = defineStore('musicPlay', {
    state: () => ({
        //歌曲的播放列表
        playList: [
            {
                al: {
                    id: 79369340,
                    name: "最好的我们",
                    pic: 109951164098068400,
                    picUrl: "https://p1.music.126.net/ynTPNalD8J92Fq4CgVuN0g==/109951164098068395.jpg",
                    pic_str: "109951164098068395"
                },
                id: 1367333358,
                name: "最好的我们",
                ar: [{ name: "陈飞宇" }]
            },
        ],
        //当前播放的音乐的下标
        playListIndex: 0,
        //当前是否在播放
        isPlay: false,
        //是否显示歌曲详情页
        detailShow: false,
    }),
    //相当于methods
    actions: {
        //不用箭头函数是因为要使用this
        //修改PlayList的值
        updatePlayList(value) {
            this.playList = value
        },
        //修改PlayListIndex的值
        updatePlayListIndex(value) {
            this.playListIndex = value
        },
        //修改detailShow的值
        updateDetailShow(value) {
            this.detailShow = value
        },
        //获取歌词
        getLyric: async function (value) {
            let res = await getMusicLyric(value)
            console.log(res);
        }
    },
    persist: {
        key: 'musicPlay',
        storage: localStorage,
        paths: null,
    },
})