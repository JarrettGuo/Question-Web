import { configureStore } from '@reduxjs/toolkit'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'

// 定义redux store的类型
export type StateType = {
  user: UserStateType
  // components: ComponentsStateType
  //增加了undo功能
  components: StateWithHistory<ComponentsStateType>
  pageInfo: PageInfoType
}

// 创建redux store
export default configureStore({
  reducer: {
    user: userReducer,

    //没有undo功能
    // components: componentsReducer,

    //有undo功能
    components: undoable(componentsReducer, {
      limit: 20, // 保留最近的20个历史记录
      filter: excludeAction([
        // 不记录的action
        'components/resetComponents',
        'components/changeSelectedId',
        'components/selectPrevComponent',
        'components/selectNextComponent',
      ]),
    }),
    pageInfo: pageInfoReducer,
  },
})
