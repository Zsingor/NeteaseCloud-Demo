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
        //歌曲的歌词
        lyricList: {},
        //当前播放时间
        currentTime: 0,
        //歌曲总时长
        duration: 0,
        //是否显示底部组件
        isFooterShow:true,
    }),
    //相当于methods
    actions: {
        //不用箭头函数是因为要使用this
        //修改PlayList的值
        updatePlayList(value) {
            this.playList = value
        },
        //往playList中指定位置插入值
        insertPlayList(value) {
            let pos=this.playList.indexOf(value)
            if (pos == -1) {
                this.playList.splice(this.playListIndex+1, 0, value)
                this.playListIndex++
            }
            else{
                this.playListIndex=pos
            }
        },
        //修改PlayListIndex的值
        updatePlayListIndex(value) {
            this.playListIndex = value
        },
        //上一首/下一首
        changePlayListIndex(value) {
            let temp = this.playListIndex + value
            temp = temp % this.playList.length
            if (temp < 0) {
                temp = this.playList.length - 1
            }
            this.playListIndex = temp
        },
        //修改detailShow的值
        updateDetailShow(value) {
            this.detailShow = value
        },
        //修改currentTime的值
        updateCurrentTime(value) {
            this.currentTime = value
        },
        //获取歌词并更新
        getLyric: async function (value) {
            let res = await getMusicLyric(value)
            this.lyricList = res.lrc
        },
    },
    persist: {
        key: 'musicPlay',
        storage: localStorage,
        paths: null,
    },
})

export const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
        //用户是否登录
        isLogin:false,
        //用户id
        userId:"",
        //搜索历史
        searchHistory: [],
        //用户数据
        infomation:{},
    }),
    actions: {
        //添加搜索历史
        setSearchHistory(value) {
            this.searchHistory.unshift(value)
            this.searchHistory = [...new Set(this.searchHistory)]
            if (this.searchHistory.length > 8) {
                this.searchHistory.pop()
            }
        },
        //清空搜索历史
        emptySearchHistory() {
            this.searchHistory.length = 0
        }
    },
    persist: {
        key: 'userInfo', //存储名称
        storage: localStorage, // 存储方式 sessionStorage/localStorage
        paths: null, //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
    },
})