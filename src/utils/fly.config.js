import Cookies from 'js-cookie'
import router from '@/router'
let fly = require('flyio')
// wx.js为您下载的源码文件
// var Fly=require("flyio/dist/npm/wx") //npm引入方式
// let fly = new Fly() // 创建fly实例
// 添加拦截器
fly.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  //  config.headers['X-Tag'] = 'flyio'
  let { token } = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : ''
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})
fly.interceptors.response.use(
  (response) => {
    //  只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    const error = err.response ? err.response.data : { err: '网络请求错误', code: '-1000' }
    if (!err.response) {
      console.log(router.replace)
      router.replace({
        name: 'login'
      })
    }
    return error
  }
)
// 配置请求基地址
fly.config.baseURL = (function () {
  let baseURL
  if (process.env.NODE_ENV === 'development') {
    //  baseURL = 'http://192.168.1.28:9080'
    baseURL = 'http://192.168.1.129:9080/'
  } else if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://39.104.124.195:9080/'
  }
  return baseURL
})()
fly.config.timeout = 15000
export default fly
