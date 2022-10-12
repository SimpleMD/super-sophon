'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const axios_1 = __importDefault(require('axios'))
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
    this.service = axios_1.default.create(config)
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
exports.default = (options) => new RequestHttp(Object.assign(Object.assign({}, config), options))
