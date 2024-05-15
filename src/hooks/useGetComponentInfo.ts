import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

function useGetComponentInfo() {
  //获取redux store中的components
  const components = useSelector<StateType>(
    // state => state.components
    state => state.components.present
  ) as ComponentsStateType
  //返回组件信息 componentList
  const { componentList = [], selectedId = [], copiedComponent = [] } = components
  //根据selectedId获取选中的组件
  const selectedComponentInfo = componentList.find(item => item.fe_id === selectedId)

  return { componentList, selectedId, selectedComponentInfo, copiedComponent }
}

export default useGetComponentInfo
