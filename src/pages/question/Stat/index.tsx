import React, { FC, useState } from 'react'
import { Spin, Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import StatHeader from './StatHeader'
import ComponentList from './ComponentList'
import PageStat from './PageStat'
import ChartStat from './ChartStat'
import styles from './index.module.scss'

const Stat: FC = () => {
  const { loading } = useLoadQuestionData()
  const { title, isPublished } = useGetPageInfo()
  const Navigate = useNavigate()

  //状态提升 选中的组件id和类型
  const [selectedComponentId, setSelectedComponentId] = useState('')
  const [selectedComponentType, setSelectedComponentType] = useState('')

  // 设置页面标题
  useTitle(`Questionnaires Statistics - ${title}`)
  // 如果页面正在加载，显示加载动画
  const loadingElement = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  )
  //
  function genContentElement() {
    // 如果页面未发布，显示提示信息
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: 1 }}>
          <Result
            status="warning"
            title="This questionnaire has not been published yet."
            extra={
              <Button type="primary" onClick={() => Navigate(-1)}>
                Back
              </Button>
            }
          ></Result>
        </div>
      )
    }
    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
            setSelectedComponentId={setSelectedComponentId}
          />
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    )
  }
  return (
    <div className={styles.container}>
      <div>
        <StatHeader />
      </div>
      <div className={styles['content-wrapper']}>
        {loading && loadingElement}
        {!loading && <div className={styles.content}>{genContentElement()}</div>}
      </div>
    </div>
  )
}

export default Stat
