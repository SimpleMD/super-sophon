import axios from 'axios'
const URL = ''
var ERequest
;(function (ERequest) {
  ERequest[(ERequest['TIMEOUT'] = 20000)] = 'TIMEOUT'
  ERequest[(ERequest['SUCCESS'] = 0)] = 'SUCCESS'
})(ERequest || (ERequest = {}))
const config = {
  timeout: ERequest['TIMEOUT']
}
class RequestHttp {
  constructor(config) {
    this.service = axios.create(config)
    this.service.interceptors.response.use(
      (config) => {
        return Object.assign({}, config)
      },
      (error) => {
        Promise.reject(error)
      }
    )
    this.service.interceptors.response.use(
      (response) => {
        const { data } = response
        if (data.err_code && data.err_code !== ERequest['SUCCESS']) {
          return Promise.reject(data)
        }
        return data
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
  get(url, params) {
    return this.service.get(url, { params })
  }
  post(url, params) {
    return this.service.post(url, params)
  }
  put(url, params) {
    return this.service.put(url, params)
  }
  delete(url, params) {
    return this.service.delete(url, { params })
  }
}
export default (options) => new RequestHttp(Object.assign(Object.assign({}, config), options))
