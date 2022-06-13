import request from '@/utils/request'
// interface
export const login = (data: any) => {
  return request<{
  logo_square:string,
  logo_rectangle:string,
  login_logo:string,
  slide:string[]
  }>({
    url: '/login',
    method: 'post',
    data
  })
}

// export const getUserInfo = (data: any) => {
//   return request({
//     url: '/boss/detail',
//     method: 'post',
//     data
//   })
// }
// // 获取路由表
// export function getMoveRouter() {
//   return request({
//     url: '/getMoveRouter',
//     method: 'get'
//   })
// }

// export const getAction = (url: any, data: any) => {
//   return request({
//     url,
//     method: 'get',
//     data
//   })
// }

// export const postAction = (url: any, data: any) => {
//   return request({
//     url,
//     method: 'post',
//     data
//   })
// }