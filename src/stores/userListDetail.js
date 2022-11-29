import { defineStore } from 'pinia'
import { userDetail } from "@/api"
import { reactive } from 'vue'

export const useUserListDetailStore = defineStore(
  'userListDetail',
  () => {
    const userListDetail = reactive({
      userDetail: {},
    })

    // 获取用户详情
    const getUserListDetail = async (uid) => {
      const res = await userDetail(uid)
      userListDetail.userDetail = res
      console.log("🧍‍♂️用户详情", res)
    }


    return {
      userListDetail,
      getUserListDetail
    }
  }
)