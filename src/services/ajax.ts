import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/user-token'

const BASE_URL: string = import.meta.env.VITE_BASE_URL

// 创建一个新的 axios 实例。这个实例在发送HTTP请求时会使用特定的配置。这里的配置是 timeout: 1000 * 10，这意味着每个请求都有一个超时时间限制，如果在10秒（1000毫秒 * 10）内没有收到响应，则请求会自动被中断，并抛出一个超时错误。
const instance = axios.create({
  baseURL: `${BASE_URL}/`,
  timeout: 1000 * 10,
  headers: {},
})
//request 拦截：每次请求带上token
instance.interceptors.request.use(
  config => {
    //JWT的固定格式 Bearer的意思是持有者，这里是固定写法
    config.headers['Authorization'] = `Bearer ${getToken()}`
    return config
  },
  error => Promise.reject(error)
)

//response 拦截：统一处理 errno和msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData

  if (errno !== 0) {
    //错误提示
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  return data as any
})

export default instance

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
