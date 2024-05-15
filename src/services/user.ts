import axios from './ajax'
import type { ResDataType } from './ajax'

const BASE_URL: string = import.meta.env.VITE_BASE_URL

//获取用户信息
export async function getUserInfoService(): Promise<ResDataType> {
  const url = `${BASE_URL}/api/user/info`
  const data = (await axios.get(url)) as ResDataType
  return data
}

//注册用户 nickname可选
export async function registerService(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = `${BASE_URL}/api/user/register`
  const body = { username, password, nickname: nickname || username }
  const data = (await axios.post(url, body)) as ResDataType
  return data
}

//登录
export async function loginService(username: string, password: string): Promise<ResDataType> {
  const url = `${BASE_URL}/api/user/login`
  const body = { username, password }
  const data = (await axios.post(url, body)) as ResDataType
  return data
}
