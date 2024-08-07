<!--  -->
<template>
  <div class="footerMusic">
    <div
      class="footerLeft"
      @click="showDetails"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="musicInfo">
        <p class="musicTitle">{{ playList[playListIndex].name }}</p>
        <span>横滑可以切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <IconFooterPlay
        v-show="!playStore.isPlay"
        @click="playMusic"
        class="icon"
      />
      <IconFooterPause
        v-show="playStore.isPlay"
        @click="playMusic"
        class="icon"
      />
      <IconFooterList class="icon" />
    </div>
    <audio
      @timeupdate="updateTime"
      @ended="playStore.changePlayListIndex(1)"
      @loadedmetadata="handleMetadataLoaded"
      ref="audioRef"
      :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ width: '100%', height: '100%' }"
    >
      <MusicDetail
        :musicInfo="playList[playListIndex]"
        :playMusic="playMusic"
        @clickProgress="clickProgress"
      />
    </van-popup>
  </div>
</template>

<script setup>
import MusicDetail from '@/components/MusicDetail.vue'
import { useMusicPlayStore } from '@/stores/music'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, onUpdated, ref, watch } from 'vue'

const playStore = useMusicPlayStore()
const audioRef = ref(null)
let { playList, playListIndex, detailShow } = storeToRefs(playStore)
let touchStartX = ref(null)
//用于滑动的节流操作
let touchFlag = ref(false)

//播放音乐
const playMusic = () => {
  playStore.isPlay = !playStore.isPlay
  if (playStore.isPlay) {
    audioRef.value.currentTime = playStore.currentTime
    audioRef.value.play()
  } else {
    audioRef.value.pause()
  }
}

//显示音乐详情
const showDetails = () => {
  playStore.updateDetailShow(true)
}

//播放函数
const updateTime = (value) => {
  playStore.updateCurrentTime(value.target.currentTime)
}

//进度条改变事件触发
const clickProgress = () => {
  audioRef.value.currentTime = playStore.currentTime
}

//当audio解析完音频后触发
const handleMetadataLoaded = () => {
  playStore.duration = audioRef.value.duration
}

//监听滑动开始事件
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].pageX
  touchFlag.value = true
}

//监听滑动事件
const handleTouchMove = (e) => {
  const touchCurrentX = e.touches[0].pageX
  // console.log(touchCurrentX,"  ",touchStartX.value);
  if (touchFlag.value) {
    if (touchCurrentX < touchStartX.value - 30) {
      playStore.changePlayListIndex(1)
      touchFlag.value = false
    } else if (touchCurrentX > touchStartX.value + 30) {
      playStore.changePlayListIndex(-1)
      touchFlag.value = false
    }
  }
}

//监听滑动结束事件
const handleTouchEnd = (e) => {
  touchStartX.value = null
}

//监听播放的歌曲id是否发生变化
watch(
  () => playList.value[playListIndex.value].id,
  (value) => {
    audioRef.value.autoplay = true
    playStore.isPlay = true
  }
)

onUpdated(() => {
  playStore.getLyric(playList.value[playListIndex.value].id)
})

onMounted(() => {
  playStore.getLyric(playList.value[playListIndex.value].id)
})
</script>

<style scoped lang='less'>
.footerMusic {
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #999999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.footerLeft {
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .musicInfo {
    width: calc(100% - 50px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
  }

  .musicTitle {
    font-size: 18px;
    font-weight: 900;
    width: 100%;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
  }
}

.footerRight {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;

  .icon {
    margin-left: 10px;
  }
}
</style>