import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  homepageDragonBall,
  homepageBlockPage,
  getBanner,
  personalized,
  personalizedNewSong,
  albumNewest
} from "@/api"
import { filterSongList, filterSong, filterAlbum } from "@/utils/useFilter.js"


export const useDiscoverStore = defineStore('discover', () => {
  /* state */
  const dragonBall = ref([])
  const banners = ref([])
  const songlist = ref([])
  const newSong = ref([])
  const newAlbum = ref([])
  // app发现页数据
  const PLAYLIST_RCMD = ref({})
  const STYLE_RCMD = ref({})
  const TOPLIST = ref({})
  const NEW_ALBUM_NEW_SONG = ref({})

  /* getters */
  const test = computed(() => {
    return "test"
  })

  /* actions */
  //获取发现页图标数据
  async function getdragonBall() {
    const res = await homepageDragonBall()
    dragonBall.value = res.data
    // console.log('发现页图标数据', dragonBall.value)
  }
  //获取发现区块数据
  async function getblockPage() {
    const res = await homepageBlockPage()
    for (const key in res.blocks) {
      if (res.blocks[key].blockCode === "HOMEPAGE_BLOCK_PLAYLIST_RCMD") {
        PLAYLIST_RCMD.value = res.blocks[key]
      }
      if (res.blocks[key].blockCode === "HOMEPAGE_BLOCK_STYLE_RCMD") {
        STYLE_RCMD.value = res.blocks[key]
      }
      if (res.blocks[key].blockCode === "HOMEPAGE_BLOCK_TOPLIST") {
        TOPLIST.value = res.blocks[key]
      }
      if (res.blocks[key].blockCode === "HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG") {
        NEW_ALBUM_NEW_SONG.value = res.blocks[key]
      }
    }
    console.log('推荐歌单', PLAYLIST_RCMD.value, '每天都要活力无限', STYLE_RCMD.value, '排行榜', TOPLIST.value, '新歌新碟', NEW_ALBUM_NEW_SONG.value)
  }
  //获取首页banner数据
  async function getbanners() {
    const res = await getBanner()
    banners.value = res.banners
    // console.log('首页banner数据', banners.value)
  }
  // 获取推荐歌单
  async function getpersonalized() {
    const res = await personalized()
    // console.log('推荐歌单-原数据', res.result)
    songlist.value = filterSongList(res.result)//过滤歌单数据
    // console.log('推荐歌单', songlist.value)
  }
  // 获取推荐新音乐
  async function getpersonalizedNewSong() {
    const res = await personalizedNewSong()
    // console.log('推荐新音乐-原数据', res.result)
    newSong.value = filterSong(res.result)//过滤歌曲数据
    // console.log('推荐新音乐', newSong.value)
    // console.table(newSong.value)
  }
  // 获取最新专辑
  async function getalbumNewest() {
    const res = await albumNewest()
    // console.log('最新专辑-原数据', res.albums)
    newAlbum.value = filterAlbum(res.albums)//过滤专辑数据
    // console.log('最新专辑', newAlbum.value)
  }

  return {
    dragonBall,
    banners,
    songlist,
    newSong,
    newAlbum,
    getdragonBall,
    getblockPage,
    getbanners,
    getpersonalized,
    getpersonalizedNewSong,
    getalbumNewest
  }
})
