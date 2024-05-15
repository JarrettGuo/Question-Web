import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCpoiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '../store/componentsReducer'
/*
 * 判断activeElement是否是可编辑的元素
 */
function isActiveElementEditable() {
  //获取当前焦点的元素
  const activeElement = document.activeElement
  //没有增加dnd之前
  // if (activeElement === document.body) return true

  //增加dnd之后
  if (activeElement === document.body) return true
  //如果焦点在可编辑的元素上，不删除组件
  if (activeElement?.matches('div[role="listitem"]')) return true

  return false
}
function useBindCanvasKeyPress() {
  const dispatch = useDispatch()
  //删除组件
  useKeyPress(['backspace', 'delete'], () => {
    //如果焦点在可编辑的元素上，不删除组件
    if (!isActiveElementEditable()) {
      return
    }
    dispatch(removeSelectedComponent())
  })
  //复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    //如果焦点在可编辑的元素上，不复制组件
    if (!isActiveElementEditable()) {
      return
    }
    dispatch(copySelectedComponent())
  })
  //粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    //如果焦点在可编辑的元素上，不粘贴组件
    if (!isActiveElementEditable()) {
      return
    }
    dispatch(pasteCpoiedComponent())
  })
  //选中上一个
  useKeyPress(['uparrow'], () => {
    //如果焦点在可编辑的元素上，不选中上一个
    if (!isActiveElementEditable()) {
      return
    }
    dispatch(selectPrevComponent())
  })
  //选中下一个
  useKeyPress(['downarrow'], () => {
    //如果焦点在可编辑的元素上，不选中下一个
    if (!isActiveElementEditable()) {
      return
    }
    dispatch(selectNextComponent())
  })
  //撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (!isActiveElementEditable()) {
        return
      }
      dispatch(ActionCreators.undo())
    },
    {
      exactMatch: true, //精确匹配
    }
  )
  //重做
  useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
    if (!isActiveElementEditable()) {
      return
    }
    dispatch(ActionCreators.redo())
  })
}

export default useBindCanvasKeyPress
