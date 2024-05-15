import React, { FC, useEffect, useState, useRef, useMemo } from 'react'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'
import QuestionCard from '../../components/QuestionCard'
import { getQuestionListService } from '../../services/question'
import ListSearch from '../../components/ListSearch'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant'
import styles from './common.module.scss'

const { Title } = Typography

const List: FC = () => {
  useTitle('Questionnaire - My Questionnaires')

  const [started, setStarted] = useState(false) //是否已经开始加载数据（防抖有延迟时间）
  const [page, setPage] = useState(1) //List 内部的数据，不在url参数中体现
  const [list, setList] = useState([]) //全部的列表数据
  const [total, setTotal] = useState(0) //总数
  const haveMoreData = total > list.length //是否还有更多数据
  const [searchParams] = useSearchParams() ////获取url参数 虽然没有page和pageSize，但是有keyword
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '' //获取搜索关键字
  //当搜索关键字变化时，重置数据
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  //真正加载数据
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true, //手动触发
      onSuccess(result) {
        const { list: l = [], count: total = 0 } = result //解构赋值
        setList(list.concat(l)) //合并数据
        setTotal(total) //设置总数
        setPage(page + 1) //加载下一页
      },
    }
  )
  //尝试触发加载 防抖
  const containerRef = useRef<HTMLDivElement>(null) //使用useRef对应到div元素上面的loadMore
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      //获取元素的位置
      const elem = containerRef.current
      if (elem == null) return //如果元素不存在，直接返回
      const domRect = elem?.getBoundingClientRect() //获取元素的位置
      if (domRect == null) return //如果位置不存在，直接返回
      const { bottom } = domRect //获取元素的底部位置
      //如果元素的底部位置小于等于页面的高度，加载数据
      if (bottom <= document.body.clientHeight) {
        load() //真正加载数据
        setStarted(true) //设置已经开始加载数据
      }
    },
    {
      wait: 500,
    }
  )

  //当页面加载，或者url参数变化时触发加载
  useEffect(() => {
    tryLoadMore() //加载第一页数据
  }, [searchParams])

  //当页面滚动时，触发加载更多
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore) //防抖
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore) //移除事件监听
    }
  }, [searchParams, haveMoreData]) //当url参数变化或者还有更多数据时，重新绑定事件

  //根据不同的状态显示不同的内容 用useMemo优化
  const LoadMoreContentElem = useMemo(() => {
    //根据不同的状态显示不同的内容
    if (!started || loading) {
      return <Spin />
    }
    //如果没有数据，显示暂无数据
    if (total === 0) {
      return <Empty description="No data available" />
    }
    //如果没有更多数据，显示没有更多数据了
    if (!haveMoreData) {
      return <span>No more data.</span>
    }
    return <span>Load more...</span>
  }, [started, loading, haveMoreData])

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>My questionnaires</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  )
}

export default List
