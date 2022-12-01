import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { searchHotDetail, search } from "@/api"

export const useSearchStore = defineStore(
  'search',
  () => {
    /* state */
    const searchData = reactive({
      keyword: '',// 搜索关键字
      historyList: [],// 搜索历史
      hotDetail: [],// 热搜榜
      searchParams: {
        type: 1,// 搜索类型 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
        limit: 30,// 搜索数量
        offset: 1,// 搜索偏移量
      },
      searchResult: {
        songs: [],// 单曲
        songCount: 0,// 单曲数量
        albums: [],// 专辑
        albumCount: 0,// 专辑数量
        artists: [],// 歌手
        artistCount: 0,// 歌手数量
        playlists: [],// 歌单
        playlistCount: 0,// 歌单数量
        userprofiles: [],// 用户
        userprofileCount: 0,// 用户数量
        mvs: [],// MV
        mvCount: 0,// MV数量
      },// 搜索结果
    })

    /* getters */
    const test = computed(() => {
      return "test"
    })

    /* actions */
    // 获取热搜详情
    async function getHotDetail() {
      const res = await searchHotDetail()
      searchData.hotDetail = res.data
      console.log("获取热门搜索详情", res)
    }
    // 搜索
    async function getSearch() {
      // 判断是否有搜索关键字
      if (!searchData.keyword) return console.log("请输入搜索关键字")
      // 添加搜索历史
      addHistory()
      // 发起请求
      const res = await search(searchData.keyword, searchData.searchParams)
      // 判断是否第一页数据
      if (searchData.searchParams.offset == 1) {
        console.log("🔍首次搜索", res.result)
        // 匹配搜索类型(if else)
        if (searchData.searchParams.type == 1 && res.result.songs) {
          searchData.searchResult.songs = res.result.songs
          searchData.searchResult.songCount = res.result.songCount
        } else if (searchData.searchParams.type == 10 && res.result.albums) {
          searchData.searchResult.albums = res.result.albums
          searchData.searchResult.albumCount = res.result.albumCount
        } else if (searchData.searchParams.type == 100 && res.result.artists) {
          searchData.searchResult.artists = res.result.artists
          searchData.searchResult.artistCount = res.result.artistCount
        } else if (searchData.searchParams.type == 1000 && res.result.playlists) {
          searchData.searchResult.playlists = res.result.playlists
          searchData.searchResult.playlistCount = res.result.playlistCount
        } else if (searchData.searchParams.type == 1002 && res.result.userprofiles) {
          searchData.searchResult.userprofiles = res.result.userprofiles
          searchData.searchResult.userprofileCount = res.result.userprofileCount
        } else if (searchData.searchParams.type == 1004 && res.result.mvs) {
          searchData.searchResult.mvs = res.result.mvs
          searchData.searchResult.mvCount = res.result.mvCount
        } else {
          console.log("偏移量错误")
        }
      } else {
        console.log("🔄加载更多")
        // 匹配搜索类型(if else)
        if (searchData.searchParams.type == 1 && res.result.songs) {
          // 合并去重
          // searchData.searchResult.songs = [...new Set([...searchData.searchResult.songs, ...res.result.songs])]
          // 合并不去重
          searchData.searchResult.songs = searchData.searchResult.songs.concat(res.result.songs)
        } else if (searchData.searchParams.type == 10 && res.result.albums) {
          searchData.searchResult.albums = searchData.searchResult.albums.concat(res.result.albums)
        } else if (searchData.searchParams.type == 100 && res.result.artists) {
          searchData.searchResult.artists = searchData.searchResult.artists.concat(res.result.artists)
        } else if (searchData.searchParams.type == 1000 && res.result.playlists) {
          searchData.searchResult.playlists = searchData.searchResult.playlists.concat(res.result.playlists)
        } else if (searchData.searchParams.type == 1002 && res.result.userprofiles) {
          searchData.searchResult.userprofiles = searchData.searchResult.userprofiles.concat(res.result.userprofiles)
        } else if (searchData.searchParams.type == 1004 && res.result.mvs) {
          searchData.searchResult.mvs = searchData.searchResult.mvs.concat(res.result.mvs)
        } else {
          console.log("❌没有更多数据了")
          return false
        }
      }
      return true
    }
    // 添加搜索历史
    function addHistory() {
      if (searchData.keyword) {
        // 如果搜索历史中已经存在该关键字，则不添加
        if (searchData.historyList.includes(searchData.keyword)) return
        // 如果搜索历史中不存在该关键字，则添加
        else searchData.historyList.push(searchData.keyword)
      }
    }

    return {
      searchData,
      addHistory,
      getSearch,
      getHotDetail,
    }
  },
  {
    persist: true,
  }
)