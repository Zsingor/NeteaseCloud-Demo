import { defineStore } from "pinia"

const useItemMusicStore = defineStore('itemDetail', {
    // defineStore('userInfo',{})  userInfo就是这个仓库的名称name
    state: () => ({
        playlist:{},
        itemlist: []
    }),
    persist: {
        key: 'itemDetail', //存储名称
        storage: localStorage, // 存储方式 sessionStorage/localStorage
        paths: null, //指定 state 中哪些数据需要被持久化。[] 表示不持久化任何状态，undefined 或 null 表示持久化整个 state
    },
})

export default useItemMusicStore