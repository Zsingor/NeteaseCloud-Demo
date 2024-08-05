<!--  -->
<template>
  <div class="iconList">
    <div class="iconItem">
        <IconMainRecommend class="icon"/>
        <span>每日推荐</span>
    </div>
    <div class="iconItem">
        <IconMainVideo class="icon"/>
        <span>私人FM</span>
    </div>
    <div class="iconItem">
        <IconMainGedan class="icon"/>
        <span>歌单</span>
    </div>
    <div class="iconItem">
        <IconMainRankingList class="icon"/>
        <span>排行榜</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang='less'>
.iconList{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.iconItem{
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon{
        width: 40px;
        height: 40px;
    }

    span{
        margin-top: 5px;
        font-size: 16px;
        color: #666666;
    }
}
</style>