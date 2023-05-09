import request from '@/axios';
import { useLoginStore } from '@/stores/login.js';
import { storeToRefs } from 'pinia';

// 1. 手机登录
// 必选参数 :
// phone: 手机号码
// password: 密码
// 可选参数 :
// countrycode: 国家码，用于国外手机号登录，例如美国传入：1
// md5_password: md5 加密后的密码,传入后 password 参数将失效
// captcha: 验证码,使用 /captcha/sent接口传入手机号获取验证码,调用此接口传入验证码,可使用验证码登录,传入后 password 参数将失效
// 接口地址 : /login/cellphone
// 调用例子 : /login/cellphone?phone=xxx&password=yyy /login/cellphone?phone=xxx&md5_password=yyy /login/cellphone?phone=xxx&captcha=1234
/**
 * @description 手机登录接口
 * @param {Number} phone 手机号码 （必选参数）
 * @param {Number|String} password 密码 （必选参数）
 * @param {Number} countrycode 国家码，用于国外手机号登录，例如美国传入：1 （可选参数）
 * @param {String} md5_password md5 加密后的密码,传入后 password 参数将失效 （可选参数）
 * @example 
 * 1. loginType：登录方式
 * 2. code：状态码
 * 3. account：账号信息
 * 4. token：token
 * 5. profile: 用户信息
 * 6. bindings: 绑定信息
 * 7. cookie: cookie
 */
export async function loginByPhone(phone, password) {
  const { data } = await request({
    url: '/login/cellphone',
    method: 'get',
    params: {
      phone,
      password,
    },
  });
  return data;
}
export async function loginByCaptcha(phone, captcha) {
  const { data } = await request({
    url: '/login/cellphone',
    method: 'get',
    params: {
      phone,
      captcha,
    },
  });
  return data;
}
// 发送手机验证码
// 接口地址 : /captcha/sent
// 调用例子 : /captcha/sent?phone=xxx
export async function sendCaptcha(phone) {
  const { data } = await request({
    url: '/captcha/sent',
    method: 'post',
    data: {
      phone,
      timestamp: Date.now(),// 防止缓存
    },
  });
  return data;
}
// 2. 邮箱登录
// 必选参数 :
// email: 163 网易邮箱
// password: 密码
// 可选参数 :
// md5_password: md5 加密后的密码,传入后 password 将失效
// 接口地址 : /login
// 调用例子 : /login?email=xxx@163.com&password=yyy
/**
 * @description 邮箱登录接口
 * @param {Number|string} email 邮箱 （必选参数）
 * @param {Number|string} password 密码 （必选参数）
 * @example 
 * 1. loginType：登录方式
 * 2. code：状态码
 * 3. account：账号信息
 * 4. token：token
 * 5. profile: 用户信息
 * 6. bindings: 绑定信息
 * 7. cookie: cookie
 */
export async function loginByEmail(email, password) {
  const { data } = await request({
    url: '/login',
    method: 'post',
    data: {
      email,
      password,
    },
  });
  return data;
}
// 3. 二维码登录
// 说明: 二维码登录涉及到 3 个接口,调用务必带上时间戳,防止缓存
// 1. 二维码 key 生成接口
// 说明: 调用此接口可生成一个 key
// 接口地址 : /login/qr/key
// 2. 二维码生成接口
// 说明: 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
// 必选参数: key,由第一个接口生成
// 可选参数: qrimg 传入后会额外返回二维码图片 base64 编码
// 接口地址 : /login/qr/create
// 调用例子 : /login/qr/create?key=xxx
// 3. 二维码检测扫码状态接口
// 说明: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
// 必选参数: key,由第一个接口生成
// 接口地址 : /login/qr/check
// 调用例子 : /login/qr/check?key=xxx
/**
 * @description 二维码 key 生成接口
 * @example 
 * 1. code：状态码
 * 2. unikey：二维码 key
 */
export async function qrKey() {
  const { data } = await request({
    url: '/login/qr/key',
    method: 'get',
    params: {
      timestamp: Date.now() //防止缓存
    }
  });
  return data.data;
}
/**
 * @description 二维码生成接口
 * @param {Number|string} key 二维码 unikey （必选参数）
 * @param {Boolean} qrimg 是否返回二维码图片 base64 编码 （可选参数）
 * @example
 * 1. qrimg：二维码图片的 base64 编码
 * 2. qrurl：二维码链接
 */
export async function qrCreate(key, qrimg = true) {
  const { data } = await request({
    url: `/login/qr/create?key=${key}&qrimg=${qrimg}`,
    method: 'get',
    params: {
      timestamp: Date.now() //防止缓存
    },
  });
  return data.data;
}
/**
 * @description 二维码检测扫码状态接口
 * @param {Number|string} key 二维码 unikey （必选参数）
 * @example 
 * 1. code：状态码，
 * 2. cookie：登录成功后的 cookie，
 * 3. meassage：二维码状态
  * 800 为二维码过期,
  * 801 为等待扫码,
  * 802 为待确认,
  * 803 为授权登录成功(803 状态码下会返回 cookies)
 */
export async function qrCheck(key) {
  const { data } = await request({
    url: `/login/qr/check?key=${key}`,
    method: 'get',
    params: {
      timestamp: Date.now() //防止缓存
    },
  });
  return data;
}
// 3. 游客登录
// 说明 : 直接调用此接口, 可获取游客cookie,如果遇到其他接口未登录状态报400状态码需要验证的错误,可使用此接口获取游客cookie避免报错
// 接口地址 : /register/anonimous
/**
 * @description 游客登录
 * @example
 * 1. cookie：登录成功后的 cookie
 * 2. createTime：cookie 创建时间
 * 3. userId：游客 id
 */
export async function anonimous() {
  const { data } = await request({
    url: '/register/anonimous',
    method: 'get',
  });
  return data;
}
// 退出登录
// 说明 : 调用此接口 , 可退出登录
// 调用例子 : /logout
/**
 * @description 退出登录
 * @example
 * 1. code：状态码
 */
export async function logout() {
  const { data } = await request({
    url: '/logout',
    method: 'get',
  });
  return data;
}
// 获取用户详情
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
// 必选参数 : uid : 用户 id
// 接口地址 : /user/detail
// 调用例子 : /user/detail?uid=32953014
/**
 * @description 获取指定uid用户详情
 * @param {Number|string} uid 用户 id （必选参数）
 * @example
 * 1. level：用户等级
 * 2. listenSongs：听歌数量
 * 3. userPoint：用户积分
 * 4. mobileSign：是否手机登录
 * 5. pcSign：是否电脑登录
 * 6. profile：用户信息
 * 7. peopleCanSeeMyPlayRecord：是否公开播放记录
 * 8. bindings：绑定信息
 * 9. adValid：是否开通会员
 * 10. code：状态码
 * 11. newUser：是否新用户
 * 12. createTime：创建时间
 * 13. createDays：创建天数
 * 14. recallUser：是否回收用户
 * 15. profileVillageInfo：云村信息
 */
export async function userDetail(uid) {
  const { data } = await request({
    url: `/user/detail?uid=${uid}`,
    method: 'get',
  });
  return data;
}
// 获取账号信息
// 说明 : 登录后调用此接口 ,可获取用户账号信息
// 接口地址 : /user/account
// 调用例子 : /user/account
/**
 * @description 获取账号信息
 * @example
 * 1. code：状态码
 * 2. profile：用户信息
 * 3. account：账号信息
 */
