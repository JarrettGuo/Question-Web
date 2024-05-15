import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, message } from 'antd'
// import { useRequest } from 'ahooks'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { LOGIN_PATHNAME } from '../router'
// import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/user-token'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}
  const dispatch = useDispatch()

  const { username, nickname } = useGetUserInfo()
  const navigate = useNavigate()
  function logout() {
    // 退出登录 清空redux store中的username nickname
    dispatch(logoutReducer())
    // 退出登录 删除token
    removeToken()
    // 提示退出成功
    message.success('退出成功')
    // 跳转到登录页面
    navigate(LOGIN_PATHNAME)
  }
  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname || username}
      </span>
      <Button type="link" onClick={logout}>
        Quit
      </Button>
    </>
  )
  const Login = <Link to={LOGIN_PATHNAME}>Login</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
