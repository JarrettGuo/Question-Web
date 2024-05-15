import React, { FC, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { QuestionRadioStatPropsType } from './interface'
import { STAT_COLORS } from '../../../constant'

//格式化百分比
function format(n: number) {
  return (n * 100).toFixed(2)
}
const StatComponent: FC<QuestionRadioStatPropsType> = ({ stat = [] }) => {
  // 通过useMemo计算总数
  const sum = useMemo(() => {
    let s = 0
    stat.forEach(i => {
      s += i.count
    })
    return s
  }, [stat])
  return (
    <div style={{ width: '300px', height: '400px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={stat}
            dataKey="count"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
            label={(i: any) => `${i.name}: ${format(i.count / sum)}%`}
          >
            {stat.map((i, index) => (
              <Cell key={index} fill={STAT_COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatComponent
