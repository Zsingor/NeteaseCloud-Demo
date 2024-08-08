<!--  -->
<template>
  <div class="background">
    <div class="searchTop">
      <IconItemLeft @click="$router.go(-1)"/>
      <van-search
        class="searchInput"
        v-model="searchKey"
        shape="round"
        placeholder="请输入搜索关键词"
      />
    </div>
    <div class="searchHistory" @keydown.enter="enterKey">
      <span class="history">历史</span>
      <div class="tagList">
        <span
          class="historyItem"
          v-for="(item, index) in userStore.searchHistory"
          @click="clickTag(item)"
          :key="index"
        >
          {{ item }}
        </span>
      </div>
      <IconSearchDelete class="icon" @click="deleteHistory" />
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in serachList" :key="i">
        <div class="itemLeft" @click="playMusic(item)">
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
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { useUserInfoStore,useMusicPlayStore } from '@/stores/music'
import { getSearchMusic } from '@/request/api/home'

const userStore = useUserInfoStore()
const playStore = useMusicPlayStore()

let searchKey = ref('')
let serachList = reactive([])

//搜索
const enterKey = async () => {
  if (searchKey.value != '') {
    let res = await getSearchMusic({
      keywords: searchKey.value,
      limit: 30,
      offset: 0,
    })
    serachList = res.result.songs
    // console.log(res)
    userStore.setSearchHistory(searchKey.value)
  }
}

//点击历史记录
const clickTag = (value) => {
  searchKey.value = value
  enterKey()
}

//删除历史记录
const deleteHistory = () => {
  userStore.emptySearchHistory()
}

//播放音乐
const playMusic=(item)=>{
  playStore.insertPlayList(item)
}

//点击回车键搜索
const keyDown = (e) => {
  if (e.keyCode === 13) {
    enterKey()
  }
}

onMounted(() => {
  //绑定监听事件
  window.addEventListener('keydown', keyDown)
})

onUnmounted(() => {
  //销毁事件
  window.removeEventListener('keydown', keyDown, false)
})
</script>

<style scoped lang='less'>
.searchTop {
  width: 100%;
  height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  position: relative;

  .searchInput {
    width: 95%;
    font-size: 25px;

    :deep(.van-search__field) {
      height: 40px;

      .van-cell__value {
        font-size: 20px;
      }
    }
  }

  .clear-btn {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 5%;
  }
}

.searchHistory {
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  position: relative;

  .history {
    font-weight: 700;
    font-size: 25px;
    margin-right: 10px;
  }

  .tagList {
    width: 80%;
  }

  .historyItem {
    background-color: #bdbdbd;
    padding: 5px 10px;
    border-radius: 20px;
    margin-left: 10px;
    margin-top: 5px;
    display: inline-block;
  }

  .icon {
    margin-top: 5px;
    position: absolute;
    right: 10px;
  }
}

.itemList {
  width: 100%;
  padding: 0 10px;

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
</style>