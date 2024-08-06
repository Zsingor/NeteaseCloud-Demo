<!--  -->
<template>
  <div v-if="itemlist.length>0" class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <IconItemPlay class="icon" />
        <span
          >播放全部<span>(共{{ itemlist.length }}首)</span></span
        >
      </div>
      <div class="listRight">
        <IconItemPlus class="icon" />
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in itemlist" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div class="itemContent">
            <span class="itemName">{{ item.name }}</span>
            <div class="authorList">
              <span
                class="itemAuthor"
                v-for="(item1, index) in item.ar"
                :key="index"
                >{{ item1.name }}</span
              >
            </div>
          </div>
        </div>
        <div class="itemRight">
          <IconItemPlayvideo v-if="item.mv" class="icon" />
          <IconMainMore class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMusicPlayStore } from '@/stores/music'

const playStore = useMusicPlayStore()

const props = defineProps({
  itemlist: {
    default: () => ([]),
  },
  subscribedCount: {
    type: Number,
    default: 0,
  },
})

//播放音乐
const playMusic = (i) => {
  playStore.updatePlayListIndex(i)
  playStore.updatePlayList(props.itemlist)
}
</script>

<style scoped lang='less'>
.itemMusicList {
  width: 100%;
  background-color: #fff;
  padding: 0 10px;
  margin-top: 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  .itemListTop {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft {
      width: 150px;
      height: 100%;
      display: flex;
      align-items: center;
      .icon {
        stroke: #333333;
        stroke-width: 20;
      }
      span {
        margin-left: 4px;
        font-weight: 700;
        span {
          font-weight: 400;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .listRight {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: red;
      padding: 10px;
      border-radius: 20px;
      color: #fff;
      .icon {
        width: 15px;
        height: 15px;
        fill: #fff;
        margin-right: 5px;
        stroke: #fff;
        stroke-width: 50;
      }
    }
  }
  .itemList {
    width: 100%;
    .item {
      width: 100%;
      height: 70px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .itemLeft {
        width: 85%;
        padding-right: 5%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 10px;
          text-align: center;
        }
        .itemContent {
          display: flex;
          flex-wrap: wrap;
          width: 100%;

          .itemName {
            width: 100%;
            font-size: 25px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
            margin-bottom: 5px;
          }

          .authorList {
            display: flex;
            align-items: center;
          }

          .itemAuthor {
            margin-right: 10px;
            font-weight: 400;
            font-size: 12px;
            color: #999;
          }
          margin-left: 20px;
        }
      }
      .itemRight {
        width: 15%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: end;
        position: relative;
        .icon {
          margin-left: 12px;
          fill: #999;
        }
        .bofang {
          position: absolute;
          left: 0;
        }
        .liebiao {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>