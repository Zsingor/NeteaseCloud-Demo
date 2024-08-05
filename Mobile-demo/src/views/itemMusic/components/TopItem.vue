<!--  -->
<template>
  <div v-if="playlist.creator">
    <div class="itemTop">
      <img :src="playlist.coverImgUrl" alt="" class="bgimg" />
      <div class="itemLeft">
        <IconItemLeft class="icon" @click="$router.go(-1)" />
        <span>歌单</span>
      </div>
      <div class="itemRight">
        <IconMainSearch class="icon" />
        <IconMainMore class="icon" />
      </div>
    </div>
    <div class="itemTopContent">
      <div class="contentLeft">
        <img :src="playlist.coverImgUrl" alt="" />
        <div class="palyCount">
          <IconMainPlay class="icon" />
          <span>{{ changeCount(playlist.playCount) }}</span>
        </div>
      </div>
      <div class="contentRight">
        <p class="rightP_one">{{ playlist.name }}</p>
        <div class="right_img">
          <img :src="playlist.creator.backgroundUrl" alt="" />
          <span>{{ playlist.creator.nickname }}</span>
          <IconItemRight class="icon" />
        </div>
        <p class="rightP_two">
          <span>{{ playlist.description }}</span>
          <IconItemRight class="icon" />
        </p>
      </div>
    </div>
    <div class="itemTopFooter">
      <div class="footerItem">
        <IconItemComment class="icon" />
        <span>{{ playlist.commentCount }}</span>
      </div>
      <div class="footerItem">
        <IconItemShare class="icon" />
        <span>{{ playlist.shareCount }}</span>
      </div>
      <div class="footerItem">
        <IconItemDownload class="icon" />
        <span>下载</span>
      </div>
      <div class="footerItem">
        <IconItemMorepick class="icon" />
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { changeCount } from '@/utils/common.js'

const props=defineProps({
  playlist: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped lang='less'>
.itemTop {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 10px;
  position: relative;
}

.bgimg {
  width: 100%;
  height: 400px;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  filter: blur(30px);
}

.itemLeft,
.itemRight {
  width: 15%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 20px;
    color: #ffffff;
  }

  .icon {
    fill: #ffffff;
  }
}

.itemTopContent {
  width: 100%;
  height: 220px;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .contentLeft {
    width: 36%;
    height: 200px;
    position: relative;

    img {
      width: 100%;
      height: 200px;
      border-radius: 10px;
      position: absolute;
      z-index: -1;
    }
    .palyCount {
      position: absolute;
      right: 8px;
      top: 8px;
      display: flex;
      align-items: center;
      .icon {
        fill: #ffffff;
        width: 13px;
        height: 13px;
        margin-top: -1px;
        vertical-align: middle;
      }
      span {
        font-size: 13px;
        color: #fff;
      }
    }
  }

  .contentRight {
    width: 60%;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .rightP_one {
      font-size: 25px;
      font-weight: 900;
      color: #fff;
      font-family: '微软雅黑';
    }

    .right_img {
      width: 100%;
      height: 30px;
      line-height: 30px;
      display: flex;
      align-items: center;
      color: #e6e6e6;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        font-size: 20px;
        margin-left: 6px;
        margin-right: 4px;
      }
      .icon {
        width: 13px;
        height: 13px;
        margin-top: -0.4px;
        vertical-align: middle;
        fill: #ffffff;
      }
    }
    .rightP_two {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 95%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 16px;
        color: #e6e6e6;
      }
      .icon {
        width: 12px;
        height: 12px;
        fill: #ffffff;
      }
    }
  }
}

.itemTopFooter {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  .footerItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .icon {
      fill: #fff;
    }
    span {
      margin-top: 8px;
    }
  }
}
</style>