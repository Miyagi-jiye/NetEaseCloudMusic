import { defineStore } from 'pinia'
import { bangumiFollowList } from "@/views/bilibili/api"
import { reactive } from 'vue'

export const useBilibiliStore = defineStore(
  'Bilibili',
  () => {
    const bilibiliData = reactive({
      bangumi: [],//bilibili追番信息
    })

    // 获取bilibili追番信息
    const getBilibiliData = async () => {
      const res = await bangumiFollowList()
      bilibiliData.bangumi = res.data
      console.log("🧍‍♂️bilibili追番信息", res)
    }

    return {
      bilibiliData,
      getBilibiliData
    }
  },
  {
    persist: true
  }
)