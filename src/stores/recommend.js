import { defineStore } from 'pinia'
import { recommendSongs, recommendResource } from "@/api"
import { reactive } from 'vue'

export const useRecommendStore = defineStore(
  'Recommend',
  () => {
    const recommendData = reactive({
      recommendDailySongs: [],//每日推荐歌曲
      recommendReasons: [],//每日推荐歌曲的推荐理由
      recommendSongList: [],//推荐歌单
    })

    // 获取每日推荐歌单
    const getRecommendSongList = async () => {
      const res = await recommendResource()
      recommendData.recommendSongList = res.recommend
      console.log("🧍‍♂️用户每日推荐歌单", res)
    }
    // 获取每日推荐歌曲
    const getRecommendSongs = async () => {
      const res = await recommendSongs()
      recommendData.recommendDailySongs = res.data.dailySongs
      recommendData.recommendReasons = res.data.recommendReasons
      console.log("🧍‍♂️用户每日推荐歌曲", res)
    }

    return {
      recommendData,
      getRecommendSongList,
      getRecommendSongs
    }
  },
  {
    persist: true
  }
)