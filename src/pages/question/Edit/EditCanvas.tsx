import React, { FC } from 'react'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfigByType } from '../../../components/QuestionComponents'
import {
  ComponentInfoType,
  changeSelectedId,
  moveComponent,
} from '../../../store/componentsReducer'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import styles from './EditCanvas.module.scss'

//定义传入的props类型
type PropsType = {
  loading: boolean
}

//生成组件 通过type获取组件配置，然后生成组件
function genComponent(conponentInfo: ComponentInfoType) {
  const { type, props } = conponentInfo //每个组件的type和props 从redux中获取
  const conponentConfig = getComponentConfigByType(type)
  if (!conponentConfig) {
    return null
  }
  const { Component } = conponentConfig
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  //获取组件信息
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  //点击组件时，修改selectedId
  function handleClick(event: MouseEvent, fe_id: string) {
    event.stopPropagation() //阻止事件冒泡 使得点击事件不会传递到父元素
    dispatch(changeSelectedId(fe_id))
  }
  //绑定键盘事件
  useBindCanvasKeyPress()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  //给组件列表添加id
  const componentListWithId = componentList.map(item => {
    return { ...item, id: item.fe_id }
  })
  //处理拖拽结束 重新排序
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => !c.isHidden)
          .map(component => {
            const { fe_id, isLocked } = component

            //拼接class name
            //默认的class name
            const wrapperDefaultClassName = styles['component-wrapper']
            //选中的class name
            const SelectedClassName = styles.selected
            const lockedClassName = styles.locked
            //根据条件拼接class name 选中的组件和锁定的组件
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [SelectedClassName]: fe_id === selectedId,
              [lockedClassName]: isLocked,
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={e => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(component)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}

export default EditCanvas
