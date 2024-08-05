<!-- 主页 -->
<template>
    <div>
      <div class="topNav">
        <div class="topleft">
            <IconMainMore class="icon" />
        </div>
        
        <div class="topContent">
          <span>我的</span>
          <span class="active">发现</span>
          <span>云村</span>
          <span>视频</span>
        </div>

        <div class="topright">
            <IconMainSearch class="icon" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped lang='less'>
  .topNav {
    width: 100%;
    height: 50px;
    padding: 10px;
    justify-content: space-between;
    display: flex;
    align-items: center;

    .topContent{
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;

        .active{
          font-weight: 900;
        }
    }
  }
  </style>