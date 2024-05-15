import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { UserStateType } from '../store/userReducer'

// 从redux store中获取用户信息
function useGetUserInfo() {
  // 从redux store中获取用户信息 useSelector 是一个hooks函数，用于从redux store中获取数据
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
  return { username, nickname }
}
export default useGetUserInfo
