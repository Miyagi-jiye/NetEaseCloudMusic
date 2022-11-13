import { ref, reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { songUrlV1, songDetail } from "@/api/index.js"
import { showNotify } from 'vant'

export const useAudioStore = defineStore(
  'Audio',
  () => {
    // state
    const audio = new Audio()// 创建一个audio对象
    const audioData = reactive({
      url: '',// 当前播放歌曲的url
      level: '',// 音质等级, 分为 standard => 标准, exhigh=>极高, lossless=>无损, hires=>Hi-Res
      song: {},// 当前播放的歌曲信息
      songs: [],// 播放列表
      volume: 0.5,// 音量
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

    // actions（以id为主要参数）
    // audio初始化设置
    function initAudio() {
      audio.volume = 0.5// 音量
      audio.autoplay = true// 自动播放
      audio.loop = false// 循环播放
      audio.preload = 'auto'// 预加载
      audio.crossOrigin = 'anonymous'// 跨域
      audio.addEventListener('ended', () => {// 播放结束
        audioData.isPlay = false
        audioData.isPause = false
        audioData.isMuted = false
        audioData.ended = true
        audioData.currentTime = 0
        audioData.duration = 0
      })
      audio.addEventListener('pause', () => {// 暂停
        audioData.isPlay = false
        audioData.isPause = true
        audioData.isMuted = false
        audioData.ended = false
        audioData.currentTime = audio.currentTime
        audioData.duration = audio.duration
      })
      audio.addEventListener('play', () => {// 播放
        audioData.isPlay = true
        audioData.isPause = false
        audioData.isMuted = false
        audioData.ended = false
        audioData.currentTime = audio.currentTime
        audioData.duration = audio.duration
      })
      audio.addEventListener('timeupdate', () => {// 播放中
        audioData.isPlay = true
        audioData.isPause = false
        audioData.isMuted = false
        audioData.ended = false
        audioData.currentTime = audio.currentTime
        audioData.duration = audio.duration
      })
      audio.addEventListener('volumechange', () => {// 音量改变
        audioData.isPlay = true
        audioData.isPause = false
        audioData.isMuted = audio.muted
        audioData.ended = false
        audioData.currentTime = audio.currentTime
        audioData.duration = audio.duration
      })
    }
    // 获取歌曲url
    async function getSongUrl(id) {
      const res = await songUrlV1(id)
      audioData.url = res.data[0].url// 设置歌曲url
      // audio.src = audioData.url// 设置audio的src
      // console.log("新版歌曲url", res.data[0])
    }
    // 获取歌曲详情
    async function getSongDetail(id) {
      const res = await songDetail(id)
      audioData.song = res.songs[0]// 设置当前播放歌曲
      // console.log("歌曲详情", res.songs[0])
    }
    // 添加到播放列表
    function addSongToPlayList() {
      if (!audioData.songs.some(item => item.id === audioData.song.id)) {
        audioData.songs.push(audioData.song)// 添加到播放列表
        console.log("✅添加成功", audioData.songs)
      } else {
        console.log("❌重复添加", audioData.songs)
      }
    }
    // 从播放列表移除
    function removeSongFromPlayList(id) {
      // 移除指定id的歌曲
      audioData.songs = audioData.songs.filter(item => item.id !== id)
      // 判断移除的歌曲是否是当前播放的歌曲，如果是则播放下一首
      if (audioData.song.id === id) {
        playNextSong()
      }
      // 判断是否还有歌曲，如果没有则清空播放列表并暂停播放
      if (audioData.songs.length === 0) {
        clearPlayList()// 清空播放列表
      }
      console.log("✅移除成功", audioData.songs)
    }
    // 清空播放列表
    function clearPlayList() {
      audioData.songs = []// 清空播放列表
      audioData.song = {}// 清空当前播放歌曲
      audioData.url = ''// 清空歌曲url
      audio.pause()// 暂停播放
      console.log("🧺清空成功", audioData.songs)
    }
    // 播放下一首
    async function playNextSong() {
      if (audioData.songs.length > 0) {
        const index = audioData.songs.findIndex(item => item.id === audioData.song.id)
        if (index === audioData.songs.length - 1) {// 如果是最后一首则播放第一首
          audioData.song = audioData.songs[0]
          await getSongUrl(audioData.song.id)// 获取歌曲url
          play(audioData.isPlay)
        } else {
          audioData.song = audioData.songs[index + 1]// 播放下一首
          await getSongUrl(audioData.song.id)// 获取歌曲url
          play(audioData.isPlay)
        }
        console.log("⏭播放下一首", audioData.song)
      }
    }
    // 改变当前播放歌曲
    async function changeCurrentSong(id) {
      await getSongDetail(id)// 获取歌曲详情
      await getSongUrl(id)// 获取歌曲url
      addSongToPlayList()// 添加到播放列表
      play(true)
    }
    // 点击歌曲列表直接开始播放并添加到播放列表
    async function playSong(id) {
      // 判断是否是当前播放歌曲
      if (audioData.song.id === id) return console.log("正在播放该歌曲")
      await getSongDetail(id)// 获取歌曲详情
      await getSongUrl(id)// 获取歌曲url
      addSongToPlayList()// 添加到播放列表
      play(true)
    }
    // 播放
    function play(value) {
      audioData.isPlay = value// 播放状态
      if (audioData.isPlay) {
        // 判断是否是同一首歌，如果是则继续播放，如果不是则重新赋值播放
        audio.src === audioData.url ? audio.play() : audio.src = audioData.url// 设置audio的src
        audio.volume = audioData.volume
        // 判断url是否存在
        if (audioData.url) {
          audio.play().then(() => {
            audioData.isPlay = true// 播放成功
          }).catch(() => {
            audioData.isPlay = false// 播放失败
            return showNotify({ type: 'danger', message: '播放失败' })
          })
        } else {
          audioData.isPlay = false// 播放失败
          showNotify({ type: 'danger', message: 'url不存在' })
        }
        console.log("播放")
      } else {
        audio.pause()
        console.log("暂停")
      }
    }

    return {
      audio,
      audioData,
      clearPlayList,
      removeSongFromPlayList,
      changeCurrentSong,
      playSong,
      play
    }
  },
  {
    persist: true
  }
)
