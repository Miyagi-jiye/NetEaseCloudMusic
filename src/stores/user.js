import { defineStore } from 'pinia'
import {
  userDetail,
  userSubcount,
  userAccount,
  userPlaylist
} from "@/api"
import { ref, reactive, computed } from 'vue'
import { filterMyPlaylist } from "@/utils/useFilter.js"

export const useUserStore = defineStore(
  'user',
  () => {
    /* state */
    const uid = ref(null)//用户id
    const userData = reactive({})//用户数据
    const playlistParams = reactive({//用户歌单参数
      limit: 100,
      offset: 1
    })

    /* getters */
    const test = computed(() => {
      return "test"
    })

    /* actions */
    // 获取用户信息(cookie获取)
    async function getUserAccount() {
      const res = await userAccount()
      uid.value = res.account.id
      console.log("cookie获取用户信息", res)
    }
    // 获取用户详情
    async function getUserDetail() {
      const res = await userDetail(uid.value)
      userData.detail = res
      console.log('用户详情', res)
    }
    // 获取用户收藏
    async function getUserSubcount() {
      const res = await userSubcount(uid.value)
      userData.subcount = res
      console.log('用户收藏', res)
    }
    // 获取用户歌单
    async function getUserPlaylist() {
      const res = await userPlaylist(uid.value, playlistParams)
      userData.playlist = filterMyPlaylist(res.playlist, uid.value)
      console.log("用户歌单", res.playlist)
    }

    return {
      userData,//用户信息
      uid,//用户id
      test,
      getUserDetail,//获取用户详情
      getUserSubcount,//获取用户收藏
      getUserAccount,// 获取用户信息
      getUserPlaylist,// 获取用户歌单
    }
  },
  {
    persist: true
  }
)