export async function userAccount() {
  const { cookie } = storeToRefs(useLoginStore());// 获取cookie
  const { data } = await request({
    url: '/user/account',
    method: 'get',
    params: {
      timestamp: Date.now(), //防止缓存
      cookie: encodeURIComponent(JSON.stringify(cookie.value)),//cookie请求头
    }
  });
  return data;
}
// 获取用户信息 , 歌单，收藏，mv, dj 数量
// 说明 : 登录后调用此接口 , 可以获取用户信息
// 接口地址 : /user/subcount
// 调用例子 : /user/subcount
/**
 * @description 获取用户信息 , 歌单，收藏，mv, dj 数量
 * @example
 * 1. code：状态码
 * 2. programCount：电台数量
 * 3. djRadioCount：电台数量
 * 4. mvCount：mv数量
 * 5. artistCount：收藏的歌手数量
 * 6. newProgramCount：新电台数量
 * 7. createDjRadioCount：创建的电台数量
 * 8. createdPlaylistCount：创建的歌单数量
 * 9. subPlaylistCount：收藏的歌单数量
 */
export async function userSubcount() {
  const { data } = await request({
    url: '/user/subcount',
    method: 'get',
  });
  return data;
}
// 获取用户等级信息
// 说明 : 登录后调用此接口 , 可以获取用户等级信息,包含当前登录天数,听歌次数,下一等级需要的登录天数和听歌次数,当前等级进度,对应 https://music.163.com/#/user/level
// 接口地址 : /user/level
// 调用例子 : /user/level
/**
 * @description 获取用户等级信息
 * @example
 * 1. code：状态码
 * 2. full: 是否满级
 * 3. data: 用户等级信息
 */
export async function userLevel() {
  const { data } = await request({
    url: '/user/level',
    method: 'get',
  });
  return data;
}
// 获取用户绑定信息
// 说明 : 登录后调用此接口 , 可以获取用户绑定信息
// 必选参数 : uid : 用户 id
// 接口地址 : /user/binding
// 调用例子 : /user/binding?uid=32953014
/**
 * @description 获取用户绑定信息
 * @param {Number|string} uid 用户 id （必选参数）
 * @example
 * 1. code：状态码
 * 2. bindings：绑定信息
 */
export async function userBinding(uid) {
  const { data } = await request({
    url: `/user/binding?uid=${uid}`,
    method: 'get',
  });
  return data;
}
// 更新用户信息
// 说明 : 登录后调用此接口 , 传入相关信息,可以更新用户信息
// 必选参数 :
// gender: 性别 0:保密 1:男性 2:女性
// birthday: 出生日期,时间戳 unix timestamp
// nickname: 用户昵称
// province: 省份id
// city: 城市id
// signature：用户签名
// 接口地址 : /user/update
// 调用例子 : /user/update?gender=0&signature=测试签名&city=440300&nickname=binary&birthday=1525918298004&province=440000
/**
 * @description 更新用户信息
 * @param {Number} gender 性别 0:保密 1:男性 2:女性 （必选参数）
 * @param {Number} birthday 出生日期,时间戳格式 unix timestamp （必选参数）
 * @param {String} nickname 用户昵称 （必选参数）
 * @param {Number} province 省份id （必选参数）
 * @param {Number} city 城市id （必选参数）
 * @param {String} signature 用户签名 （必选参数）
 * @example
 * 1. code：状态码
 */
export async function userUpdate(gender, birthday, nickname, province, city, signature) {
  const { data } = await request({
    url: '/user/update',
    method: 'get',
    params: {
      gender,
      birthday,
      nickname,
      province,
      city,
      signature,
    },
  });
  return data;
}
// 更新头像
// 说明 : 登录后调用此接口,使用'Content-Type': 'multipart/form-data'上传图片 formData(name 为'imgFile'),可更新头像(参考: https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/public/avatar_update.html ),支持命令行调用,参考module_example目录下avatar_upload.js
// 可选参数 :
// imgSize : 图片尺寸,默认为 300
// imgX : 水平裁剪偏移,方形图片可不传,默认为 0 
// imgY : 垂直裁剪偏移,方形图片可不传,默认为 0
// 接口地址 : /avatar/upload
// 调用例子 : /avatar/upload?imgSize=200
/**
 * @description 更新头像
 * @param {Number} imgSize 图片尺寸,默认为 300 （可选参数）
 * @param {Number} imgX 水平裁剪偏移,方形图片可不传,默认为 0 （可选参数）
 * @param {Number} imgY 垂直裁剪偏移,方形图片可不传,默认为 0 （可选参数）
 * @param {Object} imgFile 图片文件 （必选参数）
 * @example
 * 1. code：状态码
 * 2. data：头像地址
 * 3. msg：提示信息
 */
export async function avatarUpload(imgSize, imgX, imgY, imgFile) {
  const { data } = await request({
    url: '/avatar/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      imgSize,
      imgX,
      imgY,
      imgFile: imgFile,
      timestamp: new Date(),// 防止缓存
    },
  });
  return data;
}
// 国家编码列表
// 说明 : 调用此接口,可获取国家编码列表
// 接口地址 : /countries/code/list
/**
 * @description 国家编码列表
 * @example
 * 1. code：状态码
 * 2. message：提示信息
 * 3. data：国家编码列表[{}]
 */
export async function countriesCodeList() {
  const { data } = await request({
    url: '/countries/code/list',
    method: 'get',
  });
  return data;
}
// 获取用户歌单
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
// 必选参数 : uid : 用户 id
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /user/playlist
// 调用例子 : /user/playlist?uid=32953014
/**
 * @description 获取用户歌单
 * @param {Number} uid 用户 id （必选参数）
 * @param {Number} limit 返回数量 , 默认为 30 （可选参数）
 * @param {Number} offset 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 （可选参数）
 * @example
 * 1. code：状态码
 * 2. version：版本号
 * 3. more：是否有更多
 * 4. playlist：歌单列表[{}]
 */
export async function userPlaylist(uid, { limit = 30, offset = 1 }) {
  const { data } = await request({
    url: `/user/playlist?uid=${uid}`,
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
    },
  });
  return data;
}
// 获取用户关注列表
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户关注列表
// 必选参数 : uid : 用户 id
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /user/follows
// 调用例子 : /user/follows?uid=32953014
/**
 * @description 获取用户关注列表
 * @param {Number} uid 用户 id （必选参数）
 * @param {Number} limit 返回数量 , 默认为 30 （可选参数）
 * @param {Number} offset 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 （可选参数）
 * @example
 * 1. code：状态码
 * 2. follow：关注列表[{}]
 * 3. touchCount：关注数量
 * 4. more：是否有更多
 */
export async function userFollows(uid, { limit = 30, offset = 1 }) {
  const { data } = await request({
    url: `/user/follows?uid=${uid}`,
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
    },
  });
  return data;
}
// 获取用户粉丝列表
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户粉丝列表
// 必选参数 : uid : 用户 id
// 可选参数 : limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// 接口地址 : /user/followeds
// 调用例子 : /user/followeds?uid=32953014 /user/followeds?uid=416608258&limit=1 /user/followeds?uid=416608258&limit=1&offset=1
/**
 * @description 获取用户粉丝列表
 * @param {Number} uid 用户 id （必选参数）
 * @param {Number} limit 返回数量 , 默认为 30 （可选参数）
 * @param {Number} offset 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 （可选参数）
 * @example
 * 1. code：状态码
 * 2. followeds：粉丝列表[{}]
 * 3. size：粉丝数量
 * 4. more：是否有更多
 */
