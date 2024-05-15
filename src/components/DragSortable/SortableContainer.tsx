import React, { FC, JSX } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

//定义属性类型
type Propstype = {
  //子元素 可以是一个或者多个 用于排序
  children: JSX.Element | JSX.Element[]
  //用于排序的数据
  items: Array<{ id: string; [key: string]: any }>
  //拖拽结束事件
  onDragEnd: (oldIndex: number, newIndex: number) => void
}

const SortableContainer: FC<Propstype> = (props: Propstype) => {
  //获取子元素 排序数据 拖拽结束事件
  const { children, items, onDragEnd } = props

  //定义sensor 用于监听拖拽事件
  const sensors = useSensors(
    //鼠标事件
    useSensor(MouseSensor, {
      //监听鼠标事件 距离8px触发
      activationConstraint: { distance: 8 },
    })
  )

  //拖拽结束事件
  function handleDragEnd(event: DragEndEvent) {
    //获取拖拽元素和目标元素
    const { active, over } = event
    //如果目标元素为空 不做任何操作
    if (over == null) return
    //如果拖拽元素和目标元素不一样 则进行排序
    if (active.id !== over.id) {
      //获取拖拽元素和目标元素的索引
      const lodIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)
      //排序 将拖拽元素插入到目标元素的位置
      onDragEnd(lodIndex, newIndex)
    }
  }
  return (
    <DndContext
      sensors={sensors}
      //碰撞检测
      collisionDetection={closestCenter}
      //拖拽结束事件
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        //排序策略
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  )
}
export default SortableContainer
