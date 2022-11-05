// 过滤歌单数据(参数是数组：Array)
export function filterSongList(songList) {
  let songListArr = []
  songList.forEach(item => {
    let obj = {}
    obj.songListId = item.id//歌单id
    obj.name = item.name//歌单标题
    obj.imageUrl = item.picUrl//歌单图片
    obj.playCount = item.playCount//播放次数
    obj.trackCount = item.trackCount//歌曲数量
    songListArr.push(obj)
  })
  return songListArr
}

// 过滤歌曲数据(参数是数组：Array)
export function filterSong(songList) {
  let songListArr = []
  songList.forEach(item => {
    let obj = {}
    obj.songId = item.song.id//歌曲id
    obj.name = item.song.name//歌曲标题
    obj.imageUrl = item.song.album.picUrl//歌曲图片
    obj.ar = item.song.artists//歌手
    obj.al = item.song.album//专辑
    obj.fee = item.song.fee//是否免费  0: 免费或无版权 1: VIP 歌曲 4: 购买专辑 8: 非会员可免费播放低音质，会员可播放高音质及下载,fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
    obj.duration = item.song.duration//时长
    obj.mv = item.song.mvid//是否有mv，非0即有/
    obj.sq = item.song.sqMusic//是否有高品质音乐，非null即有
    obj.privilege = item.song.privilege//歌曲权限
    songListArr.push(obj)
  })
  return songListArr
}

// 过滤专辑数据(参数是数组：Array)
export function filterAlbum(albumList) {
  let albumListArr = []
  albumList.forEach(item => {
    let obj = {}
    obj.albumId = item.id//专辑id
    obj.ar = item.artists//歌手
    obj.name = item.name//专辑标题
    obj.imageUrl = item.picUrl//专辑图片
    obj.publishTime = item.publishTime//发行时间
    obj.size = item.size//歌曲数量
    obj.company = item.company//发行公司
    albumListArr.push(obj)
  })
  return albumListArr
}

// 过滤我的歌单，分为 喜欢的音乐，创建的歌单，收藏的歌单(参数是数组：Array,和用户id：uid)
export function filterMyPlaylist(array, uid) {
  const myLikeMusic = array.slice(0, 1)//我喜欢的音乐
  const otherPlaylist = array.slice(1)//除第一个以外的
  const createPlaylist = otherPlaylist.filter(item => item.userId == uid)//创建的歌单
  const collectPlaylist = otherPlaylist.filter(item => item.userId != uid)//收藏的歌单
  return {
    myLikeMusic, createPlaylist, collectPlaylist
  }
}

// 过滤用户详情

// 过滤播放量，亿保留后一位小数，万保留整数
export function filterPlayCount(playCount) {
  if (playCount > 100000000) {
    return (playCount / 100000000).toFixed(1) + '亿'
  } else if (playCount > 10000) {
    return Math.floor(playCount / 10000) + '万'
  } else {
    return playCount
  }
}

// 时间戳转换成日期格式(毫秒转换),参数是时间戳(必填)和格式(可选),默认格式为yyyy-MM-dd hh:mm:ss
export function formatDate(time, fmt) {
  let date = new Date(time)//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let year = date.getFullYear()//年
  let month = date.getMonth() + 1//月
  let day = date.getDate()//日
  let hour = date.getHours()//时
  let minute = date.getMinutes()//分
  let second = date.getSeconds()//秒
  return year + '/' + month + '/' + day
}

// 歌曲时长转换，参数是毫秒
export function formatDuration(duration) {
  let minute = Math.floor(duration / 1000 / 60)
  let second = Math.floor(duration / 1000 % 60)
  if (minute < 10) {
    minute = '0' + minute
  }
  if (second < 10) {
    second = '0' + second
  }
  return minute + ':' + second
}