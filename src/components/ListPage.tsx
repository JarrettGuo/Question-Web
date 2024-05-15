import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY } from '../constant'

type PropsType = {
  total: number
}

const ListPage: FC<PropsType> = (props: PropsType) => {
  //定义当前页数
  const [current, setCurrent] = useState(1)
  //定义每页显示的条数
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)
  const { total } = props
  //获取url参数
  const [searchParams] = useSearchParams()
  //从url参数中获取当前页数和每页显示的条数
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    setCurrent(page)
    const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setPageSize(pageSize)
  }, [searchParams])

  //导航
  const navigate = useNavigate()
  //获取当前路径
  const { pathname } = useLocation()
  //处理页数改变事件
  function handlePageChange(page: number, pageSize: number) {
    //设置url参数 使用searchParams将参数转换为字符串
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    //导航到新的路径
    navigate({ pathname, search: searchParams.toString() }) //除了改变page pageSize外，其他参数不变
  }
  return (
    <Pagination current={current} total={total} pageSize={pageSize} onChange={handlePageChange} />
  )
}

export default ListPage
