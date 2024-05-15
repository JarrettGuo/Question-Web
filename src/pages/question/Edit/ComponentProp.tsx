import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  getComponentConfigByType,
  ComponentPropsType,
} from '../../../components/QuestionComponents'
import { changeComponentProps } from '../../../store/componentsReducer'

//未选中组件 未选中时显示的组件
const NoPropComponent: FC = () => {
  return <div style={{ textAlign: 'center' }}>Unchecked Components</div>
}

const ComponentProp: FC = () => {
  const dispatch = useDispatch()
  //获取选中的组件信息
  const { selectedComponentInfo } = useGetComponentInfo()
  //如果没有选中的组件，则显示未选中组件
  if (!selectedComponentInfo) return <NoPropComponent />

  //根据选中的组件信息获取组件的type和props
  const { type, props, isLocked, isHidden } = selectedComponentInfo
  //根据type获取组件配置
  const componentConfig = getComponentConfigByType(type)
  //如果没有获取到组件配置，则显示未选中组件
  if (!componentConfig) return <NoPropComponent />

  //修改组件的props 通过onChange方法修改组件的props
  function changeProps(newProps: ComponentPropsType) {
    //获取选中的组件信息
    if (!selectedComponentInfo) return
    //获取选中的组件的fe_id 通过fe_id来修改组件的props
    const { fe_id } = selectedComponentInfo
    //修改组件的props
    dispatch(changeComponentProps({ fe_id, newProps }))
  }

  //获取组件的PropComponent
  const { PropComponent } = componentConfig

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}

export default ComponentProp
