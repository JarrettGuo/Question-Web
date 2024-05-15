import React, { FC, useState } from 'react'
import { useRequest } from 'ahooks'
import { Typography, Spin, Table, Pagination } from 'antd'
import { useParams } from 'react-router-dom'
import { getQuestionStatListService } from '../../../services/stat'
import { STAT_PAGE_SIZE } from '../../../constant'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const { Title } = Typography

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { id = '' } = useParams()
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  //获取问题统计列表
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])

  //获取后端分页数据
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)

  //获取问题统计列表
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize })
      return res
    },
    {
      refreshDeps: [id, page, pageSize], //当id page pageSize改变时，重新请求
      //onSuccess返回值就是getQuestionStatListService的返回值
      onSuccess(res) {
        //返回值就是mock中的返回格式
        const { total, list = [] } = res
        //设置总数和列表
        setTotal(total)
        setList(list)
        // console.log(res)
      },
    }
  )
  //获取组件信息
  const { componentList } = useGetComponentInfo()
  //获取列，当点击标题时，设置选中的组件id和类型
  const columns = componentList.map(item => {
    const { fe_id, title, props = {}, type } = item
    //获取列的标题 如果props中有title则使用props中的title 否则使用默认的title
    const colTitle = props!.title || title
    return {
      //   title: colTitle,
      //实现点击标题时，设置选中的组件id和类型
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })
  //对list进行添加key处理
  const dataSource = list.map((item: any) => ({ ...item, key: item._id }))

  const TableElement = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
        />
      </div>
    </>
  )
  return (
    <div>
      <Title level={3}>Number :{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElement}
    </div>
  )
}

export default PageStat
