import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//定义用户类型 密码不需要存储，只需要用户名和昵称
export type UserStateType = {
  username: string
  nickname: string
}

const INIT_State: UserStateType = { username: '', nickname: '' }

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_State,
  reducers: {
    loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
      return action.payload //设置username nickname 到redux store 中
    },
    logoutReducer: () => INIT_State, //退出登录时，清空redux store中的username nickname
  },
})
//导出登录和退出登录的action
export const { loginReducer, logoutReducer } = userSlice.actions
//导出userSlice的reducer
export default userSlice.reducer
