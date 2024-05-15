import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useNavPage from '../hooks/useNavPage'
import useLoadUserData from '../hooks/useLoadUserData'

const QuestionLayout: FC = () => {
  // 加载用户信息，获取等待状态
  const { waitingUserData } = useLoadUserData()
  // 根据用户信息进行页面跳转
  useNavPage(waitingUserData)
  return (
    <div style={{ height: '100vh' }}>
      {/*当等待完成之后渲染Outlet */}
      {waitingUserData ? (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  )
}

export default QuestionLayout
