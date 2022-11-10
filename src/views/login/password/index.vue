<template>
  <div class="password">
    <div class="top" @click="$router.back()">
      <van-icon name="arrow-left" size="23" />
      <span>密码登录</span>
    </div>
    <div class="content">
      <div class="desc">
        <span>登录体验更多精彩</span>
        <span>未注册手机号验证后自动创建账号</span>
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="passwordLogin.phone" type="number" name="手机号" label="手机号" placeholder="手机号"
            :rules="[{ required: true, pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: '手机号格式错误' }]" />
          <van-field v-model="passwordLogin.password" type="password" name="密码" label="密码" placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="danger" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { showNotify } from 'vant';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia"
import { useLoginStore } from '@/stores/login.js'


const { isLogin } = storeToRefs(useLoginStore())//登录状态
const { passwordLogin, getLoginByPassword } = useLoginStore()
const router = useRouter()

// 表单提交,登录
async function onSubmit() {
  console.log("表单验证通过")
  const res = await getLoginByPassword()//登录
  if (res.code == 200) {
    showNotify({ type: 'success', message: '登录成功' });//提示
    isLogin.value = true//改变登录状态
    // 清空表单
    passwordLogin.phone = ''
    passwordLogin.password = ''
    // 跳转到首页
    router.push({ path: '/home' })
  } else {
    // 清空表单
    passwordLogin.phone = ''
    passwordLogin.password = ''
    showNotify({ type: 'danger', message: res.msg ?? res.message ?? '登录失败' });//提示
  }
}
</script>

<style scoped lang="less">
.password {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .top {
    height: 46px;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 16px;
    font-weight: bold;
  }

  .content {
    flex: 1;
    margin-top: 32px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .desc {
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;

      span:nth-child(1) {
        font-size: 16px;
        font-weight: 500;
      }

      span:nth-child(2) {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
</style>