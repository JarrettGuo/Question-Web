import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '../services/question'
import { resetComponents } from '../store/componentsReducer'
import { resetPageInfo } from '../store/pageInfoReducer'

function useLoadQuestionData() {
  // 获取路由参数 id 当id为空时默认为""
  const { id = '' } = useParams()

  const dispatch = useDispatch()

  //ajax加载数据
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('id is empty')
      const data = await getQuestionService(id)
      return data
    },
    {
      manual: true,
    }
  )
  //根据获取的data设置到redux store中
  useEffect(() => {
    if (!data) {
      return
    }
    const {
      title = '',
      desc = '',
      js = '',
      css = '',
      isPublished = false,
      componentList = [],
    } = data

    //获取默认的selectedId
    let selectedId = ''
    //如果componentList不为空，设置selectedId为第一个组件的fe_id
    if (componentList.length > 0) {
      selectedId = componentList[0].fe_id
    }

    //把获取的数据设置到redux store中 components
    dispatch(
      resetComponents({
        componentList,
        selectedId,
        copiedComponent: null,
      })
    )
    //把获取的数据设置到redux store中 pageInfo
    dispatch(resetPageInfo({ title, desc, js, css, isPublished }))
  }, [data])
  //判断id是否变化，变化时重新请求数据
  useEffect(() => {
    run(id)
  }, [id])
  //data已经在上面的useEffect中设置到redux store中，这里不需要返回data
  return { loading, error }
}

export default useLoadQuestionData
