import React, { FC, JSX } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

//定义属性类型 用于接收id和子元素
type PropsType = {
  id: string
  children: JSX.Element
}

const SortableItem: FC<PropsType> = ({ id, children }) => {
  //获取排序的属性和事件 将id传入后，返回一个对象
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  //设置样式 用于拖拽时的动画效果
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  //ref用于获取dom节点 role用于设置语义化标签
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} role="listitem">
      {children}
    </div>
  )
}

export default SortableItem
