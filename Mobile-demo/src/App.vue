<template>
  <router-view class="router-view"/>
  <FooterMusic/>
</template>

<script setup>
import FooterMusic from '@/components/FooterMusic.vue'
</script>

<style scoped lang="less">
.router-view{
  padding-bottom: 80px;
}
</style>
