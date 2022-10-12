'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const axios_1 = __importDefault(require('axios'))
const service = axios_1.default.create({
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code && res.code !== 0) {
      if (res.code === 401 || res.code === 4001) {
        return
      }
      return Promise.reject(service.interceptors.response)
    } else {
      return response.data
    }
  },
  (error) => {
    if (error.message.indexOf('timeout') != -1) {
    } else if (error.message == 'Network Error') {
    } else {
    }
    return Promise.reject(error)
  }
)
exports.default = service
