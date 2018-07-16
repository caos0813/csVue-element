import { baseURL } from './api'
let fly = require('flyio')
// wx.js为您下载的源码文件
// var Fly=require("flyio/dist/npm/wx") //npm引入方式
// let fly = new Fly() // 创建fly实例
// 添加拦截器
fly.interceptors.request.use((config, promise) => {
  // 给所有请求添加自定义header
  //  config.headers['X-Tag'] = 'flyio'
  return config
})
fly.interceptors.response.use(
  (response) => {
    //  只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    return err.response.data
  }
)
console.log(process.env)
// 配置请求基地址
fly.config.baseURL = baseURL
fly.config.timeout = 10000
export default fly
