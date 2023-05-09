<template>
  <div class="login nowrap" v-if="route.path == '/login'">
    <div class="login__header">
      <img :src="logo" alt="logo" class="logo">
      <div class="animate-wave">
        <div class="w1"></div>
        <div class="w2"></div>
        <div class="w3"></div>
        <div class="w4"></div>
      </div>
    </div>
    <div class="login__content">
      <div class="login__content__mode">
        <div class="phone" @click="routerPush('/login/phone')">手机号登录</div>
        <div class="password" @click="routerPush('/login/password')">密码登录</div>
        <div class="QRcode" @click="routerPush('/login/QRCode')">扫码登录</div>
      </div>
      <div class="login__content__clause">
        <van-checkbox v-model="isChecked" shape="square" icon-size="14px"></van-checkbox>
        <span>《用户服务协议》</span>
        <span>《隐私政策》</span>
      </div>
      <div class="login__content__other">
        <van-icon name="qq" color="#177cb0" class="icon" />
        <van-icon name="wechat" color="#00bc12" class="icon" />
        <van-icon name="weibo" color="#f20c00" class="icon" />
        <div class="icon">
          <span class="wy-emial-icon">
            易
          </span>
        </div>
      </div>
      <div class="login__content__solution">
        登录遇到问题？
      </div>
    </div>
    <div class="noLogin" @click="routerPush('/')">
      游客访问
    </div>
  </div>
  <RouterView v-else />
</template>

<script setup>
import logo from "@/assets/icons/fbs.png";
import { useRoute, useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login.js";
import { storeToRefs } from "pinia";
import { showToast } from 'vant';//居中轻提示

const { isChecked } = storeToRefs(useLoginStore())//协议选中
const route = useRoute()
const router = useRouter()

// 路由跳转
function routerPush(path) {
  if (path == '/') router.push(path)
  else if (isChecked.value) router.push(path)
  else showToast({ message: '请先阅读并同意用户服务协议和隐私协议', position: 'middle' })
}
</script>

<style scoped lang="less">
// 网易邮箱图标
.wy-emial-icon {
  height: 16px;
  width: 16px;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  overflow: hidden;
  color: #CE0427
}

.login {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // 渐变背景
  background: linear-gradient(180deg, #fff5f7 0%, #ffffff 50%, #ffffff 100%);

  // 不登录
  .noLogin {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 14px;
    color: var(--font-color-4);
    cursor: pointer;

    &:hover {
      opacity: .6;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50vh;
    height: 50vh;
    aspect-ratio: 1 / 1;
    // background: #ffffff;
    border-radius: 50%;
    position: relative;
    margin: 0 auto;
    // 背景
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);

    .logo {
      width: 80px;
      height: 80px;
      background: #EA2D1F;
      color: #fff;
      border-radius: 50%;
      z-index: 9;
      user-select: none; // 禁止选中
      -webkit-user-drag: none; // 禁止拖拽
    }

    // 波纹动画
    @keyframes opac {
      from {
        opacity: 1;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
      }

      to {
        opacity: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }

    // 波纹动画盒子所有子元素
    .animate-wave * {
      // background: #ff3939;
      border: 1px solid red;
      box-sizing: border-box;
      position: absolute;
      border-radius: 50%;
      animation: opac 4s infinite;
    }

    // 设置延时
    .animate-wave {
      display: contents;

      .w1 {
        animation-delay: 0s;
      }

      .w2 {
        animation-delay: 1s;
      }

      .w3 {
        animation-delay: 2s;
      }

      .w4 {
        animation-delay: 3s;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 32px 0;

    // 登录方式
    &__mode {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      .phone {
        color: #000;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
          color: #EA2D1F;
        }
      }

      .password {
        color: #000;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
          color: #EA2D1F;
        }
      }

      .QRcode {
        color: #000;
        font-size: 18px;
        font-weight: 600;
        cursor: pointer;

        &:hover {
          color: #EA2D1F;
        }
      }
    }

    // 条款
    &__clause {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;

      span {
        font-size: 12px;
        color: rgb(17, 107, 143);
        opacity: .8;
        cursor: pointer;

        &:hover {
          color: #EA2D1F;
        }
      }
    }

    // 其他登录方式
    &__other {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;

      .icon {
        padding: 6px;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid var(--border-color);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
          opacity: .6;
        }
      }
    }

    // 其他问题
    &__solution {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--font-color-4);
      font-size: 12px;
      cursor: pointer;

      &:hover {
        opacity: .6;
      }
    }
  }
}
</style>