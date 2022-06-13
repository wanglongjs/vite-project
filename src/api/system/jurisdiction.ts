import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { menuFromData } from '@/types'
/**
 * 获取路由菜单
 * @param data
 */
export function getLoginModule() {
  return request({
    url: '/ecommerce-service-admin/getLoginModule',
    method: 'get'
  })
}
/**
 * 获取路由菜单列表
 */
export function queryMenuList(data: any) {
  return request({
    url: '/ecommerce-service-admin/module/query',
    method: 'post',
    data: data
  })
}
/**新增路由菜单 */
export function menuSave(data: menuFromData) {
  return request({
    url: '/ecommerce-service-admin/module/save',
    method: 'post',
    data: data
  })
}
/**删除菜单 */
export function menuDelete(id: string) {
  return request({
    url: '/ecommerce-service-admin/module/delete?moduleId=' + id,
    method: 'get'
  })
}

/**编辑菜单 */
export function menUpdate(data: menuFromData) {
  return request({
    url: '/ecommerce-service-admin/module/update',
    method: 'post',
    data: data
  })
} 