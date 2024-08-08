<!--  -->
<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="passworld"
        class="passworld"
        placeholder="请输入密码"
      />
      <button class="btn" @click="Login">登录</button>
      <QRCode :value="codeInfo.qrurl" :size="128" level="H" class="qrcode" />
      <!-- <img :src="codeInfo.qrimg"> -->
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import QRCode from 'qrcode.vue'
import { getKey, getBase64, getStatus,anonimousLogin } from '@/request/api/login.js'
import { useUserInfoStore } from '@/stores/music'
import { useRouter } from 'vue-router'

const userStore = useUserInfoStore()
const router=useRouter()

let uniKey = ref('')
//二维码的base64地址
let codeInfo = ref('')
let result = reactive({})
//定时器
let timer = null

const polling = () => {
  timer = setInterval(async () => {
    let nowtime2 = new Date().getTime();
    result = await getStatus(uniKey,nowtime2)
    console.log(result)
    if (result.code === 803) {
      clearInterval(timer)
    }
    if (result.code === 800) {
      clearInterval(timer)
    }
  }, 3000)
}

const Login=async ()=>{
  let temp=await anonimousLogin()
  userStore.userId=temp.userId
  userStore.isLogin=true
  console.log(temp)
  router.push("/userInfo")
}

onMounted(async () => {
  let res = await getKey()
  uniKey = res.data.unikey
  let res1 = await getBase64(uniKey)
  codeInfo.value = res1.data
  // polling()
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped lang='less'>
.login {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);
  .loginTop {
    margin-top: 50px;
    font-size: 50px;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .passworld {
      width: 250px;
      height: 50px;
      border: 1px solid #999;
    }
    .btn {
      width: 100px;
    }
  }
}
</style>