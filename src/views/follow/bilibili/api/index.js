import axios from 'axios';

/**   
 * @description 获取bilibili追番信息
 * @url /x/space/bangumi/follow/list
 * @param {Number} vmid 用户id
 * @param {Number} ps 每页条数
 * @param {Number} pn 页码
 * @param {Number} follow_status 0:全部
 * @param {Number} type 1为追番
 * @param {Number} ts 时间戳：发起请求时的时间戳，单位为毫秒
 */
export function bangumiFollowList({ type = 1, follow_status = 0, pn = 1, ps = 20, vmid = 24772083, ts = Date.now() }) {
  return axios({
    url: 'http://guowei.fun:9999/api/bangumi',
    method: 'get',
    params: {
      type: type,
      follow_status: follow_status,
      pn: pn,
      ps: ps,
      vmid: vmid,
      ts: ts
    },
  });
}
/**
 * @description 搜索bilibili用户信息
 * @url /x/web-interface/search/type
 * @param {Number} keyword 搜索关键字
 * @param {Number} page 页码
 * @param {Number} limit 每页条数
 */
export function searchUser({ keyword, page = 1, limit = 20 }) {
  return axios({
    url: 'http://guowei.fun:9999/api/search',
    method: 'get',
    params: {
      keyword: keyword,
      page: page,
      limit: limit,
    },
  });
}