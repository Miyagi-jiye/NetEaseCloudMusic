<template>
  <div class="menuPopup nowrap">
    <!-- 已经登录 -->
    <div class="header" v-if="isLogin">
      <img :src="userData.detail.profile.avatarUrl + '?param=50y50'" alt="头像" class="header__left">
      <div class="header__center" @click="$router.push('/login')">
        <span>{{ userData.detail.profile.nickname }}</span>
        <van-icon name="arrow" />
      </div>
      <van-icon name="scan" class="header__right" />
    </div>
    <!-- 没有登录 -->
    <div class="header" v-else>
      <img :src="logo" alt="" class="header__left">
      <div class="header__center" @click="$router.push('/login')">
        <span>立即登录</span>
        <van-icon name="arrow" />
      </div>
      <van-icon name="scan" class="header__right" />
    </div>
    <div class="content">
      <div class="content__vipCard">
        <div class="top">
          <div class="left">
            <span>开通黑胶VIP</span>
            <span>立享超21项专属特权 ></span>
          </div>
          <div class="right">会员中心</div>
        </div>
        <div class="line"></div>
        <div class="bottom">
          <span>受邀专享，黑胶VIP仅0.13元/天</span>
          <van-icon name="vip-card" size="16px" />
        </div>
      </div>
      <div class="content__settingCard">
        <van-cell-group inset>
          <van-cell title="清空缓存" is-link icon="setting-o" @click="settingItemClick('清空缓存')" />
          <van-cell title="我的消息" is-link icon="envelop-o" @click="settingItemClick('我的消息')" />
          <van-cell title="设置" is-link icon="setting-o" />
          <van-cell title="深色模式" is-link>
            <template #icon>
              <svg t="1667459424354" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="4350" width="16" height="16"
                style="margin-right:8px;fill: currentColor;">
                <path
                  d="M537.002667 104.7552c12.8512 13.824 12.066133 35.4304-1.7408 48.2816A212.548267 212.548267 0 0 0 469.333333 307.2c0 117.828267 95.505067 213.333333 213.333334 213.333333a213.009067 213.009067 0 0 0 176.469333-93.44 35.703467 35.703467 0 0 1 64.955733 13.653334A420.693333 420.693333 0 0 1 930.133333 512c0 230.929067-187.204267 418.133333-418.133333 418.133333S93.866667 742.929067 93.866667 512 281.070933 93.866667 512 93.866667c9.489067 0 18.551467 3.9424 25.002667 10.888533zM145.066667 512c0 202.6496 164.283733 366.933333 366.933333 366.933333S878.933333 714.6496 878.933333 512c0-8.840533-0.3072-17.646933-0.938666-26.385067A264.004267 264.004267 0 0 1 682.666667 571.733333c-146.090667 0-264.533333-118.442667-264.533334-264.533333 0-58.794667 19.285333-114.568533 53.828267-159.965867C288.1536 167.168 145.066667 322.884267 145.066667 512z"
                  p-id="4351"></path>
              </svg>
            </template>
          </van-cell>
          <van-cell title="定时关闭" is-link>
            <template #icon>
              <svg t="1667459003659" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="8685" width="16" height="16"
                style="margin-right:8px;fill: currentColor;">
                <path
                  d="M512 986.453333c-225.28 0-407.893333-182.613333-407.893333-407.893333S286.72 172.373333 512 172.373333c223.573333 0 406.186667 182.613333 406.186667 406.186667S735.573333 986.453333 512 986.453333z m0-762.88c-196.266667 0-354.986667 160.426667-354.986667 354.986667S315.733333 935.253333 512 935.253333 866.986667 774.826667 866.986667 580.266667 706.56 223.573333 512 223.573333zM645.12 88.746667H377.173333c-13.653333 0-25.6-11.946667-25.6-25.6s11.946667-25.6 25.6-25.6h269.653334c13.653333 0 25.6 11.946667 25.6 25.6s-11.946667 25.6-27.306667 25.6z"
                  p-id="8686"></path>
                <path
                  d="M512 604.16c-13.653333 0-25.6-11.946667-25.6-25.6V399.36c0-13.653333 11.946667-25.6 25.6-25.6s25.6 11.946667 25.6 25.6v179.2c0 15.36-11.946667 25.6-25.6 25.6z"
                  p-id="8687"></path>
                <path
                  d="M691.2 604.16H512c-13.653333 0-25.6-11.946667-25.6-25.6s11.946667-25.6 25.6-25.6h179.2c13.653333 0 25.6 11.946667 25.6 25.6s-11.946667 25.6-25.6 25.6zM512 179.2c-13.653333 0-25.6-11.946667-25.6-25.6V63.146667c0-13.653333 11.946667-25.6 25.6-25.6s25.6 11.946667 25.6 25.6V153.6c0 13.653333-11.946667 25.6-25.6 25.6z"
                  p-id="8688"></path>
              </svg>
            </template>
          </van-cell>
          <van-cell title="个性装扮" is-link>
            <template #icon>
              <svg t="1667459597689" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="6429" width="16" height="16"
                style="margin-right:8px;fill: currentColor;">
                <path
                  d="M759.695266 951.642024H263.192794c-41.142784 0-74.614619-33.472859-74.614619-74.614619V448.264162l-33.911082 21.694083c-7.176412 4.957653-17.120387 7.970947-27.227158 7.970947-24.241509 0-43.634921-16.10674-47.168349-39.197402l-3.479163-21.803638c-5.724543-35.417217-13.585934-83.92788-13.668869-113.949222-0.081911-29.74694 25.446622-58.426992 41.553362-69.519765L299.048235 100.55373c7.64228-5.094853 14.408114-5.094853 21.556881-5.094853l44.264611 0.246756 16.571584-0.05529c7.807126-1.041291 14.654871 2.876094 19.913545 8.108148a28.085174 28.085174 0 0 1 8.32726 19.85928c0.163822 55.523253 44.292255 99.020974 100.472843 99.020973 56.180588 0 100.335642-43.49772 100.472843-99.020973a28.175276 28.175276 0 0 1 8.299614-19.85928c5.28632-5.258675 12.134065-9.450462 19.941191-8.108148l16.626874 0.05529 44.401811-0.246756c7.313613 0 14.216648 0 21.666437 5.149119l198.864127 132.712944c26.159246 18.763722 37.253044 40.211048 36.787176 70.122834-0.657334 6.793479-11.559665 102.061913-17.229942 135.589038-3.670629 21.803638-24.679732 38.239045-48.866975 38.239046-9.586638 0-18.571232-2.684627-26.022046-7.807126l-30.788231-19.666789v427.229462c0.003072 41.14176-33.469787 74.614619-74.612572 74.614619z m-543.068776-582.704401c4.628986 0 9.257971 1.150847 13.449757 3.451517 9.012239 4.903387 14.599581 14.352824 14.599581 24.597821v480.040444c0 10.217352 8.299614 18.516966 18.516966 18.516966h496.502472c10.217352 0 18.516966-8.299614 18.516966-18.516966V398.630297a28.062649 28.062649 0 0 1 14.571936-24.597821c9.03886-4.875742 19.913546-4.547075 28.569472 0.958357l65.329004 41.717184c5.752188-39.581359 14.51767-116.031804 14.627225-116.880606-0.027645-7.148767-1.123202-11.997888-12.792423-20.379413L696.886045 151.584175l-9.121795 0.054265c-6.464812 0.054266-14.46238 0.137201-23.666085 0.163822-13.531668 72.094837-77.464092 126.933111-153.941159 126.933112-76.450446 0-140.382869-54.838274-153.941158-126.933112-9.148415-0.027645-17.065097-0.109556-23.502264-0.163822l-8.902683-0.054265-187.387396 128.111603c-7.066857 4.875742-16.901275 18.106388-17.202298 23.173597 0.081911 25.529557 7.532724 71.519414 12.956245 105.101828l1.424225 8.902683 67.904074-43.49772a27.937735 27.937735 0 0 1 15.120739-4.438543z"
                  p-id="6430"></path>
              </svg>
            </template>
          </van-cell>
          <van-cell title="边听边存" is-link icon="down" />
          <van-cell title="音乐黑名单" is-link>
            <template #icon>
              <svg t="1667459899723" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="16136" width="16" height="16"
                style="margin-right:8px;fill: currentColor;">
                <path
                  d="M512 110.592C282.624 110.592 98.304 294.912 98.304 524.288 98.304 753.664 282.624 942.08 512 942.08c229.376 0 413.696-184.32 413.696-413.696C925.696 294.912 741.376 110.592 512 110.592zM512 901.12c-208.896 0-376.832-167.936-376.832-376.832 0-98.304 36.864-184.32 98.304-253.952l532.48 532.48C696.32 864.256 610.304 901.12 512 901.12zM790.528 778.24 258.048 245.76c65.536-61.44 155.648-98.304 253.952-98.304 208.896 0 376.832 167.936 376.832 376.832C888.832 622.592 851.968 712.704 790.528 778.24z"
                  p-id="16137"></path>
              </svg>
            </template>
          </van-cell>
          <van-cell title="青少年模式" is-link icon="shield-o" />
        </van-cell-group>
      </div>
      <div class="content__otherCard">
        <van-cell-group inset>
          <van-cell title="我的客服" is-link icon="service-o" />
          <van-cell title="分享网易云音乐" is-link icon="share-o" />
          <van-cell title="个人信息搜集与使用清单" is-link icon="description" />
          <van-cell title="个人信息第三方共享清单" is-link icon="exchange" />
          <van-cell title="个人信息与隐私保护" is-link icon="eye-o" />
          <van-cell title="关于" is-link icon="warning-o" @click="$router.push('/about')" />
        </van-cell-group>
      </div>
    </div>
    <div class="footer">
      <span class="button" @click="show = !show">退出登录/关闭</span>
      <Teleport to="body">
        <!-- 动作栏 -->
        <van-action-sheet v-model:show="show" :actions="actions" cancel-text="取消" description="退出登录/关闭"
          close-on-click-action />
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/icons/fbs.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from "pinia"
import { useLoginStore } from '@/stores/login.js'
import { useUserStore } from '@/stores/user.js'
import { useAudioStore } from '@/stores/Audio.js'

