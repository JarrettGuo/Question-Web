import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { useDispatch } from 'react-redux'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { ActionCreators } from 'redux-undo'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCpoiedComponent,
  moveComponent,
} from '../../../store/componentsReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()

  //获取选中的组件信息 selectedId、selectedComponentInfo、copiedComponent、componentList
  const { selectedId, selectedComponentInfo, copiedComponent, componentList } =
    useGetComponentInfo()
  //获取是否锁定
  const isLocked = selectedComponentInfo?.isLocked

  //计算当前选中组件在组件列表中的位置
  const length = componentList.length
  const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)
  //判断是否是第一个或最后一个
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex + 1 >= length

  //删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }
  //隐藏组件
  function handleHidden() {
    const feId = selectedId as string // Ensure selectedId is of type string
    dispatch(changeComponentHidden({ fe_id: feId, isHidden: true }))
  }
  //锁定组件
  function handleLock() {
    const feId = selectedId as string // Ensure selectedId is of type string
    dispatch(toggleComponentLock({ fe_id: feId }))
  }
  //复制组件
  function handleCopy() {
    dispatch(copySelectedComponent())
  }
  //粘贴组件
  function handlePaste() {
    dispatch(pasteCpoiedComponent())
  }
  //上移组件
  function handleUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }
  //下移组件
  function handleDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }
  //撤销 使用redux-undo 提供的ActionCreators.undo
  function handleUndo() {
    dispatch(ActionCreators.undo())
  }
  //重做 使用redux-undo 提供的ActionCreators.redo
  function handleRedo() {
    dispatch(ActionCreators.redo())
  }
  return (
    <Space>
      <Tooltip title="Delete">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title="Hide">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title="Lock">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          type={isLocked ? 'primary' : 'default'}
          onClick={handleLock}
        ></Button>
      </Tooltip>
      <Tooltip title="Copy">
        <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
      </Tooltip>
      <Tooltip title="Paste">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent === null}
        ></Button>
      </Tooltip>
      <Tooltip title="Up">
        <Button shape="circle" icon={<UpOutlined />} onClick={handleUp} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip title="Down">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={handleDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
      <Tooltip title="Undo">
        <Button shape="circle" icon={<UndoOutlined />} onClick={handleUndo}></Button>
      </Tooltip>
      <Tooltip title="Redo">
        <Button shape="circle" icon={<RedoOutlined />} onClick={handleRedo}></Button>
      </Tooltip>
    </Space>
  )
}
export default EditToolbar
