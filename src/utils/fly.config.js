import Cookies from 'js-cookie'
import router from '@/router'
import { message } from 'element-ui'
let fly = require('flyio')
// 添加请求拦截器
fly.interceptors.request.use((config) => {
  // 给所有请求添加自定义header
  // request.headers['X-Tag'] = 'flyio'
  let { token } = Cookies.getJSON('user') ? Cookies.getJSON('user') : ''
  if (token) {
    config.headers['Authorization'] = `Bearee ${token}`
  }
  let { body } = config
  for (let x in body) {
    if (body[x] === null || body[x] === undefined) {
      delete body[x]
    }
  }
  return config
})

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    // 只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    console.log(err)
    const error = err.response ? err.response.data : { err: '网络请求错误', code: '-1000' }
    if (!err.response) {
      router.replace({
        name: 'login'
      })
      message({
        message: '接口调用失败',
        type: 'error'
      })
    }
    return error
    // 发生网络错误后会走到这里
    // return Promise.resolve("ssss")
  }
)
// 配置请求基地址
fly.config.baseURL = (function () {
  let baseURL
  if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://192.168.1.40:8082'
  } else if (process.env.NODE_ENV === 'release') {
    baseURL = 'http://testomsapi.junyanginfo.com'
  } else if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://omsapi.junyanginfo.com'
  }
  return baseURL
})()
fly.config.timeout = 15000
export default fly