const { isLogin, cookie } = storeToRefs(useLoginStore())//登录状态
const { play } = useAudioStore()//播放状态
const { userData } = useUserStore()//用户信息
const router = useRouter()
const show = ref(false);//退出弹框

// 动作栏配置
const actions = [
  {
    name: '关闭云音乐',
    callback: () => {
      // 改变登录状态
      isLogin.value = !isLogin.value
      // 暂停播放
      play(false)
      // log
      console.log('登录状态', isLogin.value)
    }
  },
  {
    name: '退出登录',
    callback: () => {
      // 改变登录状态
      isLogin.value = false
      // cookie
      cookie.value = ''
      // 清空缓存数据
      localStorage.clear()
      // 暂停播放
      play(false)
      // 跳转到登录页面
      router.push('/login')
      // log
      console.log('退出登录', isLogin.value)
    }
  },
];

// 清除缓存
function settingItemClick(e) {
  console.log(e)
  if (e == '清空缓存') {
    localStorage.clear()
    sessionStorage.clear()
    play(false)
    console.log('清空缓存')
    // 刷新页面
    window.location.reload()
    alert('缓存清除成功')
  }
}
</script>

<style scoped lang="less">
:deep(.van-cell-group--inset) {
  margin: 0;
}

:deep(.van-cell__left-icon) {
  margin-right: 8px;
  height: auto;
}

