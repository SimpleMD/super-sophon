import axios from 'axios'
const service = axios.create({
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
export default service
