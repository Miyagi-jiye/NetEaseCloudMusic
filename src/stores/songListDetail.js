import { defineStore } from 'pinia'
import { playlistDetail } from "@/api"
import { reactive } from 'vue'

export const useSongListDetailStore = defineStore(
  'songListDetail',
  () => {
    const songListDetail = reactive({
      playlist: {
        coverImgUrl: '',// 歌单封面
        name: '',// 歌单名
        creator: {
          nickname: '',// 歌单创建者
          avatarUrl: ''// 头像
        },
        description: '',// 歌单简介
        tags: [],// 标签
        trackCount: 0,// 歌曲数量
        playCount: 0,// 播放次数
        shareCount: 0,// 分享数
        commentCount: 0,// 评论数
        subscribedCount: 0,// 收藏数
        tracks: []// 歌曲列表
      }
    })

    // 获取歌单详情
    async function getPlaylistDetail(id) {
      const res = await playlistDetail(id)
      songListDetail.playlist = res.playlist
      console.log('歌单详情', res.playlist)
    }

    return {
      songListDetail,
      getPlaylistDetail
    }
  }
) 