export async function userFolloweds(uid, { limit = 30, offset = 1 }) {
  const { data } = await request({
    url: `/user/followeds?uid=${uid}`,
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
    },
  });
  return data;
}
// 获取用户动态
// 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户动态
// 必选参数 : uid : 用户 id
// 可选参数 : limit : 返回数量 , 默认为 30
// lasttime : 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据
// 接口地址 : /user/event
// 调用例子 : /user/event?uid=32953014 /user/event?uid=32953014&limit=1&lasttime=1558011138743
// 返回结果的type参数对应:
// 18 分享单曲
// 19 分享专辑
// 17、28 分享电台节目
// 22 转发
// 39 发布视频
// 35、13 分享歌单
// 24 分享专栏文章
// 41、21 分享视频
/**
 * @description 获取用户动态
 * @param {Number} uid 用户 id （必选参数）
 * @param {Number} limit 返回数量 , 默认为 30 （可选参数）
 * @param {Number} lasttime 返回数据的 lasttime ,默认-1,传入上一次返回结果的 lasttime,将会返回下一页的数据 （可选参数）
 * @example
 * 1. code：状态码
 * 2. more：是否有更多
 * 3. size：动态数量
 * 4. events：动态列表[{}]
 * 5. lasttime：下一页的 lasttime
 */
export async function userEvent(uid, { limit = 30, lasttime = -1 }) {
  const { data } = await request({
    url: `/user/event?uid=${uid}`,
    method: 'get',
    params: {
      limit,
      lasttime,
    },
  });
  return data;
}
// 关注/取消关注用户
// 说明 : 登录后调用此接口 , 传入用户 id, 和操作 t,可关注/取消关注用户
// 必选参数 :
// id : 用户 id
// t : 1为关注,其他为取消关注
// 接口地址 : /follow
// 调用例子 : /follow?id=32953014&t=1
/**
 * @description 关注/取消关注用户
 * @param {Number} id 用户 id （必选参数）
 * @param {Number} t 1为关注,其他为取消关注 （必选参数）
 * @example
 * 1. code：状态码
 * 2. py：拼音
 * 3. user：用户信息
 * 4. followTimeContent：关注时间
 * 5. followContent：关注后返回信息
 */
export async function follow(id, t) {
  const { data } = await request({
    url: `/follow?id=${id}&t=${t}`,
    method: 'get',
  });
  return data;
}
// 获取用户播放记录
// 说明 : 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
// 必选参数 : uid : 用户 id
// 可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
// 接口地址 : /user/record
// 调用例子 : /user/record?uid=32953014&type=1
/**
 * @description 获取用户播放记录
 * @param {Number} uid 用户 id （必选参数）
 * @param {Number} type type=1 时只返回 weekData, type=0 时返回 allData （必选参数）
 * @example
 * 1. code：状态码
 * 2. allData：所有数据
 * 3. weekData：周数据
 */
export async function userRecord(uid, type = 0) {
  const { data } = await request({
    url: `/user/record?uid=${uid}&type=${type}`,
    method: 'get',
  });
  return data;
}
// 歌手分类列表
// 说明 : 调用此接口,可获取歌手分类列表
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
// type 取值:
// -1:全部
// 1:男歌手
// 2:女歌手
// 3:乐队
// area 取值:
// -1:全部
// 7华语
// 96欧美
// 8:日本
// 16韩国
// 0:其他
// 接口地址 : /artist/list
// 调用例子 : /artist/list?type=1&area=96&initial=b /artist/list?type=2&area=2&initial=b
/**
 * @description 歌手分类列表
 * @param {Number} limit 返回数量 , 默认为 30 （可选参数）
 * @param {Number} offset 偏移数量，用于分页 ,  如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 （可选参数）
 * @param {String} initial 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0 （可选参数）
 * @param {Number} type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队 （可选参数）
 * @param {Number} area 取值: -1:全部 7华语 96欧美 8:日本 16韩国 0:其他 （可选参数）
 * @example
 * 1. code：状态码
 * 2. more：是否有更多
 * 3. artists：歌手列表[{}]
 */
export async function artistList({ limit = 30, offset = 1, initial = -1, type = -1, area = -1 }) {
  const { data } = await request({
    url: '/artist/list',
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
      initial,
      type,
      area,
    },
  });
  return data;
}
// 收藏/取消收藏歌手
// 说明 : 调用此接口,可收藏歌手
// 必选参数 :
// id : 歌手 id
// t:操作,1 为收藏,其他为取消收藏
// 接口地址 : /artist/sub
// 调用例子 : /artist/sub?id=6452&t=1
/**
 * @description 收藏/取消收藏歌手
 * @param {Number} id 歌手 id （必选参数）
 * @param {Number} t 操作,1 为收藏,其他为取消收藏 （必选参数）
 * @example
 * 1. code：状态码
 * 2. data：数据
 * 3. success：是否成功
 */
export async function artistSub(id, t) {
  const { data } = await request({
    url: `/artist/sub?id=${id}&t=${t}`,
    method: 'get',
  });
  return data;
}
// 获取歌手详情
// 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
// 必选参数 : id: 歌手 id
// 接口地址 : /artist/detail
// 调用例子 : /artist/detail?id=11972054
/**
 * @description 获取歌手详情
 * @param {Number} id 歌手 id （必选参数）
 */
export async function artistDetail(id) {
  const { data } = await request({
    url: '/artist/detail',
    method: 'get',
    params: {
      id,
    },
  });
  return data;
}
// 歌手热门 50 首歌曲
// 说明 : 调用此接口,可获取歌手热门 50 首歌曲
// 必选参数 :
// id : 歌手 id
// 接口地址 : /artist/top/song
// 调用例子 : /artist/top/song?id=6452
/**
 * @description 歌手热门 50 首歌曲
 * @param {Number} id 歌手 id （必选参数）
 * @example
 * 1. code：状态码
 * 2. songs：歌曲列表[{}]
 * 3. more：是否有更多
 */
export async function artistTopSong(id) {
  const { data } = await request({
    url: `/artist/top/song?id=${id}`,
    method: 'get',
  });
  return data;
}
// 歌手全部歌曲
// 说明 : 调用此接口,可获取歌手全部歌曲 必选参数 :
// id : 歌手 id
// 可选参数 :
// order : hot ,time 按照热门或者时间排序
// limit: 取出歌单数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
// 接口地址 : /artist/songs
// 调用例子 : /artist/songs?id=6452
/**
 * @description 歌手全部歌曲
 * @param {Number} id 歌手 id （必选参数）
 * @param {String} order hot ,time 按照热门或者时间排序 （可选参数）
 * @param {Number} limit 取出歌单数量 , 默认为 50 （可选参数）
 * @param {Number} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值 （可选参数）
 * @example
 * 1. code：状态码
 * 2. songs：歌曲列表[{}]
 * 3. more：是否有更多
 * 4. total：歌曲总数
 */
export async function artistSongs(id, { order = 'hot', limit = 50, offset = 1 }) {
  const { data } = await request({
    url: `/artist/songs?id=${id}`,
    method: 'get',
    params: {
      order,
      limit,
      offset: (offset - 1) * limit,
    },
  });
  return data;
}
// 获取歌手专辑
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
// 必选参数 : id: 歌手 id
// 可选参数 : limit: 取出数量 , 默认为 30
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
// 接口地址 : /artist/album
// 调用例子 : /artist/album?id=6452&limit=5 ( 周杰伦 )
/**
 * @description 获取歌手专辑
 * @param {Number} id 歌手 id （必选参数）
 * @param {Number} limit 取出数量 , 默认为 30 （可选参数）
 * @param {Number} offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0 （可选参数）
 */
