import request from '@/utils/request'

export default {
  bindDevice,
  checkBind,
  getClassList,
  getSearchList,
  getInputList,
  getmovieInfo,
  getAppList,
  getAdvList,
  getAllNum,
  getAdvVideo,
  getPayImg,
  upHistory
}
// 绑定包厢
export function bindDevice(deviceId, roomId) {
  return request.post('/api/MovieRoom/BindDevice', { deviceId, roomId })
}
// 检查绑定
export function checkBind(deviceId) {
  return request.get('/api/MovieRoom/GetCurrentInfo', { deviceId })
}
// 获取分类列表
export function getClassList() {
  return request.get('/api/MovieType/TypeList')
}
// 获取电影列表
export function getSearchList(typeId, page, pageSize) {
  return request.get('/api/Movie/List?isLoscked=false', { typeId, page, pageSize })
}
// 获取搜索结果
export function getInputList(pinyin, page, pageSize) {
  return request.get('/api/Movie/List?isLoscked=false', { pinyin, page, pageSize })
}
// 获取电影详情
export function getmovieInfo(movieId) {
  return request.get('/api/Movie/GetOne', { movieId })
}
// 获取app安装列表
export function getAppList(page, pageSize, apkType) {
  return request.get('/api/ApkManage/List', { page, pageSize, apkType })
}
// 获取广告图片
export function getAdvList(code) {
  return request.get('/api/SystemSettings/getone',{code})
}
// 获取视频广告
export function getAdvVideo() {
  return request.get('/api/SystemSettings/getone?code=ad_video')
}
// 获取资源总数
export function getAllNum() {
  return request.get('/api/Movie/MovieCount')
}
// 获取支付图片
export function getPayImg() {
  return request.get('/api/SystemSettings/GetPayPic')
}
// 上传点播历史数据
export function upHistory(movieId, deviceId) {
  return request.post('/api/MovieRoom/UpdateMovie', { movieId, deviceId })
}
