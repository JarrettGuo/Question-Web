import React, { ChangeEvent, FC } from 'react'
import classNames from 'classnames'
import { message, Input, Button, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  changeSelectedId,
  changeComponentTitle,
  changeComponentHidden,
  toggleComponentLock,
  moveComponent,
} from '../../../store/componentsReducer'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import styles from './Layers.module.scss'

const Layers: FC = () => {
  const dispatch = useDispatch()
  const { componentList, selectedId } = useGetComponentInfo()
  //记录当前修改title的组件id
  const [changeTitleId, setChangeTitleId] = React.useState('')
  //点击选中组件
  function handleTitleClick(fe_id: string) {
    //获取当前选中组件信息
    const currentComponent = componentList.find(item => item.fe_id === fe_id)
    //如果当前组件已隐藏，提示无法选中
    if (currentComponent && currentComponent.isHidden) {
      message.warning('The current component is hidden and cannot be selected.')
      return
    }
    if (fe_id !== selectedId) {
      //当前组件未被选中，设置为选中
      dispatch(changeSelectedId(fe_id))
      setChangeTitleId('')
      return
    }
    //当前组件已被选中，设置为修改title状态
    setChangeTitleId(fe_id)
  }
  //修改title
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    //获取新的title 去除首尾空格
    const newTitle = (event.target as HTMLInputElement)?.value.trim()
    //当newTitle为空时，不做任何操作
    if (!newTitle) return
    //当selectedId为空时，不做任何操作 添加一个判断条件当selectedId为数组时不做任何操作
    if (!selectedId || Array.isArray(selectedId)) return
    //修改title
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
  }
  //切换隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }
  //切换锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLock({ fe_id }))
  }

  //SortableContainer 组件的 items 属性，需要每个item都有 id
  const componentListWithId = componentList.map(item => ({ ...item, id: item.fe_id }))
  //处理拖拽结束 重新排序
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map(item => {
        const { fe_id, title, isHidden, isLocked } = item

        //拼接title的className
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                {fe_id === changeTitleId && (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    //按下回车键或者失去焦点时，取消修改title状态
                    onPressEnter={() => setChangeTitleId('')}
                    onBlur={() => setChangeTitleId('')}
                  />
                )}
                {fe_id !== changeTitleId && title}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    icon={<EyeInvisibleOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  ></Button>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => changeLocked(fe_id)}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
