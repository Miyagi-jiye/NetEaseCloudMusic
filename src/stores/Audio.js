import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import { songUrlV1, songDetail } from "@/api/index.js"

export const useAudioStore = defineStore(
  'Audio',
  () => {
    // state
    const audio = new Audio()// 创建一个audio对象
    const audioData = reactive({
      id: '',// 当前播放歌曲的id
      url: '',// 当前播放歌曲的url
      level: '',// 音质等级, 分为 standard => 标准, exhigh=>极高, lossless=>无损, hires=>Hi-Res
      song: {},// 当前播放的歌曲信息
      songs: [],// 播放列表
      isPlay: false,// 是否正在播放
      isPause: false,// 是否暂停
      isMuted: false,// 是否静音
    })
    // // 播放状态
    // let isPlay = ref(false)
    // // 播放模式，0列表循环，1单曲循环，2随机播放
    // let playMode = ref(0)
    // // 声音大小
    // let volume = ref(0.5)
    // isPlaying: false, //是否播放中
    // isPause: false,//是否暂停
    // sliderInput: false,//是否正在拖动进度条
    // ended: false,//是否播放结束
    // muted: false,//是否静音
    // currentTime: 0,//当前播放时间
    // duration: 0,//总播放时长

    // actions
    // 获取歌曲url
    async function getSongUrl(id, level) {
      const res = await songUrlV1(id, level)
      audioData.url = res.data[0].url
      audioData.id = res.data[0].id
      audioData.level = level
      getSongDetail(res.data[0].id)// 获取歌曲详情
      console.log("新版歌曲url", res)
    }
    // 获取歌曲详情
    async function getSongDetail(id) {
      const res = await songDetail(id)
      audioData.song = res.songs[0]
      addSongToPlayList(res.songs[0])// 添加到播放列表
      console.log("歌曲详情", res)
    }
    // 添加到播放列表
    function addSongToPlayList(song) {
      if (!audioData.songs.some(item => item.id === song.id)) {
        audioData.songs.push(song)
        console.log("添加到播放列表", audioData.songs)
      } else {
        console.log("播放列表已存在该歌曲", audioData.songs)
      }
    }
    // 改变当前播放歌曲
    function changeCurrentSong(song) {
      audioData.song = song
    }

    return {
      audio,
      audioData,
      changeCurrentSong,
      getSongUrl,
    }
  },
  {
    persist: true
  }
)