export async function artistAlbum(id, { limit = 30, offset = 1 }) {
  const { data } = await request({
    url: '/artist/album',
    method: 'get',
    params: {
      id,
      limit,
      offset: (offset - 1) * limit,
    },
  });
  return data;
}
// 获取歌手 mv
// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 , 具体 mv 播放地址可调 用/mv传入此接口获得的 mvid 来拿到 , 如 : /artist/mv?id=6452,/mv?mvid=5461064
// 必选参数 : id: 歌手 id, 可由搜索接口获得
// 接口地址 : /artist/mv
// 调用例子 : /artist/mv?id=6452
/**
 * @description 获取歌手 mv
 * @param {Number} id 歌手 id （必选参数）
 * @param {Number} limit 取出数量 , 默认为 30 （可选参数）
 * @param {Number} offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0 （可选参数）
 */
export async function artistMv(id, { limit = 30, offset = 1 }) {
  const { data } = await request({
    url: '/artist/mv',
    method: 'get',
    params: {
      id,
      limit,
      offset: (offset - 1) * limit,
    },
  });
  return data;
}
// 收藏的歌手列表
// 说明 : 调用此接口,可获取收藏的歌手列表
// 接口地址 : /artist/sublist
// 调用例子 : /artist/sublist
/**
 * @description 收藏的歌手列表
 * @example
 * 1. code：状态码
 * 2. data：歌手列表[{}]
 * 3. count：歌手总数
 * 4. hasMore：是否有更多
 */
export async function artistSublist() {
  const { data } = await request({
    url: '/artist/sublist',
    method: 'get',
  });
  return data;
}
// 歌单分类
// 说明 : 调用此接口,可获取歌单分类,包含 category 信息
// 接口地址 : /playlist/catlist
// 调用例子 : /playlist/catlist
/**
 * @description 歌单分类
 * @example
 * 1. code：状态码
 * 2. all：所有分类
 * 3. sub：所有子分类
 * 4. categories：所有分类
 */
export async function playlistCatlist() {
  const { data } = await request({
    url: '/playlist/catlist',
    method: 'get',
  });
  return data;
}
// 热门歌单分类
// 说明 : 调用此接口,可获取歌单分类,包含 category 信息
// 接口地址 : /playlist/hot
// 调用例子 : /playlist/hot
/**
 * @description 热门歌单分类
 * @example
 * 1. code：状态码
 * 2. tags：热门歌单分类
 */
export async function playlistHot() {
  const { data } = await request({
    url: '/playlist/hot',
    method: 'get',
  });
  return data;
}
// 歌单 ( 网友精选碟 )
// 说明 : 调用此接口 , 可获取网友精选碟歌单
// 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
// cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
// limit: 取出歌单数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
// 接口地址 : /top/playlist
// 调用例子 : /top/playlist?limit=10&order=new
/**
 * @description 歌单 ( 网友精选碟 )
 * @param {String} order 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot' （可选参数）
 * @param {String} cat tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist) （可选参数）
 * @param {Number} limit 取出歌单数量 , 默认为 50 （可选参数）
 * @param {Number} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值 （可选参数）
 * @example
 * 1. code：状态码
 * 2. more：是否有更多
 * 3. total：歌单总数
 * 4. playlists：歌单列表[{}]
 * 5. cat：歌单分类
 */
export async function topPlaylist({ order = 'hot', cat = '全部', limit = 50, offset = 0 }) {
  const { data } = await request({
    url: '/top/playlist',
    method: 'get',
    params: {
      order,
      cat,
      limit,
      offset: (offset - 1) * limit,
    },
  });
  return data;
}
// 精品歌单标签列表
// 说明 : 调用此接口 , 可获取精品歌单标签列表
// 接口地址 : /playlist/highquality/tags
// 调用例子 : /playlist/highquality/tags
/**
 * @description 精品歌单标签列表
 * @example
 * 1. code：状态码
 * 2. tags：标签列表
 */
export async function playlistHighqualityTags() {
  const { data } = await request({
    url: '/playlist/highquality/tags',
    method: 'get',
  });
  return data;
}
// 获取精品歌单
// 说明 : 调用此接口 , 可获取精品歌单
// 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags)
// limit: 取出歌单数量 , 默认为 50
// before: 分页参数,取上一页最后一个歌单的 lasttime 获取下一页数据
// 接口地址 : /top/playlist/highquality
// 调用例子 : /top/playlist/highquality?before=1503639064232&limit=3
/**
 * @description 获取精品歌单
 * @param {String} cat tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从精品歌单标签列表接口获取(/playlist/highquality/tags) （可选参数）
 * @param {Number} limit 取出歌单数量 , 默认为 50 （可选参数）
 * @param {Number} before 分页参数,取上一页最后一个歌单的 lasttime 获取下一页数据 （可选参数）
 * @example
 * 1. code：状态码
 * 2. more：是否有更多
 * 3. total：歌单总数
 * 4. playlists：歌单列表[{}]
 * 5. lasttime：最后一次更新时间
 */
export async function topPlaylistHighquality({ cat = '全部', limit = 50, before = 0 }) {
  const { data } = await request({
    url: '/top/playlist/highquality',
    method: 'get',
    params: {
      cat,
      limit,
      before,
    },
  });
  return data;
}
// 相关歌单推荐
// 说明 : 调用此接口,传入歌单 id 可获取相关歌单(对应页面 https://music.163.com/#/playlist?id=1)
// 必选参数 : id : 歌单 id
// 接口地址 : /related/playlist
// 调用例子 : /related/playlist?id=1
/**
 * @description 相关歌单推荐
 * @param {Number} id 歌单 id
 * @example
 * 1. code：状态码
 * 2. playlists：歌单列表[{}]
 */
export async function relatedPlaylist(id) {
  const { data } = await request({
    url: `/related/playlist?id=${id}`,
    method: 'get',
  });
  return data;
}
// 获取歌单详情
// 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
// 必选参数 : id : 歌单 id
// 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
// 接口地址 : /playlist/detail
// 调用例子 : /playlist/detail?id=24381616
/**
 * @description 获取歌单详情
 * @param {Number} id 歌单 id
 * @param {Number} s 歌单最近的 s 个收藏者,默认为 8 （可选参数）
 * @example
 * 1. code：状态码
 * 2. playlist：歌单详情
 * 3. relatedVideos：相关视频
 * 4. urls：视频地址
 * 5. privileges：歌曲权限
 * 6. sharedPrivileges：分享歌曲权限
 * 7. resEntrance：入口
 * 8. fromUsers：分享用户
 * 9. fromUserCount：分享用户数量
 * 10. songFromUsers：歌曲分享用户
 */
export async function playlistDetail(id, s = 8) {
  const { data } = await request({
    url: '/playlist/detail',
    method: 'get',
    params: {
      id,
      s,
    },
  });
  return data;
}
// 获取歌单所有歌曲
// 说明 : 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单id，即可获得对应的所有歌曲
// 必选参数 : id : 歌单 id
// 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
// 可选参数 : offset : 默认值为0
// 接口地址 : /playlist/track/all
// 调用例子 : /playlist/track/all?id=24381616&limit=10&offset=1
/**
 * @description 获取歌单所有歌曲
 * @param {Number} id 歌单 id
 * @param {Number} limit 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 * @param {Number} offset 默认值为0
 * @example
 * 1. code：状态码
 * 2. songs：歌曲列表
 * 3. privileges：歌曲权限
 */
