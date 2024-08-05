<!--  -->
<template>
  <div>
    <TopItem :playlist="state.playlist"/>
    <ListItem :itemlist="state.itemlist" :subscribedCount="state.playlist.subscribedCount"/>
  </div>
</template>

<script setup>
import TopItem from './components/TopItem.vue'
import ListItem from './components/ListItem.vue'
import { onBeforeMount, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import {
  getMusicItemDetails,
  getMusicItemList,
} from '../../request/api/itemMusic'
import useItemMusicStore from '@/stores/music'

defineOptions({
  name: 'ItemMusic',
})

const itemStore = useItemMusicStore()
const route = useRoute()
const state = reactive({
  playlist: {}, //歌单的详情页的数据
  itemlist: [], //歌单的歌曲
})

onBeforeMount(async () => {
  let id = route.query.id
  let res = await getMusicItemDetails(id)
  let result = await getMusicItemList({ id, limit: 20, offset: 0 })
  state.playlist = res.playlist
  state.itemlist = result.songs
  itemStore.playlist = res.playlist
  itemStore.itemlist = result.songs
})

onMounted(async () => {})
</script>

<style scoped lang='less'>
</style>