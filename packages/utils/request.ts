import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

// 配置新建一个 axios 实例
const service: AxiosInstance = axios.create({
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response: any) => {
    const res = response.data
    if (res.code && res.code !== 0) {
      // `token` 过期或者账号已在别处登录
      if (res.code === 401 || res.code === 4001) {
        return
      }
      return Promise.reject(service.interceptors.response)
    } else {
      return response.data
    }
  },
  (error: AxiosError) => {
    if (error.message.indexOf('timeout') != -1) {
      // ElMessage.error('网络超时')
    } else if (error.message == 'Network Error') {
      // ElMessage.error('网络连接错误')
    } else {
      // ElMessage.error(error.message)
    }
    return Promise.reject(error)
  }
)

export default service
