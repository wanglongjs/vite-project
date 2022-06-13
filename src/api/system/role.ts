import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { menuFromData, userqueyFrom, useraddFrom, groupModule, gropFormData } from '@/types'
export function getGroupList(data: menuFromData) {
  return request({
    url: '/ecommerce-service-admin/assessGroup/getGroupList',
    method: 'post',
    data: data
  })
}
/**用户管理查询 */
export function selectAllList(data: userqueyFrom) {
  console.log(data)
  return request({
    url: '/ecommerce-service-admin/sys/user/selectAll',
    method: 'get',
    params: data
  })
}

/**用户管理新增 */
export function adminrAddUser(data: useraddFrom) {
  return request({
    url: '/ecommerce-service-admin/sys/user/addUser',
    method: 'post',
    data: data
  })
}
/**用户更新 */
export function updateUser(data: useraddFrom) {
  return request({
    url: '/ecommerce-service-admin/sys/user/updateUser',
    method: 'post',
    data: data
  })
}

/**删除用户信息 */
export function deleteUser(id: string) {
  return request({
    url: '/ecommerce-service-admin/sys/user/delete?userId=' + id,
    method: 'get'
  })
}

/**权限管理 */
export function jurisdgetGroupList(data: any) {
  //角色列表
  return request({
    url: '/ecommerce-service-admin/sysGroup/getGroupList',
    method: 'post',
    data: data
  })
}

/**路由权限分配 */
export function groupToModule(data: groupModule) {
  return request({
    url: '/ecommerce-service-admin/sysGroup/groupToModule',
    method: 'post',
    data: data
  })
}
/**通过角色获取路由 */
export function getUserByGroup(data: any) {
  return request({
    url: '/ecommerce-service-admin/sysGroup/getUserByGroup',
    method: 'post',
    data: data
  })
}
/**修改角色 */
export function saveGroup(data: gropFormData) {
  return request({
    url: '/ecommerce-service-admin/sysGroup/saveGroup',
    method: 'post',
    data: data
  })
}
export function deleteGroup(id: string) {
  return request({
    url: '/ecommerce-service-admin/sysGroup/delete?id=' + id,
    method: 'get',
  })
}
