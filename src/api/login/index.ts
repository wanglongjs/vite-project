import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { LoginFormData, LoginResponseData, Captcha, userInfo } from '@/types'
/**
 * 登录
 * @param data
 */
export function login(data: LoginFormData): AxiosPromise<LoginResponseData> {
  return request({
    url: '/ecommerce-authority-center/authority/adminLoginByUserNameAndPwd',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export function getCaptcha(): AxiosPromise<Captcha> {
  return request({
    url: '/ecommerce-authority-center/verification/createImage',
    method: 'get'
  })
}

// 获取用户详情
export function getUserinfo(): AxiosPromise<userInfo> {
  return request({
    url: '/ecommerce-service-admin/sys/user/currentUser',
    method: 'get'
  })
}