import cityList from 'china-division/dist/pc-code.json';// 城市数据0

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

// 格式化播放音乐时间，参数是秒
export function formatTime(time) {
  // 如果时间 等于0 或者 等于NaN 先显示00：00
  if (time == 0 || window.isNaN(time)) {
    return '00:00'
  }
  let sec = Math.floor(time % 60);
  let min = Math.floor(time / 60);
  // 返回格式 00：00 不足两位的补零
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
}

// 接收城市代码码，和引入的json字典进行匹配，返回对应的城市信息
export function filterCityName(code) {
  // 截取前两位，匹配省份
  let provinceCode = code.toString().slice(0, 2)
  // 匹配到的省份，默认为未知
  let province = '未知'
  // 遍历数组进行匹配
  cityList.forEach(item => {
    if (Number(item.code) == Number(provinceCode)) {
      return province = item.name
    }
  })
  // 返回省份
  return province
}

// 过滤生日时间戳，判断是 几几后,什么星座
export function filterBirthday(birthday) {
  let date = new Date(birthday)
  let month = date.getMonth() + 1
  let day = date.getDate()
  let age = new Date().getFullYear() - date.getFullYear()
  let constellation = ''
  if (month == 1 && day >= 20 || month == 2 && day <= 18) {
    constellation = '水瓶座'
  } else if (month == 2 && day >= 19 || month == 3 && day <= 20) {
    constellation = '双鱼座'
  } else if (month == 3 && day >= 21 || month == 4 && day <= 19) {
    constellation = '白羊座'
  } else if (month == 4 && day >= 20 || month == 5 && day <= 20) {
    constellation = '金牛座'
  } else if (month == 5 && day >= 21 || month == 6 && day <= 21) {
    constellation = '双子座'
  } else if (month == 6 && day >= 22 || month == 7 && day <= 22) {
    constellation = '巨蟹座'
  } else if (month == 7 && day >= 23 || month == 8 && day <= 22) {
    constellation = '狮子座'
  } else if (month == 8 && day >= 23 || month == 9 && day <= 22) {
    constellation = '处女座'
  } else if (month == 9 && day >= 23 || month == 10 && day <= 23) {
    constellation = '天秤座'
  } else if (month == 10 && day >= 24 || month == 11 && day <= 22) {
    constellation = '天蝎座'
  } else if (month == 11 && day >= 23 || month == 12 && day <= 21) {
    constellation = '射手座'
  } else if (month == 12 && day >= 22 || month == 1 && day <= 19) {
    constellation = '摩羯座'
  }
  return `${age}岁 ${constellation}`
}