export async function playlistTrackAll(id, { limit, offset }) {
  const { data } = await request({
    url: `/playlist/track/all?id=${id}`,
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
    },
  });
  return data;
}
// 歌单详情动态
// 说明 : 调用后可获取歌单详情动态部分,如评论数,是否收藏,播放数
// 必选参数 : id : 歌单 id
// 接口地址 : /playlist/detail/dynamic
// 调用例子 : /playlist/detail/dynamic?id=24381616
/**
 * @description 歌单详情动态
 * @param {Number} id 歌单 id
 * @example
 * 1. code：状态码
 * 2. commentCount：评论数
 * 3. shareCount：分享数
 * 4. playCount：播放数
 * 5. bookedCount：收藏数
 * 6. subscribed：是否收藏
 * 7. remarkName：备注名
 * 8. followed：是否关注
 * 9. gradeStatus：等级
 * 10. remixVideo: 视频
 */
export async function playlistDetailDynamic(id) {
  const { data } = await request({
    url: `/playlist/detail/dynamic?id=${id}`,
    method: 'get',
  });
  return data;
}
// 获取音乐 url - 旧版
// 说明 : 调用此接口 , 传入的音乐 id ( 音乐 id 可从搜索接口获取 ) , 可获得音乐的 url
// 必选参数 : id : 音乐 id
// 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
// 接口地址 : /song/url
// 调用例子 : /song/url?id=33894312
/**
 * @description 获取音乐 url - 旧版
 * @param {Number} id 音乐 id
 * @param {Number} br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * @example
 * 1. code：状态码
 * 2. data：歌曲列表
 */
export async function songUrl(id, br = 999000) {
  const { data } = await request({
    url: '/song/url',
    method: 'get',
    params: {
      id,
      br,
    },
  });
  return data;
}
// 获取音乐 url - 新版
// 说明 : 使用注意事项同上
// 必选参数 : 
// id : 音乐 id 
// level: 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res
// 接口地址 : /song/url/v1
// 调用例子 : /song/url/v1?id=33894312&level=exhigh /song/url/v1?id=405998841,33894312&level=lossless
/**
 * @description 获取音乐 url - 新版
 * @param {Number} id 音乐 id (必选参数)
 * @param {String} level 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res (必选参数)
 * @example
 * 1. code：状态码
 * 2. data：音乐数据
 */
export async function songUrlV1(id, level = 'standard') {
  const { cookie } = storeToRefs(useLoginStore());// 获取cookie
  const { data } = await request({
    url: `/song/url/v1?id=${id}&level=${level}`,
    method: 'post',
    data: {
      cookie: encodeURIComponent(JSON.stringify(cookie.value)),//cookie请求头
    },
    // params: {
    //   cookie: encodeURIComponent(JSON.stringify(cookie.value)),//cookie请求头
    // }
  });
  return data;
}
// 音乐是否可用
// 说明: 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
// 必选参数 : id : 歌曲 id
// 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
// 接口地址 : /check/music
// 调用例子 : /check/music?id=33894312
/**
 * @description 音乐是否可用
 * @param {Number} id 歌曲 id (必选参数)
 * @param {Number} br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推 (可选参数)
 * @example
 * 1. success：是否可用
 * 2. message：提示信息
 */
export async function checkMusic(id, br) {
  const { data } = await request({
    url: `/check/music?id=${id}`,
    method: 'get',
    params: {
      br,
    },
  });
  return data;
}
// 搜索
// 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
// 必选参数 : 
// keywords : 关键词
// 可选参数 : 
// limit : 返回数量 , 默认为 30 
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
// 接口地址 : /search 或者 /cloudsearch(更全)
// 调用例子 : /search?keywords=海阔天空 /cloudsearch?keywords=海阔天空
/**
 * @description 搜索
 * @param {String} keywords 关键词 (必选参数)
 * @param {Number} limit 返回数量 , 默认为 30 (可选参数)
 * @param {Number} offset 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 (可选参数)
 * @param {Number} type 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样) (可选参数)
 * @example
 * 1. code：状态码
 * 2. result：搜索结果
 */
export async function search(keywords, { limit, offset, type }) {
  const { data } = await request({
    url: `/cloudsearch?keywords=${keywords}`,
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
      type,
    },
  });
  return data;
}
// 新建歌单
// 说明 : 调用此接口 , 传入歌单名字可新建歌单
// 必选参数 : name : 歌单名
// 可选参数 :
// privacy : 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单
// type : 歌单类型,默认'NORMAL',传 'VIDEO'则为视频歌单,传 'SHARED'则为共享歌单
// 接口地址 : /playlist/create
// 调用例子 : /playlist/create?name=测试歌单,/playlist/create?name=test&type=VIDEO
/**
 * @description 新建歌单
 * @param {String} name 歌单名 (必选参数)
 * @param {Number} privacy 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单 (可选参数)
 * @param {String} type 歌单类型,默认'NORMAL',传 'VIDEO'则为视频歌单,传 'SHARED'则为共享歌单 (可选参数)
 * @example
 * 1. code：状态码
 * 2. playlist：歌单信息
 * 3. id：歌单id
 */
export async function createPlaylist(name, { privacy = 0, type = 'NORMAL' }) {
  const { data } = await request({
    url: `/playlist/create?name=${name}`,
    method: 'get',
    params: {
      privacy,
      type,
    },
  });
  return data;
}
// 删除歌单
// 说明 : 调用此接口 , 传入歌单 id 可删除歌单
// 必选参数 : id : 歌单 id,可多个,用逗号隔开
// 接口地址 : /playlist/delete
// 调用例子 : /playlist/delete?id=2947311456 , /playlist/delete?id=5013464397,5013427772
/**
 * @description 删除歌单
 * @param {String} id 歌单id (必选参数)
 * @example
 * 1. code：状态码
 * 2. msg：null
 * 3. message：null
 * 4. data：null
 */
export async function deletePlaylist(id) {
  const { data } = await request({
    url: `/playlist/delete?id=${id}`,
    method: 'get',
  });
  return data;
}
// 收藏/取消收藏歌单
// 说明 : 调用此接口 , 传入类型和歌单 id 可收藏歌单或者取消收藏歌单
// 必选参数 :
// t : 类型,1:收藏,2:取消收藏 
// id : 歌单 id
// 接口地址 : /playlist/subscribe
// 调用例子 : /playlist/subscribe?t=1&id=106697785 /playlist/subscribe?t=2&id=106697785
/**
 * @description 收藏/取消收藏歌单
 * @param {Number} t 类型 1:收藏,2:取消收藏 (必选参数)
 * @param {String} id 歌单id (必选参数)
 * @example
 * 1. code：状态码
 */
