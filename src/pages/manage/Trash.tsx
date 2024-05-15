import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { updateQuestionService, deleteQuestionService } from '../../services/question'
import ListPage from '../../components/ListPage'
import ListSearch from '../../components/ListSearch'
import styles from './common.module.scss'

const { confirm } = Modal
const { Title } = Typography

const Trash: FC = () => {
  useTitle('Questionnaire - Trash')

  //获取问卷列表 通过useRequest data为请求返回的数据 loading为请求状态 isDelete为true refresh为刷新数据
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data

  //记录选中的行的key
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const tableColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'isPublished',
      dataIndex: 'isPublished',
      //根据数数据源的值返回不同的标签
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">Published</Tag> : <Tag>Unpublished</Tag>
      },
    },
    {
      title: 'Answer Count',
      dataIndex: 'answerCount',
    },
    {
      title: 'Created time',
      dataIndex: 'createdAt',
    },
  ]

  //恢复
  const { run: recover } = useRequest(
    async () => {
      //遍历选中的id
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖时间
      onSuccess() {
        message.success('Recovered successfully')
        refresh() //手动刷新数据
        setSelectedIds([]) //清空选中的id
      },
    }
  )
  //彻底删除
  const { run: deleteQuestion } = useRequest(async () => deleteQuestionService(selectedIds), {
    manual: true,
    onSuccess() {
      message.success('Deleted successfully')
      refresh() //手动刷新数据
      setSelectedIds([]) //清空选中的id
    },
  })

  function del() {
    confirm({
      title: 'Are you sure you want to delete this questionnaire',
      icon: <ExclamationCircleFilled />,
      content: 'This operation cannot be undone',
      onOk: deleteQuestion,
    })
  }
  //JSX定义为一个变量
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
            Recover
          </Button>
          <Button danger disabled={selectedIds.length === 0} onClick={del}>
            Delete
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectedIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>Trash</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="No data available" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
