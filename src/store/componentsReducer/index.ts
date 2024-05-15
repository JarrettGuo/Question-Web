import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { produce } from 'immer'
import cloneDeep from 'lodash/cloneDeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'
import { ComponentPropsType } from '../../components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'

//定义组件信息类型
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}
//定义组件状态类型
export type ComponentsStateType = {
  //当前选中的组件id 用于编辑
  selectedId: string
  //组件列表
  componentList: Array<ComponentInfoType>
  //复制的组件
  copiedComponent: ComponentInfoType | null
}
// 初始化组件状态
const INIT_STATE: ComponentsStateType = {
  //当前选中的组件id 用于编辑
  selectedId: '',
  //组件列表
  componentList: [],
  //复制的组件
  copiedComponent: null,
}
export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //重制所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
    // 修改selectedId 当点击组件时，修改selectedId
    changeSelectedId: (state: ComponentsStateType, action: PayloadAction<string>) => {
      state.selectedId = action.payload
    },
    // 添加组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload
        //插入新的组件
        insertNewComponent(draft, newComponent)
      }
    ),
    //修改组件属性
    changeComponentProps: produce(
      (
        //修改组件属性
        draft: ComponentsStateType,
        //传入的参数 fe_id和newProps
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>
      ) => {
        //获取传入的fe_id和newProps
        const { fe_id, newProps } = action.payload
        //根据fe_id找到对应的组件
        const component = draft.componentList.find(item => item.fe_id === fe_id)
        //如果找到了组件，则修改组件的props
        if (component) {
          //修改组件的props
          component.props = {
            //保留原来的props
            ...component.props,
            //修改新的props
            ...newProps,
          }
        }
      }
    ),
    //删除组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      //获取当前的组件列表和选中的组件id
      const { componentList = [], selectedId: removedId } = draft

      //重新计算 selectedId
      const newSelectedId = getNextSelectedId(removedId, componentList)
      //修改选中的组件id
      draft.selectedId = newSelectedId

      //根据选中的组件id找到对应的组件
      const index = componentList.findIndex(item => item.fe_id === removedId)
      //如果找到了组件，则删除对应的组件
      componentList.splice(index, 1)
    }),
    //隐藏/显示组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        //获取componentList和传入的fe_id和isHidden
        const { componentList } = draft
        const { fe_id, isHidden } = action.payload

        //重新计算 selectedId
        let newSelectedId = ''
        if (isHidden) {
          //如果隐藏的是选中的组件，则选中下一个组件
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          //如果显示的是选中的组件，则选中当前组件
          newSelectedId = fe_id
        }
        //修改选中的组件id
        draft.selectedId = newSelectedId

        //根据fe_id找到对应的组件
        const component = componentList.find(item => item.fe_id === fe_id)
        //如果找到了组件，则修改组件的isHidden
        if (component) {
          component.isHidden = isHidden
        }
      }
    ),
    //锁定/解锁组件
    toggleComponentLock: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        //获取componentList和传入的fe_id
        const { fe_id } = action.payload

        //根据fe_id找到对应的组件
        const component = draft.componentList.find(item => item.fe_id === fe_id)
        //如果找到了组件，则修改组件的isLocked
        if (component) {
          component.isLocked = !component.isLocked
        }
      }
    ),
    //复制组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      //获取componentList和selectedId
      const { componentList, selectedId } = draft
      //根据selectedId找到对应的组件
      const selectedComponent = componentList.find(item => item.fe_id === selectedId)
      //如果没有选中的组件，则返回
      if (selectedComponent === null) return
      //复制选中的组件
      draft.copiedComponent = selectedComponent ? cloneDeep(selectedComponent) : null //深拷贝
    }),
    //粘贴组件
    pasteCpoiedComponent: produce((draft: ComponentsStateType) => {
      //获取componentList和copiedComponent
      const { copiedComponent } = draft
      //如果没有复制的组件，则返回
      if (copiedComponent === null) return
      //修改复制的组件的fe_id
      copiedComponent.fe_id = nanoid()
      //插入新的组件
      insertNewComponent(draft, copiedComponent)
    }),
    //选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      //获取componentList和selectedId
      const { componentList, selectedId } = draft
      //获取选中的组件的索引
      const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
      //如果没有选中的组件，则返回
      if (selectedIndex < 0) return
      //已经是第一个组件，则返回
      if (selectedIndex <= 0) return
      //选中上一个组件
      draft.selectedId = componentList[selectedIndex - 1].fe_id
    }),
    //选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      //获取componentList和selectedId
      const { componentList, selectedId } = draft
      //获取选中的组件的索引
      const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
      //如果没有选中的组件，则返回
      if (selectedIndex < 0) return
      //已经是最后一个组件，则返回
      if (selectedIndex + 1 === componentList.length) return
      //选中下一个组件
      draft.selectedId = componentList[selectedIndex + 1].fe_id
    }),
    //修改标题
    changeComponentTitle: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        //获取componentList和传入的fe_id和newTitle
        const { componentList } = draft
        const { fe_id, title } = action.payload

        //根据fe_id找到对应的组件
        const component = componentList.find(item => item.fe_id === fe_id)
        //如果找到了组件，则修改组件的title
        if (component) {
          component.title = title
        }
      }
    ),
    //移动组件位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        //获取componentList和传入的oldIndex和newIndex
        const { componentList } = draft
        const { oldIndex, newIndex } = action.payload

        //重新排序 使用arrayMove方法
        draft.componentList = arrayMove(componentList, oldIndex, newIndex)
      }
    ),
  },
})

//导出重制组件的action
export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCpoiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions
//导出componentsSlice的reducer
export default componentsSlice.reducer