export async function subscribePlaylist(t, id) {
  const { data } = await request({
    url: `/playlist/subscribe?t=${t}&id=${id}`,
    method: 'get',
  });
  return data;
}
// 对歌单添加或删除歌曲
// 说明 : 调用此接口 , 可以添加歌曲到歌单或者从歌单删除某首歌曲 ( 需要登录 )
// 必选参数 :
// op: 从歌单增加单曲为 add, 删除为 del
// pid: 歌单 id 
// tracks: 歌曲 id,可多个,用逗号隔开
// 接口地址 : /playlist/tracks
// 调用例子 : /playlist/tracks?op=add&pid=24381616&tracks=347231 ( 对应把歌曲添加到 ' 我 ' 的歌单 , 测试的时候请把这里的 pid 换成你自己的, id 和 tracks 不对可能会报 502 错误)
/**
 * @description 对歌单添加或删除歌曲
 * @param {String} op 从歌单增加单曲为 add, 删除为 del (必选参数)
 * @param {String} pid 歌单id (必选参数)
 * @param {String} tracks 歌曲id,可多个,用逗号隔开 (必选参数)
 * @example
 * 1. code：状态码
 * 2. message：提示信息
 * 3. trackIds：歌曲id
 * 4. count：歌曲数量
 * 5. cloudCount：云盘歌曲数量
 */
export async function playlistTracks(op, pid, tracks) {
  const { data } = await request({
    url: `/playlist/tracks?op=${op}&pid=${pid}&tracks=${tracks}`,
    method: 'get',
  });
  return data;
}
// 获取歌词
// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
// 必选参数 : id: 音乐 id
// 接口地址 : /lyric
// 调用例子 : /lyric?id=33894312
/**
 * @description 获取歌词
 * @param {String} id 音乐id (必选参数)
 * @example
 * 1. code：状态码
 * 2. sgc：是否为翻唱
 * 3. sfy：是否为原唱
 * 4. qfy：是否已经纠错
 * 5. lrc：歌词
 * 6. klyric：翻译歌词
 * 7. tlyric：原唱歌词
 * 8. romalrc：歌词罗马音
 */
export async function getLyric(id) {
  const { data } = await request({
    url: `/lyric?id=${id}`,
    method: 'get',
  });
  return data;
}
// 新歌速递
// 说明 : 调用此接口 , 可获取新歌速递
// 必选参数 :
// type: 地区类型 id,对应以下:
// 全部:0
// 华语:7
// 欧美:96
// 日本:8
// 韩国:16
// 接口地址 : /top/song
// 调用例子 : /top/song?type=96
/**
 * @description 新歌速递
 * @param {String} type 地区类型id (必选参数)
 * @example
 * 1. code：状态码
 * 2. data：歌曲列表[{}]
 */
export async function topSong(type) {
  const { data } = await request({
    url: `/top/song?type=${type}`,
    method: 'get',
  });
  return data;
}
// 歌曲评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该音乐的所有评论 ( 不需要登录 )
// 必选参数 : id: 音乐 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/music
// 调用例子 : /comment/music?id=186016&limit=1 对应晴天评论
/**
 * @description 歌曲评论
 * @param {String} id 音乐id (必选参数)
 * @param {String} limit 取出评论数量,默认为20 (可选参数)
 * @param {String} offset 偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值 (可选参数)
 * @param {String} before 分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到) (可选参数)
 * @example
 * 1. code：状态码
 * 2. isMusician：是否为音乐人
 * 3. cnum：评论数量
 * 4. userId：用户id
 * 5. topComments：热门评论[{}]
 * 6. moreHot：是否有更多热门评论
 * 7. hotComments：热门评论[{}]
 * 8. commentBanner：评论banner
 * 9. comments：评论[{}]
 * 10. total：评论总数
 * 11. more：是否有更多评论
 */
export async function commentMusic(id, { limit = 20, offset = 1, before = 0 }) {
  const { data } = await request({
    url: `/comment/music?id=${id}`,
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
      before,
    },
  });
  return data;
}
// 楼层评论
// 说明 : 调用此接口 , 传入资源 parentCommentId 和资源类型 type 和资源 id 参数, 可获得该资源的歌曲楼层评论
// 必选参数 :
// parentCommentId: 楼层评论 id
// id : 资源 id
// type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
// 0: 歌曲
// 1: mv
// 2: 歌单
// 3: 专辑
// 4: 电台节目
// 5: 视频
// 6: 动态
// 7: 电台
// 可选参数 : limit: 取出评论数量 , 默认为 20
// time: 分页参数,取上一页最后一项的 time 获取下一页数据
// 接口地址 : /comment/floor
// 调用例子 : /comment/floor?parentCommentId=1438569889&id=29764564&type=0
/**
 * @description 楼层评论
 * @param {String} parentCommentId 楼层评论id (必选参数)
 * @param {String} id 资源id (必选参数)
 * @param {String} type 资源类型 (必选参数)
 * @param {String} limit 取出评论数量,默认为20 (可选参数)
 * @param {String} time 分页参数,取上一页最后一项的time获取下一页数据 (可选参数)
 * @example
 * 1. code：状态码
 * 2. message：状态信息
 * 3. data：数据
 */
export async function commentFloor(parentCommentId, id, type, { limit = 20, time = 0 }) {
  const { data } = await request({
    url: `/comment/floor?parentCommentId=${parentCommentId}&id=${id}&type=${type}`,
    method: 'get',
    params: {
      limit,
      time,
    },
  });
  return data;
}
// 专辑评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该专辑的所有评论 ( 不需要 登录 )
// 必选参数 : id: 专辑 id
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/album
// 调用例子 : /comment/album?id=32311
/**
 * @description 专辑评论
 * @param {String} id 专辑id (必选参数)
 * @param {String} limit 取出评论数量,默认为20 (可选参数)
 * @param {String} offset 偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值 (可选参数)
 * @param {String} before 分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到) (可选参数)
 * @example
 * 1. code：状态码
 * 2. isMusician：是否为音乐人
 * 3. cnum：评论数量
 * 4. userId：用户id
 * 5. topComments：热门评论[{}]
 * 6. moreHot：是否有更多热门评论
 * 7. hotComments：热门评论[{}]
 * 8. commentBanner：评论banner
 * 9. comments：评论[{}]
 * 10. total：评论总数
 * 11. more：是否有更多评论
 */
export async function commentAlbum(id, { limit = 20, offset = 1, before = 0 }) {
  const { data } = await request({
    url: `/comment/album?id=${id}`,
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
      before,
    },
  });
  return data;
}
// 歌单评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要 登录 )
// 必选参数 : id: 歌单 id
// 可选参数 :
// limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/playlist
// 调用例子 : /comment/playlist?id=705123491
/**
 * @description 歌单评论
 * @param {String} id 歌单id (必选参数)
 * @param {String} limit 取出评论数量,默认为20 (可选参数)
 * @param {String} offset 偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值 (可选参数)
 * @param {String} before 分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到) (可选参数)
 * @example
 * 1. code：状态码
 * 2. isMusician：是否为音乐人
 * 3. cnum：评论数量
 * 4. userId：用户id
 * 5. topComments：热门评论[{}]
 * 6. moreHot：是否有更多热门评论
 * 7. hotComments：热门评论[{}]
 * 8. commentBanner：评论banner
 * 9. comments：评论[{}]
 * 10. total：评论总数
 * 11. more：是否有更多评论
 */
export async function commentPlaylist(id, { limit = 20, offset = 1, before = 0 }) {
  const { data } = await request({
    url: `/comment/playlist?id=${id}`,
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
      before,
    },
  });
  return data;
}
// mv 评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
// 必选参数 : id: mv id
// 可选参数 : 
// limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/mv
// 调用例子 : /comment/mv?id=5436712
/**
 * @description mv评论
 * @param {String} id mv id (必选参数)
 * @param {String} limit 取出评论数量,默认为20 (可选参数)
 * @param {String} offset 偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值 (可选参数)
 * @param {String} before 分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到) (可选参数)
 * @example
 *  * 1. code：状态码
 * 2. isMusician：是否为音乐人
 * 3. cnum：评论数量
 * 4. userId：用户id
 * 5. topComments：热门评论[{}]
 * 6. moreHot：是否有更多热门评论
 * 7. hotComments：热门评论[{}]
 * 8. commentBanner：评论banner
 * 9. comments：评论[{}]
 * 10. total：评论总数
 * 11. more：是否有更多评论
 */
