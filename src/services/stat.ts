import axios, { ResDataType } from './ajax'

const BASE_URL: string = import.meta.env.VITE_BASE_URL

//获取问卷统计数据 opt是传入的参数 包括page和pageSize
export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number }
): Promise<ResDataType> {
  const url = `${BASE_URL}/api/stat/${questionId}`
  const data = (await axios.get(url, { params: opt })) as ResDataType
  return data
}

//获取组件的数据汇总
export async function getComponentStatService(
  questiontId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `${BASE_URL}/api/stat/${questiontId}/${componentId}`
  const data = (await axios.get(url)) as ResDataType
  return data
}

//获取问卷的答卷数据
export async function getQuestionAndAnswerStatService(): Promise<ResDataType> {
  const url = `${BASE_URL}/api/stat`
  const data = (await axios.get(url)) as ResDataType
  return data
}
