import { defineStore } from 'pinia'
import { album } from "@/api"
import { reactive } from 'vue'

export const useAlbumListDetailStore = defineStore(
  'albumListDetail',
  () => {
    const albumListDetail = reactive({
      album: {
        name: '',// 专辑名
        artist: {
          name: '',// 歌手名
          picUrl: ''// 头像
        },
        description: '',// 专辑简介
        publishTime: '',// 发行时间
        size: 0,// 歌曲数量
        tags: [],// 标签
        songs: []// 歌曲列表
      },
      songs: []
    })

    // 获取专辑详情
    async function getAlbumDetail(id) {
      const res = await album(id)
      albumListDetail.album = res.album// 专辑详情
      albumListDetail.songs = res.songs// 专辑歌曲列表
      console.log('专辑详情', res)
    }

    return {
      albumListDetail,
      getAlbumDetail
    }
  }
)