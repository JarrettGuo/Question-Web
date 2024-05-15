import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import styles from './MainLayout.module.scss'

const { Header, Footer, Content } = Layout

const MainLayout: FC = () => {
  // 获取等待状态
  const { waitingUserData } = useLoadUserData()
  // 根据用户信息进行页面跳转
  useNavPage(waitingUserData)
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        {/*当等待完成之后渲染Outlet*/}
        {waitingUserData ? (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={styles.footer}>
        Questionnaire &copy;2023 - present. Created by Jarrett
      </Footer>
    </Layout>
  )
}

export default MainLayout
