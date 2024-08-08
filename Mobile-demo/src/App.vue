<template>
  <router-view class="router-view"/>
  <FooterMusic v-show="playStore.isFooterShow"/>
</template>

<script setup>
import FooterMusic from '@/components/FooterMusic.vue'
import { useMusicPlayStore } from '@/stores/music'
const playStore = useMusicPlayStore()
</script>

<style scoped lang="less">
.router-view{
  padding-bottom: 80px;
}
</style>
