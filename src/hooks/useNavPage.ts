import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo,
} from '../router'
import useGetUserInfo from './useGetUserInfo'

function useNavPage(waitingUserData: boolean) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { username } = useGetUserInfo()

  useEffect(() => {
    //如果用户信息还在加载中，不进行跳转
    if (waitingUserData) return

    //如果用户信息加载完毕，根据用户信息进行跳转

    // 已登录
    // 如果是登录或注册页面，跳转到问卷管理页面
    if (username) {
      // 如果是登录或注册页面，跳转到问卷管理页面
      if (isLoginOrRegister(pathname)) {
        navigate(MANAGE_INDEX_PATHNAME)
      }
      return
    }

    // 未登录
    //如果不需要用户信息，直接返回
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      navigate(LOGIN_PATHNAME)
    }
  }, [username, waitingUserData, pathname])
}

export default useNavPage
