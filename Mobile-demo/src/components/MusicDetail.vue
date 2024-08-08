<!--  -->
<template>
  <div>
    <img :src="musicInfo.al.picUrl" alt="" class="bgimg" />
    <div class="detailTop">
      <div class="detailTopLeft">
        <IconDetailDown @click="closeDetails" />
        <div class="musicContent">
          <Vue3Marquee class="title">{{ musicInfo.name }}</Vue3Marquee>
          <div class="authoritem">
            <span
              class="author"
              v-for="(item, index) in musicInfo.ar"
              :key="index"
            >
              {{ item.name }}
            </span>
            <IconDetailRight class="icon" />
          </div>
        </div>
      </div>
      <div class="detailTopRight">
        <IconDetailShare />
      </div>
    </div>

    <div class="detailContent" v-show="!showLyric">
      <img
        src="@/assets/imgs/needle-ab.png"
        alt=""
        class="img_needle"
        :class="{ img_needle_active: playStore.isPlay }"
      />
      <img src="@/assets/imgs/cd.png" alt="" class="img_cd" />
      <img
        @click="showLyric = true"
        :src="musicInfo.al.picUrl"
        alt=""
        class="img_music"
        :class="{
          img_ar_active: playStore.isPlay,
          img_ar_pause: !playStore.isPlay,
        }"
      />
    </div>

    <div
      class="musicLyric"
      @click="showLyric = false"
      ref="lyricRef"
      v-show="showLyric"
    >
      <span
        class="lyricItem"
        v-for="(item, index) in getLyric"
        :class="{ active: activeFlag(item, index) }"
        :key="index"
      >
        {{ item.lrc }}
      </span>
    </div>

    <div class="detailFooter">
      <div class="footerTop">
        <IconDetailLike class="icon" />
        <IconDetailDownload class="icon" />
        <IconDetailRecord class="icon" />
        <IconDetailCommend class="icon" />
        <IconDetailCircle class="icon" />
      </div>

      <div class="footerMid">
        <input
          type="range"
          class="range"
          min="0"
          :max="playStore.duration"
          v-model="playStore.currentTime"
          @input="changeValue"
        />
      </div>

      <div class="footerBottom">
        <IconDetailBack class="icon" />
        <IconDetailPrevious
          @click="playStore.changePlayListIndex(-1)"
          class="icon"
        />
        <IconDetailPlay
          v-show="!playStore.isPlay"
          @click="playMusic"
          class="icon play"
        />
        <IconDetailPause
          v-show="playStore.isPlay"
          @click="playMusic"
          class="icon play"
        />
        <IconDetailNext
          @click="playStore.changePlayListIndex(1)"
          class="icon"
        />
        <IconDetailList class="icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch,defineEmits  } from 'vue'
import { useMusicPlayStore } from '@/stores/music'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['clickProgress']);

const props = defineProps({
  musicInfo: {
    type: Object,
    default: () => ({}),
  },
  playMusic: {
    type: Function,
    default: () => {
      return Function
    },
  },
})

const playStore = useMusicPlayStore()
const lyricRef = ref(null)

let { lyricList } = storeToRefs(playStore)

//是否显示歌词
let showLyric = ref(false)
//当前播放到的歌词序号
let currentIndex = ref(0)

//关闭详情页
const closeDetails = () => {
  playStore.updateDetailShow(false)
}

//拖动进度条时的事件
const changeValue = (value) => {
  emit('clickProgress');
}

//判断当前是否播放到该句歌词
const activeFlag = (value, index) => {
  let currentTime = playStore.currentTime * 1000
  if (currentTime > value.time) {
    if (currentTime < value.next || value.next === -1) {
      currentIndex.value = index
      return true
    }
  }
  return false
}

//返回歌词数组
const getLyric = computed(() => {
  let lyricArr = []
  if (lyricList.value) {
    lyricList.value.lyric.split(/[(\r\n)\r\n]+/).forEach((item) => {
      let min = item.slice(1, 3)
      let sec = item.slice(4, 6)
      let mill = item.slice(7, item.indexOf(']'))
      let lrc = item.slice(item.indexOf(']') + 1, item.length)
      let time =
        parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
      if (lrc !== '') {
        lyricArr.push({ min, sec, mill, lrc, time })
      }
    })
    lyricArr.forEach((item, index) => {
      if (index === lyricArr.length - 1) {
        item.next = -1
      } else {
        item.next = lyricArr[index + 1].time
      }
    })
  }
  return lyricArr
})

watch(
  () => currentIndex.value,
  (value) => {
    let cur = document.querySelector('.lyricItem.active')
    if (cur && lyricRef.value && cur.offsetTop > 300) {
      lyricRef.value.scrollTop = cur.offsetTop - 250
    }
  }
)

onMounted(() => {})
</script>

<style scoped lang='less'>
.bgimg {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -2;
  filter: blur(60px);
}

.detailTop {
  width: 100%;
  height: 70px;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft {
    display: flex;
    align-items: center;
    .musicContent {
      width: 150px;
      height: 100%;
      margin-left: 20px;
      flex-wrap: wrap;

      .title {
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        width: 100%;
      }

      .authoritem {
        display: flex;
        align-items: center;
      }

      .author {
        color: #ffffff;
        margin-right: 5px;
      }

      .icon {
        width: 15px;
        height: 15px;
        fill: #ffffff;
      }
    }
  }

  .detailTopRight {
    padding-right: 10px;
  }
}

.detailContent {
  width: 100%;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img_needle {
    width: 100px;
    height: 190px;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-22deg);
    transition: all 1.5s;
  }

  .img_needle_active {
    transform: rotate(-7deg);
  }

  .img_cd {
    width: 300px;
    height: 300px;
    position: absolute;
    bottom: 55px;
    z-index: -1;
  }

  .img_music {
    width: 190px;
    height: 190px;
    border-radius: 50%;
    position: absolute;
    bottom: 110px;
    animation: rotate_ar 10s linear infinite;
  }

  .img_ar_active {
    animation-play-state: running;
  }

  .img_ar_pause {
    animation-play-state: paused;
  }

  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}

.musicLyric {
  width: 100%;
  height: 570px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;

  .lyricItem {
    font-size: 20px;
    color: rgb(190, 181, 181);
    margin-bottom: 35px;
    width: 90%;
    display: flex;
    justify-content: center;
    white-space: nowrap;
    overflow: hidden;
    min-height: 40px;
  }

  .active {
    color: #fff;
    font-size: 30px;
  }
}

.musicLyric::-webkit-scrollbar {
  display: none;
}

.detailFooter {
  width: 100%;
  height: 180px;
  position: absolute;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 35px;
      height: 35px;
      fill: rgb(245, 234, 234);
    }
  }

  .footerMid {
    display: flex;
    justify-content: center;
    .progress {
      width: 90%;
    }

    .range {
      width: 90%;
      height: 3px;
    }
  }

  .footerBottom {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 35px;
      height: 35px;
      fill: rgb(245, 234, 234);
    }
    .play {
      width: 50px;
      height: 50px;
    }
  }
}

[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    outline: 0;
    background-color: transparent;
    width: 100%;
}
[type="range"]::-webkit-slider-runnable-track {
    height: 4px;
    background: #eee;
}
[type="range" i]::-webkit-slider-container {
    height: 20px;
    overflow: hidden;
}
[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #f44336;
    border: 1px solid transparent;
    margin-top: -8px;
    border-image: linear-gradient(#f44336,#f44336) 0 fill / 8 20 8 0 / 0px 0px 0 2000px;
}
</style>