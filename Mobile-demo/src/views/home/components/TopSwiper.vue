<!--  -->
<template>
  <div class="content">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getBanner } from '../../../request/api/home'

let images = ref([])

const getData = async () => {
  let res = await getBanner()
  res.banners.forEach((element) => {
    images.value.push(element.pic)
  })
}

onMounted(() => {
  getData()
})
</script>

<style scoped lang='less'>
.content
{
  display: flex;
  justify-content: center;
}

.van-swipe {
  width: 94%;
  border-radius: 10px;
  height: 200px;
  .van-swipe__track {
    img {
      width: 100%;
      height: 200px;
    }
  }
  :deep(.van-swipe__indicator--active) {
    background-color: rgb(219, 130, 130);
  }
}
</style>