import { defineStore } from 'pinia'
import { artistDetail, artistSongs, artistAlbum, artistMv } from "@/api"
import { reactive } from 'vue'

export const useArtistListDetailStore = defineStore(
  'artistListDetail',
  () => {
    const artistListDetail = reactive({
      artist: {},//歌手信息
      blacklist: false,//是否被拉黑
      identify: {},//歌手身份
      preferShow: 0,//是否显示
      secondaryExpertIdentiy: [],//二级专家身份
      showPriMsg: false,//是否显示私信按钮
      videoCount: 0,//视频数量
      songsParams: {
        order: 'hot',//hot ,time 按照热门或者时间排序 （可选参数）
        limit: 30,//每页数量
        offset: 1,//偏移数量，用于分页
      },
      albumsParams: {
        limit: 10,//每页数量
        offset: 1,//偏移数量，用于分页
      },
      mvsParams: {
        limit: 10,//每页数量
        offset: 1,//偏移数量，用于分页
      },
      songs: [],//歌手全部歌曲
      albums: [],//歌手全部专辑
      mvs: [],//歌手全部mv
    })

    // 获取歌手详情
    async function getArtistDetail(id) {
      const res = await artistDetail(id)
      artistListDetail.artist = res.data.artist
      artistListDetail.blacklist = res.data.blacklist
      artistListDetail.identify = res.data.identify
      artistListDetail.preferShow = res.data.preferShow
      artistListDetail.secondaryExpertIdentiy = res.data.secondaryExpertIdentiy
      artistListDetail.showPriMsg = res.data.showPriMsg
      artistListDetail.videoCount = res.data.videoCount
      console.log('歌手详情', res.data)
    }
    // 获取歌手全部歌曲
    async function getArtistSongs(id) {
      const res = await artistSongs(id, artistListDetail.songsParams)
      artistListDetail.songs = res.songs
      console.log('歌手全部歌曲', res)
    }
    // 获取歌手全部专辑
    async function getArtistAlbum(id) {
      const res = await artistAlbum(id, artistListDetail.albumsParams)
      artistListDetail.albums = res.hotAlbums
      console.log('歌手全部专辑', res)
    }
    // 获取歌手全部mv
    async function getArtistMv(id) {
      const res = await artistMv(id, artistListDetail.mvsParams)
      artistListDetail.mvs = res.mvs
      console.log('歌手全部mv', res)
    }

    return {
      artistListDetail,
      getArtistDetail, getArtistSongs, getArtistAlbum, getArtistMv
    }
  }
)