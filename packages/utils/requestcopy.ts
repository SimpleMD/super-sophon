import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

// 数据返回的接口
// 定义请求响应参数，不含data
interface IResult {
  err_code: number
  err_msg: string
}

// 请求响应参数，包含data
interface IResultData<T = any> extends IResult {
  data: T
}

const URL: string = ''
enum ERequest {
  'TIMEOUT' = 20000,
  'SUCCESS' = 0
}

const config = {
  // 默认地址
  // baseURL: URL,
  // 数据返回的接口
  timeout: ERequest['TIMEOUT']
  // 跨域时候允许携带凭证
  // withCredentials: true
}

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance

  public constructor(config: AxiosRequestConfig) {
    // 实例化Axios
    this.service = axios.create(config)

    /**
     *  请求拦截器
     * 客户发送请求 => 请求拦截器 => 服务器
     *
     */
    this.service.interceptors.response.use(
      (config: AxiosRequestConfig) => {
        // const token = localStorage.getItem('token') || ''
        return {
          ...config
          // headers: {
          //   'x-access-token': token // 请求头中携带token信息
          // }
        }
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error)
      }
    )

    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response // 解构
        if (data.err_code && data.err_code !== ERequest['SUCCESS']) {
          return Promise.reject(data)
        }
        return data
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<IResultData<T>> {
    return this.service.get(url, { params })
  }
  post<T>(url: string, params?: object): Promise<IResultData<T>> {
    return this.service.post(url, params)
  }
  put<T>(url: string, params?: object): Promise<IResultData<T>> {
    return this.service.put(url, params)
  }
  delete<T>(url: string, params?: object): Promise<IResultData<T>> {
    return this.service.delete(url, { params })
  }
}

// 导出一个实例对象
export default (options: any) => new RequestHttp({ ...config, ...options })
