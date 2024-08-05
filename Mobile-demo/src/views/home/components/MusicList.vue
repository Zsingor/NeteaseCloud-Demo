<!--  -->
<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="my-swiper"
        :show-indicators="false"
      >
        <van-swipe-item
          class="swiperContent"
          v-for="(item, index) in musicList"
          :key="index"
        >
          <router-link :to="{path:'/itemMusic',query:{id:item.id}}">
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <IconMainPlay />
              {{ changeCount(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getMusicList } from '../../../request/api/home'
import { changeCount } from '@/utils/common.js'

let musicList = ref([])

onMounted(async () => {
  let res = await getMusicList(10)
  musicList.value = res.result
})
</script>

<style scoped lang='less'>
.musicList {
  width: 100%;
  height: 250px;
  padding-left: 2%;
  padding-right: 2%;

  .musicTop {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .title {
      font-size: 20px;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
      padding: 0 10px;
      border-radius: 20px;
    }
  }
}

.musicContent {
  width: 100%;
  height: 250px;
  .my-swiper {
    height: 100%;

    .swiperContent {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    img {
      border-radius: 10px;
      width: 90%;
      height: 200px;
      margin-left: 5%;
    }

    span {
      line-height: 20px;
    }

    .playCount {
      position: absolute;
      color: #ffffff;
      display: flex;
      justify-content: center;
      top: 7px;
      right: 7%;
    }

    .name {
      display: flex;
      width: 90%;
      margin-left: 5%;
      height: 50px;
      text-overflow: ellipsis;
    }
  }
}
</style>