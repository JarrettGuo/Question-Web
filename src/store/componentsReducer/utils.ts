import { ComponentInfoType, ComponentsStateType } from '.'

/*
 * 获取下一个选中的组件id
 * @param fe_id 选中的组件id
 * @param componentList 组件列表
 */

export function getNextSelectedId(fe_id: string, componentList: ComponentInfoType[]) {
  const visibleComponentList = componentList.filter(c => !c.isHidden)
  const index = visibleComponentList.findIndex(item => item.fe_id === fe_id)
  if (index < 0) {
    return ''
  }
  //重新计算 selectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    //组件长度就一个时，直接返回空
    newSelectedId = ''
  } else {
    // 组件长度大于1时
    if (index + 1 === length) {
      //如果删除的是最后一个组件,要选中上一个组件
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      //如果删除的不是最后一个组件，要选中下一个组件
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}

/*
 * 插入新的组件
 * @param draft 组件列表
 * @param newComponent 新插入的组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
  const { selectedId, componentList } = draft
  const index = componentList.findIndex(item => item.fe_id === selectedId)

  //如果没有选中的组件，则添加到最后
  if (index < 0) {
    draft.componentList.push(newComponent)
  } else {
    //如果有选中的组件，则添加到选中的组件后面
    draft.componentList.splice(index + 1, 0, newComponent)
  }
  //选中新添加的组件
  draft.selectedId = newComponent.fe_id
}
