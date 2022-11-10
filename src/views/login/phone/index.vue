<template>
  <div class="phone">
    <div class="top" @click="$router.back()">
      <van-icon name="arrow-left"  size="23"/>
      <span>手机号登录</span>
    </div>
    <div class="content">
      <div class="desc">
        <span>登录体验更多精彩</span>
        <span>未注册手机号验证后自动创建账号</span>
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field v-model="captchaLogin.phone" label="手机号" placeholder="请输入手机号" type="number"
            :rules="[{ required: true, message: '请输入手机号' }]" />
          <van-field v-model="captchaLogin.captcha" label="验证码" placeholder="请输入手机验证码" type="number"
            :rules="[{ required: true, message: '请输入手机验证码' }]">
            <template #button>
              <van-button size="small" type="default" @click="getCaptcha" :disabled="disabled">
                <van-count-down :time="time" format="ss 秒" v-if="disabled == true" @finish="timeEnd" />
                <span v-else>获取验证码</span>
              </van-button>
            </template>
          </van-field>
        </van-cell-group>
        <div style="padding:16px">
          <van-button type="danger" round block native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { showNotify } from 'vant';
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia"
import { useLoginStore } from '@/stores/login.js'


const disabled = ref(false)// 是否禁用获取验证码按钮
const time = ref(60 * 1000)// 60s倒计时
const router = useRouter()
const { isLogin } = storeToRefs(useLoginStore())//登录状态
const { captchaLogin, getSendCaptcha, getLoginByCaptcha } = useLoginStore()


// 表单提交,登录
async function onSubmit() {
  console.log("表单验证通过")
  const res = await getLoginByCaptcha()//登录
  if (res.code == 200) {
    showNotify({ type: 'success', message: '登录成功' });
    isLogin.value = true//改变登录状态
    // 清空表单
    captchaLogin.phone = ''
    captchaLogin.captcha = ''
    // 跳转到首页
    router.push({ path: '/home' })
  } else {
    // 清空表单
    captchaLogin.captcha = ''
    showNotify({ type: 'danger', message: res.msg ?? res.message ?? '登录失败' });
  }
}
// 获取验证码
async function getCaptcha() {
  // 判断手机号长度
  if (captchaLogin.phone.length !== 11) {
    showNotify({ type: 'danger', message: '请输入正确的手机号' });
    return
  }
  // 发送验证码
  const res = await getSendCaptcha()
  // 判断是否发送成功
  if (res.code === 200) {
    disabled.value = true// 禁用按钮
    time.value = 60 * 1000// 并显示倒计时
    showNotify({ type: 'success', message: '验证码发送成功' });
  } else {
    disabled.value = false
    showNotify({
      message: res.message ?? '获取验证码失败',
      color: '#ffffff',
      background: '#F9343D',
      position: 'top',
      duration: 2000,
    });
  }
}
// 倒计时结束
function timeEnd() {
  disabled.value = false
}
</script>

<style scoped lang="less">
.phone {
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