export async function commentMv(id, { limit = 20, offset = 1, before = 0 }) {
  const { data } = await request({
    url: `/comment/mv?id=${id}`,
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
      before,
    },
  });
  return data;
}
// 视频评论
// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 视频 的所有评论 ( 不需要登录 )
// 必选参数 : id: 视频的 id
// 可选参数 : 
// limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
// 接口地址 : /comment/video
// 调用例子 : /comment/video?id=89ADDE33C0AAE8EC14B99F6750DB954D
/**
 * @description 视频评论
 * @param {String} id 视频的id (必选参数)
 * @param {String} limit 取出评论数量,默认为20 (可选参数)
 * @param {String} offset 偏移数量,用于分页,如:(评论页数-1)*20,其中20为limit的值 (可选参数)
 * @param {String} before 分页参数,取上一页最后一项的time获取下一页数据(获取超过5000条评论的时候需要用到) (可选参数)
 * @example
 *  * 1. code：状态码
 * 2. isMusician：是否为音乐人
 * 3. cnum：评论数量
 * 4. userId：用户id
 * 5. topComments：热门评论[{}]
 * 6. moreHot：是否有更多热门评论
 * 7. hotComments：热门评论[{}]
 * 8. commentBanner：评论banner
 * 9. comments：评论[{}]
 * 10. total：评论总数
 * 11. more：是否有更多评论
 */
export async function commentVideo(id, { limit = 20, offset = 1, before = 0 }) {
  const { data } = await request({
    url: `/comment/video?id=${id}`,
    method: 'get',
    params: {
      limit,
      offset: (offset - 1) * limit,
      before,
    },
  });
  return data;
}
// 新版评论接口
// 说明 : 调用此接口 , 传入资源类型和资源 id,以及排序方式,可获取对应资源的评论
// 必选参数 :
// id : 资源 id, 如歌曲 id,mv id
// type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
// 0: 歌曲
// 1: mv
// 2: 歌单
// 3: 专辑
// 4: 电台节目
// 5: 视频
// 6: 动态
// 7: 电台
// 可选参数 :
// pageNo:分页参数,第 N 页,默认为 1
// pageSize:分页参数,每页多少条数据,默认 20
// sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
// cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
// 接口地址 : /comment/new
// 调用例子 : /comment/new?type=0&id=1407551413&sortType=3, /comment/new?type=0&id=1407551413&sortType=3&cursor=1602072870260&pageSize=20&pageNo=2
/**
 * @description 新版评论接口
 * @param {String} id 资源id,如歌曲id,mv id (必选参数)
 * @param {String} type 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型 (必选参数) 0:歌曲 1:mv 2:歌单 3:专辑 4:电台节目 5:视频 6:动态 7:电台
 * @param {String} pageNo 分页参数,第N页,默认为1 (可选参数)
 * @param {String} pageSize 分页参数,每页多少条数据,默认20 (可选参数)
 * @param {String} sortType 排序方式,1:按推荐排序,2:按热度排序,3:按时间排序 (可选参数)
 * @param {String} cursor 当sortType为3时且页数不是第一页时需传入,值为上一条数据的time (可选参数)
 * @example
 * 1. code:状态码
 * 2. data:数据
 */
export async function commentNew(id, { type = 0, pageNo = 1, pageSize = 20, sortType = 3, cursor = 0 }) {
  const { data } = await request({
    url: `/comment/new?id=${id}`,
    method: 'get',
    params: {
      type,
      pageNo,
      pageSize,
      sortType,
      cursor,
    },
  });
  return data;
}
// banner
// 说明 : 调用此接口 , 可获取 banner( 轮播图 ) 数据
// 可选参数 :
// type:资源类型,对应以下类型,默认为 0 即 PC
// 0: pc
// 1: android
// 2: iphone
// 3: ipad
// 接口地址 : /banner
// 调用例子 : /banner, /banner?type=2
/**
 * @description banner
 * @param {String} type 资源类型,对应以下类型,默认为0即PC (可选参数) 0:pc 1:android 2:iphone 3:ipad
 * @example
 * 1. code:状态码
 * 2. banners:数据
 */
export async function getBanner(type = 0) {
  const { data } = await request({
    url: '/banner',
    method: 'get',
    params: {
      type,
    },
  });
  return data;
}
// 首页-发现
// 说明 : 调用此接口 , 可获取 APP 首页信息
// 接口地址 : /homepage/block/page
// 可选参数 : refresh: 是否刷新数据,默认为 false
// cursor: 上一条数据返回的 cursor
/**
 * @description 首页-发现
 * @param {String} refresh 是否刷新数据,默认为false (可选参数)
 * @param {String} cursor 上一条数据返回的cursor (可选参数)
 * @example
 * 1. code:状态码
 * 2. data:{
  * cursor:下一页的cursor
  * blocks:[]
  * hasMore:是否有下一页
  * pageConfig:页面配置{}
  * guideToast:引导弹窗
  * titles:标题
  * exposedResource:暴露资源
  * demote:降级
 * }
 */
export async function homepageBlockPage(cursor, refresh) {
  const { data } = await request({
    url: '/homepage/block/page',
    method: 'get',
    params: {
      refresh,
      cursor,
    },
  });
  return data.data;
}
// 首页-发现-圆形图标入口列表
// 说明 : 调用此接口 , 可获取 APP 首页圆形图标入口列表
// 接口地址 : /homepage/dragon/ball
/**
 * @description 首页-发现-圆形图标入口列表
 * @example
 * 1. code:状态码
 * 2. data:[
  * {
    * id:入口id
    * name:入口名称
    * iconUrl:入口图标
  * }
 * ]
 */
export async function homepageDragonBall() {
  const { data } = await request({
    url: '/homepage/dragon/ball',
    method: 'get',
  });
  return data;
}
// 推荐 mv
// 说明 : 调用此接口 , 可获取推荐 mv
// 接口地址 : /personalized/mv
// 调用例子 : /personalized/mv
/**
 * @description 推荐mv
 * @example
 * 1. code:状态码
 * 2. result:数据[{}]
 * 3. category:分类
 */
export async function personalizedMv() {
  const { data } = await request({
    url: '/personalized/mv',
    method: 'get',
  });
  return data;
}
// 推荐歌单
// 说明 : 调用此接口 , 可获取推荐歌单
// 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
// 接口地址 : /personalized
// 调用例子 : /personalized?limit=1
/**
 * @description 推荐歌单
 * @param {String} limit 取出数量,默认为30 (可选参数)
 * @example
 * 1. code:状态码
 * 2. result:数据[{}]
 * 3. category:分类
 * 4. hasTaste:是否有口味
 */
export async function personalized(limit = 30) {
  const { data } = await request({
    url: '/personalized',
    method: 'get',
    params: {
      limit,
    },
  });
  return data;
}
// 推荐新音乐
// 说明 : 调用此接口 , 可获取推荐新音乐
// 可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)
// 接口地址 : /personalized/newsong
// 调用例子 : /personalized/newsong
/**
 * @description 推荐新音乐
 * @param {String} limit 取出数量,默认为10 (可选参数)
 * @example
 * 1. code:状态码
 * 2. result:数据[{}]
 * 3. category:分类
 */
