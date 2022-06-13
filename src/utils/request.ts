import axios, { AxiosRequestConfig } from 'axios'
import useStore from '@/store'
import { localStorage } from '@/utils/storage';
import { ElMessage } from 'element-plus'
const request = axios.create({
  baseURL: 'http://47.94.146.82:9001',
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置用户身份 token
  if (!config.headers) {
    throw new Error(
      `Expected 'config' and 'config.headers' not to be undefined`
    );
  }
  const { user } = useStore();
  if (user.token) {
    // config.headers.Authorization = `${localStorage.get('token')}`;
    config.headers['auth-token'] = localStorage.get('token')

  }
  return config;
  // return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  // 统一处理接口响应错误，比如token过期无效服务端异常
  const { code, msg } = response.data
  if (code === 114) {
    ElMessage.warning(msg)
  }
  return response
}, function (error) {
  return Promise.reject(error)
})
export default <T = any>(config: AxiosRequestConfig) => {
  return request(config).then(res => {
    console.log(res)
    return res.data as T
  })
}