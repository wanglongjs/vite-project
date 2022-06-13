import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { gradeaddFrom, directSettFrom } from '@/types'
/**
 * 新增分销员等级配置
 * @param data
 */
export function addgradePerson(data: directSettFrom) {
  return request({
    url: '/ecommerce-service-account/t-ecommerce-personal-grade-config/add',
    method: 'post',
    data: data
  })
}

/**删除分销员等级 */
export function deletegradeConfig(id: string) {
  return request({
    url: '/ecommerce-service-account/t-ecommerce-personal-grade-config/del?id=' + id,
    method: 'get'
  })
}

/**编辑分销员配置 */
export function editgradeconfig(data: directSettFrom) {
  return request({
    url: '/ecommerce-service-account/t-ecommerce-personal-grade-config/edit',
    method: 'post',
    data: data
  })
}
/**分销员列表 */
export function gradegetList(data: any) {
  return request({
    url: '/ecommerce-service-account/t-ecommerce-personal-grade-config/getList',
    method: 'get',
    params: data
  })
}
/**平均分红列表编辑 */
export function editAverageList(data: any) {
  return request({
    url: '/ecommerce-service-account/t-ecommerce-personal-grade-config/editAverageList',
    method: 'post',
    data: data
  })
}
/**平均分红查询 */
export function getAverageList() {
  return request({
    url: '/ecommerce-service-account/t-ecommerce-personal-grade-config/getAverageList',
    method: 'get'
  })
}
/**分销设置 */
export function directAdd(data: directSettFrom) {
  return request({
    url: '/ecommerce-service-account/t-ecommerce-direct-push-reward-config/add',
    method: 'post',
    data: data
  })
}

/**分销设置删除 */
export function deletedirect(id: string) {
  return request({
    url: '/ecommerce-service-account/t-ecommerce-direct-push-reward-config/delete?id=' + id,
    method: 'get'
  })
}
/**分销设置列表 */
// /ecommerce-service-account/t-ecommerce-direct-push-reward-config/getOne

/**分销设置是否启用接口 */
export function rewardgetAverageList() {
  return request({
    url: '/ecommerce-service-account/t-ecommerce-reward-enable-config/getAverageList',
    method: 'get'
  })
}