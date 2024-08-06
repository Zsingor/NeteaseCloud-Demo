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
    <div class="detailContent">
      <img
        src="@/assets/imgs/needle-ab.png"
        alt=""
        class="img_needle"
        :class="{ img_needle_active: playStore.isPlay }"
      />
      <img src="@/assets/imgs/cd.png" alt="" class="img_cd" />
      <img
        :src="musicInfo.al.picUrl"
        alt=""
        class="img_music"
        :class="{
          img_ar_active: playStore.isPlay,
          img_ar_pause: !playStore.isPlay,
        }"
      />
    </div>

    <div class="detailFooter">
      <div class="footerTop">
        <IconDetailLike class="icon" />
        <IconDetailDownload class="icon" />
        <IconDetailRecord class="icon" />
        <IconDetailCommend class="icon" />
        <IconDetailCircle class="icon" />
      </div>
      <div class="footerMid"></div>
      <div class="footerBottom">
        <IconDetailBack class="icon" />
        <IconDetailDownload class="icon" />
        <IconDetailPlay
          v-if="!playStore.isPlay"
          @click="playMusic"
          class="icon play"
        />
        <IconDetailPause v-else @click="playMusic" class="icon play" />
        <IconDetailCommend class="icon" />
        <IconDetailList class="icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMusicPlayStore } from '@/stores/music'

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

//关闭详情页
const closeDetails = () => {
  playStore.updateDetailShow(false)
}

onMounted(() => {
//   console.log(props.musicInfo)
})
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
  .range {
    width: 100%;
    height: 3px;
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
</style>