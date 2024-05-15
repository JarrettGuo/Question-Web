import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '../services/question'
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
  LIST_PAGE_SIZE,
} from '../constant'

type OptionType = {
  isStar: boolean
  isDeleted: boolean
}

function useLoadQuestionLiatData(opt: Partial<OptionType> = {}) {
  //获取isStar和isDelete参数
  const { isStar, isDeleted } = opt
  const [searchParams] = useSearchParams()

  const { data, loading, error, refresh } = useRequest(
    async () => {
      //获取搜索关键字
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      //获取当前页数
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      //获取每页显示的条数
      const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE

      const data = await getQuestionListService({ keyword, isStar, isDeleted, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams], // 当searchParams变化时重新请求
    }
  )

  return { data, loading, error, refresh }
}

export default useLoadQuestionLiatData
