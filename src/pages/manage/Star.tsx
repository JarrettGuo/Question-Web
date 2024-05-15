import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin } from 'antd'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import styles from './common.module.scss'

const { Title } = Typography

const Star: FC = () => {
  useTitle('Questionnaire - Starred')
  //获取问卷列表 通过useRequest data为请求返回的数据 loading为请求状态 isStar为true
  const { data = {}, loading } = useLoadQuestionListData({ isStar: true })
  const { list = [], total = 0 } = data

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>Started Questionnaire</Title>
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
        {!loading && list.length === 0 && <Empty description="No data availabe" />}
        {list.length > 0 &&
          list.map((question: any) => {
            const { _id } = question
            return <QuestionCard key={_id} {...question}></QuestionCard>
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Star
