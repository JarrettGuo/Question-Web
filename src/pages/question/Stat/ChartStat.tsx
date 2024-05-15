import React, { FC, useEffect, useState } from 'react'
import { Typography } from 'antd'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { getComponentStatService } from '../../../services/stat'
import { getComponentConfigByType } from '../../../components/QuestionComponents'

type PropsType = {
  selectedComponentId: string
  selectedComponentType: string
}

const { Title } = Typography

const ChartStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, selectedComponentType } = props
  const { id = '' } = useParams()
  const [stat, setStat] = useState([])

  const { run } = useRequest(
    async (questionId, componentId) => await getComponentStatService(questionId, componentId),
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat)
      },
    }
  )
  useEffect(() => {
    //如果选中的组件id存在，则请求数据
    if (selectedComponentId) run(id, selectedComponentId)
  }, [id, selectedComponentId])

  function getStatElement() {
    //如果没有选中组件，则显示未选中组件
    if (!selectedComponentId) return <div>Unchecked Components</div>

    //根据组件类型获取组件配置
    const { StatComponent } = getComponentConfigByType(selectedComponentType) || {}
    //如果没有统计组件，则显示无统计图表
    if (StatComponent == null) return <div>No statistical charts for this component</div>

    return <StatComponent stat={stat} />
  }
  return (
    <>
      <Title level={3}>Chart Statistics</Title>
      <div>{getStatElement()}</div>
    </>
  )
}

export default ChartStat
