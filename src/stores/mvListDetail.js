import { defineStore } from 'pinia'
import { mvDetail, mvUrl, videoDetail, simiMv } from "@/api"
import { reactive } from 'vue'

export const useMvListDetailStore = defineStore(
  'mvListDetail',
  () => {
    const mvListDetail = reactive({
      mv: {
        id: 0,//mv id
        name: '',//mv 名称
        artistId: 0,//歌手id
        artistName: '',//歌手名字
        artists: [],//歌手
        brs: [{ br: 240 }],// 播放分辨率
        cover: '',//封面
        desc: '',//描述
        duration: 0,//时长
        publishTime: 0,//发布时间
        commentCount: 0,//评论数
        playCount: 0,//播放数
        shareCount: 0,//分享数
        subCount: 0,//收藏数
      },
      mvUrl: '',//mv播放地址
      simiMvs: [],//相似mv
    })

    // 获取mv详情
    async function getMvDetail(id) {
      const res = await mvDetail(id)
      mvListDetail.mv = res.data
      console.log('mv详情', res.data)
    }
    // 获取mv播放地址
    async function getMvUrl(id, r) {
      const res = await mvUrl(id, r)
      mvListDetail.mvUrl = res.data.url
      console.log('mv播放地址', res.data)
    }
    // 获取视频详情
    async function getVideoDetail(id) {
      const res = await videoDetail(id)
      console.log('视频详情', res)
    }
    // 获取相似mv
    async function getSimiMv(id) {
      const res = await simiMv(id)
      mvListDetail.simiMvs = res.mvs
      console.log('相似mv', res)
    }

    return {
      mvListDetail,
      getSimiMv,
      getVideoDetail,
      getMvDetail,
      getMvUrl
    }
  }
) 