:deep(.van-cell--clickable) {
  display: flex;
  align-items: center;
}

.menuPopup {
  height: 100%;
  width: 100%;
  background-color: var(--van-search-content-background);
  box-sizing: border-box;
  overflow-y: scroll;
  // 
  display: flex;
  flex-direction: column;
  gap: 16px;
  // 
  position: fixed;
  top: 0;

  .header {
    display: flex;
    align-items: center;
    padding: 16px;
    // 粘性定位
    position: sticky;
    top: -1px; // 解决粘性定位缝隙问题
    z-index: 2;
    background-color: var(--van-search-content-background);

    .header__left {
      width: 24px;
      height: 24px;
      margin-right: 16px;
      border-radius: 50%;
    }

    .header__center {
      display: flex;
      align-items: center;
      flex: 1;
      cursor: pointer;

      span {
        font-size: 16px;
        color: var(--van-text-color);
        margin-right: 4px;
      }
    }

    .header__right {
      font-size: 24px;
      color: var(--van-text-color);
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0 16px;

    .content__vipCard {
      width: 100%;
      height: auto;
      background-color: var(--card-background-color);
      border-radius: 8px;
      padding: 16px;
      box-sizing: border-box;
      // 渐变色背景黑色到土色
      background-image: linear-gradient(90deg, #3d3938 0%, #5f4f4f 100%);
      overflow: hidden;

      .top {
        display: flex;
        align-items: center;
        gap: 16px;

        .left {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;

          span:nth-child(1) {
            font-size: 14px;
            font-weight: bold;
            color: #fee4db;
          }

          span:nth-child(2) {
            font-size: 12px;
            color: #7b6b6a;
          }
        }

        .right {
          font-size: 12px;
          color: #ccb5b1;
          padding: 4px 8px;
          border: 1px solid #ccb5b1;
          border-radius: 20px;
          box-sizing: border-box;
        }
      }

      .line {
        width: 100%;
        height: 1px;
        background-color: #645857;
        margin: 8px 0px;
      }

      .bottom {
        font-size: 12px;
        color: #7b6b6a;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .footer {
    padding: 0 16px;
    margin-bottom: 32px;

    .button {
      color: #EA2D1F;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      padding: 8px;
      box-sizing: border-box;
      background: var(--van-cell-group-background);
      cursor: pointer;
      // border: 1px solid;

      &:hover,
      &:active {
        background-color: var(--van-cell-active-color)
      }
    }
  }
}
</style>