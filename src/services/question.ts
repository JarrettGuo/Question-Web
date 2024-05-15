import axios from './ajax'
import type { ResDataType } from './ajax'

const BASE_URL: string = import.meta.env.VITE_BASE_URL

type SearchOption = {
  keyword: string
  isStar: boolean
  isDeleted: boolean
  page: number //当前页数
  pageSize: number //每页显示的条数
}

//获取单个问卷信息函数
export async function getQuestionService(id: string): Promise<ResDataType> {
  const url = `${BASE_URL}/api/question/${id}`
  const data = (await axios.get(url)) as ResDataType
  return data
}

//创建问卷
export async function createQuestionService(): Promise<ResDataType> {
  const url = `${BASE_URL}/api/question`
  const data = (await axios.post(url)) as ResDataType
  return data
}

//获取查询问卷 Partial为部分的意思，数据可能不全
export async function getQuestionListService(opt: Partial<SearchOption>): Promise<ResDataType> {
  const url = `${BASE_URL}/api/question`
  // opt 为查询参数
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

//更新单个问卷 传入id和数据
export async function updateQuestionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `${BASE_URL}/api/question/${id}`
  const data = (await axios.patch(url, opt)) as ResDataType
  return data
}

//复制问卷
export async function duplicateQuestionService(id: string): Promise<ResDataType> {
  const url = `${BASE_URL}/api/question/duplicate/${id}`
  const data = (await axios.post(url)) as ResDataType
  return data
}

//批量彻底删除问卷
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
  const url = `${BASE_URL}/api/question`
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType
  return data
}
