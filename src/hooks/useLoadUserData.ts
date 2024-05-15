import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '../services/user'
import useGetUserInfo from './useGetUserInfo'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const dispatch = useDispatch()

  //ajax请求用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      //将用户信息放在redux store中
      dispatch(loginReducer({ username, nickname }))
      // setWaitingUserData(false)
    },
    //ajax请求结束后，设置waitingUserData为false
    onFinally() {
      setWaitingUserData(false)
    },
  })

  const { username } = useGetUserInfo() // 从redux store中获取用户信息
  useEffect(() => {
    // 如果用户信息已经加载完毕，设置waitingUserData为false 不用再次加载
    if (username) {
      setWaitingUserData(false)
      return
    }
    // 如果用户信息没有加载完毕，运行ajax请求
    run()
    //ajax加载用户信息
  }, [username])
  //ajax加载完用户数据后，放在redux store中，不用返回信息
  return { waitingUserData }
}

export default useLoadUserData
