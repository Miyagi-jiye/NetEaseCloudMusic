import { ref, reactive, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { songUrlV1, songDetail, uselyric } from "@/api/index.js"
import { showNotify, showFailToast } from 'vant'

export const useAudioStore = defineStore(
  'Audio',
  () => {
    // state
    const audio = new Audio()// 创建一个audio对象
    const audioData = reactive({
      url: '',// 当前播放歌曲的url
      level: 'standard',// 音质等级, 分为 standard => 标准, exhigh=>极高, lossless=>无损, hires=>Hi-Res
      song: {},// 当前播放的歌曲信息
      songs: [],// 播放列表
      volume: 0.5,// 音量
      duration: 0,// 当前播放歌曲的总时长
      isPlay: false,// 是否正在播放
      playMode: 'order',// 播放模式: 顺序播放,循环播放,随机播放,默认顺序播放: order, loop, random
      lyric: '', // 歌词（原歌词 + 罗马音歌词 + 翻译歌词）
      haveRomalrc: false,// 是否有罗马音歌词
      haveTlyric: false,// 是否有翻译歌词
      isTrial: false,// 是否是试听歌曲
    })
    // 播放状态
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
    // 获取歌曲url-新版
    async function getSongUrl(id) {
      const res = await songUrlV1(id, audioData.level)
      // 判断返回的code码和fee码,以及url是否为空
      audioData.url = res.data[0].url// 设置歌曲url
      await getLyric(audioData.song.id) // 获取歌词
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
    // 将待播放列表切换为歌单列表，并从第一首开始播放（参数是：歌单列表[{}]）
    async function addAllToPlayList(songs) {
      audioData.songs = songs// 设置播放列表
      audioData.song = songs[0]// 设置当前播放歌曲
      await getSongUrl(songs[0].id)// 获取歌曲url
      play(true)// 播放
      console.log("✅歌单播放成功", audioData.songs)
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
      audioData.lyric = ''// 清空歌词
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
          audio.currentTime = 0// 从头开始播放
        } else {
          audioData.song = audioData.songs[index + 1]// 播放下一首
          await getSongUrl(audioData.song.id)// 获取歌曲url
          play(audioData.isPlay)
          audio.currentTime = 0// 从头开始播放
        }
        console.log("⏭播放下一首")
      }
    }
    // 播放上一首
    async function playPrevSong() {
      if (audioData.songs.length > 0) {
        const index = audioData.songs.findIndex(item => item.id === audioData.song.id)
        if (index === 0) {// 如果是第一首则播放最后一首
          audioData.song = audioData.songs[audioData.songs.length - 1]
          await getSongUrl(audioData.song.id)// 获取歌曲url
          play(audioData.isPlay)
          audio.currentTime = 0// 从头开始播放
          audioData.isTrial = false// 试听
        } else {
          audioData.song = audioData.songs[index - 1]// 播放上一首
          await getSongUrl(audioData.song.id)// 获取歌曲url
          play(audioData.isPlay)
          audio.currentTime = 0// 从头开始播放
          audioData.isTrial = false// 试听
        }
        console.log("⏮播放上一首")
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
    async function play(value) {
      audioData.isPlay = value// 播放状态
      if (audioData.isPlay) {
        // 判断正在播放的是不是同一首歌
        if (audio.src && audio.src === audioData.url) {
          // 继续播放
          audio.play().then(() => {
            // 判断歌曲总时长是否小于31秒，如果小于则为vip试听歌曲
            if (audio.duration < 31) {
              // 因为要监听isTrial的变化，所以要先取反,否则不会触发监听
              audioData.isTrial = !audioData.isTrial
              setTimeout(() => {
                audioData.isTrial = true
              }, 0);
            } else {
              // 因为要监听isTrial的变化，所以要先取反
              audioData.isTrial = !audioData.isTrial
              setTimeout(() => {
                audioData.isTrial = false
              }, 0);
            }
            console.log("🎵audio.src存在，继续播放")
          }).catch(async (err) => {
            console.log("❗歌曲链接过期", err)
            // 获取歌曲url
            await getSongUrl(audioData.song.id)
            audio.src = audioData.url
            // 重新播放
            audio.play().then(() => {
              console.log("🎵audio.src不存在，重新获取歌曲链接并播放")
            }).catch((err) => {
              console.log("❗播放失败", err)
              audioData.isPlay = false
              audio.pause()
            })
          })
        } else {
          // 不是同一首歌，判断url是否获取成功
          if (audioData.url) {
            audio.src = audioData.url// 设置播放地址
            audio.play().then(() => {
              // 判断歌曲总时长是否小于31秒，如果小于则为vip试听歌曲
              if (audio.duration < 31) {
                // 因为要监听isTrial的变化,所以要先取反,否则不会触发监听
                audioData.isTrial = !audioData.isTrial
                setTimeout(() => {
                  audioData.isTrial = true
                }, 0);
              } else {
                // 因为要监听isTrial的变化，所以要先取反
                audioData.isTrial = !audioData.isTrial
                setTimeout(() => {
                  audioData.isTrial = false
                }, 0);
              }
            }).catch(err => {
              console.log("🎵url获取成功，但是播放失败", err)
              audioData.isPlay = false
              audio.pause()
            })
          } else {
            // 判断歌曲播放权限类型
            if (audioData.song.fee === 4) {
              audioData.isPlay = false// 播放失败
              audio.pause()// 暂停播放
              showNotify({ type: 'primary', message: "数字专辑歌曲请先购买后再播放" })
            } else if (audioData.song.fee === 0) {
              audioData.isPlay = false// 播放失败
              audio.pause()// 暂停播放
              showNotify({ type: 'warning', message: "暂无播放版权" })
            } else {
              audioData.isPlay = false// 播放失败
              audio.pause()// 暂停播放
              console.log("🎵url获取失败，播放失败")
              showFailToast("VIP歌曲")
            }
          }
        }
        // 监听播放结束
        audio.onended = () => {
          playNextSong()
          console.log("播放结束,自动播放下一首")
        }
        // 判断是否有歌词
        if (!audioData.lyric) getLyric(audioData.song.id) // 获取歌词
        console.log("🎤播放")
      } else {
        audio.pause()
        console.log("⏸暂停")
      }
    }
    // 获取歌词
    async function getLyric(id) {
      const res = await uselyric(id)
      // 是否有罗马音歌词
      if (res.romalrc && res.romalrc.lyric) {
        audioData.haveRomalrc = true
      } else {
        audioData.haveRomalrc = false
      }
      // 是否有翻译歌词
      if (res.tlyric && res.tlyric.lyric) {
        audioData.haveTlyric = true
      } else {
        audioData.haveTlyric = false
      }
      // 合并歌词
      audioData.lyric = mergeLyric(filterLyric(res.lrc.lyric), filterLyric(res.tlyric?.lyric), filterLyric(res.romalrc?.lyric)) // 过滤歌词
      // console.log("📃歌词", res, audioData)
    }
    // 过滤歌词(参数是歌词字符串)
    function filterLyric(string) {
      if (!string) return []// 如果没有歌词则返回空数组
      const lyric = string.split("\n").map(item => {
        const time = item.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/)
        const text = item.replace(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/, '')
        // 判断是否有时间和歌词，过滤掉空的歌词
        if (time && text) {
          // 毫秒转换成秒,全部变为三位数，避免毫秒除以1000时错误
          if (time[3].length === 2) time[3] = time[3] * 10
          return {
            time: time[1] * 60 + time[2] * 1 + time[3] / 1000,
            text: text,
          }
        }
      }).filter(item => item)// 过滤掉空的歌词
      // 添加下一句歌词时间
      for (let i = 0; i < lyric.length; i++) {
        if (i === lyric.length - 1) {
          lyric[i].nextTime = lyric[i].time + 5
        } else {
          lyric[i].nextTime = lyric[i + 1].time
        }
      }
      return lyric
    }
    // 合并原本歌词和翻译歌词(参数是歌词过滤后的数组)
    function mergeLyric(lyric, tlyric, romalrc) {
      // 判断是否有翻译歌词
      if (tlyric.length > 0) {
        // 判断原本歌词和翻译歌词是否一样长
        if (lyric.length === tlyric.length) {
          // 合并歌词
          for (let i = 0; i < lyric.length; i++) {
            lyric[i].tlyric = tlyric[i].text
          }
        } else {
          // 如果不一样长则判断时间是否一样
          for (let i = 0; i < lyric.length; i++) {
            for (let j = 0; j < tlyric.length; j++) {
              if (lyric[i].time === tlyric[j].time) {
                lyric[i].tlyric = tlyric[j].text
              }
            }
          }
        }
      }
      // 判断是否有罗马音歌词
      if (romalrc.length > 0) {
        // 判断原本歌词和罗马音歌词是否一样长
        if (lyric.length === romalrc.length) {
          // 合并歌词
          for (let i = 0; i < lyric.length; i++) {
            lyric[i].romalrc = romalrc[i].text
          }
        } else {
          // 如果不一样长则判断时间是否一样
          for (let i = 0; i < lyric.length; i++) {
            for (let j = 0; j < romalrc.length; j++) {
              if (lyric[i].time === romalrc[j].time) {
                lyric[i].romalrc = romalrc[j].text
              }
            }
          }
        }
      }
      return lyric
    }
    // 切换音质重新播放
    async function changeQuality(string) {
      audioData.level = string
      await getSongUrl(audioData.song.id)
      play(true)
      console.log("🎵切换音质")
      // TODO:可以新增记住当前播放时间的功能，切换后接着播放
    }

    return {
      audio,
      audioData,
      changeQuality,
      playPrevSong,
      playNextSong,
      addAllToPlayList,
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
