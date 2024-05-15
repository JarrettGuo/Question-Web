import React, { FC, useState, useEffect } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '../router'
import styles from './Logo.module.scss'

const { Title } = Typography
const Logo: FC = () => {
  // 从redux store中获取用户信息
  const { username } = useGetUserInfo()
  // 根据用户是否登录，设置跳转路径
  const [pathname, setPathname] = useState(HOME_PATHNAME)
  // 如果用户登录了，跳转到问卷管理页面
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME)
    }
  }, [username])
  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>Question</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
