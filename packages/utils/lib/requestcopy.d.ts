import { AxiosInstance, AxiosRequestConfig } from 'axios'
interface IResult {
  err_code: number
  err_msg: string
}
interface IResultData<T = any> extends IResult {
  data: T
}
declare class RequestHttp {
  service: AxiosInstance
  constructor(config: AxiosRequestConfig)
  get<T>(url: string, params?: object): Promise<IResultData<T>>
  post<T>(url: string, params?: object): Promise<IResultData<T>>
  put<T>(url: string, params?: object): Promise<IResultData<T>>
  delete<T>(url: string, params?: object): Promise<IResultData<T>>
}
declare const _default: (options: any) => RequestHttp
export default _default
