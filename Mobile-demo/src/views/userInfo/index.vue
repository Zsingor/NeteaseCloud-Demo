<!--  -->
<template>
  <div class="infoUserTop">
    <div class="back">
      <IconItemLeft @click="$router.push('/')"/>
    </div>
    <img :src="infomation.profile.avatarUrl" alt="" class="profileimg" />
    <div class="name">{{ infomation.profile.nickname }}</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getUserInfo } from '@/request/api/user.js'
import { useUserInfoStore } from '@/stores/music'
import { storeToRefs } from 'pinia';

const userStore = useUserInfoStore()
let {infomation} =storeToRefs(userStore)

onMounted(async () => {
  let res = await getUserInfo(5022399044)
  userStore.infomation=res
  console.log(res)
})
</script>

<style scoped lang='less'>
.infoUserTop {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  .back{
    width: 100%;
    padding: 10px;
  }

  .profileimg {
    margin-top: 20px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .name{
      font-weight: 700;
      margin-top: 10px;
      font-size:25px;
  }
}
</style>