export async function personalizedNewSong(limit = 10) {
  const { data } = await request({
    url: '/personalized/newsong',
    method: 'get',
    params: {
      limit,
    },
  });
  return data;
}
// 最新专辑
// 说明 : 调用此接口 ，获取云音乐首页新碟上架数据
// 接口地址 : /album/newest
// 调用例子 : /album/newest
/**
 * @description 最新专辑
 * @example
 * 1. code:状态码
 * 2. albums:数据[{}]
 */
export async function albumNewest() {
  const { data } = await request({
    url: '/album/newest',
    method: 'get',
  });
  return data;
}
// 获取歌曲详情
// 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长)
// 必选参数 : ids: 音乐 id, 如 ids=347230
// 接口地址 : /song/detail
// 调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231
/**
 * @description 获取歌曲详情
 * @param {String} ids 音乐id,如ids=347230
 * @example
 * 1. code:状态码
 * 2. songs:数据[{}]
 * 3. id:歌曲id
 * 4. name:歌曲名称
 * 5. ar:歌手[{}]
 * 6. al:专辑{}
 * 7. dt:歌曲时长
 * 8. alia:歌曲别名
 * 9. picUrl:专辑图片
 * 10. tns:歌曲翻译名
 * 11. fee:歌曲是否收费
 * 12. v:歌曲版本
 * 13. mv:歌曲mv
 * 14. cp:歌曲是否有版权
 * 15. publishTime:歌曲发行时间
 * 16. privilege:歌曲权限
 */
export async function songDetail(ids) {
  const { data } = await request({
    url: '/song/detail',
    method: 'get',
    params: {
      ids,
    },
  });
  return data;
}
// 获取专辑内容
// 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
// 必选参数 : id: 专辑 id
// 接口地址 : /album
// 调用例子 : /album?id=32311
/**
 * @description 获取专辑内容
 * @param {String} id 专辑id
 * @example
 * 1. code:状态码
 * 2. songs:数据[{}]
 * 3. id:歌曲id
 * 4. name:歌曲名称
 * 5. ar:歌手[{}]
 * 6. al:专辑{}
 */
export async function album(id) {
  const { data } = await request({
    url: '/album',
    method: 'get',
    params: {
      id,
    },
  });
  return data;
}
// 数字专辑详情
// 说明 : 调用此接口 ,传入数字专辑 id 可获取数字专辑详情(和歌单详情有差异)
// 接口地址 : /album/detail
// 调用例子 : /album/detail?id=84547195
/**
 * @description 数字专辑详情
 * @param {String} id 数字专辑id
 * @example
 * 1. code:状态码
 * 2. songs:数据[{}]
 * 3. id:歌曲id
 * 4. name:歌曲名称
 * 5. ar:歌手[{}]
 * 6. al:专辑{}
 */
export async function albumDetail(id) {
  const { data } = await request({
    url: '/album/detail',
    method: 'get',
    params: {
      id,
    },
  });
  return data;
}
// 热搜列表(简略)
// 说明 : 调用此接口,可获取热门搜索列表
// 接口地址 : /search/hot
// 调用例子 : /search/hot
/**
 * @description 热搜列表(简略)
 * @example
 * 1. code:状态码
 * 2. result:数据[{}]
 */
export async function searchHot() {
  const { data } = await request({
    url: '/search/hot',
    method: 'get',
  });
  return data;
}
// 热搜列表(详细)
// 说明 : 调用此接口,可获取热门搜索列表
// 接口地址 : /search/hot/detail
// 调用例子 : /search/hot/detail
/**
 * @description 热搜列表(详细)
 * @example
 * 1. code:状态码
 * 2. result:数据[{}]
 */
export async function searchHotDetail() {
  const { data } = await request({
    url: '/search/hot/detail',
    method: 'get',
  });
  return data;
}
// 获取 mv 数据
// 必选参数 : mvid: mv 的 id
// 接口地址 : /mv/detail
// 调用例子 : /mv/detail?mvid=5436712
/**
 * @description 获取 mv 数据
 * @param {String} mvid mv的id
 * @example
 * 1. code:状态码
 * 2. data:数据{}
 * 3. id:mv的id
 * 4. name:mv的名称
 * 5. cover:mv的封面
 * 6. playCount:mv的播放次数
 */
export async function mvDetail(mvid) {
  const { data } = await request({
    url: '/mv/detail',
    method: 'get',
    params: {
      mvid,
    },
  });
  return data;
}
// mv 地址
// 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
// 必选参数 : id: mv id
// 可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
// 接口地址 : /mv/url
// 调用例子 :
// /mv/url?id=5436712 /mv/url?id=10896407&r=1080
/**
 * @description mv 地址
 * @param {String} id mv的id
 * @param {String} r 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
 * @example
 * 1. code:状态码
 * 2. data:数据[{}]
 */
export async function mvUrl(id, r) {
  const { data } = await request({
    url: '/mv/url',
    method: 'get',
    params: {
      id,
      r,
    },
  });
  return data;
}
// 视频详情
// 说明 : 调用此接口 , 可获取视频详情
// 必选参数 : id: 视频 的 id
// 接口地址 : /video/detail
// 调用例子 : /video/detail?id=89ADDE33C0AAE8EC14B99F6750DB954D
/**
 * @description 视频详情
 * @param {String} id 视频的id
 * @example
 * 1. code:状态码
 * 2. data:数据{}
 */
export async function videoDetail(id) {
  const { data } = await request({
    url: '/video/detail',
    method: 'get',
    params: {
      id,
    },
  });
  return data;
}
// 相似 mv
// 说明 : 调用此接口 , 传入 mvid 可获取相似 mv
// 必选参数 : mvid: mv id
// 接口地址 : /simi/mv
// 调用例子 : /simi/mv?mvid=5436712
/**
 * @description 相似 mv
 * @param {String} mvid mv的id
 * @example
 * 1. code:状态码
 * 2. mvs:数据[{}]
 */
export async function simiMv(mvid) {
  const { data } = await request({
    url: '/simi/mv',
    method: 'get',
    params: {
      mvid,
    },
  });
  return data;
}
// 获取歌词
// 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
// 必选参数 : id: 音乐 id
// 接口地址 : /lyric
// 调用例子 : /lyric?id=33894312
/**
 * @description 获取歌词
 * @param {String} id 音乐的id
 * @example
 * 1. code:状态码
 * 2. lrc:歌词
 * 3. tlyric:翻译歌词
 * 4. lyric:歌词
 * 5. transUser:翻译歌词的用户
 * 6. nolyric:是否有歌词
 * 7. uncollected:是否有翻译歌词
 * 8. tlyric:翻译歌词
 */
export async function uselyric(id) {
  const { data } = await request({
    url: '/lyric',
    method: 'get',
    params: {
      id,
    },
  });
  return data;
}
// 获取每日推荐歌曲
// 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
// 接口地址 : /recommend/songs
// 调用例子 : /recommend/songs
/**
 * @description 获取每日推荐歌曲
 */
export async function recommendSongs() {
  const { data } = await request({
    url: '/recommend/songs',
    method: 'get',
  });
  return data;
}
// 获取每日推荐歌单
// 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
// 接口地址 : /recommend/resource
// 调用例子 : /recommend/resource
/**
 * @description 获取每日推荐歌单
 */
export async function recommendResource() {
  const { data } = await request({
    url: '/recommend/resource',
    method: 'get',
  });
  return data;
}