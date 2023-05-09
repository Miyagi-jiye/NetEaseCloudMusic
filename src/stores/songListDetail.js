import { defineStore } from 'pinia'
import { playlistDetail, playlistTrackAll } from "@/api"
import { reactive } from 'vue'

export const useSongListDetailStore = defineStore(
  'songListDetail',
  () => {
    const songListDetail = reactive({
      playlist: {
        id: 0,// 歌单id
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
      },
      trackAllParams: {
        offset: 1,
        limit: 20
      }
    })

    // 获取歌单详情
    async function getPlaylistDetail(id) {
      const res = await playlistDetail(id)
      songListDetail.playlist = res.playlist
      console.log('歌单详情', res.playlist)
    }
    // 获取歌单所有歌曲
    async function getPlaylistTrackAll() {
      const res = await playlistTrackAll(songListDetail.playlist.id, songListDetail.trackAllParams)
      // songListDetail.playlist.tracks = res.songs
      // 去重合并
      // songListDetail.playlist.tracks = [...new Set([...songListDetail.playlist.tracks, ...res.songs])]
      // id 去重合并
      songListDetail.playlist.tracks = [...new Map([...songListDetail.playlist.tracks, ...res.songs].map(item => [item.id, item])).values()]
      console.log('歌单所有歌曲', res)
      return true
    }

    return {
      songListDetail,
      getPlaylistDetail,
      getPlaylistTrackAll
    }
  }
) 
