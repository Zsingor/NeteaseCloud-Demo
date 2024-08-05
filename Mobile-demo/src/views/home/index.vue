<!-- 主页 -->
<template>
  <div>
    <TopNav/>
    <TopSwiper/>
    <IconList/>
    <MusicList/>
  </div>
</template>

<script setup>
import TopNav from "./components/TopNav.vue"
import TopSwiper from "./components/TopSwiper.vue"
import IconList from "./components/IconList.vue"
import MusicList from "./components/MusicList.vue"

defineOptions({
  name: "Home",
})
</script>

<style scoped lang='less'>

</style>