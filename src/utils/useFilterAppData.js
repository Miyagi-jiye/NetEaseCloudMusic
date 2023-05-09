// 过滤 app 接口请求返回的数据
export function filterAppData(blocks) {
  const data = {}
  // 转换播放数量单位为：万
  const convertCount = (sum) => {
    if (sum === 0) return undefined
    if (sum >= 100000000) {
      return (sum / 100000000).toFixed(2) + '亿'
    } else if (sum >= 10000) {
      return (sum / 10000).toFixed(1) + '万'
    } else {
      return sum
    }
  }
  // 提取歌手名字
  const pickUpName = (artists, Separator = '/') => {
    // 判断是否是数组
    if (Object.prototype.toString.call(artists) === '[object Array]') {
      return artists.map(n => n.name || n.userName || n).join(Separator)
    } else {
      return ''
    }
  }

  blocks.forEach(block => {
    try {
      const key = block.blockCode.toLowerCase()
      // console.log(key, '  ------------------------------->  ', block?.uiElement?.subTitle?.title)
      // console.dir(block)

      switch (block.blockCode) {
        case 'HOMEPAGE_BANNER':
          data[key] = getBanner(block)
          break

        // 推荐歌单
        case 'HOMEPAGE_BLOCK_PLAYLIST_RCMD':
          data[key] = getRcmdPlaylist(block)
          break

        //  新歌、新碟、新专辑
        case 'HOMEPAGE_BLOCK_NEW_ALBUM_NEW_SONG':
          data[key] = getNewAlbumSongs(block)
          break

        // 热门话题
        case 'HOMEPAGE_BLOCK_HOT_TOPIC':
          data[key] = getHotTopic(block)
          break

        // 音乐日历
        case 'HOMEPAGE_MUSIC_CALENDAR':
          data[key] = getMusicCalendar(block)
          break

        // 热门博客|有声书
        case 'HOMEPAGE_VOICELIST_RCMD':
          data[key] = getRcmdVoiceList(block)
          break

        // 网易云音乐的雷达歌单
        case 'HOMEPAGE_BLOCK_MGC_PLAYLIST':
        // 专属场景歌单
        case 'HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST':
        // 音乐视频
        case 'HOMEPAGE_BLOCK_VIDEO_PLAYLIST':
        // 电音专区
        case 'HOMEPAGE_BLOCK_ZONE_ELECTRONIC':
        // 助眠解压
        case 'HOMEPAGE_BLOCK_SLEEPING':
          data[key] = getPlaylistCommon(block)
          break

        // 相声曲艺
        case 'HOMEPAGE_BLOCK_COMIC_OPERA':
        // 有声剧场
        case 'HOMEPAGE_BLOCK_THEATER':
          data[key] = getVoiceCommon(block)
          break

        // 个性推荐-单曲
        case 'HOMEPAGE_BLOCK_STYLE_RCMD':
        // DJ专区
        case 'HOMEPAGE_BLOCK_ZONE_DJ':
        // 经典专区
        case 'HOMEPAGE_BLOCK_ZONE_CLASSIC':
        // 爵士专区
        case 'HOMEPAGE_BLOCK_ZONE_JAZZ':
        // 摇滚专区
        case 'HOMEPAGE_BLOCK_ZONE_ROCK':
        // 古典专区
        case 'HOMEPAGE_BLOCK_ZONE_CLASSICAL':
        // 说唱专区
        case 'HOMEPAGE_BLOCK_ZONE_HIPHOP':
          data[key] = getSongCommon(block)
          break

        default:
          // console.log(
          //   key,
          //   '  ------------------------------->  ',
          //   block?.uiElement?.subTitle?.title
          // )
          // console.dir(block)
          break
      }
    } catch (e) {
      console.error(e)
    }
  })

  function getBanner(block) {
    return {
      data: block.extInfo.banners
    }
  }

  /**
   * 歌单类型数据的通用方法：
   *
   * 网易云音乐的雷达歌单 HOMEPAGE_BLOCK_MGC_PLAYLIST
   *
   * 音乐视频 HOMEPAGE_BLOCK_VIDEO_PLAYLIST
   *
   * 专属场景歌单 HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST
   *
   * 电音专区 HOMEPAGE_BLOCK_ZONE_ELECTRONIC
   *
   * 助眠解压 HOMEPAGE_BLOCK_SLEEPING
   */
  function getPlaylistCommon(block) {
    const title = block.uiElement.subTitle.title
    const list = block.creatives.map((creative) => {
      const resource = creative.resources[0]
      // 助眠解压的uiElement是特殊情况，保存在resource.uiElement
      const uiElement = creative.uiElement || resource.uiElement
      const playCount = convertCount(resource.resourceExtInfo?.playCount ?? 0)
      return {
        playCount,
        payload: resource.resourceId,
        type: resource.resourceType,
        title: uiElement.mainTitle.title,
        picUrl: uiElement.image.imageUrl
      }
    })

    return {
      title,
      list
    }
  }

  /**
   * 获取声音类型block的方法
   *
   * 相声曲艺 HOMEPAGE_BLOCK_COMIC_OPERA
   *
   * 有声剧场 HOMEPAGE_BLOCK_THEATER
   */
  function getVoiceCommon(block) {
    const title = block.uiElement.subTitle.title
    const list = block.creatives.map((creative) => {
      const resource = creative
      const uiElement = creative.uiElement
      const playCount = convertCount(resource.creativeExtInfoVO.playCount) || 0
      return {
        playCount,
        payload: resource.resourceId,
        type: resource.resourceType,
        title: uiElement.mainTitle.title,
        picUrl: uiElement.image.imageUrl
      }
    })

    return {
      title,
      list
    }
  }

  /**
   * 获取单曲类型block的方法
   *
   * 个性推荐-单曲 HOMEPAGE_BLOCK_STYLE_RCMD
   *
   * DJ专区-潮流网络热歌 HOMEPAGE_BLOCK_ZONE_DJ
   */
  function getSongCommon(block) {
    const title = block.uiElement.subTitle.title
    // 扁平化所有歌曲数据，
    const flatResource = block.creatives
      .map((creative) => {
        return creative.resources.map((resource) => {
          const uiElement = resource.uiElement
          return {
            title: uiElement.mainTitle.title,
            mv: resource.resourceExtInfo.song.mv,
            artist: pickUpName(resource.resourceExtInfo.song.ar),
            picUrl: uiElement.image.imageUrl,
            payload: resource.resourceId,
            subTitle:
              uiElement?.subTitle?.titleType !== 'songRcmdTag' ? uiElement?.subTitle?.title : '',
            tags: uiElement?.subTitle?.titleType === 'songRcmdTag' ? uiElement?.subTitle?.title : ''
          }
        })
      })
      .flat()

    // 分组，每三首歌一组
    // new Array.fill..也是为了循环指定次数，for (const i in [0, 1, 2])也是为了循环三次
    const result = new Array(Math.ceil(flatResource.length / 3))
      .fill('')
      .reduce((preVal) => {
        const newArr = []
        // 循环三次
        for (const i in [0, 1, 2]) {
          // 当第一项不为数组时
          if (!(preVal[0] instanceof Array)) {
            newArr.push(preVal.shift())
          }
        }

        preVal.push(newArr)
        return preVal
      }, flatResource)

    return {
      title,
      list: result
    }
  }

  // 推荐歌单
  function getRcmdPlaylist(block) {
    const title = block.uiElement.subTitle.title
    const scrollList = block.creatives[0].resources.map((resource) => {
      const uiElement = resource.uiElement
      const playCount = convertCount(resource.resourceExtInfo.playCount) || 0
      return {
        payload: resource.resourceId,
        type: resource.resourceType,
        playCount: playCount,
        title: uiElement.mainTitle.title,
        picUrl: uiElement.image.imageUrl,
        subTitle: uiElement.subTitle?.title,
        tags: uiElement.labelTexts
      }
    })
    const list = block.creatives.slice(1).map((creative) => {
      const uiElement = creative.uiElement
      const resource = creative.resources[0]
      const playCount = convertCount(resource.resourceExtInfo.playCount) || 0
      return {
        payload: resource.resourceId,
        type: resource.resourceType,
        playCount: playCount,
        title: uiElement.mainTitle.title,
        picUrl: uiElement.image.imageUrl,
        subTitle: uiElement.subTitle?.title,
        tags: uiElement.labelTexts
      }
    })

    return {
      title,
      scrollList,
      list
    }
  }

  // 热门话题 HOMEPAGE_BLOCK_HOT_TOPIC
  function getHotTopic(block) {
    const list = block.creatives.map((creative) => {
      // creative 一页三条
      return creative.resources.map((resource) => {
        // resource 一条数据
        const uiElement = resource.uiElement
        return {
          title: uiElement.mainTitle.title,
          picUrl: uiElement.mainTitle.titleImgUrl,
          subTitle: uiElement.subTitle.title,
          labelUrls: uiElement.labelUrls
        }
      })
    })

    return {
      title: '热门话题',
      list
    }
  }

  //  新歌、新碟、新专辑
  function getNewAlbumSongs(block) {
    const data = {
      newSongs: [],
      newAlbum: [],
      newDigital: []
    }

    block.creatives.forEach((creative) => {
      const creativeType = creative.creativeType
      let target
      if (creativeType === 'NEW_SONG_HOMEPAGE') {
        target = 'newSongs'
      } else if (creativeType === 'NEW_ALBUM_HOMEPAGE') {
        target = 'newAlbum'
      } else if (creativeType === 'DIGITAL_ALBUM_HOMEPAGE') {
        target = 'newDigital'
      }
      if (target) {
        const listData = creative.resources.map((resource) => {
          const uiElement = resource.uiElement
          return {
            videoInfo: {
              status: false
            },
            payload: resource.resourceId,
            type: resource.resourceType,
            artist: resource.resourceExtInfo.artists.map((v) => v.name).join('/'),
            title: uiElement.mainTitle.title,
            subTitle: uiElement?.subTitle?.title,
            picUrl: uiElement.image.imageUrl,
            tags: uiElement.labelTexts
          }
        })

        data[target].push(listData)
      }
    })

    return {
      title: ['新歌', '新碟', '新专辑'],
      data: Object.values(data)
    }
  }

  // 音乐日历 HOMEPAGE_MUSIC_CALENDAR
  function getMusicCalendar(block) {
    const title = block.uiElement.subTitle.title
    const list = block.creatives.map((creative) => {
      const resource = creative.resources[0]
      const subTitle = moment().calendar(resource.resourceExtInfo.startTime, {
        sameDay: '[今天]',
        nextDay: '[明天]',
        nextWeek: 'dddd',
        lastDay: '[昨天]',
        lastWeek: '[上个] dddd',
        sameElse: (e) => {
          return moment(e).fromNow()
        }
      })
      return {
        payload: resource.resourceId,
        type: resource.resourceType,
        title: resource.uiElement.mainTitle.title,
        subTitle,
        picUrl: resource.uiElement.image.imageUrl
      }
    })

    return {
      title,
      list
    }
  }

  // 热门博客|有声书  HOMEPAGE_VOICELIST_RCMD
  function getRcmdVoiceList(block) {
    const data = {
      voiceList: [],
      bodcastList: []
    }

    block.creatives.forEach((creative) => {
      const creativeType = creative.creativeType
      let target
      if (creativeType === 'VOICE_LIST_HOMEPAGE') {
        target = 'voiceList'
      } else if (creativeType === 'PODCAST_LIST_HOMEPAGE') {
        target = 'bodcastList'
      }
      if (target) {
        const listData = creative.resources.map((resource) => {
          const uiElement = resource.uiElement
          return {
            videoInfo: {
              status: false
            },
            payload: resource.resourceId,
            type: resource.resourceType,
            artist: resource.resourceExtInfo?.djProgram?.dj?.nickname,
            title: uiElement.mainTitle.title,
            subTitle: uiElement?.subTitle?.title,
            picUrl: uiElement.image.imageUrl,
            tags: uiElement.labelTexts[0]
          }
        })

        data[target].push(listData)
      }
    })
    return {
      title: ['热门播客', '有声书'],
      data: Object.values(data)
    }
  }

  // 所有结果
  return data
}